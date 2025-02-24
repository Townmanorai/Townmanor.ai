import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Button,
} from "react-bootstrap";
import Rating from "react-rating-stars-component";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaSms,
  FaEnvelope,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Profile.css";

import FeedbackForm from "../FeedbackForm/FeedbackForm";
import AppointmentForm from "../ContactForm/AppointmentForm";
import ChatForm from "../ContactForm/ChatForm";

const Profile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState();
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(4.2); // Mocked average rating
  const [ratingCount, setRatingCount] = useState(50); // Mocked rating count
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const openChatPopup = () => setIsChatOpen(true);
  const closeChatPopup = () => setIsChatOpen(false);

  const openAppointmentPopup = () => setIsAppointmentOpen(true);
  const closeAppointmentPopup = () => setIsAppointmentOpen(false);

  const handleChatSubmit = (data) => {
    console.log(data);
    closeChatPopup(); // Close the chat popup after form submission
  };

  const recentDeals = [
    {
      name: "Bhutani Etherea",
      location: "Expressway Zone I, Noida",
      imageUrl: "/Bhutani.jpg",
    },
    {
      name: "Ithum 73 Luxe Cabins",
      location: "Noida East, Noida",
      imageUrl: "/ithums.jpeg",
    },
    {
      name: "Oasis GrandStand",
      location: "Yamuna Expressway, Noida",
      imageUrl: "/oasis.jpeg",
    },
    {
      name: "iThum 73 Hypermarket",
      location: "Noida East, Noida",
      imageUrl: "/ithums.jpeg",
    },
    {
      name: "Godrej Green Estate",
      location: "Sonipat South, Sonipat",
      imageUrl: "/godej.webp",
    },
  ];

  useEffect(() => {
    // Fetch agent data by ID (mocked here, replace with actual data fetch)
    fetch(`http://localhost:3030/agents/${id}`)
      .then((response) => response.json())
      .then((data) => setAgent(data))
      .catch((error) => console.error("Error fetching agent:", error));
  }, [id]);

  const handleRating = (newRating) => {
    setRating(newRating);
    // Optionally, send the rating to the server or perform other actions
  };

  const handleShare = (platform) => {
    const url = window.location.href; // Get the current URL
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "instagram":
        // Instagram does not have a direct share URL
        alert(
          "Instagram sharing is not supported directly. Copy the URL and share it manually."
        );
        return;
      case "sms":
        shareUrl = `sms:?body=${encodeURIComponent(url)}`;
        break;
      case "email":
        shareUrl = `mailto:?body=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard
          .writeText(url)
          .then(() => {
            setShareLinkCopied(true);
            toast.success("URL Copied");
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  if (!agent) return <p>Loading...</p>;

  const starDescriptions = [
    "Terrible 😡",
    "Bad 😞",
    "Okay 😐",
    "Good 🙂",
    "Excellent 😍",
  ];

  return (
    <Container className="mt-5">
      <Card className="cardcss">
        <Card.Body className="card-content ">
          <div className="mt-4">
            <img
              src={`https://www.townmanor.ai/api/images/` + agent.imageUrl}
              className="agent-image"
              alt="Agent"
            />
          </div>
          <div className="card-body-contents">
            <div className="rating-section ">
              <Card.Title>{agent.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <i className="bi bi-geo-alt"></i> {agent.sector}, {agent.city}
              </Card.Subtitle>
              <Card.Text>
                <div>
                  <span>
                    <strong>1000 Deals Closed</strong>
                  </span>
                  <span className="ml-3">
                    <strong>7 Enquiries</strong>
                  </span>
                </div>
                <div>
                  <strong>{agent.transactions} Total Transactions</strong>
                </div>
              </Card.Text>
              <div className="sharecss">
                <div
                  className=""
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <FaShareAlt />
                </div>
              </div>
              {showShareOptions && (
        <div className="share-options">
          <div className="share-option mb-1" onClick={() => handleShare("whatsapp")}>
            <FaWhatsapp className="fab" /> Whatsapp
          </div>
          <div className="share-option mb-1" onClick={() => handleShare("facebook")}>
            <FaFacebook className="fab" /> FaceBook
          </div>
          <div className="share-option mb-1" onClick={() => handleShare("instagram")}>
            <FaInstagram className="fab" /> Instagram
          </div>
          <div className="share-option mb-1" onClick={() => handleShare("sms")}>
            <FaSms className="fab" /> SMS
          </div>
          <div className="share-option mb-1" onClick={() => handleShare("email")}>
            <FaEnvelope className="fab" /> Email
          </div>
          <div className="share-option mb-1" onClick={() => handleShare("copy")}>
            <FaCopy className="fab" /> Copy
          </div>
        </div>
      )}
            </div>
            <div className="rating-section">
              <div className="rating-stars">
                <Rating
                  count={5}
                  value={averageRating}
                  size={22}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false}
                />
              </div>
              <p className="">
                {starDescriptions[Math.round(averageRating) - 1]}
              </p>
              <p className="mt-2">
                Average Rating: <strong>{averageRating.toFixed(1)}</strong> (
                {ratingCount} ratings)
              </p>
            </div>
            
            <div className="">
              <button
                className="btn btn-success hello2"
                // id="hello2"
                onClick={openAppointmentPopup}
              >
                <i class="fa fa-phone" aria-hidden="true"></i> Contact Me
              </button>
              <Popup
                open={isAppointmentOpen}
                closeOnDocumentClick
                onClose={closeAppointmentPopup}
                modal
                nested
              >
                <div>
                  <style>
                    {`
              .popup-content {
                margin: auto !important;
                background: transparent !important;
                width: auto !important;
                padding: 0 !important;
                border: none !important;
              }
            `}
                  </style>
                  <div className="mt-2 popup-content">
                    <AppointmentForm
                      agent={agent}
                      onSubmit={handleChatSubmit}
                      onClose={closeAppointmentPopup}
                    />
                  </div>
                </div>
              </Popup>

              <button className="btn btn-primary hello3" 
              // id='hello3' 
              onClick={openChatPopup}><i className="fab fa-whatsapp"></i> WhatsApp</button>
      <Popup
        open={isChatOpen}
        closeOnDocumentClick
        onClose={closeChatPopup}
        modal
        nested
      >
        <div>
          <style>
            {`
              .popup-content {
                margin: auto !important;
                background: transparent !important;
                width: auto !important;
                padding: 0 !important;
                border: none !important;
              }
            `}
          </style>
          <div className="mt-2 popup-content">
            <ChatForm agent={agent} onSubmit={handleChatSubmit} onClose={closeChatPopup} />
          </div>
        </div>
      </Popup>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
        <Row className="temp">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="details">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="recent-deals">Recent Deals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <ListGroup className="list-group-flush">
                  <ListGroupItem variant="info">
                    <strong>Shri Ram Real Estate</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>{agent.experience} Years of Experience</strong>
                  </ListGroupItem>
                  <ListGroupItem variant="info">
                    <strong>
                      Has {agent.teammember} Employees working with him
                    </strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>RERA No. {agent.reraRegnNo || ""}</strong>
                  </ListGroupItem>
                  <ListGroupItem variant="info">
                    <strong>
                      Deals in Rent/Lease , Pre-launch , Original Booking ,
                      Resale , Others
                    </strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Operating since: 2008</strong>
                  </ListGroupItem>
                  <ListGroupItem variant="info">
                    <strong>Speaks {agent.languages}</strong>
                  </ListGroupItem>
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="details">
                <Card.Body>
                  <Card.Title>About</Card.Title>
                  <p className="mt-4">{agent.about}</p>
                </Card.Body>
              </Tab.Pane>
              <Tab.Pane eventKey="recent-deals">
                <Card.Body>
                  <Card.Title>Recent Deals</Card.Title>
                  <Row className="mt-4">
                    {recentDeals.map((deal, index) => (
                      <Col sm={6} md={4} lg={4} key={index} className="mb-3">
                        <Card className="card-deal">
                          <Card.Img variant="top" src={deal.imageUrl} />
                          <Card.Body>
                            <Card.Title className="card-deal-title">
                              {deal.name}
                            </Card.Title>
                            <Card.Text className="card-deal-text">
                              {deal.location}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Tab.Pane>
              <Tab.Pane eventKey="reviews">
                <Card.Body>
                  <Card.Title></Card.Title>
                  <div className="rating-section">
                    <div className="rating-stars">
                      <Rating
                        count={5}
                        value={averageRating}
                        size={36}
                        activeColor="#ffd700"
                        isHalf={true}
                        edit={false}
                      />
                      <div className="">
                        {starDescriptions[Math.round(averageRating) - 1]}
                      </div>
                    </div>
                    <p className="mt-2">
                      Average Rating:{" "}
                      <strong>{averageRating.toFixed(1)}</strong> ({ratingCount}{" "}
                      ratings)
                    </p>

                    <Popup
                      trigger={
                        <button className="btn btn-primary mt-2">
                          Write a Review
                        </button>
                      }
                      position="right center"
                      modal
                      nested
                    >
                      <div className="mt-2">
                        <FeedbackForm />
                      </div>
                    </Popup>

                    {/* Dummy Review Content */}
                    <div className="mt-4 border border-success p-2 mb-2 border-opacity-25">
                      <h5>John Doe</h5>
                      <p>
                        This agent is highly professional and very knowledgeable
                        about the market. Helped me find the perfect home!
                      </p>
                      <div className="rating-stars">
                        <Rating
                          count={5}
                          value={5}
                          size={24}
                          activeColor="#ffd700"
                          isHalf={false}
                          edit={false}
                        />
                      </div>
                    </div>
                    <div className="mt-4 border border-success p-2 mb-2 border-opacity-25">
                      <h5>Jane Smith</h5>
                      <p>
                        I had a wonderful experience working with this agent.
                        Highly recommended!
                      </p>
                      <div className="rating-stars">
                        <Rating
                          count={5}
                          value={4}
                          size={24}
                          activeColor="#ffd700"
                          isHalf={false}
                          edit={false}
                        />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Tab.Pane>
            </Tab.Content>  
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
