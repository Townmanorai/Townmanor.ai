import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Writereview.css';

const WriteReview = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating && review && agreeToTerms) {
      // Here you would typically send the data to your backend
      console.log({
        rating,
        review,
        agreeToTerms
      });
      // You could also show a success message or redirect
      alert('Review submitted successfully!');
    } else {
      alert('Please complete all required fields');
    }
  };

  return (
    <div className="ra-review-container">
      <div className="ra-review-form-container">
        <div className="rating-container">
          <div className="ra-rating-label">Rate your experience</div>
          <div className="ra-stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                type="button"
                className={`ra-star-button ${star <= rating ? 'active' : ''}`}
                onClick={() => handleRatingClick(star)}
              >
                <FaStar />
              </button>
            ))}
          </div>
        </div>
        
        <form className="ra-review-form" onSubmit={handleSubmit}>
          <div className="ra-form-group">
            <label className="ra-form-label">Your Review</label>
            <textarea 
              rows="6" 
              className="ra-form-textarea"
              placeholder="Tell us about your experience in detail..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="ra-terms-container">
            <div className="ra-checkbox-wrapper">
              <input 
                type="checkbox" 
                className="ra-form-checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
            </div>
            <div className="ra-terms-text">
              <label className="ra-terms-label">I agree to the review guidelines</label>
              <p className="ra-terms-description">By submitting this review, you agree to our terms of service and privacy policy.</p>
            </div>
          </div>
          
          <button type="submit" className="ra-submit-button">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
