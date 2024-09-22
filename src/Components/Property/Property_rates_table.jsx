import React from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";

// Dummy JSON data
const propertyRates = [
  {
    date_from: "2024-01-01",
    date_to: "2024-01-07",
    rate_nightly: "100",
    rate_weekly: "600",
    rate_monthly: "2400",
    min_stay: 2,
    changeover_day: 1,
    currency_code: "USD",
  },
  {
    date_from: "2024-02-01",
    date_to: "2024-02-07",
    rate_nightly: "120",
    rate_weekly: "700",
    rate_monthly: "2700",
    min_stay: 3,
    changeover_day: 2,
    currency_code: "USD",
  },
  // Add more rates as needed
];

const changeoverDays = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const monthsAvailability = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PropertyRates = () => {
  return (
    fileExists() && propertyRates.length > 0 ? (
      <div className="features-dv widget-rates">
        <h3>Rates</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Nightly</th>
              <th>Weekly</th>
              <th>Monthly</th>
              <th>Min Stay</th>
              <th>Changeover Day</th>
            </tr>
          </thead>
          <tbody>
            {propertyRates.map((rate, index) => (
              <tr key={index}>
                <td>{new Date(rate.date_from).toISOString().split('T')[0]}</td>
                <td>{new Date(rate.date_to).toISOString().split('T')[0]}</td>
                <td>{rate.rate_nightly} {rate.currency_code}</td>
                <td>{rate.rate_weekly} {rate.currency_code}</td>
                <td>{rate.rate_monthly} {rate.currency_code}</td>
                <td>{rate.min_stay}</td>
                <td>{changeoverDays[rate.changeover_day]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Availability Calendar</h2>
        <div className="av_calender row">
          {monthsAvailability.map((month, index) => (
            <div className="month_container col-sm-4" key={index}>
              {month}
            </div>
          ))}
          <br style={{ clear: 'both' }} />
        </div>
      </div>
    ) : null
  );
};

// Dummy function to simulate `file_exists` check
const fileExists = () => {
  return true; // Simulate that the file exists
};

export default PropertyRates;
