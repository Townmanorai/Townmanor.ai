import React, { useState } from 'react';
import './AgentCard.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ChatForm from '../ContactForm/ChatForm';
import AppointmentForm from '../ContactForm/AppointmentForm';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AgentCard({ agent }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/agent/${agent.id}`);
  };

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

  const handleAppointmentSubmit = (data) => {
    console.log(data);
    closeAppointmentPopup(); // Close the appointment popup after form submission
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="agent-card">
        <span className="image-wrapper">
          <img src={`https://www.townmanor.ai/api/images/` + agent.imageUrl} alt={agent.name} className="agent-images" onClick={handleClick} />
        </span>
        <span className="head2" onClick={handleClick}>{agent.name}</span>
        <br />
        <div className="data">
          {agent.city && agent.sector && (
            <span id="content">{agent.city} - {agent.sector}</span>
          )}
          {agent.experience && (
            <span id="content">Experience: {agent.experience} years</span>
          )}
          <div>
            {agent.listings && (
              <span id="content">Listings: {agent.listings}</span>
            )}
            {agent.languages && (
              <span id="content">Languages: {agent.languages}</span>
            )}
          </div>
          <div>
            {agent.transactions && (
              <span id="content">Verified Transactions: {agent.transactions}</span>
            )}
          </div>
        </div>
        <br />
        <br />

        {/* <button className="btn btn-primary" id="hello3" onClick={openChatPopup}>
          <i className="fab fa-whatsapp"></i> WhatsApp
        </button> */}
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

        {/* <button className="btn btn-success" id="hello2" onClick={openAppointmentPopup}>Book an Appointment</button> */}
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
              <AppointmentForm agent={agent} onSubmit={handleAppointmentSubmit} onClose={closeAppointmentPopup} />
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default AgentCard;
