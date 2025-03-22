import React from 'react';
import './BookCard.scss';

const BookCard = ({ book }) => {
  const { title, author, rating, price, originalPrice, image, outOfStock } = book;
  
  return (
    <div className={`book-card ${outOfStock ? 'out-of-stock' : ''}`}>
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
          <span className="rating-count">({book.reviews} reviews)</span>
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