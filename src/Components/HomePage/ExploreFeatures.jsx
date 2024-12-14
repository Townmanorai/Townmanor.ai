import React from 'react';
import './ExploreFeatures.css'
import "../common.css"; 
import "../commonsecond.css";

const ExploreFeatures = () => {
  return (
    <section className="explore-feature hp7 section-padding widget_edit_enabled">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-heading">
              <span>Explore Features</span>
              <h3>Why choose <b>Townmanor</b></h3>
            </div>
          </div>
        </div>

        <div className="row justify-content-center choose">
          {/* First Feature */}
          <div className="col-xl-3 col-sm-6 col-md-6 col-lg-4">
            <a href="#" title="">
              <div className="card">
                <div className="card-body choose">
                  <i className="icon-FEATURES">
                    <img src="./rupee.png" alt="Perfect Tools" />
                  </i>
                  <h3>Lowest Price  <br/>  Guaranteed</h3>
                  <p>We work tirelessly to secure the most competitive rates and offers available. This ensures you get the best possible deal on your dream home.</p>
                </div>
              </div>
            </a>
          </div>

          {/* Second Feature */}
          <div className="col-xl-3 col-sm-6 col-md-6 col-lg-4">
            <a href="#" title="">
              <div className="card">
                <div className="card-body choose">
                  <i className="icon-FEATURES">
                    <img src="./brokerage.png" alt="Search in Click" />
                  </i>
                  <h3>Zero <br/>  Brokerage</h3>
                  <p>Forget hidden fees and broker commissions. Townmanor operates with complete transparency, offering zero brokerage fees so you save more.</p>
                </div>
              </div>
            </a>
          </div>

          {/* Third Feature */}
          <div className="col-xl-3 col-sm-6 col-md-6 col-lg-4">
            <a href="#" title="">
              <div className="card">
                <div className="card-body choose">
                  <i className="icon-FEATURES">
                    <img src="./relationship.png" alt="User Control" />
                  </i>
                  <h3>Dedicated Relationship  <br/> Manager</h3>
                  <p>You won't navigate this journey alone. A dedicated Relationship Manager will be your personal champion throughout the process.</p>
                </div>
              </div>
            </a>
          </div>

          {/* Fourth Feature */}
          <div className="col-xl-3 col-sm-6 col-md-6 col-lg-4">
            <a href="#" title="">
              <div className="card">
                <div className="card-body choose">
                  <i className="icon-FEATURES">
                    <img src="./doorstep-delivery.png" alt="5 Star Support" />
                  </i>
                  <h3> Doorstep <br/>  Services</h3>
                  <p>Convenience is key. Our Doorstep Services eliminate the hassle of running errands.  We handle everything from property visits to document collection at your doorstep.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
