import React from "react";
import { FaRegComments } from "react-icons/fa";
import "./comment.css";

const CommentsComponent = () => {
  return (
    <div className="comments-container-wrap">
      <div className="comments-input-section">
        <div className="comments-header-block">
          <span className="comments-title-label">Comments & Reviews</span>
          <button className="comments-total-button">24 comments</button>
        </div>

        <form className="comments-form-area">
          <div className="input-name-email-line">
            <input
              type="text"
              className="input-name-style"
              placeholder="Your name"
            />
            <input
              type="email"
              className="input-email-style"
              placeholder="Your email"
            />
          </div>

          <textarea
            className="textarea-message-box"
            placeholder="Share your thoughts..."
            maxLength={1000}
          ></textarea>

          <div className="code-verification-line">
            <span className="verification-code-box">062dc6</span>
            <input
              type="text"
              className="verification-input-field"
              placeholder="Enter verification code"
            />
          </div>

          <div className="form-control-buttons">
            <button type="button" className="reset-button-clear">
              Clear form
            </button>
            <button type="submit" className="comment-button-submit">
              Submit comment
            </button>
          </div>
        </form>
      </div>

      <div className="side-advert-column">
       
            <img src="/home.png" style={{
                width:'100%'
            }}></img>
         
      </div>
    </div>
  );
};

export default CommentsComponent;
