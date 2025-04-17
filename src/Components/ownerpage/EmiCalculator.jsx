import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import "./calculator.css";

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [tenureType, setTenureType] = useState("Years");
  const [emiResult, setEmiResult] = useState(null);

  const handleCalculateEMI = () => {
    const totalAmount = parseFloat(loanAmount);
    const downPaymentAmount = parseFloat(downPayment) || 0;
    const principal = totalAmount - downPaymentAmount;
    const annualRate = parseFloat(interestRate);
    let tenure = parseFloat(loanTenure);

    if (tenureType === "Years") {
      tenure *= 12;
    }

    const monthlyRate = annualRate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;

    setEmiResult({ emi, principal, totalInterest, downPayment: downPaymentAmount });
  };

  const handleReset = () => {
    setLoanAmount("");
    setDownPayment("");
    setInterestRate("");
    setLoanTenure("");
    setEmiResult(null);
  };

  const chartColors = ["#333", "#d84340"];

  return (
    <div className="emi-calculator-main-wrapper">
      <div className="emi-calculator-form-wrapper">
        <h2 className="emi-calculator-title-heading">EMI Calculator</h2>

        <label className="emi-calculator-label">Total Property Value</label>
        <input
          type="number"
          className="emi-calculator-input-box"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="₹ Enter property value"
        />

        <label className="emi-calculator-label">Down Payment</label>
        <input
          type="number"
          className="emi-calculator-input-box"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          placeholder="₹ Enter down payment amount"
        />

        <label className="emi-calculator-label">Interest Rate (% per annum)</label>
        <input
          type="number"
          className="emi-calculator-input-box"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
        <div className="bank_interest_logo">
          <img src="https://townmanor.in/templates/selio/assets/selfImages/yes.webp" className="bank_logo" alt="YES Bank"/>
          <img src="https://townmanor.in/templates/selio/assets/selfImages/idfc.webp" className="bank_logo" alt="IDFC Bank"/>
          <img src="https://townmanor.in/templates/selio/assets/selfImages/hdfc-bank.webp" className="bank_logo" alt="HDFC Bank"/>
          <img src="https://townmanor.in/templates/selio/assets/selfImages/axis-bank.webp" className="bank_logo" alt="Axis Bank"/>
        </div>
        <p>Click on bank logo to get bank interest</p>

        <label className="emi-calculator-label">Loan Tenure</label>
        <div className="emi-calculator-tenure-section">
          <input
            type="number"
            className="emi-calculator-tenure-input"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            placeholder="Enter tenure"
          />
          <select
            value={tenureType}
            className="emi-calculator-tenure-dropdown"
            onChange={(e) => setTenureType(e.target.value)}
          >
            <option>Years</option>
            <option>Months</option>
          </select>
        </div>

        <div className="emi-calculator-button-group">
          <button className="emi-calculator-calculate-btn" onClick={handleCalculateEMI}>
            Calculate EMI
          </button>
          <button className="emi-calculator-reset-btn" onClick={handleReset}>
            <FaRedo />
          </button>
        </div>

        {emiResult && (
          <div className="emi-calculator-results-display">
            <h3 className="emi-calculator-result-heading">Monthly EMI: ₹{emiResult.emi.toFixed(2)}</h3>
            <p className="emi-calculator-result-text">Down Payment: ₹{emiResult.downPayment.toFixed(2)}</p>
            <p className="emi-calculator-result-text">Loan Amount: ₹{emiResult.principal.toFixed(2)}</p>
            <p className="emi-calculator-result-text">Total Interest: ₹{emiResult.totalInterest.toFixed(2)}</p>

            <div className="emi-calculator-donut-chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={[
                      { name: "Principal", value: emiResult.principal },
                      { name: "Interest", value: emiResult.totalInterest },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {[
                      { name: "Principal", value: emiResult.principal },
                      { name: "Interest", value: emiResult.totalInterest },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmiCalculator;
