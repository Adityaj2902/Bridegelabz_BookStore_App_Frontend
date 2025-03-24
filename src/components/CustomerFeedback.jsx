import React, { useState, useCallback, useMemo } from 'react';
import './CustomerFeedback.scss';

const CustomerFeedback = ({ bookId, reviews = [] }) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  const handleRatingClick = useCallback((rating) => {
    setUserRating(rating);
  }, []);
  
  const handleReviewSubmit = useCallback((e) => {
    e.preventDefault();
    // This would typically make an API call to submit the review
    alert(`Submitted review with rating: ${userRating} and text: ${reviewText}`);
    setUserRating(0);
    setReviewText('');
  }, [userRating, reviewText]);
  
  const handleTextChange = useCallback((e) => {
    setReviewText(e.target.value);
  }, []);
  
  // Helper function to render stars based on rating
  const renderStars = useCallback((rating, interactive = false) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        stars.push(
          <span 
            key={i} 
            className={`star ${i <= userRating ? 'filled' : 'empty'}`}
            onClick={() => handleRatingClick(i)}
          >
            ★
          </span>
        );
      } else {
        stars.push(
          <span 
            key={i} 
            className={`star ${i <= rating ? 'filled' : 'empty'}`}
          >
            ★
          </span>
        );
      }
    }
    
    return stars;
  }, [userRating, handleRatingClick]);
  
  // Memoize the reviews list rendering
  const reviewsList = useMemo(() => {
    if (reviews && reviews.length > 0) {
      return reviews.map(review => (
        <div key={review.id} className="review-item">
          <div className="reviewer-info">
            <div className="avatar">{review.user.id}</div>
            <div className="reviewer-name">{review.user.name}</div>
          </div>
          <div className="review-stars">
            {renderStars(review.rating)}
          </div>
          <p className="review-text">{review.comment}</p>
        </div>
      ));
    }
    
    return <p className="no-reviews">No reviews yet. Be the first to review!</p>;
  }, [reviews, renderStars]);
  
  return (
    <div className="customer-feedback">
      <h3 className="section-title">Customer Feedback</h3>
      
      <div className="rating-summary">
        <p className="rating-label">Overall rating</p>
        <div className="rating-input">
          {renderStars(0, true)}
        </div>
        
        <div className="review-input">
          <textarea 
            placeholder="Write your review" 
            value={reviewText}
            onChange={handleTextChange}
          />
          <button 
            className="submit-review"
            onClick={handleReviewSubmit}
            disabled={userRating === 0}
          >
            Submit
          </button>
        </div>
      </div>
      
      <div className="reviews-list">
        {reviewsList}
      </div>
    </div>
  );
};

export default React.memo(CustomerFeedback); 