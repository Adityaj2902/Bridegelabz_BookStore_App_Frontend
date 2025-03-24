import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageLoader from '../utils/useImageLoader';
import './BookCard.scss';

const BookCard = ({ book }) => {
  const { _id, bookName, author, rating, price, discountPrice, bookImage, outOfStock, reviews } = book;
  const navigate = useNavigate();
  
  // Use our custom image loader hook
  const { loading, currentSrc } = useImageLoader(bookImage, '/images/placeholder.svg');
  
  const handleClick = useCallback(() => {
    navigate(`/dashboard/book/${_id}`);
  }, [navigate, _id]);
  
  return (
    <div 
      className={`book-card ${outOfStock ? 'out-of-stock' : ''}`}
      onClick={handleClick}
    >
      <div className="book-image-container">
        <img 
          src={currentSrc} 
          alt={bookName} 
          className={`book-image ${loading ? 'loading' : ''}`} 
        />
        {outOfStock && <div className="stock-label">OUT OF STOCK</div>}
      </div>
      
      <div className="book-details">
        <h3 className="book-title">{bookName}</h3>
        <p className="book-author">by {author}</p>
        
        <div className="book-rating">
          <div className="rating-stars">
            <span className="star-value">{rating || 0}</span>
            <span className="star">★</span>
          </div>
          <span className="rating-count">({reviews || 0} reviews)</span>
        </div>
        
        <div className="book-price">
          <span className="current-price">Rs. {discountPrice || price}</span>
          {discountPrice && price > discountPrice && (
            <span className="original-price">Rs. {price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookCard); 