import React from 'react';
import "./InHouseServices.css";
import "../common.css";
import "../commonsecond.css";

const InHouseServices = () => {
  return (
    <section className="explore-feature hp7 max_width_con section-padding widget_edit_enabled pb-0 mt-4" style={{paddingTop:'0px'}}>
      <div className="container">
        <div className="row justify-content-center" style={{marginBottom:'15px'}}>
          <div className="col-xl-8">
            <div className="section-heading mb-4 h4">
              <span>In-House Services</span>
              <h1>
                Resources <b>you need</b> for your <b>home buying</b> Journey
              </h1>
            </div>
          </div>
        </div>
        
        <div className="row justify-content-center scrollable-cards" style={{
          flexWrap:'nowrap'
        }}>
          <div className="col-lg-2 col-md-3 col-6">
            <a href="/home-loan" title="">
              <div className="card card_services">
                <div className="card-body">
                  <i className="icon-sevices">
                    <img
                      src={"/servicesIcon1.png"}
                      alt="Home Loan"
                    />
                  </i>
                  <h3>Home Loan</h3>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-6">
            <a href="/homelane" title="">
              <div className="card card_services">
                <div className="card-body">
                  <i className="icon-sevices">
                    <img
                      src={'/servicesIcon2.png'}
                      alt="Home Interior"
                    />
                  </i>
                  <h3>Home Interior</h3>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-6">
            <a href="/insurance" title="">
              <div className="card card_services">
                <div className="card-body">
                  <i className="icon-sevices">
                    <img
                      src={'/servicesIcon3.png'}
                      alt="Home Insurance"
                    />
                  </i>
                  <h3>Home Insurance</h3>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-6">
            <a href="/homeshift" title="" data-toggle="modal" data-target="#exampleModal">
              <div className="card card_services">
                <div className="card-body">
                  <i className="icon-sevices">
                    <img
                      src={'/servicesIcon4.png'}
                      alt="Home Shift"
                    />
                  </i>
                  <h3>Home Shift</h3>
                </div>
              </div>
            </a>
          </div>
          
          <div className="col-lg-2 col-md-3 col-6">
            <a href="#" title="" data-toggle="modal" data-target="#exampleModal">
              <div className="card card_services">
                <div className="card-body">
                  <i className="icon-sevices">
                    <img
                      src={'/servicesIcon5.png'}
                      alt="Property valuation"
                    />
                  </i>
                  <h3>Property valuation</h3>
                </div>
              </div>
            </a>
          </div>
          {/* <div className="col-lg-2 col-md-3 col-6">
            <a href="#" title="" data-toggle="modal" data-target="#exampleModal">
              <div className="card card_services">
                <div className="card-body">
                  <i className="icon-sevices">
                    <img
                      src={"/servicesIcon6.png"}
                      alt="Find an Agent"
                    />
                  </i>
                  <h3>Find an Agent</h3>
                </div>
              </div>
            </a>
          </div> */}
          <div className="col-lg-2 col-md-3 col-6" >
            <a href="/commercial" title="" data-toggle="modal" data-target="#exampleModal" >
              <div className="card card_services" style={{
              backgroundColor:'lightgray'
            }}>
                <div className="card-body" style={{
              backgroundColor:'lightgray'
            }}>
                  <i className="icon-sevices" style={{
              backgroundColor:'rgb(255 174 23)'
            }}>
                    <img
                      
                      src={'/building.png'}
                      alt="Home Shift"
                    />
                  </i>
                  <h3>Commercial</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InHouseServices;
