// import React, { useState } from 'react';

// const SignUpForm = ({ langCheck, captcha, captchaHash, recaptchaEnabled, termsLink }) => {
//     const [formData, setFormData] = useState({
//         captcha: '',
//         registrTerms: false,
//     });

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic
//     };

//     return (
//         <div className="sign-up-form tab-pane fade" role="tabpanel" id="sign-up-form">
//             <div className="form-wr-content">
//                 <form onSubmit={handleSubmit}>
//                     {captcha && (
//                         <div className="form-group">
//                             <div className="form_captcha">
//                                 {captcha.image}
//                                 <div className="input-control">
//                                     <input
//                                         className="captcha"
//                                         name="captcha"
//                                         type="text"
//                                         placeholder={langCheck('Captcha')}
//                                         value={formData.captcha}
//                                         onChange={handleInputChange}
//                                     />
//                                     <input
//                                         type="hidden"
//                                         name="captcha_hash"
//                                         value={captchaHash}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {recaptchaEnabled && (
//                         <div className="form-group form-field-captcha">
//                             <div className="controls">
//                                 {/* Replace this with actual recaptcha rendering */}
//                                 <div>Recaptcha goes here</div>
//                             </div>
//                         </div>
//                     )}
//                     {termsLink && (
//                         <div className="form-cp">
//                             <div className="form-group">
//                                 <div className="input-field">
//                                     <input
//                                         type="checkbox"
//                                         name="registr_terms"
//                                         id="registr_terms"
//                                         checked={formData.registrTerms}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                     <label htmlFor="registr_terms">
//                                         <span></span>
//                                         <small>
//                                             <a href={termsLink} target="_blank">
//                                                 {langCheck('I accept the GDPR')}
//                                             </a>
//                                         </small>
//                                     </label>
//                                 </div>
//                             </div>
//                             <a href="#log-in-form" className="signin-op">
//                                 {langCheck('Have an account?')}
//                             </a>
//                         </div>
//                     )}
//                     <button type="submit" className="btn2">
//                         {langCheck('Create Account')}
//                     </button>
//                     <p className="loginToAct">
//                         Already have an account? <a href="#">Login</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUpForm;


import React, { useState } from 'react';
import '../common.css';
import '../commonsecond.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name_surname: '',
    username: '',
    mail: '',
    gstNo: '',
    password: '',
    password_confirm: '',
    address: '',
    phone: '',
    captcha: '',
    registr_terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.password_confirm) {
      onSignup(formData);
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className="sign-up-form tab-pane fade" role="tabpanel" id="sign-up-form">
      <div className="form-title_top"></div>
      <div className="form-wr-content">
        <form method="post" action="#sw_register" onSubmit={handleSubmit}>
          <div className="Insurance_fill_form">
            <div className="form-group">
              <input
                type="text"
                name="name_surname"
                className="form-control"
                id="inputNameSurname"
                placeholder="Name *"
                value={formData.name_surname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                id="inputUsername"
                placeholder="Username *"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="mail"
                className="form-control"
                id="inputMail"
                placeholder="Email *"
                value={formData.mail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="gstNo"
                className="form-control"
                id="inputGst"
                placeholder="GST No"
                value={formData.gstNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group position-relative">
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
              />
              <i className="toggle-password fa fa-fw fa-eye-slash"></i>
            </div>
            <div className="form-group position-relative">
              <input
                type="password"
                name="password_confirm"
                className="form-control"
                id="inputPasswordConfirm"
                placeholder="Confirm Password *"
                value={formData.password_confirm}
                onChange={handleChange}
              />
              <i className="toggle-password fa fa-fw fa-eye-slash"></i>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                className="form-control"
                id="inputAddress"
                placeholder="Address *"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                className="form-control"
                id="inputPhone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="captcha"
                className="form-control"
                id="inputCaptcha"
                placeholder="Captcha *"
                value={formData.captcha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                name="registr_terms"
                id="registr_terms"
                checked={formData.registr_terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="registr_terms">
                <span></span>
                <small>
                  <a href="#" target="_blank">
                    I accept the GDPR
                  </a>
                </small>
              </label>
            </div>
            <button type="submit" className="btn2">
              Create Account
            </button>
            <p className="loginToAct">
              Already have an account? <a href="#">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
