import React, { useState } from 'react';
import './CustomerFeedback.scss';

const CustomerFeedback = ({ bookId, reviews = [] }) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // This would typically make an API call to submit the review
    alert(`Submitted review with rating: ${userRating} and text: ${reviewText}`);
    setUserRating(0);
    setReviewText('');
  };
  
  // Helper function to render stars based on rating
  const renderStars = (rating, interactive = false) => {
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
  };
  
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
            onChange={(e) => setReviewText(e.target.value)}
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
        {reviews && reviews.length > 0 ? (
          reviews.map(review => (
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
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default CustomerFeedback; 