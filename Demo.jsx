import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, Loader2, Sparkles } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Demo = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Add welcome message
    const welcomeMessage = {
      id: "welcome",
      type: "bot",
      content: "Hi! I'm SmartBot, your AI assistant powered by Gemini. I'm here to help you with accurate, intelligent responses. Ask me anything!",
      timestamp: new Date().toISOString(),
      sessionId: sessionId
    };
    setMessages([welcomeMessage]);
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
      sessionId: sessionId
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API}/chat/message`, {
        session_id: sessionId,
        content: inputValue
      });

      const botMessage = {
        id: response.data.id,
        type: "bot",
        content: response.data.content,
        timestamp: response.data.timestamp,
        sessionId: response.data.session_id
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: `error_${Date.now()}`,
        type: "bot",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        sessionId: sessionId
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to SmartBot. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  const handleFeedback = (messageId, type) => {
    toast({
      title: type === "positive" ? "Thank you!" : "Thanks for feedback",
      description: type === "positive" ? "Glad I could help!" : "We'll work on improving our responses",
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-container" style={{ paddingTop: "70px" }}>
      {/* Chat Header */}
      <div className="chat-header">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div className="logo-icon">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="heading-2 mb-0">SmartBot Demo</h1>
              <p className="body-small mb-0">Powered by Gemini AI • Real-time responses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        <div className="container" style={{ maxWidth: "900px" }}>
          {messages.map((message) => (
            <div key={message.id} className="chat-message">
              <div className={`message-avatar ${message.type}`}>
                {message.type === "bot" ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>
              
              <div className="message-content">
                <div className="message-header">
                  <span className="message-name">
                    {message.type === "bot" ? "SmartBot" : "You"}
                  </span>
                  <span className="message-time">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <div className={`message-bubble ${message.type}`}>
                  <p style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {message.content}
                  </p>
                  
                  {message.type === "bot" && (
                    <div className="message-actions">
                      <button
                        onClick={() => handleCopyMessage(message.content)}
                        className="message-action"
                        title="Copy message"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, "positive")}
                        className="message-action"
                        title="Good response"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, "negative")}
                        className="message-action"
                        title="Needs improvement"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message">
              <div className="message-avatar bot">
                <Bot size={18} />
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-name">SmartBot</span>
                  <span className="message-time">typing...</span>
                </div>
                <div className="message-bubble bot">
                  <div className="typing-indicator">
                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="chat-input">
        <div className="container" style={{ maxWidth: "900px" }}>
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isTyping}
              className="chat-input-field"
              rows="1"
              style={{
                resize: "none",
                overflow: "hidden",
                minHeight: "44px",
                maxHeight: "120px"
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="chat-send-btn"
              title="Send message"
            >
              {isTyping ? (
                <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
          
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <p className="body-small mb-0" style={{ color: "var(--text-tertiary)" }}>
              <Sparkles size={12} style={{ marginRight: "0.25rem" }} />
              SmartBot can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;