import React, { useState } from 'react';
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
  // State to store form data
  const [formData, setFormData] = useState({
    city: "",
    occupationType: "",
    loanAmount: "",
    netSalary: "",
    name: "",
    mobile: "",
    monthlyEmi: "",
    tenure: "",
    dob: "",
    termsAccepted: false
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page refresh
  
    // Prepare data to be sent to the server
    const dataToSend = {
      city: formData.city,
      occupationType: formData.occupationType,
      loanAmount: formData.loanAmount,
      netSalary: formData.netSalary,
      name: formData.name,
      mobile: formData.mobile,
      monthlyEmi: formData.monthlyEmi,
      tenure: formData.tenure,
      dob: formData.dob,
      termsAccepted: formData.termsAccepted
    };
  
    try {
      const response = await fetch('https://www.townmanor.ai/api/api/loan-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Form submitted successfully!'); // Optionally, display result.message if returned by API
        console.log('API Response:', result); // Optional: Log the API response
      } else {
        const errorResult = await response.json();
        alert(`Error submitting the form: ${errorResult.message || 'Something went wrong'}`);
        console.error('Error response from API:', errorResult);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error submitting the form');
    }
  };

  return (
    <div className="homeLoanForm">
      <div className="container">
        <p className="home-loan-heading text-left">
          Explore best Home Loan offers from the listed lenders
        </p>
        <form
          onSubmit={handleSubmit}
          className="null"
          autoComplete="nope"
        >
          <div className="LeadForm_Calculate">
            <div className="form_item">
              <div className="city-container">
                <select
                  className="formInput undefined"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
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
                  <select
                    className="formInput undefined"
                    name="occupationType"
                    value={formData.occupationType}
                    onChange={handleChange}
                    required
                  >
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
                value={formData.loanAmount}
                onChange={handleChange}
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
                value={formData.netSalary}
                onChange={handleChange}
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.mobile}
                onChange={handleChange}
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
                value={formData.monthlyEmi}
                onChange={handleChange}
                autoComplete="nope"
                
              />
              <label htmlFor="monthlyEmi" className="font12 fontMedium formLabel">
                Current Monthly EMIs 
              </label>
            </div>
            <div className="form_item rupeeBox calculator_order7">
              <input
                type="text"
                name="tenure"
                className="formInput"
                value={formData.tenure}
                onChange={handleChange}
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
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="DOB (DD/MM/YYYY) *"
                      autoComplete="nope"
                      min={dummyData.minDate}
                      className="formInput"
                      required
                    />
                    <label htmlFor="tenure" className="font12 fontMedium formLabel">
                Appointment date
              </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-check pl-0">
            <div className="form-group m-0">
              <input
                type="checkbox"
                name="termsAccepted"
                style={{ width: '10%' }}
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <label className="form-check-label ajChnageD" htmlFor="termService">
                I hereby appoint TownManor as my authorised representative to receive my credit
                information from Experian(bureau). I hereby accept terms & conditions.
                {/* <a href="https://townmanor.in/en/195/terms_and_conditiony" target="_blank" rel="noopener noreferrer">
                  Read More.
                </a> */}
              </label>
            </div>
          </div>
          <div className="calculator_button">
            <button type="submit" className="btn-calc textCenterSm">
              Get Quotes →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeLoanForm;
