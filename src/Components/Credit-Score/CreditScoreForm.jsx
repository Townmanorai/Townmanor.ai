import React, { useState } from 'react';
import "../common.css";
import "../commonsecond.css";
import "./CreditScoreForm.css";

const CreditScoreForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    PANCard: '',
    dob: ''
  });
  
  // State for API response, loading and errors
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update form state on change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponseData(null);

    // Map your form data to the API payload
    const payload = {
      name: formData.name,
      id_number: formData.PANCard,
      id_type: "pan",
      mobile: formData.mobile,
      consent: "Y"
    };

    try {
      const res = await fetch("https://kyc-api.surepass.io/api/v1/credit-report-v2/fetch-report", {
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("data",data);
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div id="Description_loandetails" className="mb-0 pb-0">
        <div className="homeLoanForm mb-0 pb-5">
          <p className="home-loan-heading text-left">
            Get Instant Detailed <b>Credit Score</b> Report for <b>Free</b>
          </p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="LeadForm_Calculate">
              <div className="form_item rupeeBox">
                <input
                  type="text"
                  name="name"
                  className="formInput"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name" className="formLabel">Full Name *</label>
              </div>
              <div className="form_item contBox rupeeBox">
                <span className="contCode">+91</span>
                <input
                  type="text"
                  name="mobile"
                  className="formInput"
                  placeholder="Mobile No. *"
                  pattern="[0-9]{10,15}"
                  minLength="10"
                  maxLength="15"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <label htmlFor="mobile" className="formLabel">Mobile No. *</label>
              </div>
              <div className="form_item rupeeBox">
                <input
                  type="text"
                  name="PANCard"
                  className="formInput"
                  placeholder="PAN Card *"
                  required
                  value={formData.PANCard}
                  onChange={handleChange}
                />
                <label htmlFor="PANCard" className="formLabel">PAN Card *</label>
              </div>
              <div className="form_item rupeeBox">
                <div className="inputIcon">
                  <div className="react-datepicker-wrapper">
                    <div className="react-datepicker__input-container">
                      <input
                        type="date"
                        name="dob"
                        placeholder="DOB (DD/MM/YYYY)"
                        autoComplete="off"
                        className="formInput"
                        required
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-check pl-0">
              <div className="form-group m-0">
                <input
                  type="checkbox"
                  className="form-check-input termService m-0 mt-1"
                  id="termService"
                  defaultChecked
                  required
                />
                <label className="form-check-label ajChnageD" htmlFor="termService">
                  I hereby appoint TownManor as my authorised representative to receive my credit information from Experian(bureau). I hereby accept terms & conditions.
                  <a href="https://townmanor.in/en/181/privacy_policy" target="_blank" rel="noopener noreferrer">Read More.</a>
                </label>
              </div>
            </div>
            <div className="calculator_button">
              <button id="autoclick" type="submit" className="btn-calc textCenterSm pdTB">
                {loading ? "Submitting..." : "Submit →"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Display error if any */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {/* Render the API response if available */}
      {responseData && responseData.success && (
        <div className="credit-report-details">
          <h3>Credit Report Details</h3>
          <p><strong>Name:</strong> {responseData.data.name}</p>
          <p><strong>Mobile:</strong> {responseData.data.mobile}</p>
          <p><strong>PAN Number:</strong> {responseData.data.id_number}</p>
          <p><strong>Credit Score:</strong> <span className='credit-score-colour'>{responseData.data.credit_score}</span></p>
          {/* {renderReportHeader()} */}
        </div>
      )}
    </div>
  );
};

export default CreditScoreForm;
