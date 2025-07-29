from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import uuid

# Import the Gemini integration
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Gemini API configuration
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

# Create the main app
app = FastAPI(title="SmartBot API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic models
class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    type: str  # 'user' or 'bot'
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatMessageCreate(BaseModel):
    session_id: str
    content: str

class ChatMessageResponse(BaseModel):
    id: str
    type: str
    content: str
    timestamp: datetime
    session_id: str

class ChatSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    message_count: int = 0
    title: str = "New Chat"

class ContactForm(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    feedback_type: str = "general"

class ContactFormResponse(BaseModel):
    id: str
    status: str
    message: str

# Chat endpoints
@api_router.post("/chat/message", response_model=ChatMessageResponse)
async def send_chat_message(message_data: ChatMessageCreate):
    try:
        # Create user message
        user_message = ChatMessage(
            session_id=message_data.session_id,
            type="user",
            content=message_data.content
        )
        
        # Save user message to database
        await db.chat_messages.insert_one(user_message.dict())
        
        # Initialize Gemini chat
        chat = LlmChat(
            api_key=GEMINI_API_KEY,
            session_id=message_data.session_id,
            system_message="""You are SmartBot, an AI-powered assistant built using the Gemini API. 
            You are designed to help students and professionals with accurate, helpful responses.
            
            Your key features:
            - 50% higher accuracy than traditional chatbots
            - Real-time natural language processing
            - Faster response times
            - User-friendly interface
            
            Be helpful, concise, and professional in your responses. If you don't know something, 
            admit it and offer to help with related topics you do know about."""
        ).with_model("gemini", "gemini-2.0-flash")
        
        # Get chat history for context
        chat_history = await db.chat_messages.find(
            {"session_id": message_data.session_id}
        ).sort("timestamp", 1).to_list(50)  # Last 50 messages
        
        # Send message to Gemini
        gemini_message = UserMessage(text=message_data.content)
        bot_response = await chat.send_message(gemini_message)
        
        # Create bot message
        bot_message = ChatMessage(
            session_id=message_data.session_id,
            type="bot",
            content=bot_response,
        )
        
        # Save bot message to database
        await db.chat_messages.insert_one(bot_message.dict())
        
        # Update session
        await db.chat_sessions.update_one(
            {"id": message_data.session_id},
            {
                "$set": {"updated_at": datetime.utcnow()},
                "$inc": {"message_count": 2}  # user + bot message
            },
            upsert=True
        )
        
        return ChatMessageResponse(
            id=bot_message.id,
            type=bot_message.type,
            content=bot_message.content,
            timestamp=bot_message.timestamp,
            session_id=bot_message.session_id
        )
        
    except Exception as e:
        logging.error(f"Error in chat message: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")

@api_router.get("/chat/history/{session_id}", response_model=List[ChatMessageResponse])
async def get_chat_history(session_id: str):
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id}
        ).sort("timestamp", 1).to_list(1000)
        
        return [
            ChatMessageResponse(
                id=msg["id"],
                type=msg["type"],
                content=msg["content"],
                timestamp=msg["timestamp"],
                session_id=msg["session_id"]
            )
            for msg in messages
        ]
    except Exception as e:
        logging.error(f"Error getting chat history: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving chat history")

@api_router.post("/chat/session", response_model=ChatSession)
async def create_chat_session():
    try:
        session = ChatSession()
        await db.chat_sessions.insert_one(session.dict())
        return session
    except Exception as e:
        logging.error(f"Error creating chat session: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating chat session")

@api_router.get("/chat/sessions", response_model=List[ChatSession])
async def get_chat_sessions():
    try:
        sessions = await db.chat_sessions.find().sort("updated_at", -1).to_list(100)
        return [ChatSession(**session) for session in sessions]
    except Exception as e:
        logging.error(f"Error getting chat sessions: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving chat sessions")

# Contact form endpoint
@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactForm):
    try:
        contact_entry = {
            "id": str(uuid.uuid4()),
            "name": form_data.name,
            "email": form_data.email,
            "subject": form_data.subject,
            "message": form_data.message,
            "feedback_type": form_data.feedback_type,
            "created_at": datetime.utcnow(),
            "status": "received"
        }
        
        await db.contact_forms.insert_one(contact_entry)
        
        return ContactFormResponse(
            id=contact_entry["id"],
            status="success",
            message="Thank you for your message. We'll get back to you soon!"
        )
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Error submitting contact form")

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "SmartBot API"}

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "SmartBot API - AI-Powered Assistant"}

# Include the router in the main app
app.include_router(api_router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("SmartBot API starting up...")
    logger.info(f"Database: {os.environ['DB_NAME']}")
    logger.info("Gemini API integration enabled")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("SmartBot API shutting down...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)