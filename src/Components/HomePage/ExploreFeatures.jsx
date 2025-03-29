import React from 'react';
import './ExploreFeatures.css';
import "../common.css"; 
import "../commonsecond.css";

const featuresData = [
  {
    title: "Lowest Price Guaranteed",
    description:
      "We work tirelessly to secure the most competitive rates and offers available. This ensures you get the best possible deal on your dream home.",
    image: "./rupee.png",
  },
  {
    title: "Zero Brokerage",
    description:
      "Forget hidden fees and broker commissions. Townmanor operates with complete transparency, offering zero brokerage fees so you save more.",
    image: "./brokerage.png",
  },
  {
    title: "Dedicated Relationship Manager",
    description:
      "You won't navigate this journey alone. A dedicated Relationship Manager will be your personal champion throughout the process.",
    image: "./relationship.png",
  },
  {
    title: "Doorstep Services",
    description:
      "Convenience is key. Our Doorstep Services eliminate the hassle of running errands. We handle everything from property visits to document collection at your doorstep.",
    image: "./doorstep-delivery.png",
  },
];

const FeatureCard = ({ title, description, image, link }) => {
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className="ef-service-card" onClick={handleClick}>
      <div className="ef-icon-wrapper">
        <div className="ef-icon-container">
          <img src={image} alt={title} style={{ width: '20px', height: '20px' }} />
        </div>
      </div>
      <div className="ef-service-text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const ExploreFeatures = () => {
  return (
    <section className="explore-feature hp7 section-padding widget_edit_enabled efhp7">
      <div className="container">
        <div className="section-heading abc text-center" style={{marginBottom:'0px'}}>
          <span>Explore Features</span>
          <h3>
            Why choose <b>Townmanor</b>
          </h3>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div className="ef-services-grid">
            {featuresData.map((feature, idx) => (
              <FeatureCard
                key={idx}
                title={feature.title}
                description={feature.description}
                image={feature.image}
                link={feature.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
