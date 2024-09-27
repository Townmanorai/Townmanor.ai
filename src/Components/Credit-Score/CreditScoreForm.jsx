import React from 'react'


import "../common.css";
import "../commonsecond.css";

const formFields = [
    { name: "name", label: "Full Name *", type: "text", required: true },
    { name: "mobile", label: "Mobile No. *", type: "text", pattern: "[0-9]{10,15}", minlength: 10, maxlength: 15, required: true },
    { name: "PANCard", label: "PAN Card *", type: "text", required: true },
    { name: "dob", label: "DOB (DD/MM/YYYY)", type: "date", required: true }
  ];

const CreditScoreForm = () => {
  return (
    <>
    <div id="Description_loandetails" className="mb-0 pb-0">
          <div className="homeLoanForm mb-0 pb-5">
            <div className="container">
              <p className="home-loan-heading text-left">Get Instant Detailed <b>Credit Score</b> Report for <b>Free</b></p>
              <form action="https://townmanor.in/customform/checkScore" method="post" acceptCharset="utf-8" className="null" autoComplete="off">
                <input type="hidden" name="formType" value="sendOTP" />
                <div className="LeadForm_Calculate">
                  {formFields.map((field, index) => (
                    <div key={index} className={`form_item ${field.name === "mobile" ? "contBox" : ""} rupeeBox`}>
                      {field.name === "mobile" ? (
                        <>
                          <span className="contCode">+91</span>
                          <input type={field.type} name={field.name} className="formInput" autoComplete="off" pattern={field.pattern} minLength={field.minlength} maxLength={field.maxlength} required={field.required} />
                        </>
                      ) : (
                        <input type={field.type} name={field.name} className="formInput" autoComplete="off" required={field.required} />
                      )}
                      <label htmlFor={field.name} className="formLabel">{field.label}</label>
                    </div>
                  ))}
                  <div className="form_item rupeeBox">
                    <div className="inputIcon">
                      <div className="react-datepicker-wrapper">
                        <div className="react-datepicker__input-container">
                          <input type="date" name="dob" placeholder="DOB (DD/MM/YYYY)" autoComplete="off" className="formInput" required />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-check pl-0">
                  <div className="form-group m-0">
                    <input type="checkbox" className="form-check-input termService m-0 mt-1" id="termService" checked required />
                    <label className="form-check-label ajChnageD" htmlFor="termService">
                      I hereby appoint TownManor as my authorised representative to receive my credit information from Experian(bureau). I hereby accept terms & conditions.
                      <a href="https://townmanor.in/en/181/privacy_policy" target="_blank" rel="noopener noreferrer">Read More.</a>
                    </label>
                  </div>
                </div>
                <div className="calculator_button">
                  <button id="autoclick" type="submit" className="btn-calc textCenterSm pdTB">Submit →</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default CreditScoreForm
