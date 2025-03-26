import React from "react";
import './TownManorAndromeda.css'; // Importing the custom CSS
import { useNavigate } from "react-router-dom";

const TownManorAndromeda = () => {
 const navigate = useNavigate();

  return (
    <main className="townmanor-andromeda">
      <section className="townmanor-andromeda-section">
        <div className="townmanor-andromeda-container">
          <div className="townmanor-andromeda-inner-container">
            <div className="townmanor-andromeda-flex-container">
              <img 
                className="townmanor-logo" 
                src="/logo.png" 
                alt="TownManor" 
              />
              <div className="townmanor-plus-icon">
                <i className="fas fa-plus"></i>
              </div>
              <img 
                className="andromeda-logo" 
                src="https://www.andromedaloans.com/wp-content/uploads/2022/08/andromeda-logo-new.svg" 
                alt="Andromeda" 
              />
            </div>
            <div className="townmanor-andromeda-text-container">
              <h1 className="townmanor-andromeda-heading">
                <span className="townmanor-andromeda-subheading">Pioneering the Future  <span className="townmanor-andromeda-highlight-text">Together</span></span>
               
              </h1>
              <p className="townmanor-andromeda-description">
                TownManor and Andromeda join forces to revolutionize the industry landscape, bringing innovation and excellence to new heights.
              </p>
              <div className="townmanor-andromeda-button-container">
                <a href="#" className="townmanor-andromeda-cta-button" onClick={()=>{
                    navigate('/andromeda');
                }}>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TownManorAndromeda;
