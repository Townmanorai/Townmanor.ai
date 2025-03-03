// import React from 'react';
// import { Link } from 'react-router-dom';

// import "../common.css";
// import "../commonsecond.css";
// import "./HomeInt.css"

// // Dummy JSON data
// const dummyData = {
//   heading: "Transform your house Into a split Stylish Heaven",
//   features: [
//     "Bespoek Designs",
//     "Expert Guidance",
//     "Affordable Luxary"
//   ],
//   bankImages: [
//     "./logo_image1.png",
//     "./logo_image2.png",
//     "./logo_image3.png",
//     "./logo_image4.png",
//     "./logo_image5.png"
//   ],
//   mainImage: "./home-loan.jpg",
//   cibilLink: "/credit-score", 
//   content: "Bring your vision to life with Townmanor’s premium home interior services. Whether you’re looking to revamp a single room or design your entire space, we offer tailored solutions to suit your style and budget. With a focus on creativity, quality, and attention to detail, we make your dream home a reality. "
// };

// const HomeInt = () => {
//   return (
//     <div >
//       <div>&nbsp;</div>
//       <div id="Product_Section">
//         <div className="container">
//           <div className="ProductBanner_bannerFlex">
//             <div className="ProductBanner_Text">
//               <p className="ProductBanner_Heading" style={{marginTop:'40px'}}>
//                 {dummyData.heading.split('split').map((item, index) => {
//                   return index === 1 ? (
//                     <span key={index} className='bold-loan'>{item}</span>) : (item);
//                 })}
//               </p>

//               {/* ---------------------Images------------------- */}
//               <div className="ProductBanner_BanksList" style={{margin:'15px 0px'}}>
//                 {dummyData.bankImages.map((imageSrc, index) => (
//                   <img key={index} width={index === 0 ? "80" : "100"} src={imageSrc} alt=""/>
//                 ))}
//               </div>

//                 {/* -------------------Features----------------- */}
//               <ul className="ProductBanner_features" style={{margin:'15px 15px 0px'}}>
//                 {dummyData.features.map((feature, index) => (
//                   <li key={index}>
//                     {/* <img src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg" width="15" alt=""/> */}
//                     <p className="features_list_item">{feature}</p>
//                   </li>
//                 ))}
//               </ul>
//               <div className="CIBIL_score" style={{padding:'55px 0 0'}}>
//                 <Link to={''} className="check_CIBIL_score_btn">
//                   Free Estimate
//                 </Link>
//               </div>
//                 {/* ------------------content---------------- */}
              
//             </div>
//             <div className="ProductBanner_Img">
//               <img width="400" src={dummyData.mainImage} alt="" />
//             </div>
            
//           </div>
//           <div id="Description_loandetails" style={{marginTop:'40px'}}>
//             <div class="container">
//               <h1 class="InnerLoanheading">Home Loan</h1>
//               <p class="short_description">Turn your dream of owning a home into a reality with our top-notch home loan services. Townmanor has partnered with several banks to offer quick and convenient mortgage loans. Take advantage of our home credit loans, which come with various benefits such as competitive interest rates and smaller EMIs, allowing you to spread out your payments over a longer period of time.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default HomeInt;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import "../common.css";
import "../commonsecond.css";
import "./HomeInt.css"

// const dummyData = { /* ... keep the same dummy data ... */ };

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
  mainImage: "./home-loan.jpg",
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
              <div className="ProductBanner_BanksList" style={{margin:'15px 0px'}}>
                {dummyData.bankImages.map((imageSrc, index) => (
                  <img 
                    key={index} 
                    width={index === 0 ? "80" : "100"} 
                    src={imageSrc} 
                    alt=""
                    className="hover-float"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
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
                    <p className="features_list_item hover-scale">
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
            style={{marginTop:'40px'}}
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