import React from 'react';


import "../common.css";
import "../commonsecond.css";


// Dummy JSON data to simulate the agents
const dummyAgentsData = [
  {
    id: 1,
    imageUrl: 'path/to/agent1.jpg',
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
    imageUrl: 'path/to/agent2.jpg',
    nameSurname: 'Jane Smith',
    agentUrl: '/agent/jane-smith',
    address: '456 Oak St, City',
    agentProfile: {
      activated: false,
      registrationDate: '2020-01-22',
    },
    totalListingsNum: 5,
  },
  // Add more agents as needed
];

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

const FeaturedRightAgents = () => {
  return (
    <section className="explore-feature hp7 section-padding widget_edit_enabled pb-0 pt-0 pdp-feature-agent">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12 p-0">
            <h3 className="widget-title mt-4 mb-2">Featured Agents</h3>
          </div>
        </div>

        <div className="paginated_agents_scroll">
          {dummyAgentsData.map((item) => (
            <div key={item.id} className="product-wrap">
              <div className="sellers_card">
                <div className="card-body">
                  <div className="sellers_img">
                    <img
                      src={item.imageUrl}
                      alt={item.nameSurname}
                    />
                  </div>
                  <div className="sellers_detail">
                    <div className="sellers_name_row">
                      <h4 className="seller_name_title">
                        <a href={item.agentUrl} title={item.nameSurname}>
                          {item.nameSurname}
                        </a>
                      </h4>
                      {item.agentProfile.activated && (
                        <span className="seller_expert">Expert <b>Pro</b></span>
                      )}
                    </div>
                    <div className="seller_location">
                      <span>{item.address}</span>
                    </div>
                    <div className="seller_exp_pro">
                      <span className="seller_exp">
                        <b>Reg:</b> {calculateRegistrationText(item.agentProfile.registrationDate)} Ago
                      </span>
                      <span className="seller_property">
                        <b>{item.totalListingsNum}</b> Properties
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRightAgents;