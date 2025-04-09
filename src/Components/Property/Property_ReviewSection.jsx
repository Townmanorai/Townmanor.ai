import React, { useState } from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";
import "./Property_ReviewSection.css"; // Import the new CSS file
import { FaStar, FaRegStar } from 'react-icons/fa';

// Dummy JSON data
const data = {
  settingsReviewsEnabled: true,
  settingsReviewsPublicVisibleEnabled: true,
  notLogged: [],
  reviewsAll: [
    {
      imageUserFilename: "user1.png",
      nameSurname: "John Doe",
      stars: 4,
      datePublish: "2024-09-11",
      message: "Great place to stay!",
      isVisible: true
    }
  ],
  reviewsSubmitted: 0,
  reviewsValidationErrors: '',
  estateDataAddress: "",
  estateDataGPS: ""
};

const PropertyReviewSection = () => {
  const [reviewMessage, setReviewMessage] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  // Handle review message change
  const handleReviewMessageChange = (e) => {
    setReviewMessage(e.target.value);
  };

  // Handle star rating selection
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    document.getElementById('review_star_input').value = rating;
  };

  return (
    data.settingsReviewsEnabled ? (
      <div className="comments-dv widget-reviews" id="form_review">
        <h3>Reviews</h3>
        <div className="comment-section">
          {data.settingsReviewsPublicVisibleEnabled ? (
            data.notLogged.length > 0 && !data.settingsReviewsPublicVisibleEnabled ? (
              <div className="content-box">
                <p className="alert alert-success">
                  Login to read reviews
                </p>
              </div>
            ) : (
              data.reviewsAll.length > 0 ? (
                <ul className="list-reviews">
                  {data.reviewsAll.map((review, index) => (
                    <li key={index}>
                      <div className="cm-info-sec">
                        <div className="cm-img">
                          <div className="user-logo">
                            <img
                              src={review.imageUserFilename ? `files/thumbnail/${review.imageUserFilename}` : 'assets/img/user-agent.png'}
                              alt={review.nameSurname}
                            />
                          </div>
                        </div>
                        <div className="cm-info">
                          <ul className="rating-lst">
                            {[...Array(5)].map((_, i) => (
                              <li key={i}>
                                {i < review.stars ? (
                                  <FaStar className="star-icon active" />
                                ) : (
                                  <FaRegStar className="star-icon inactive" />
                                )}
                              </li>
                            ))}
                          </ul>
                          <h3 className="mb-0">{review.nameSurname}</h3>
                          <h4>
                            {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(review.datePublish))} {new Date(review.datePublish).getDate()}, {new Date(review.datePublish).getFullYear()}
                          </h4>
                        </div>
                      </div>
                      <p>
                        {review.isVisible ? review.message : 'Hidden by admin'}
                      </p>
                      {data.reviewsSubmitted === 0 && (
                        <a
                          href="#form_review_reply"
                          title="Reply"
                          className={`cm-reply ${data.notLogged.length > 0 ? 'login_popup_enabled' : ''}`}
                        >
                          Reply
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="content-box">
                  <p className="alert alert-success">
                    Submit the first review
                  </p>
                </div>
              )
            )
          ) : null}
        </div>

        <div className="review-hd">
          {data.reviewsSubmitted === 0 && (
            <div className="rev-hd clearfix">
              <h3>Write a Review</h3>
              <div className={`form-group-rating rating-lst ${data.notLogged.length > 0 ? 'login_popup_enabled' : ''}`}>
                <input type="radio" name="stars" value="" className="hidden" checked="checked" />
                <div className="rating-action rating" required>
                  {[5, 4, 3, 2, 1].map(star => (
                    <span 
                      key={star} 
                      onClick={() => handleStarClick(star)}
                      style={{ cursor: 'pointer', marginRight: '5px' }}
                    >
                      {star <= selectedRating ? (
                        <FaStar className="star-icon active" size={24} />
                      ) : (
                        <FaRegStar className="star-icon inactive" size={24} />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {data.notLogged.length > 0 ? (
            <p className="alert alert-success">
              Please <a href="{front_login_url}#content" className="login_popup_enabled">login</a> or <a href="{front_login_url}#content">register</a> to write your review
            </p>
          ) : (
            data.reviewsSubmitted === 0 && (
              <div className="post-comment-sec">
                <form action="{page_current_url}#form_review" method="post" id="form_review_reply" className="review-form">
                  {data.reviewsValidationErrors && (
                    <div className="errors">{data.reviewsValidationErrors}</div>
                  )}
                  <input type="text" name="stars" value="" id="review_star_input" className="hidden" />
                  <div className="form-field">
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Help others to choose the perfect place"
                      value={reviewMessage}
                      onChange={handleReviewMessageChange}
                    />
                  </div>
                  <div className="clearfix">
                    <button type="submit" className="btn-default">Submit Review</button>
                  </div>
                </form>
              </div>
            )
          )}
          {data.reviewsSubmitted > 0 && (
            <>
              <div className="clearfix"></div>
              <p className="alert alert-info">
                Thanks for your review!
              </p>
            </>
          )}
        </div>
      </div>
    ) : null
  );
};

export default PropertyReviewSection;
