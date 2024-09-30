import React from 'react';

// Dummy JSON data for insurance options
const insuranceOptions = [
  { id: 'General-Life-Insurance', imgSrc: './insurance1.png', label: 'General & Life Insurance', value: 'General Life Insurance' },
  { id: 'Health-Insurance', imgSrc: './life-protection.png', label: 'Health Insurance', value: 'Health Insurance' },
  { id: 'Motor-Life-Insurance', imgSrc: './motorcycle_i.png', label: 'Motor Life Insurance', value: 'Motor Life Insurance' },
];

const InsuranceSection = () => {
  return (
    <section className="insurance_bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="forms-_row_area">
              <div className="form-title_top">
                <h3>The Futuristic Way <span>To Buy Insurance</span></h3>
                <p>
                  <span className="badge">
                    <img src="./insurance-icons.png" alt="Insurance Icon" />
                  </span>
                  Select type of insurance
                </p>
              </div>
              <div className="insurance_forms">
                <form
                  action="https://townmanor.in/customform/insurance"
                  method="post"
                  acceptCharset="utf-8"
                  className="form mt-3"
                  autoComplete="nope"
                >
                  <div className="nav_nav_tabs">
                    {insuranceOptions.map(option => (
                      <a key={option.id} className="nav-link">
                        <img className="Insurance_img_icon" src={option.imgSrc} alt={option.label} />
                        <label htmlFor={option.id}>{option.label}</label>
                        <input
                          className="Insurance_radio"
                          type="radio"
                          id={option.id}
                          name="lifeInsurance"
                          value={option.value}
                          defaultChecked={option.id === 'General-Life-Insurance'}
                        />
                      </a>
                    ))}
                  </div>
                  <div className="Insurance_fill_form">
                    <div className="form-group">
                      <input type="text" className="form-control" name="name" required />
                      <label className="label_up">Name *</label>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        pattern="[0-9]+{10,15}"
                        minLength="10"
                        maxLength="15"
                        required
                      />
                      <label className="label_up">Phone Number *</label>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control" name="email" required />
                      <label className="label_up">Email ID *</label>
                    </div>
                    <div className="form-group">
                      <input type="number" className="form-control" name="pinCode" required />
                      <label className="label_up">Pin Code *</label>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" name="city" required />
                      <label className="label_up">City *</label>
                    </div>
                    <div className="form-group">
                      <select className="form-control" name="tenure" required>
                        <option value="">Tenure *</option>
                        <option value="5 Years">5 Years</option>
                        <option value="10 Years">10 Years</option>
                        <option value="15 Years">15 Years</option>
                        <option value="20 Years">20 Years</option>
                      </select>
                    </div>
                    <div className="form-group mb-0">
                      <div className="d-flex align-items-start custom_radio">
                        <input type="checkbox" className="form-check" id="exampleCheck1" defaultChecked />
                        <label className="form-check position-relative m-0 pl-2 font-bold" htmlFor="exampleCheck1">
                          Hereby authorize TownManor and its partners to contact me via WhatsApp, sms, phone, email etc.
                        </label>
                      </div>
                    </div>
                    <div className="text-trm-condition">
                      By submitting you agree to <a href="https://townmanor.in/en/195/terms_and_condition">Terms of use</a> and <a href="https://townmanor.in/en/195/terms_and_condition">T&amp;C</a>
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="inso_img">
              <img src="./insurance_right_img.png" alt="Insurance Image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;
