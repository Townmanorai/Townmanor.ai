import React, { useState } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./FeedbackForm.css"; // Custom CSS for styling

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [review, setReview] = useState("");

  const options = [
    "Polite, courteous & professional",
    "Answered all my queries to my satisfaction",
    "Clear communication/ Good listening skills",
    "Other/ Reason not listed",
  ];

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = { rating, selectedOptions, review };

    try {
      const response = await axios.post("http://localhost:3030/feedback", feedbackData);
      alert("Feedback submitted successfully");
      setRating(0);
      setSelectedOptions([]);
      setReview("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <Container className="feedback-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Overall rating</Form.Label>
          <Rating
            count={5}
            value={rating}
            onChange={setRating}
            size={36}
            activeColor="#ffd700"
            className="rating-stars"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>What you liked?</Form.Label>
          {options.map((option, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="form-check"
            />
          ))}
        </Form.Group>

        <Form.Group>
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="review-textarea"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FeedbackForm;
