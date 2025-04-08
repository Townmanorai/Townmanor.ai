// Brochure.jsx
import React, { useState } from "react";
import "./Brochure.css";
import PropertyPDF from "./PropertyPDF"; 

function Brochure({ property }) {
  // State for EMI calculator inputs
  const [emiData, setEmiData] = useState({
    loanAmount: '', // in Crores
    interestRate: '', // percentage
    downPayment: '', // in Crores
    loanTerm: '' // years
  });

  // State for calculation results
  const [emiResults, setEmiResults] = useState({
    monthlyPayment: 0,
    weeklyPayment: 0,
    showResults: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    // Map the input field IDs to our state properties
    const fieldMap = {
      'mortgage_balance': 'loanAmount',
      'mortgage_interest': 'interestRate',
      'mortgage_downpayment': 'downPayment',
      'mortgage_years': 'loanTerm'
    };
    
    setEmiData({
      ...emiData,
      [fieldMap[id]]: parseFloat(value) || 0 // Convert to number or default to 0
    });
  };

  const calculateEMI = () => {
    try {
      // Principal amount is the loan amount minus the down payment
      const principalAmount = emiData.loanAmount - emiData.downPayment;
      
      // Monthly interest rate (annual rate / 12 / 100)
      const monthlyInterestRate = emiData.interestRate / 12 / 100;
      
      // Total number of monthly payments
      const totalPayments = emiData.loanTerm * 12;
      
      // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      let monthlyEMI = 0;
      if (monthlyInterestRate > 0) {
        monthlyEMI = principalAmount * monthlyInterestRate * 
                     Math.pow(1 + monthlyInterestRate, totalPayments) / 
                     (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
      } else {
        // If interest rate is 0, EMI is simply principal / totalPayments
        monthlyEMI = principalAmount / totalPayments;
      }
      
      // Weekly payment (monthly * 12 / 52)
      const weeklyEMI = (monthlyEMI * 12) / 52;
      
      setEmiResults({
        monthlyPayment: isNaN(monthlyEMI) ? 0 : monthlyEMI.toFixed(2),
        weeklyPayment: isNaN(weeklyEMI) ? 0 : weeklyEMI.toFixed(2),
        showResults: true
      });
    } catch (error) {
      console.error("Error calculating EMI:", error);
      alert("Please enter valid values for all fields");
    }
  };
  

  return (
    <>
      <div className="brochure-box">
        <div className="brochure-header">
          <h4>Download Brochure</h4>
        </div>
        <div className="brochure-img">
          <img src="/pdf.png" alt="Brochure PDF" />
        </div>
        <div>
          <PropertyPDF property={property} />
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="widget widget-calculator mortgage_widget clearfix">
        <h3 className="widget-title">EMI Calculator</h3>
        <ul>
          <li>
            <i>₹</i>
            <input
              id="mortgage_balance"
              type="text"
              value={emiData.loanAmount}
              onChange={handleInputChange}
              placeholder="Property price*"
            />
          </li>
          <li>
            <i>%</i>
            <input 
              id="mortgage_interest" 
              type="text" 
              value={emiData.interestRate}
              onChange={handleInputChange}
              placeholder="Interest rate*" 
            />
          </li>
          <li>
            <i>₹</i>
            <input
              id="mortgage_downpayment"
              type="text"
              value={emiData.downPayment}
              onChange={handleInputChange}
              placeholder="Down payment"
            />
          </li>
          <li>
            <i>Y</i>
            <input 
              id="mortgage_years" 
              type="text" 
              value={emiData.loanTerm}
              onChange={handleInputChange}
              placeholder="Loan term (years)*" 
            />
          </li>
          
          {emiResults.showResults && (
            <>
              <li className="form-group-result">
                <label>Monthly EMI:</label>
                <p className="form-control-static center">
                  ₹ {new Intl.NumberFormat('en-IN').format(emiResults.monthlyPayment)}
                </p>
              </li>
              <li className="form-group-result">
                <label>Weekly EMI:</label>
                <p className="form-control-static center">
                  ₹ {new Intl.NumberFormat('en-IN').format(emiResults.weeklyPayment)}
                </p>
              </li>
            </>
          )}
          
          <li>
            <button type="button" className="btn2" onClick={calculateEMI}>
              Calculate
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Brochure;


