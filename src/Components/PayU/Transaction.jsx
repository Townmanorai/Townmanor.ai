import React from "react";
import { useLocation } from "react-router-dom";
import { FaCheck, FaLock, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import "./Transaction.css";

const Transaction = () => {
  const location = useLocation();
  const plan = location.state?.plan;

  // Calculate GST amount (18% of base price)
  const basePrice = parseFloat(plan?.price || 0);
  const gstAmount = basePrice * 0.18;
  const totalPrice = basePrice + gstAmount;
  
  // Calculate discount percentage if oldPrice exists
  const discountPercentage = plan?.oldPrice 
    ? Math.round(((parseFloat(plan.oldPrice) - basePrice) / parseFloat(plan.oldPrice)) * 100) 
    : 0;

  return (
    <div className="transaction_full_screen">
      <div className="transaction_outer_container">
        <div className="transaction_inner_content">
          {/* Header Section */}
          <div className="transaction_header_section">
            <p className="transaction_header_title">Order Summary</p>
            <p className="transaction_header_subtitle">
              Review your plan selection and complete payment
            </p>
          </div>

          <div className="transaction_main_layout">
            {/* Plan Box */}
            <div className="transaction_plan_box">
              <div className="transaction_plan_details">
                <p className="transaction_plan_title">{plan?.name || 'Selected Plan'}</p>
                <div className="transaction_plan_price_section">
                  {plan?.oldPrice && (
                    <span className="transaction_old_price">₹{plan.oldPrice}</span>
                  )}
                  <p className="transaction_new_price">₹{plan?.price || '0.00'}</p>
                  <span className="transaction_price_info">{plan?.duration || 'one-time'} payment</span>
                </div>
              </div>
              <div className="transaction_plan_features">
                {plan?.benefits.map((benefit, index) => (
                  <div key={index} className="transaction_feature_item">
                    <FaCheck className="transaction_feature_icon" />
                    <span className="transaction_feature_text">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="transaction_plan_status">
                <div className="transaction_status_box">
                  <FaCheck className="transaction_status_icon" />
                  Plan Selected
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="transaction_payment_box">
              <div className="transaction_input_group">
                <label className="transaction_input_label">Transaction No:</label>
                <input
                  type="text"
                  value={plan?.hiddenInputs?.txnid || ''}
                  readOnly
                  className="transaction_input_field"
                />
              </div>

              <div className="transaction_input_group">
                <label className="transaction_input_label">GST Number:</label>
                <input
                  type="text"
                  placeholder="e.g 29GGGG1314R9Z6"
                  className="transaction_input_field"
                />
              </div>

              <div className="transaction_summary_section">
                <div className="transaction_summary_item">
                  <span className="transaction_summary_label">Special Offer</span>
                  <div className="transaction_summary_value">
                    {plan?.oldPrice && (
                      <span className="transaction_old_price">₹{plan.oldPrice}</span>
                    )}
                    <span className="transaction_new_price">₹{plan?.price || '0.00'}</span>
                    {discountPercentage > 0 && (
                      <span className="transaction_discount_tag">({discountPercentage}% off)</span>
                    )}
                  </div>
                </div>
                <div className="transaction_summary_item">
                  <span className="transaction_summary_label">Additional & Tax:</span>
                  <span className="transaction_summary_value">+{gstAmount.toFixed(2)} (18% GST)</span>
                </div>
                <div className="transaction_summary_total">
                  <span className="transaction_total_label">Total Price</span>
                  <div className="transaction_total_value">
                    <span className="transaction_total_price">₹{totalPrice.toFixed(2)}/-</span>
                    <span className="transaction_total_note">incl GST</span>
                  </div>
                </div>
              </div>

              <form action={plan?.formAction} method="post">
                {plan?.hiddenInputs && Object.entries(plan.hiddenInputs).map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} />
                ))}
                <button type="submit" className="transaction_payment_button">Pay Now</button>
              </form>

              <div className="transaction_secure_section">
                <FaLock className="transaction_secure_icon" />
                <span className="transaction_secure_text">Secure Payment</span>
                <FaCcVisa className="transaction_secure_icon" />
                <FaCcMastercard className="transaction_secure_icon" />
                <FaCcAmex className="transaction_secure_icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
