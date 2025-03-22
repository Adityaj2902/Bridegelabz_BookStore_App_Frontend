import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.scss';

const BookCard = ({ book }) => {
  const { id, title, author, rating, price, originalPrice, image, outOfStock, reviews } = book;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/book/${id}`);
  };
  
  return (
    <div 
      className={`book-card ${outOfStock ? 'out-of-stock' : ''}`}
      onClick={handleClick}
    >
      <div className="book-image-container">
        <img src={image} alt={title} className="book-image" />
        {outOfStock && <div className="stock-label">OUT OF STOCK</div>}
      </div>
      
      <div className="book-details">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">by {author}</p>
        
        <div className="book-rating">
          <div className="rating-stars">
            <span className="star-value">{rating}</span>
            <span className="star">★</span>
          </div>
          <span className="rating-count">({reviews} reviews)</span>
        </div>
        
        <div className="book-price">
          <span className="current-price">Rs. {price}</span>
          {originalPrice && (
            <span className="original-price">Rs. {originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard; 