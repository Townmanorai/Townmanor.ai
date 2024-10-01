import React from 'react';
import { Link } from 'react-router-dom';

import "../common.css";
import "../commonsecond.css";

// Dummy JSON data
const dummyData = {
  heading: "Turn your dream home into a reality with our home loans!",
  features: [
    "Customized Repayment Plans",
    "Low-Interest Rates",
    "Expert Guidance"
  ],
  bankImages: [
    "https://townmanor.in/templates/selio/assets/selfImages/yes.webp",
    "https://townmanor.in/templates/selio/assets/selfImages/idfc.webp",
    "https://townmanor.in/templates/selio/assets/selfImages/hdfc-bank.webp",
    "https://townmanor.in/templates/selio/assets/selfImages/axis-bank.webp"
  ],
  mainImage: "./home-loan.jpg",
  cibilLink: "/credit-score"  // Updated to use route path
};

const ProductSection = () => {
  return (
    <div id="Product_Section">
      <div className="container">
        <div className="ProductBanner_bannerFlex">
          <div className="ProductBanner_Text">
            <p className="ProductBanner_Heading">
              {dummyData.heading.split('<span class="bold-loan">').map((part, index) =>
                index === 1 ? (
                  <span key={index} className="bold-loan">{part.split('</span>')[0]}</span>
                ) : (
                  part
                )
              )}
            </p>
            <ul className="ProductBanner_features">
              {dummyData.features.map((feature, index) => (
                <li key={index}>
                  <img
                    src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg"
                    width="15"
                    alt=""
                  />
                  <p className="features_list_item">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="ProductBanner_BanksList">
              {dummyData.bankImages.map((imageSrc, index) => (
                <img
                  key={index}
                  width={index === 0 ? "140" : "100"}
                  src={imageSrc}
                  alt=""
                />
              ))}
            </div>
            <div className="CIBIL_score">
              {/* Commented out the Link component */}
              <Link to={dummyData.cibilLink} className="check_CIBIL_score_btn">
                Get Your Credit Score
              </Link>
              {/* <a href={dummyData.cibilLink} className="check_CIBIL_score_btn">
                Get Your Credit Score
              </a> */}
            </div>
          </div>
          <div className="ProductBanner_Img">
            <img
              width="400"
              src={dummyData.mainImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
