import React from "react";
import { Target, Code, Zap, Users, Globe, Clock } from "lucide-react";

const About = () => {
  const objectives = [
    {
      icon: <Target size={24} />,
      title: "Project Objective",
      description: "Build a sophisticated AI chatbot using Gemini API to provide accurate, real-time query resolution with enhanced user experience.",
      accent: "accent-blue"
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Goals",
      description: "Achieve 50% higher query resolution accuracy compared to traditional chatbots with faster response times.",
      accent: "accent-purple"
    },
    {
      icon: <Users size={24} />,
      title: "Target Audience",
      description: "Students and professionals seeking quick, accurate answers in an intuitive, user-friendly interface.",
      accent: "accent-orange"
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: ["HTML5", "CSS3", "JavaScript ES6+"],
      description: "Modern web technologies for responsive and interactive UI",
      accent: "accent-blue"
    },
    {
      category: "AI Integration",
      technologies: ["Gemini API", "Natural Language Processing"],
      description: "Advanced AI capabilities for intelligent conversation",
      accent: "accent-purple"
    },
    {
      category: "Development Tools",
      technologies: ["VS Code", "Git", "Chrome DevTools"],
      description: "Professional development environment and version control",
      accent: "accent-green"
    }
  ];

  const achievements = [
    {
      metric: "50%",
      description: "Higher query resolution accuracy through advanced NLP",
      accent: "accent-blue"
    },
    {
      metric: "< 2s",
      description: "Average response time for complex queries",
      accent: "accent-purple"
    },
    {
      metric: "100%",
      description: "Browser compatibility across modern platforms",
      accent: "accent-orange"
    }
  ];

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero Section */}
      <section style={{ padding: "4rem 0", background: "var(--gradient-hero-subtle)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <h1 className="heading-hero">About SmartBot</h1>
            <p className="body-large" style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              SmartBot represents a breakthrough in AI-powered conversation technology, leveraging 
              the Gemini API to deliver exceptional accuracy and speed in query resolution.
            </p>
            <div className="hero-announcement">
              <Globe size={12} />
              <span>Browser-based AI Assistant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Objectives */}
      <section style={{ padding: "5rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="heading-1">Project Overview</h2>
            <p className="body-large" style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-secondary)" }}>
              Understanding the goals, target audience, and performance metrics that drive SmartBot's development
            </p>
          </div>
          
          <div className="voice-grid">
            {objectives.map((objective, index) => (
              <div key={index} className={`voice-card ${objective.accent} hover-lift`}>
                <div style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
                  {objective.icon}
                </div>
                <h3 className="heading-3">{objective.title}</h3>
                <p className="body-medium" style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section style={{ padding: "5rem 0", background: "var(--bg-section)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="heading-1">Technical Stack</h2>
            <p className="body-large" style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-secondary)" }}>
              Modern technologies and tools used to build SmartBot's robust architecture
            </p>
          </div>
          
          <div className="voice-grid">
            {techStack.map((tech, index) => (
              <div key={index} className={`voice-card ${tech.accent} hover-lift`}>
                <div style={{ marginBottom: "1rem" }}>
                  <Code size={24} color="var(--text-primary)" />
                </div>
                <h3 className="heading-3">{tech.category}</h3>
                <p className="body-medium" style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
                  {tech.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {tech.technologies.map((technology, techIndex) => (
                    <span 
                      key={techIndex}
                      className="font-mono"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.5rem",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.025em",
                        color: "var(--text-primary)"
                      }}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section style={{ padding: "5rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="heading-1">Key Achievements</h2>
            <p className="body-large" style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-secondary)" }}>
              Measurable improvements and performance metrics that showcase SmartBot's capabilities
            </p>
          </div>
          
          <div className="voice-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className={`voice-card ${achievement.accent} hover-lift`} style={{ textAlign: "center", padding: "2rem" }}>
                <div className="heading-hero" style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {achievement.metric}
                </div>
                <p className="body-medium" style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section style={{ padding: "5rem 0", background: "var(--bg-section)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="heading-1">Development Timeline</h2>
          </div>
          
          <div className="voice-grid">
            <div className="voice-card accent-blue hover-lift">
              <div style={{ marginBottom: "1rem" }}>
                <Clock size={24} color="var(--text-primary)" />
              </div>
              <h3 className="heading-3">Phase 1: Planning</h3>
              <p className="body-medium" style={{ color: "var(--text-secondary)" }}>
                Research and analysis of AI chatbot requirements, user needs assessment, and technical architecture design.
              </p>
            </div>
            
            <div className="voice-card accent-purple hover-lift">
              <div style={{ marginBottom: "1rem" }}>
                <Code size={24} color="var(--text-primary)" />
              </div>
              <h3 className="heading-3">Phase 2: Development</h3>
              <p className="body-medium" style={{ color: "var(--text-secondary)" }}>
                Frontend development with responsive design, Gemini API integration, and real-time chat functionality implementation.
              </p>
            </div>
            
            <div className="voice-card accent-orange hover-lift">
              <div style={{ marginBottom: "1rem" }}>
                <Zap size={24} color="var(--text-primary)" />
              </div>
              <h3 className="heading-3">Phase 3: Optimization</h3>
              <p className="body-medium" style={{ color: "var(--text-secondary)" }}>
                Performance optimization, accuracy improvements, and user experience enhancements based on testing results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;