import React, { useState } from 'react';
import './Auth.scss';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const togglePasswordVisibility = (isLogin = false) => {
    if (isLogin) {
      setShowLoginPassword(!showLoginPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="left-panel">
          <div className="image-container">
            <img src="/shopping-cart-girl.svg" alt="Book shopping" />
          </div>
          <h2 className="title">ONLINE BOOK SHOPPING</h2>
        </div>
        
        <div className="right-panel">
          <div className="tab-container">
            <button 
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => toggleTab('login')}
            >
              LOGIN
            </button>
            <button 
              className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`} 
              onClick={() => toggleTab('signup')}
            >
              SIGNUP
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="loginEmail">Email Id</label>
                <input 
                  type="email" 
                  id="loginEmail" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showLoginPassword ? "text" : "password"} 
                    id="loginPassword" 
                  />
                  <button 
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility(true)}
                  >
                    {showLoginPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              <button className="signup-button">
                Login
              </button>
            </div>
          ) : (
            <div className="signup-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="Enter full name" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Id</label>
                <input 
                  type="email" 
                  id="email" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                  />
                  <button 
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility()}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input 
                  type="tel" 
                  id="mobileNumber" 
                />
              </div>
              
              <button className="signup-button">
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth; 