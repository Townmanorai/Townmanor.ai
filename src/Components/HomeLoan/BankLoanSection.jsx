import React, { useState } from 'react';
import "../common.css";
import "../commonsecond.css";
import Modal from 'react-modal'
import "./HomeLoan.css"
import { SlClose } from "react-icons/sl";
// Dummy JSON data
const dummyData = [
  {
    bankName: "IDFC FIRST Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/idfc.webp",
    interestRate: "8.75% - 10.5%",
    loanAmount: "₹1L - ₹10Cr",
    emiPerLakh: "₹2,064 - ₹2,149",
    processingFees: "Up to 3.5% of the loan amount",
    prePaymentCharges: "Foreclosure charges 5% of the loan amount"
  },
  {
    bankName: "HDFC Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/hdfc-bank.webp",
    interestRate: "8.35% - 9.4%",
    loanAmount: "₹1L - ₹10Cr",
    emiPerLakh: "₹2,044 - ₹2,095",
    processingFees: "₹4,999 One time fee",
    prePaymentCharges: "4% of the outstanding principal (loan tenure between 13 - 24 months)"
  },
  {
    bankName: "Axis Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/axis-bank.webp",
    interestRate: "8.7% - 13.3%",
    loanAmount: "₹1L - ₹5Cr",
    emiPerLakh: "₹2,061 - ₹2,291",
    processingFees: "0.50%(Min ₹10,000) one time fee",
    prePaymentCharges: "0 - 2%"
  },
  {
    bankName: "Kotak Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/kotak-mahindra.webp",
    interestRate: "8.7% - 9.6%",
    loanAmount: "₹10L - ₹10Cr",
    emiPerLakh: "₹2,061 - ₹2,105",
    processingFees: "Up to 3% of loan amount",
    prePaymentCharges: "0-12 months: Lock-in period 1- 3 years: 4% + GST 3 years onwards: 2% + GST"
  },
  {
    bankName: "YES Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/yes.webp",
    interestRate: "9.4% - 10.25%",
    loanAmount: "₹10L - ₹10Cr",
    emiPerLakh: "₹2,095 - ₹2,137",
    processingFees: "Up to 2%",
    prePaymentCharges: "Allowed if borrower has paid at least 12 EMIs. 20% of principal outstanding (13-24 months of EMI repayment)"
  },
  {
    bankName: "Deutsche Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/deutsche-bank.webp",
    interestRate: "8.75% - 9.15%",
    loanAmount: "₹5L - ₹25Cr",
    emiPerLakh: "₹2,064 - ₹2,083",
    processingFees: "--",
    prePaymentCharges: "--"
  },
  {
    bankName: "L&T Finance Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/larsen-toubro.webp",
    interestRate: "8.6%",
    loanAmount: "₹2L - ₹20Cr",
    emiPerLakh: "₹2,056",
    processingFees: "--",
    prePaymentCharges: "--"
  },
  {
    bankName: "Tata Capital Housing Finance Limited Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/tata-capital-housing-finance-limited.webp",
    interestRate: "8.7% - 12%",
    loanAmount: "₹5L - ₹5Cr",
    emiPerLakh: "₹2,061 - ₹2,224",
    processingFees: "Up to 2.75% of the loan amount",
    prePaymentCharges: "2% for payment of more than 25% of the outstanding principal balance"
  },
  {
    bankName: "Bajaj Finserv Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/bajaj.webp",
    interestRate: "8.45% - 15%",
    loanAmount: "₹1L - ₹15Cr",
    emiPerLakh: "₹2,049 - ₹2,379",
    processingFees: "Up to 0.50 % of the loan amount + GST and other applicable statutory levies",
    prePaymentCharges: "NIL"
  },
  {
    bankName: "Reliance Capital Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/reliance.webp",
    interestRate: "9.75% - 13%",
    loanAmount: "₹7.5L",
    emiPerLakh: "₹2,112 - ₹2,275",
    processingFees: "--",
    prePaymentCharges: "--"
  },
  {
    bankName: "Hero FinCorp Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/hero-fincorp.webp",
    interestRate: "13.22%",
    loanAmount: "₹10L - ₹3Cr",
    emiPerLakh: "₹2,287",
    processingFees: "--",
    prePaymentCharges: "--"
  }
];
const cities = ["Mumbai", "Bangalore", "Noida", "Gurgaon", "Hyderabad","pune"];
const occupations = ["Salaried", "Self employed Professional", "partner", "private Ltd", "partnership / LLP","proprietership"];
const BankLoanSection = () => {
  const [isModal,setisModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: cities[0],
    occupation: occupations[0]
  });
  const customStyles = {
    content: {
      top: '45%',
      left: '25%',
      right: 'auto',
      bottom: 'auto',
      height: '32vh',
      width: '40vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'fixed', // Ensure it stays on top of other content
      zIndex: 9999, // Ensures the modal is on top
    },
  };
  const openModal = () => {
    setisModal(true);
  };
  const closeModal = () => {
    setisModal(false);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert form data to JSON
    const dataToSend = JSON.stringify(formData);
    
    try {
      // Send data to the API using POST request
      const response = await fetch('https://www.townmanor.ai/api/api/user-occupations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataToSend,
      });
  
      // Check if the response is successful
      if (response.ok) {
        console.log("Form data sent successfully");
        closeModal(); // Close modal on successful submit
        // Optionally, you can handle success, like showing a success message.
      } else {
        console.error("Error sending form data");
        // Handle error, show a message if needed
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network error, show a message if needed
    }
  };
  return (
    
    <div className="container">
          <Modal
        isOpen={isModal}
        onRequestClose={closeModal}
        style={customStyles}
        id='mainphotobanner'
      >
        <div id='contactclose'>
          <SlClose onClick={closeModal} />
        </div>
        <form style={{ margin: '2vh 0px' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              style={{ height: '5vh' }}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              style={{ height: '5vh' }}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Select City Field */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">Select City</label>
            <select
              className="form-control"
              id="city"
              style={{ height: '5vh' }}
              value={formData.city}
              onChange={handleChange}
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Select Occupation Field */}
          <div className="mb-3">
            <label htmlFor="occupation" className="form-label">Select Occupation</label>
            <select
              className="form-control"
              id="occupation"
              style={{ height: '5vh' }}
              value={formData.occupation}
              onChange={handleChange}
            >
              {occupations.map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
      {dummyData.map((bank, index) => (
        <div key={index} className="DescriptionBank_FirstTable position-relative mt-4">
          <div className="DescriptionBank_Details">
            <div className="InterestRateNew_indTiles">
              <div className="InterestRateNew_tileHeading InterestRateNew_borderleft">
                <div className="InterestRateNew_bankName">
                  <figure>
                    <img
                      alt={`${bank.bankName}`}
                      loading="lazy"
                      width="150"
                      height="35"
                      decoding="async"
                      className="imgResponsive cursorPointer InterestRateNew_banklogo__abhL2"
                      style={{ color: 'transparent' }}
                      src={bank.bankImage}
                    />
                  </figure>
                  <a href="#">
                    <h3 className="BankName">{bank.bankName}</h3>
                  </a>
                </div>
                <button
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="btn-calc InterestRateNew_instantApply"
                  onClick={openModal}
                  
                >
                  Apply Now
                </button>
              </div>
              <ul className="InterestRateNew_bankDetails__Pcbs_">
                <li>
                  <p className="opt60">Interest Rate</p>
                  <p className="fontsemiBold">{bank.interestRate}</p>
                </li>
                <li>
                  <p className="opt60">Loan Amount</p>
                  <p className="fontsemiBold">{bank.loanAmount}</p>
                </li>
                <li>
                  <p className="opt60">EMI Per Lakh</p>
                  <p className="fontsemiBold">{bank.emiPerLakh}</p>
                </li>
                <li>
                  <p className="opt60">Processing Fees</p>
                  <div className="fontsemiBold">{bank.processingFees}</div>
                </li>
                <div className="InterestRateNew_lastLi__DoD8Q">
                  <p className="opt60">Pre-Payment Charges</p>
                  <div className="fontsemiBold">{bank.prePaymentCharges}</div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default BankLoanSection;
