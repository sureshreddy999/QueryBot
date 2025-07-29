// Mock data for SmartBot responses
export const mockChatData = {
  responses: {
    // Greetings
    "hello": "Hello! I'm SmartBot, your AI assistant. How can I help you today?",
    "hi": "Hi there! I'm here to help you with any questions you might have. What would you like to know?",
    "hey": "Hey! Thanks for trying SmartBot. I'm powered by Gemini AI and ready to assist you.",
    
    // About SmartBot
    "what is smartbot": "SmartBot is an AI-powered chatbot built with the Gemini API. I provide real-time query resolution with 50% higher accuracy than traditional chatbots, designed specifically for students and professionals.",
    "how does smartbot work": "I use the Gemini API for natural language processing to understand your questions and provide accurate, contextual responses. My architecture includes HTML, CSS, and JavaScript for the frontend, with seamless API integration for real-time communication.",
    "what can you do": "I can help you with a wide range of topics including:\n• Answering questions on various subjects\n• Providing explanations and tutorials\n• Helping with research and learning\n• Offering coding assistance\n• General conversation and support",
    
    // Technical questions
    "gemini api": "The Gemini API is Google's advanced AI model that powers my responses. It provides state-of-the-art natural language understanding and generation capabilities, enabling me to deliver more accurate and contextually relevant answers.",
    "response time": "My average response time is under 2 seconds! This fast performance is achieved through optimized API calls and efficient processing of your queries.",
    "accuracy": "I achieve over 50% higher query resolution accuracy compared to traditional chatbots, thanks to the advanced Gemini AI technology and optimized natural language processing.",
    
    // Educational content
    "javascript": "JavaScript is a versatile programming language used for web development. It enables interactive web pages and is essential for frontend development. Would you like to know about specific JavaScript concepts or features?",
    "python": "Python is a popular programming language known for its simplicity and readability. It's widely used in data science, web development, automation, and AI. What specific Python topic would you like to explore?",
    "machine learning": "Machine learning is a subset of AI that enables systems to learn from data without explicit programming. It includes supervised learning, unsupervised learning, and reinforcement learning. Are you interested in a particular ML topic?",
    "ai": "Artificial Intelligence (AI) refers to computer systems that can perform tasks typically requiring human intelligence. This includes learning, reasoning, problem-solving, and understanding language - just like what I'm doing right now!",
    
    // Study help
    "study tips": "Here are some effective study tips:\n• Use active recall and spaced repetition\n• Break study sessions into focused chunks (Pomodoro technique)\n• Create mind maps and visual aids\n• Teach concepts to others\n• Take regular breaks and get enough sleep\n• Practice with real problems and examples",
    "time management": "Effective time management strategies:\n• Prioritize tasks using the Eisenhower Matrix\n• Set specific, measurable goals\n• Use time-blocking techniques\n• Eliminate distractions during work time\n• Review and adjust your schedule regularly\n• Don't forget to schedule breaks and relaxation time",
    
    // Professional development
    "career advice": "Here's some career advice:\n• Continuously learn and update your skills\n• Build a strong professional network\n• Seek feedback and mentorship\n• Set clear career goals and create action plans\n• Stay adaptable to industry changes\n• Maintain work-life balance for long-term success",
    "resume tips": "Resume writing tips:\n• Keep it concise (1-2 pages)\n• Use action verbs and quantify achievements\n• Tailor your resume to each job application\n• Include relevant keywords from job descriptions\n• Highlight your most relevant experience first\n• Proofread carefully for errors",
    
    // Technology and coding
    "web development": "Web development involves creating websites and web applications. It includes frontend (client-side) and backend (server-side) development. Key technologies include HTML, CSS, JavaScript, and various frameworks like React, Angular, or Vue.js. Would you like to know more about any specific aspect?",
    "react": "React is a JavaScript library for building user interfaces, particularly web applications. It uses a component-based architecture and virtual DOM for efficient updates. React is maintained by Facebook and is widely used for creating interactive UIs.",
    "html": "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of web pages using elements and tags. HTML works together with CSS for styling and JavaScript for interactivity.",
    "css": "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the appearance of HTML elements including colors, fonts, spacing, and positioning. CSS enables responsive design and creates visually appealing user interfaces.",
    
    // Default responses for unknown queries
    "default": [
      "That's an interesting question! While I may not have specific information about that topic, I'm here to help with a wide range of subjects. Could you rephrase your question or ask about something else?",
      "I'm not entirely sure about that specific topic, but I'd be happy to help you with other questions. Feel free to ask about technology, education, career advice, or any other subject you're curious about!",
      "I don't have detailed information about that particular topic at the moment. However, I can assist you with questions about programming, AI, study tips, career advice, and many other subjects. What else would you like to know?",
      "That's outside my current knowledge base, but I'm constantly learning! I can help you with questions about web development, artificial intelligence, educational topics, and professional development. Is there anything else I can assist you with?"
    ]
  },

  // Function to get response based on user input
  getResponse: function(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Check for exact matches first
    if (this.responses[input]) {
      return this.responses[input];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(this.responses)) {
      if (key !== "default" && input.includes(key)) {
        return response;
      }
    }
    
    // Check for keywords
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return this.responses["hello"];
    }
    
    if (input.includes("smartbot") || input.includes("smart bot")) {
      return this.responses["what is smartbot"];
    }
    
    if (input.includes("how") && input.includes("work")) {
      return this.responses["how does smartbot work"];
    }
    
    if (input.includes("what") && input.includes("can")) {
      return this.responses["what can you do"];
    }
    
    if (input.includes("thanks") || input.includes("thank")) {
      return "You're welcome! I'm glad I could help. Feel free to ask me anything else!";
    }
    
    if (input.includes("goodbye") || input.includes("bye")) {
      return "Goodbye! Thanks for trying SmartBot. Come back anytime if you have more questions!";
    }
    
    // Return random default response
    const defaultResponses = this.responses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
};

// Mock user sessions data
export const mockSessionData = {
  sessions: [
    {
      id: "session_1",
      startTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      endTime: new Date(Date.now() - 86300000).toISOString(),
      messageCount: 12,
      topics: ["JavaScript", "Web Development", "Career Advice"]
    },
    {
      id: "session_2", 
      startTime: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      endTime: new Date(Date.now() - 43000000).toISOString(),
      messageCount: 8,
      topics: ["Python", "Machine Learning", "Study Tips"]
    }
  ]
};

// Mock feedback data
export const mockFeedbackData = {
  feedbackEntries: [
    {
      id: "feedback_1",
      sessionId: "session_1",
      messageId: "msg_1",
      type: "positive",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      comment: "Very helpful response!"
    },
    {
      id: "feedback_2",
      sessionId: "session_2", 
      messageId: "msg_2",
      type: "negative",
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      comment: "Could be more detailed"
    }
  ]
};