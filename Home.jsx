import React from "react";
import { Link } from "react-router-dom";
import { 
  Play, 
  MessageCircle, 
  Zap, 
  Users, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  Star,
  Clock,
  Shield,
  Brain,
  Cpu,
  Target,
  Check
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Intelligence",
      description: "Advanced Gemini API integration for superior natural language understanding and contextual responses.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Zap size={24} />,
      title: "50% Higher Accuracy",
      description: "Breakthrough performance with faster response times and significantly improved query resolution.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: <Users size={24} />,
      title: "Professional Grade",
      description: "Designed for students and professionals who demand reliable, accurate AI assistance.",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: <Shield size={24} />,
      title: "Secure & Reliable",
      description: "Built with enterprise-grade security and reliability for consistent performance.",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: <Clock size={24} />,
      title: "Real-time Responses",
      description: "Lightning-fast AI responses with sub-2-second average processing time.",
      gradient: "from-pink-400 to-pink-600"
    },
    {
      icon: <Target size={24} />,
      title: "Precision Focused",
      description: "Optimized for accuracy and relevance in every conversation and query.",
      gradient: "from-indigo-400 to-indigo-600"
    }
  ];

  const stats = [
    { value: "50%", label: "Higher Accuracy", description: "Compared to traditional chatbots" },
    { value: "< 2s", label: "Response Time", description: "Average processing speed" },
    { value: "24/7", label: "Availability", description: "Always ready to help" },
    { value: "∞", label: "Conversations", description: "Unlimited usage capacity" }
  ];

  const techStack = [
    { name: "Gemini API", category: "AI Engine", color: "bg-blue-100 text-blue-800" },
    { name: "React", category: "Frontend", color: "bg-cyan-100 text-cyan-800" },
    { name: "FastAPI", category: "Backend", color: "bg-green-100 text-green-800" },
    { name: "MongoDB", category: "Database", color: "bg-emerald-100 text-emerald-800" },
    { name: "JavaScript", category: "Language", color: "bg-yellow-100 text-yellow-800" },
    { name: "Python", category: "Language", color: "bg-purple-100 text-purple-800" }
  ];

  const benefits = [
    "Instant AI-powered responses",
    "Natural language understanding",
    "Context-aware conversations",
    "Professional-grade accuracy",
    "Seamless user experience",
    "Real-time processing"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Powered by Gemini AI</span>
            </div>
            
            <h1 className="heading-hero">
              Meet SmartBot
              <br />
              Your AI Assistant
            </h1>
            
            <p className="body-large">
              Experience the future of AI conversation with SmartBot - delivering 50% higher accuracy, 
              lightning-fast responses, and professional-grade intelligence for students and professionals.
            </p>
            
            <div className="hero-actions">
              <Link to="/demo" className="btn btn-primary">
                <Play size={20} />
                Try Demo
              </Link>
              <Link to="/about" className="btn btn-secondary">
                <ArrowRight size={20} />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="heading-1">Why Choose SmartBot?</h2>
            <p className="body-large">
              Built with cutting-edge AI technology to deliver exceptional conversation experiences
            </p>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: "2rem" }}>
            {features.map((feature, index) => (
              <div key={index} className="card card-feature scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`icon bg-gradient-to-r ${feature.gradient}`}>
                  {feature.icon}
                </div>
                <h3 className="heading-3">{feature.title}</h3>
                <p className="body-medium mb-0">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="heading-1">Performance Metrics</h2>
            <p className="body-large">Real numbers that showcase SmartBot's superior performance</p>
          </div>
          
          <div className="grid grid-cols-4" style={{ gap: "2rem" }}>
            {stats.map((stat, index) => (
              <div key={index} className="card text-center scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-content">
                  <div className="heading-hero text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="heading-3 mb-1">{stat.label}</div>
                  <p className="body-small mb-0">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="heading-1">Built with Modern Technology</h2>
            <p className="body-large">
              Leveraging the latest in AI and web development technologies
            </p>
          </div>
          
          <div className="grid grid-cols-2" style={{ gap: "3rem", alignItems: "center" }}>
            <div>
              <div className="card card-glass">
                <div className="card-content">
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <Cpu size={32} className="text-gradient" />
                    <div>
                      <h3 className="heading-3 mb-0">Technology Stack</h3>
                      <p className="body-small mb-0">Modern, scalable architecture</p>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {techStack.map((tech, index) => (
                      <div 
                        key={index}
                        className={`${tech.color}`}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: "500"
                        }}
                      >
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="heading-2 mb-3">Key Benefits</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div 
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "var(--gradient-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Check size={14} style={{ color: "white" }} />
                    </div>
                    <span className="body-medium mb-0">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="heading-1">How SmartBot Works</h2>
            <p className="body-large">Simple, powerful, and intelligent AI conversation</p>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: "2rem" }}>
            <div className="card text-center">
              <div className="card-content">
                <div 
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--gradient-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "700"
                  }}
                >
                  1
                </div>
                <h3 className="heading-3">Ask Your Question</h3>
                <p className="body-medium mb-0">
                  Type your question or request in natural language. SmartBot understands context and nuance.
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-content">
                <div 
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--gradient-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "700"
                  }}
                >
                  2
                </div>
                <h3 className="heading-3">AI Processing</h3>
                <p className="body-medium mb-0">
                  Gemini AI analyzes your query using advanced natural language processing and contextual understanding.
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-content">
                <div 
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--gradient-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "700"
                  }}
                >
                  3
                </div>
                <h3 className="heading-3">Get Accurate Response</h3>
                <p className="body-medium mb-0">
                  Receive precise, helpful answers in under 2 seconds with 50% higher accuracy than traditional chatbots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "6rem 0", background: "var(--gradient-hero)" }}>
        <div className="container">
          <div className="text-center">
            <h2 className="heading-1">Ready to Experience SmartBot?</h2>
            <p className="body-large mb-4">
              Join thousands of students and professionals who trust SmartBot for accurate, 
              intelligent AI assistance. Try it now and see the difference.
            </p>
            
            <div className="hero-actions">
              <Link to="/demo" className="btn btn-primary">
                <Bot size={20} />
                Start Chatting
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <MessageCircle size={20} />
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;