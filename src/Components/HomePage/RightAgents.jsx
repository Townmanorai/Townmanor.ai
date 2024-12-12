import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "./RightAgents.css";
import "../common.css";
import "../commonsecond.css";

const RightAgents = () => {
  // Dummy data to simulate the API response
  const dummyAgentsData = [
    {
      image_url: './112x89celebration_deity_navratri.jpg',
      name_surname: 'Neha',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2020-01-01',
      },
      address: 'New York, USA',
      total_listings_num: 5,
    },
    {
      image_url: './112x89celebration_deity_navratri_1.jpg',
      name_surname: 'Rohini',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: false,
        registration_date: '2022-06-15',
      },
      address: 'Los Angeles, USA',
      total_listings_num: 10,
    },
    {
      image_url: './112x89celebration_navratri_deity_1.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2019-09-20',
      },
      address: 'Chicago, USA',
      total_listings_num: 3,
    },
    {
      image_url: './112x89celebration_navratri_deity_23_2151219997.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2021-12-01',
      },
      address: 'San Francisco, USA',
      total_listings_num: 7,
    },
    {
      image_url: './112x89celebration_deity_navratri.jpg',
      name_surname: 'Neha',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2020-01-01',
      },
      address: 'New York, USA',
      total_listings_num: 5,
    },
    {
      image_url: './112x89celebration_deity_navratri_1.jpg',
      name_surname: 'Rohini',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: false,
        registration_date: '2022-06-15',
      },
      address: 'Los Angeles, USA',
      total_listings_num: 10,
    },
    {
      image_url: './112x89celebration_navratri_deity_1.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2019-09-20',
      },
      address: 'Chicago, USA',
      total_listings_num: 3,
    },
    {
      image_url: './112x89celebration_navratri_deity_23_2151219997.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2021-12-01',
      },
      address: 'San Francisco, USA',
      total_listings_num: 7,
    },
    {
      image_url: './112x89celebration_deity_navratri.jpg',
      name_surname: 'Neha',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2020-01-01',
      },
      address: 'New York, USA',
      total_listings_num: 5,
    },
    {
      image_url: './112x89celebration_deity_navratri_1.jpg',
      name_surname: 'Rohini',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: false,
        registration_date: '2022-06-15',
      },
      address: 'Los Angeles, USA',
      total_listings_num: 10,
    },
    {
      image_url: './112x89celebration_navratri_deity_1.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2019-09-20',
      },
      address: 'Chicago, USA',
      total_listings_num: 3,
    },
    {
      image_url: './112x89celebration_navratri_deity_23_2151219997.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2021-12-01',
      },
      address: 'San Francisco, USA',
      total_listings_num: 7,
    },
    {
      image_url: './112x89celebration_deity_navratri.jpg',
      name_surname: 'Neha',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2020-01-01',
      },
      address: 'New York, USA',
      total_listings_num: 5,
    },
    {
      image_url: './112x89celebration_deity_navratri_1.jpg',
      name_surname: 'Rohini',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: false,
        registration_date: '2022-06-15',
      },
      address: 'Los Angeles, USA',
      total_listings_num: 10,
    },
    {
      image_url: './112x89celebration_navratri_deity_1.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2019-09-20',
      },
      address: 'Chicago, USA',
      total_listings_num: 3,
    },
    {
      image_url: './112x89celebration_navratri_deity_23_2151219997.jpg',
      name_surname: 'HArshita',
      agent_url: '#',
      agent_profile: {
        type: 'USER',
        activated: true,
        registration_date: '2021-12-01',
      },
      address: 'San Francisco, USA',
      total_listings_num: 7,
    },
  ];

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgentsData();
  }, []);

  const fetchAgentsData = () => {
    const paginated_agentsUser = dummyAgentsData.filter(
      (agent) => agent.agent_profile.type === 'USER'
    );
    setAgents(paginated_agentsUser);
  };

  const calculateRegistrationDate = (registrationDate) => {
    const oldDate = new Date(registrationDate);
    const now = new Date();
    const gap = new Date(now - oldDate);
    const years = gap.getUTCFullYear() - 1970;
    const months = gap.getUTCMonth();
    const days = gap.getUTCDate() - 1;

    if (years > 0) return `${years} Year${years > 1 ? 's' : ''}`;
    if (months > 0) return `${months} Month${months > 1 ? 's' : ''}`;
    return `${days || 1} Day${days > 1 ? 's' : ''}`;
  };

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          rows: 2,
        },
      },
    ],
  };

  return (
    <section className="explore-feature hp7 section-padding widget_edit_enabled pb-0 seller-bg AJ_aGentS_Home">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="section-heading mb-0">
              <span>Popular Seller</span>
              <h3>Owners Properties</h3>
            </div>
          </div>
        </div>

        <Slider {...settings} className="recommendedSellerSliderAJ mt-4">
          {agents.length > 0 ? (
            agents.map((item, index) => (
              <div className="product-wrap" key={index}>
                <div className="sellers_card">
                  <div className="card-body">
                    <div className="sellers_img">
                      <img
                        src={item.image_url}
                        alt={item.name_surname}
                      />
                    </div>
                    <div className="sellers_detail">
                      <div className="sellers_name_row">
                        <h4 className="seller_name_title">
                          <a href={item.agent_url} title={item.name_surname}>
                            {item.name_surname}
                          </a>
                        </h4>
                        {item.agent_profile.activated && (
                          <span className="seller_expert">
                            Expert <b>Pro</b>
                          </span>
                        )}
                      </div>
                      <div className="seller_location">
                        <span>
                          <i className="fa fa-map-marker"></i> {item.address}
                        </span>
                      </div>
                      <div className="seller_exp_pro">
                        <span className="seller_exp">
                          <b>Reg:</b> {calculateRegistrationDate(item.agent_profile.registration_date)} Ago
                        </span>
                        <span className="seller_property">
                          <b>{item.total_listings_num}</b> Properties
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No agents found</div>
          )}
        </Slider>
      </div>
    </section>
  );
};

export default RightAgents;
