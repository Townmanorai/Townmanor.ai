


import React, { useState, useEffect } from 'react';
import "../common.css";
import "../commonsecond.css";
import { useNavigate } from 'react-router-dom';
import FeaturedAgentForm from '../Form/FeaturedAgentForm';
import "./Property_right_Featured_agent.css"

// Update FeaturedRightAgents to fetch data from API
const FeaturedRightAgents = ({ agentIds, title, titleid }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); 

  const dummyAgent = [{
    id: 0,
    imageUrl: 'https://via.placeholder.com/150',
    nameSurname: 'John Doe',
    agentUrl: '#',
    address: 'Unknown',
    agentProfile: {
      activated: false,
      registrationDate: new Date(),
    },
    totalListingsNum: 0
  }];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://www.townmanor.ai/api/adsagents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        setError(error.message);
        setAgents([]); // Ensure it's an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    if (agentIds.length === 0) {
      // Use dummy data when agentIds is an empty array
      setAgents(dummyAgent);
      setLoading(false);
    } else {
      fetchAgents();
    }
  }, [agentIds]);

  // Convert agentIds to numbers for consistent comparison
  const numericAgentIds = agentIds.map(id => Number(id));

  // Filter agents based on the passed IDs
  const filteredAgents = agents.filter(agent => numericAgentIds.includes(agent.id));

  const handleListYourselfClick = () => {
    navigate('/featured-agent-form', { state: { title, titleid } });
  };

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

  return (
    <section className="explore-feature hp7 section-padding widget_edit_enabled pb-0 pt-0 pdp-feature-agent">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12 p-0">
            <h3 className="widget-title mt-4 mb-2">Featured Agents</h3>
          </div>
        </div>

        <div className="paginated_agents_scroll page-scroll">
          {loading ? (
            <div>Loading agents...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : filteredAgents.length > 0 ? (
            filteredAgents.map((item) => (
              <div key={item.id} className="product-wrap custom-padding">
                <div className="sellers_card">
                  <div className="card-body">
                    <div className="sellers_img">
                      <img src={item.imageUrl || ''} alt={item.nameSurname || ''} />
                    </div>
                    <div className="sellers_detail">
                      <div className="sellers_name_row">
                        <h4 className="seller_name_title">
                          <a href={item.agentUrl || '#'} title={item.nameSurname || ''}>
                            {item.nameSurname || ''}
                          </a>
                        </h4>
                        {item.agentProfile?.activated && (
                          <span className="seller_expert">Expert <b>Pro</b></span>
                        )}
                      </div>
                      <div className="seller_location">
                        <span>{item.address || ''}</span>
                      </div>
                      <div className="seller_exp_pro">
                        <span className="seller_exp">
                          <b>Reg:</b> {calculateRegistrationText(item.agentProfile?.registrationDate)} Ago
                        </span>
                        <span className="seller_property">
                          <b>{item.totalListingsNum || 0}</b> Properties
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{height:'100px',textAlign:'center'}}>No featured agents available.</div>
          )}

          <div className="list-featured-agent">
            <button onClick={handleListYourselfClick} className="btn-featured-agent">
              List yourself as a featured agent (2000 points)
            </button>
          </div>

          {showForm && <FeaturedAgentForm />}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRightAgents;
