import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import './Navbar.scss';

const Navbar = () => {
  const { cart } = useBookContext();
  
  // Memoize the cart item count calculation
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <span className="book-icon">📚</span>
          <span className="brand-name">Bookstore</span>
        </Link>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        
        <div className="nav-actions">
          <Link to="/dashboard/profile" className="nav-link">
            <span className="profile-icon">👤</span>
            <span className="profile-text">Poonam</span>
          </Link>
          
          <Link to="/dashboard/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar); 