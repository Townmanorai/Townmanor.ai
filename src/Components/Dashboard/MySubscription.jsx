import React from 'react';

import "../common.css";
import "../commonsecond.css";

const MySubscription = ({ subscriptionData}) => {
  return (
    <>
    <div className="widget-panel">
        <div className="widget-header header-styles">
          <h2 className="title">My Subscription History</h2>
        </div>
        <div className="content-box">
          <div className="box-alert"></div>
          <div className="table-responsive">
            <table className="table table-striped data_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Package Valid</th>
                  <th>Currency Code / Amount</th>
                  <th>GST</th>
                  <th>GST Amount</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((subscription, index) => (
                  <tr key={subscription.invoiceNo}>
                    <td>{index + 1}</td>
                    <td>{subscription.invoiceNo}</td>
                    <td>{subscription.date}</td>
                    <td>{subscription.description}</td>
                    <td>{subscription.packageValid}</td>
                    <td>{subscription.amount}</td>
                    <td>{subscription.gst}%</td>
                    <td>{subscription.gstAmount}</td>
                    <td>{subscription.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySubscription;
