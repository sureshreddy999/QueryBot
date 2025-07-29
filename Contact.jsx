import React, { useState } from "react";
import { Mail, MessageCircle, Send, CheckCircle, Bot, Globe, Clock, ArrowRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    feedback_type: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        feedback_type: formData.feedback_type
      });

      toast({
        title: "Message Sent!",
        description: response.data.message,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        feedback_type: "general"
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "feedback", label: "Feedback" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "collaboration", label: "Collaboration" }
  ];

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      description: "smartbot@example.com",
      action: "Send Email",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Clock size={24} />,
      title: "Response Time",
      description: "Usually within 24 hours",
      action: "Quick Response",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: <Globe size={24} />,
      title: "Available",
      description: "24/7 Support",
      action: "Always Here",
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  const faqs = [
    {
      question: "How does SmartBot work?",
      answer: "SmartBot uses the advanced Gemini API to process your questions and provide accurate, real-time responses with natural language understanding.",
      icon: <Bot size={20} />
    },
    {
      question: "Is SmartBot free to use?",
      answer: "Yes! SmartBot is currently free to use. Try out the demo and experience the power of AI-powered conversation.",
      icon: <CheckCircle size={20} />
    },
    {
      question: "Can I integrate SmartBot into my application?",
      answer: "We're working on integration options. Contact us to discuss your specific needs and potential collaboration opportunities.",
      icon: <ArrowRight size={20} />
    }
  ];

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <MessageCircle size={16} />
              <span>Get in Touch</span>
            </div>
            
            <h1 className="heading-hero">
              Let's Connect
            </h1>
            
            <p className="body-large">
              Have questions about SmartBot? Want to provide feedback or explore collaboration opportunities? 
              We'd love to hear from you and help you get the most out of AI-powered conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section style={{ padding: "4rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="grid grid-cols-3" style={{ gap: "2rem" }}>
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-content">
                  <div className={`icon bg-gradient-to-r ${info.gradient} mb-3`}>
                    {info.icon}
                  </div>
                  <h3 className="heading-3">{info.title}</h3>
                  <p className="body-medium mb-2">{info.description}</p>
                  <span className="body-small text-gradient">{info.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: "4rem", alignItems: "start" }}>
            
            {/* Left Column - Form Description */}
            <div>
              <h2 className="heading-1 mb-3">Send us a Message</h2>
              <p className="body-large mb-4">
                Whether you're a student, professional, or developer interested in AI chatbots, 
                we're here to help and would love to hear your thoughts.
              </p>
              
              <div className="card card-glass">
                <div className="card-content">
                  <h3 className="heading-3 mb-3">What can we help you with?</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <CheckCircle size={16} style={{ color: "var(--primary-600)" }} />
                      <span className="body-medium mb-0">Technical questions about SmartBot</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <CheckCircle size={16} style={{ color: "var(--primary-600)" }} />
                      <span className="body-medium mb-0">Feedback and suggestions</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <CheckCircle size={16} style={{ color: "var(--primary-600)" }} />
                      <span className="body-medium mb-0">Collaboration opportunities</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0" }}>
                      <CheckCircle size={16} style={{ color: "var(--primary-600)" }} />
                      <span className="body-medium mb-0">Bug reports and issues</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="card">
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="feedback_type" className="form-label">
                      Type of Inquiry
                    </label>
                    <select
                      id="feedback_type"
                      name="feedback_type"
                      value={formData.feedback_type}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {feedbackTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="form-textarea"
                      placeholder="Tell us more about your inquiry..."
                      rows="6"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{ 
                          width: "16px", 
                          height: "16px", 
                          border: "2px solid transparent", 
                          borderTop: "2px solid white", 
                          borderRadius: "50%", 
                          animation: "spin 1s linear infinite" 
                        }}></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="heading-1">Frequently Asked Questions</h2>
            <p className="body-large">Quick answers to common questions about SmartBot</p>
          </div>
          
          <div className="grid grid-cols-1" style={{ gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
            {faqs.map((faq, index) => (
              <div key={index} className="card scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-content">
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div 
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "var(--gradient-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0
                      }}
                    >
                      {faq.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="heading-3 mb-2">{faq.question}</h3>
                      <p className="body-medium mb-0">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Contact;