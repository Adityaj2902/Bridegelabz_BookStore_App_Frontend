import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApiCall, signupApiCall } from '../utils/backend.api';
import './Auth.scss';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '' 
  });
  
  const toggleTab = useCallback((tab) => {
    setActiveTab(tab);
    setError('');
  }, []);

  const togglePasswordVisibility = useCallback((isLogin = false) => {
    if (isLogin) {
      setShowLoginPassword(prev => !prev);
    } else {
      setShowPassword(prev => !prev);
    }
  }, []);
  
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [id.replace('login', '').toLowerCase()]: value
    }));
  };
  
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupForm(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await loginApiCall(loginForm);
      
      if (response && response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Create payload with all possible field variations that the backend might expect
      const payload = {
        firstname: signupForm.firstName,
        lastname: signupForm.lastName,
        firstName: signupForm.firstName, // Include camelCase version as fallback
        lastName: signupForm.lastName,   // Include camelCase version as fallback
        email: signupForm.email,
        password: signupForm.password
      };
      
      const response = await signupApiCall(payload);
      
      // Check if we have any indication of success in the response
      if (response && response.status >= 200 && response.status < 300) {
        // If we got a successful HTTP status code
        let token = null;
        
        // Try to extract token from different possible response formats
        if (response.data && response.data.token) {
          token = response.data.token;
        } else if (response.data && response.data.user && response.data.user.token) {
          token = response.data.user.token;
        } else if (response.headers && response.headers.authorization) {
          token = response.headers.authorization.replace('Bearer ', '');
        }
        
        if (token) {
          localStorage.setItem('authToken', token);
        } else {
          // Even without a token, registration was successful - proceed to login
          setActiveTab('login');
          setError('Registration successful! Please login with your credentials.');
          setLoading(false);
          return;
        }
        
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to register. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
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
          
          {error && <div className="error-message">{error}</div>}
          
          {activeTab === 'login' ? (
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email Id</label>
                <input 
                  type="email" 
                  id="loginEmail"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showLoginPassword ? "text" : "password"} 
                    id="loginPassword"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button 
                    type="button"
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility(true)}
                  >
                    {showLoginPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form className="signup-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="Enter first name"
                  value={signupForm.firstName}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="Enter last name"
                  value={signupForm.lastName}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Id</label>
                <input 
                  type="email" 
                  id="email"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                  />
                  <button 
                    type="button"
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility()}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Signing Up...' : 'Signup'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Auth);