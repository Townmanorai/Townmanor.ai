import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AgentOnSpotLight.css";
import FeaturedAgentForm from '../Form/FeaturedAgentForm';


// Dummy JSON data to simulate the agents
const dummyAgentsData = [
    {
        id: 1,
        imageUrl: '/112x89celebration_navratri_deity_23_2151219997.jpg',
        nameSurname: 'John Doe',
        agentUrl: '/agent/john-doe',
        address: '123 Main St, City',
        agentProfile: {
          activated: true,
          registrationDate: '2018-04-15',
        },
        totalListingsNum: 10,
      },
      {
        id: 2,
        imageUrl: '/112x89celebration_deity_navratri.jpg',
        nameSurname: 'Jane Smith',
        agentUrl: '/agent/jane-smith',
        address: '456 Oak St, City',
        agentProfile: {
          activated: false,
          registrationDate: '2020-01-22',
        },
        totalListingsNum: 5,
      },
      {
        id: 3,
        imageUrl: '/112x89celebration_deity_navratri_1.jpg',
        nameSurname: 'John Doe',
        agentUrl: '/agent/john-doe',
        address: '123 Main St, City',
        agentProfile: {
          activated: true,
          registrationDate: '2018-04-15',
        },
        totalListingsNum: 10,
      },
      {
        id: 4,
        imageUrl: '/112x89celebration_navratri_deity_1.jpg',
        nameSurname: 'Jane Smith',
        agentUrl: '/agent/jane-smith',
        address: '456 Oak St, City',
        agentProfile: {
          activated: false,
          registrationDate: '2020-01-22',
        },
        totalListingsNum: 5,
      },
      {
        id: 5,
        imageUrl: '/cm-img2.webp',
        nameSurname: 'John Doe',
        agentUrl: '/agent/john-doe',
        address: '123 Main St, City',
        agentProfile: {
          activated: true,
          registrationDate: '2018-04-15',
        },
        totalListingsNum: 10,
      },
      {
        id: 6,
        imageUrl: '/cm-img1.webp',
        nameSurname: 'Jane Smith',
        agentUrl: '/agent/jane-smith',
        address: '456 Oak St, City',
        agentProfile: {
          activated: false,
          registrationDate: '2020-01-22',
        },
        totalListingsNum: 5,
      }
  // Add more agents as needed
];

// Utility function to calculate registration text
const calculateRegistrationText = (registrationDate) => {
    const oldDate = new Date(registrationDate);
    const now = new Date();
    const diffYears = now.getFullYear() - oldDate.getFullYear();
    const diffMonths = now.getMonth() - oldDate.getMonth();
    const diffDays = now.getDate() - oldDate.getDate();
  
    if (diffYears > 0) {
      return `${diffYears} Year${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} Month${diffMonths > 1 ? 's' : ''}`;
    } else {
      return `${diffDays > 0 ? diffDays : 1} Day${diffDays > 1 ? 's' : ''}`;
    }
  };
  
  // Update AgentOnSpotLight to accept agent IDs
  const AgentOnSpotLight = ({ agentIds }) => {

    const navigate = useNavigate(); 
    const [showForm, setShowForm] = useState(false);

    const numericAgentIds = agentIds.map(id => Number(id));
    const filteredAgents = dummyAgentsData.filter(agent => numericAgentIds.includes(agent.id));

    const handleListYourselfClick = () => {
      // setShowForm(!showForm); // Show the form when the button is clicked
      navigate('/featured-agent-form');
    };
  
    return (
      <section className="agent-spotlight-new">
        <h3 className="widget-title-new">Agents on Spotlight</h3>
        <div className="agents-list-new">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <div key={agent.id} className="agent-card-new">
                <div className="agent-image-new">
                  <img src={agent.imageUrl} alt={agent.nameSurname} />
                </div>
                <div className="agent-info-new">
                  <h4 className="agent-name-new">
                    <a href={agent.agentUrl} title={agent.nameSurname}>
                      {agent.nameSurname}
                    </a>
                  </h4>
                  <p className="agent-address-new">{agent.address}</p>
                  <p className="agent-registration-new">
                    <b>Registered:</b> {calculateRegistrationText(agent.agentProfile.registrationDate)} ago
                  </p>
                  <p className="agent-listings-new">
                    <b>{agent.totalListingsNum}</b> Listings
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No agents available in spotlight.</div>
          )}

        <div className="list-featured-agent">
          <button onClick={handleListYourselfClick} className="btn-featured-agent">
            List yourself as a Agent on SpotLight (5000 points)
          </button>
        </div>

        {/* Display the form if the button is clicked */}
        {/* {showForm && <FeaturedAgentForm />} */}
        </div>
      </section>
    );
  };
  
  export default AgentOnSpotLight;