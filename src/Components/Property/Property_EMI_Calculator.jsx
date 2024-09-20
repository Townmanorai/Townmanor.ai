import React, { useState } from 'react';

const MortgageCalculator = () => {
  // Dummy default values
  const [defValue, setDefValue] = useState(350000); // Example house price
  const [defInt, setDefInt] = useState(3.5); // Example interest rate
  const [defYears, setDefYears] = useState(30); // Example mortgage duration (years)
  const [defDownpayment, setDefDownpayment] = useState(defValue * 0.8);
  const [resultsMonthly, setResultsMonthly] = useState(0);
  const [resultsWeekly, setResultsWeekly] = useState(0);

  const defaultCurrency = '$'; // Example default currency

  const calculateMortgage = (params) => {
    const N = params.term * params.period;
    const I = (params.rate / 100) / params.period;
    const v = Math.pow((1 + I), N);
    const t = (I * v) / (v - 1);
    const result = params.balance * t;
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const balance = defValue - defDownpayment;
    const term = defYears;
    const rate = defInt;

    // Calculate monthly and weekly repayments
    const resultMonth = calculateMortgage({ balance, rate, term, period: 12 });
    const resultWeek = calculateMortgage({ balance, rate, term, period: 52 });

    setResultsMonthly(resultMonth);
    setResultsWeekly(resultWeek);
  };

  return (
    <div className="widget widget-calculator mortgage_widget clearfix">
      <h3 className="widget-title">EMI Calculator</h3>
      <form method="get" action="#" className="" id="mortgage_calculator" onSubmit={handleSubmit}>
        <ul>
          <li>
            <i>{defaultCurrency}</i>
            <input
              id="mortgage_balance"
              type="text"
              value={defValue.toFixed(2)}
              onChange={(e) => setDefValue(parseFloat(e.target.value))}
              placeholder="House price*"
            />
          </li>
          <li>
            <i>{defaultCurrency}</i>
            <input
              id="mortgage_interest"
              type="text"
              value={defInt}
              onChange={(e) => setDefInt(parseFloat(e.target.value))}
              placeholder="Interest*"
            />
          </li>
          <li>
            <i>{defaultCurrency}</i>
            <input
              id="mortgage_downpayment"
              type="text"
              value={defDownpayment.toFixed(2)}
              onChange={(e) => setDefDownpayment(parseFloat(e.target.value))}
              placeholder="Down payment"
            />
          </li>
          <li>
            <i>Y</i>
            <input
              id="mortgage_years"
              type="text"
              value={defYears}
              onChange={(e) => setDefYears(parseInt(e.target.value))}
              placeholder="Years*"
            />
          </li>
          <li className="form-group-result" style={{ display: resultsMonthly > 0 ? 'block' : 'none' }}>
            <label>Monthly Repayments</label>
            <p id="results_monthly" className="form-control-static center">
              {defaultCurrency} {resultsMonthly.toFixed(2)}
            </p>
          </li>
          <li className="form-group-result" style={{ display: resultsWeekly > 0 ? 'block' : 'none' }}>
            <label>Weekly Repayments</label>
            <p id="results_weekly" className="form-control-static center">
              {defaultCurrency} {resultsWeekly.toFixed(2)}
            </p>
          </li>
          <li>
            <button type="submit" className="btn2">Calculate</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default MortgageCalculator;
