import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bot, Sparkles } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Bot size={20} />
            </div>
            <span>SmartBot</span>
          </Link>
          
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
              About
            </Link>
            <Link to="/demo" className={`nav-link ${isActive("/demo") ? "active" : ""}`}>
              Demo
            </Link>
            <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
              Contact
            </Link>
            <Link to="/demo" className="btn btn-primary">
              <Sparkles size={16} />
              Try Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;