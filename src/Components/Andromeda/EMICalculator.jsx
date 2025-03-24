import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import "./Andromeda.css";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);

  const calculateEMI = () => {
    if (!loanAmount || !tenure || !interestRate) return;

    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseInt(tenure) * 12;

    const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = EMI * n;

    setEmi(EMI.toFixed(2));
    setTotalPayable(totalAmount.toFixed(2));
  };

  const pieData = [
    { name: "Interest", value: totalPayable - loanAmount || 1, color: "#d9534f" },
    { name: "Principal", value: loanAmount || 1, color: "#f0f0f0" }
  ];

  return (
    <div className="emi-container">
      <h2 className="emi-title">Plan Your Budget With Our EMI Calculator</h2>
      
      <div className="emi-content">
        <div className="emi-form">
          <div className="emi-input2">
          <input
            type="number"
            className="emi-input"
            placeholder="Loan Amount (₹)"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <input
            type="number"
            className="emi-input"
            placeholder="Loan Tenure (Years)"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
          <input
            type="number"
            className="emi-input"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          </div>
          <button className="emi-button" onClick={calculateEMI}>
            <FaCalculator className="emi-icon" /> Calculate EMI
          </button>
        </div>

        <div className="emi-chart-section">
          <PieChart width={180} height={180}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}  // <-- This makes it a hollow doughnut chart
              fill="#8884d8"
              paddingAngle={3}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <p className="emi-result">Total EMI : ₹{emi || "XXXX"}</p>
          <p className="emi-result">Total Payable Amount : ₹{totalPayable || "XXXX"}</p>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
