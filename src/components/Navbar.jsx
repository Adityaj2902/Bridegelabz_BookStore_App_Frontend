import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo">
          <span className="book-icon">📚</span>
          <span className="brand-name">Bookstore</span>
        </div>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
        />
      </div>
      <div className="navbar-actions">
        <div className="action-item">
          <button className="icon-button">
            <span className="icon">👤</span>
            <span className="label">Profile</span>
          </button>
        </div>
        <div className="action-item">
          <button className="icon-button">
            <span className="icon">🛒</span>
            <span className="label">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 