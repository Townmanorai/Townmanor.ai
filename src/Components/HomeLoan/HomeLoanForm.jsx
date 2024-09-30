import React from 'react';

import "../common.css";
import "../commonsecond.css";


// Dummy JSON data
const dummyData = {
  cities: ["Mumbai", "Bangalore", "Gurgaon", "Noida", "Hyderabad", "Pune"],
  occupationTypes: [
    "Salaried",
    "Self Employed Professional",
    "Partner",
    "Proprietorship",
    "Partnership/LLP",
    "Private Limited"
  ],
  formAction: "https://townmanor.in/customform/homeLoan",
  minDate: "2024-09-14"
};

const HomeLoanForm = () => {
  return (
    <div className="homeLoanForm">
      <div className="container">
        <p className="home-loan-heading text-left">
          Explore best Home Loan offers from the listed lenders
        </p>
        <form
          action={dummyData.formAction}
          method="post"
          acceptCharset="utf-8"
          className="null"
          autoComplete="nope"
        >
          <div className="LeadForm_Calculate">
            <div className="form_item">
              <div className="city-container">
                <select className="formInput undefined" name="city" required>
                  <option value="">Choose City *</option>
                  {dummyData.cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form_item calculator_order3">
              <div className="SelectRange_Calc">
                <div className="selectBox">
                  <select className="formInput undefined" name="occupationType" required>
                    <option value="">Occupation Type *</option>
                    {dummyData.occupationTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form_item rupeeBox">
              <span className="contCode">₹</span>
              <input
                type="number"
                name="loanAmount"
                className="formInput numb"
                autoComplete="nope"
                min="0"
                required
              />
              <label htmlFor="loanAmount" className="formLabel">
                Required Loan Amount *
              </label>
            </div>
            <div className="form_item rupeeBox calculator_order2">
              <span className="contCode">₹</span>
              <input
                type="number"
                name="netSalary"
                className="formInput numb"
                autoComplete="nope"
                min="0"
                required
              />
              <label htmlFor="netSalary" className="formLabel">
                Monthly Net Salary *
              </label>
            </div>
          </div>
          <div className="form-item grid4Span calculator_order4">
            <p>Just Fill A Few More Details To Get Quote...</p>
          </div>
          <div className="LeadForm_Calculate">
            <div className="form_item rupeeBox calculator_order5">
              <input
                type="text"
                name="name"
                className="formInput"
                autoComplete="nope"
                required
              />
              <label htmlFor="name" className="formLabel">
                Full Name *
              </label>
            </div>
            <div className="form_item contBox rupeeBox calculator_order6">
              <span className="contCode">+91</span>
              <input
                type="text"
                name="mobile"
                className="formInput"
                autoComplete="nope"
                pattern="[0-9]{10,15}"
                minLength="10"
                maxLength="15"
                required
              />
              <label htmlFor="mobile" className="formLabel">
                Mobile No *
              </label>
            </div>
            <div className="form_item rupeeBox calculator_order6">
              <span className="contCode">₹</span>
              <input
                type="text"
                name="monthlyEmi"
                className="formInput"
                autoComplete="nope"
                required
              />
              <label htmlFor="monthlyEmi" className="font12 fontMedium formLabel">
                Current Monthly EMIs *
              </label>
            </div>
            <div className="form_item rupeeBox calculator_order7">
              <input
                type="text"
                name="tenure"
                className="formInput"
                autoComplete="nope"
                required
              />
              <label htmlFor="tenure" className="font12 fontMedium formLabel">
                Tenure(Years) *
              </label>
            </div>
          </div>
          <div className="LeadForm_Calculate calc-section">
            <div className="formGroup form_item rupeeBox calculator_order8">
              <div className="inputIcon">
                <div className="react-datepicker-wrapper">
                  <div className="react-datepicker__input-container">
                    <input
                      type="date"
                      name="dob"
                      placeholder="DOB (DD/MM/YYYY) *"
                      autoComplete="nope"
                      min={dummyData.minDate}
                      className="formInput"
                      required
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
                I hereby appoint TownManor as my authorised representative to receive my credit
                information from Experian(bureau). I hereby accept terms & conditions.
                <a href="https://townmanor.in/en/195/terms_and_conditiony" target="_blank" rel="noopener noreferrer">
                  Read More.
                </a>
              </label>
            </div>
          </div>
          <div className="calculator_button">
            <button id="autoclick" type="submit" className="btn-calc textCenterSm">
              Get Quotes →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeLoanForm;
