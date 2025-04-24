import React, { useState } from "react";
import { FaRegComments } from "react-icons/fa";
import "./comment.css";

const CommentsComponent = ({ propertyName, propertyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    message: "",
    verificationCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setFormData({
      name: "",
      phone_number: "",
      message: "",
      verificationCode: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.verificationCode !== "062dc6") {
      alert("Invalid verification code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://www.townmanor.ai/api/formlead/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.phone_number,
          purpose: `comment at ${propertyName} (ID: ${propertyId})`,
          source: "property comment",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      alert("Comment submitted successfully!");
      handleClearForm();
    } catch (error) {
      alert("Error submitting comment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleNavigate = (url) => {
    navigate(url);
  };
  return (
    <div className="comments-container-wrap">
      <div className="comments-input-section">
        <div className="comments-header-block">
          <span className="comments-title-label">Comments & Reviews</span>
        </div>

        <form className="comments-form-area" onSubmit={handleSubmit}>
          <div className="input-name-email-line">
            <input
              type="text"
              className="input-name-style"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              className="input-phone-style"
              placeholder="Your phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              pattern="[0-9]+"
              required
            />
          </div>

          <textarea
            className="textarea-message-box"
            placeholder="Share your thoughts..."
            maxLength={1000}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <div className="code-verification-line">
            <span className="verification-code-box">062dc6</span>
            <input
              type="text"
              className="verification-input-field"
              placeholder="Enter verification code"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-control-buttons">
            <button
              type="button"
              className="reset-button-clear"
              onClick={handleClearForm}
            >
              Clear form
            </button>
            <button
              type="submit"
              className="comment-button-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit comment"}
            </button>
          </div>
        </form>
      </div>

      <div className="side-advert-column">
        <img
          src="/home.png"
          style={{
            width: "100%",
            cursor:'pointer'
          }}
          onClick={()=>{
            handleNavigate('https://townmanor.ai/homelane');
          }}
          alt="Advertisement"
        />
      </div>
    </div>
  );
};

export default CommentsComponent;
