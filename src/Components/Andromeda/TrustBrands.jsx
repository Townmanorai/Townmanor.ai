import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Icon for Show More button
import "./Andromeda.css";

const brands = [
  { id: 1, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721611-idfc.png", name: "IDFC" },
  { id: 2, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721615-ifl.png", name: "IDi" },
  { id: 3, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721619-lic.png", name: "LIC" },
  { id: 4, logo: "https://townmanor.in/templates/selio/assets/selfImages/axis-bank.webp", name: "AxisBank" },
  { id: 5, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721622-SBI.png", name: "SBI" },
  { id: 6, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721623-tata-capital.png", name: "TATA Capital" },
  { id: 7, logo: "https://townmanor.in/templates/selio/assets/selfImages/yes.webp", name: "Yes Bank" },
  { id: 8, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721625-tata-house.png", name: "TATA House" },
  { id: 9, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742554721617-kotak.png", name: "Kotak" },
  { id: 10, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742559714359-ADITYA-BIRLA-CAPITAL-e1660310165487.jpg", name: "TATA House" },
  { id: 11, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742559714365-DBS.png", name: "DBS" },
  { id: 12, logo: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742559895046-PIRAMAL-HOUSING-FINANCE.png", name: "PIRAMAL" }
];

const TrustedBrands = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="trusted-brands-container">
      <h2 className="trusted-brands-title">
        Brands Who <span className="trusted-text">Trust Us</span>
      </h2>
      <p className="trusted-brands-description">
        We Are Amongst The Top 3 Most-Preferred Channel Partners For Loans For India's Widest Network Of Banks, NBFCs, And Fintech.
      </p>

      <div className="trusted-brands-grid">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-card">
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
          </div>
        ))}
      </div>

      {!showAll && (
        <div style={{
          width:'100%',
          display:'flex',
          justifyContent:'center'
        }}>
        <button className="show-more-button" onClick={() => setShowAll(true)}>
          Show More <FaChevronDown className="show-more-icon" />
        </button>
        </div>
      )}
    </div>
  );
};

export default TrustedBrands;
