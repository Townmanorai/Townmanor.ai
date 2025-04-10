import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import "../common.css";
import "../commonsecond.css";
import "./HomeInt.css"


const dummyData = {
  heading: "Transform your house Into a split Stylish Heaven",
  features: [
    "Bespoek Designs",
    "Expert Guidance",
    "Affordable Luxary"
  ],
  bankImages: [
    "./logo_image1.png",
    "./logo_image2.png",
    "./logo_image3.png",
    "./logo_image4.png",
    "./logo_image5.png"
  ],
  mainImage: "./image.jpg",
  cibilLink: "/credit-score", 
  content: "Bring your vision to life with Townmanor’s premium home interior services. Whether you’re looking to revamp a single room or design your entire space, we offer tailored solutions to suit your style and budget. With a focus on creativity, quality, and attention to detail, we make your dream home a reality. "
};

const HomeInt = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <div className="animated-section">
      <div id="Product_Section">
        <div className="container" style={{marginTop:'70px'}}>
          <div className="ProductBanner_bannerFlex" style={{marginLeft:'-1px'}}>
            <div className="ProductBanner_Text">
              <p className="ProductBanner_Heading animate__animated animate__fadeInDown" 
                 style={{marginTop:'40px'}}>
                {dummyData.heading.split('split').map((item, index) => {
                  return index === 1 ? (
                    <span key={index} className='bold-loan hover-scale'>{item}</span>) : (item);
                })}
              </p>

              {/* Bank Logos with hover effect */}
              <div className="ProductBanner_BanksList" style={{margin:'15px 0px',justifyContent:'center'}}>
                {dummyData.bankImages.map((imageSrc, index) => (
                  <img 
                    key={index} 
                    width={index === 0 ? "80" : "100"} 
                    src={imageSrc} 
                    alt=""
                    className="hover-float"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    // style={{borderRadius:'10PX'}}
                  />
                ))}
              </div>

              {/* Features with staggered animation */}
              <ul className="ProductBanner_features" style={{margin:'15px 15px 0px'}}>
                {dummyData.features.map((feature, index) => (
                  <li 
                    key={index}
                    data-aos="fade-right"
                    data-aos-delay={index * 200}
                    className="feature-item"
                  >
                    <p className="features_list_item hover-scale" style={{width:'max-content'}}>
                      <span className="animated-check">✓</span> {feature}
                    </p>
                  </li>
                ))}
              </ul>
              
              {/* Animated CTA Button */}
              <div className="CIBIL_score" style={{padding:'55px 0 0'}}>
                <Link 
                  to={''} 
                  className="check_CIBIL_score_btn pulse-animation"
                  data-aos="zoom-in"
                >
                  Free Estimate →
                </Link>
              </div>
            </div>

            {/* Floating Image */}
            <div 
              className="ProductBanner_Img floating-image" 
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <img width="400" src={dummyData.mainImage} alt="" />
            </div>
          </div>

          {/* Animated Description Section */}
          <div 
            id="Description_loandetails" 
            style={{marginTop:'40px',paddingBottom:'0px'}}
            data-aos="fade-up"
          >
            <div className="container">
              <h1 className="InnerLoanheading">Home Loan</h1>
              <p className="short_description">
                {dummyData.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInt;