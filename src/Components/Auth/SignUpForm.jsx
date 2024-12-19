
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import '../common.css';
import '../commonsecond.css';

const Signup = () => {
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

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [successMessage, setSuccessMessage] = useState(''); // Success message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password confirmation check
    if (formData.password !== formData.password_confirm) {
      setError("Passwords don't match");
      return;
    }

    setError('');
    setSuccessMessage('');
    setLoading(true); // Start loading

    try {
      // API call to signup endpoint
      const response = await axios.post('http://www.townmanor.ai/api/api/users/signup', {
        name: formData.name_surname,
        username: formData.username,
        mail: formData.mail,
        gstNo: formData.gstNo,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
      });

      // Handle success
      setSuccessMessage('User registered successfully. Please check your email to verify your account.');
      setFormData({
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
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
    {/* <div className="sign-up-form tab-pane fade" role="tabpanel" id="sign-up-form"> */}
      <div className="form-title_top"></div>
      <div className="form-wr-content">
        <form method="post" action="#sw_register" onSubmit={handleSubmit}>
          <div className="Insurance_fill_form">
            {error && <div className="error-message">{error}</div>} {/* Display error */}
            {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
            
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
            <button type="submit" className="btn2" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className="loginToAct">
              Already have an account? <a href="#">Login</a>
            </p>
          </div>
        </form>
      </div>
    {/* </div> */}
    </>
  );
};

export default Signup;


//---------------------------------------------------------------




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

//------------------------------------------------------------------

// import React, { useState } from 'react';
// import "../../common.css";
// import "../../commonsecond.css";

// const SignupForm = ({ onSignup }) => {
//   const [formData, setFormData] = useState({
//     name_surname: '',
//     username: '',
//     mail: '',
//     gstNo: '',
//     password: '',
//     password_confirm: '',
//     address: '',
//     phone: '',
//     captcha: '',
//     reraRegister: '',
//     reraRegisterNo: '',
//     aadhaarNo: '',
//     panNo: '',
//     registr_terms: false,
//   });

//   const [userType, setUserType] = useState('USER');
//   const [isReraRequired, setIsReraRequired] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleUserTypeChange = (e) => {
//     setUserType(e.target.value);
//     if (e.target.value === 'AGENT') {
//       setIsReraRequired(true);
//     } else {
//       setIsReraRequired(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password === formData.password_confirm) {
//       onSignup(formData);
//     } else {
//       alert("Passwords don't match");
//     }
//   };

//   return (
//     <div className="sign-up-form tab-pane fade active show" role="tabpanel" id="sign-up-form">
//       <div className="form-title_top"></div>
//       <div className="form-wr-content">
//         <form method="post" action="#sw_register" onSubmit={handleSubmit}>
//           <div className="form-check text-left mb-0 p-0 mt-2">
//             <div className="nav_nav_tabs m-0">
//               <div className="nav-link">
//                 <input
//                   type="radio"
//                   name="type"
//                   id="userTypeUser"
//                   value="USER"
//                   checked={userType === 'USER'}
//                   onChange={handleUserTypeChange}
//                   className="form-check-input Insurance_radio"
//                 />
//                 <label className="form-check-label" htmlFor="userTypeUser">
//                   <img className="Insurance_img_icon" src="./user-icon.png" alt="" />
//                   Property Owner
//                 </label>
//               </div>
//               <div className="nav-link">
//                 <input
//                   type="radio"
//                   name="type"
//                   id="userTypeAgent"
//                   value="AGENT"
//                   checked={userType === 'AGENT'}
//                   onChange={handleUserTypeChange}
//                   className="form-check-input Insurance_radio"
//                 />
//                 <label className="form-check-label" htmlFor="userTypeAgent">
//                   <img className="Insurance_img_icon" src="./customer-service.png" alt="" />
//                   Agent
//                 </label>
//               </div>
//               <div className="nav-link">
//                 <input
//                   type="radio"
//                   name="type"
//                   id="builderDeveloper"
//                   value="Builder/Developer"
//                   checked={userType === 'Builder/Developer'}
//                   onChange={handleUserTypeChange}
//                   className="form-check-input Insurance_radio"
//                 />
//                 <label className="form-check-label" htmlFor="builderDeveloper">
//                   <img className="Insurance_img_icon" src="./engineer.png" alt="" />
//                   Builder/Developer
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="Insurance_fill_form">
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name_surname"
//                 className="form-control"
//                 id="inputNameSurname"
//                 placeholder="Name *"
//                 value={formData.name_surname}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="username"
//                 className="form-control"
//                 id="inputUsername"
//                 placeholder="Username *"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="mail"
//                 className="form-control"
//                 id="inputMail"
//                 placeholder="Email *"
//                 value={formData.mail}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="gstNo"
//                 className="form-control"
//                 id="inputGst"
//                 placeholder="GST No"
//                 value={formData.gstNo}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group position-relative">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 id="inputPassword"
//                 placeholder="Password *"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <i className="toggle-password fa fa-fw fa-eye-slash"></i>
//             </div>
//             <div className="form-group position-relative">
//               <input
//                 type="password"
//                 name="password_confirm"
//                 className="form-control"
//                 id="inputPasswordConfirm"
//                 placeholder="Confirm Password *"
//                 value={formData.password_confirm}
//                 onChange={handleChange}
//               />
//               <i className="toggle-password fa fa-fw fa-eye-slash"></i>
//             </div>

//             {isReraRequired && (
//               <div id="reraRegistrationField">
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="reraRegisterNo"
//                     className="form-control"
//                     id="inputReraRegisterNo"
//                     placeholder="Rera Regn No *"
//                     value={formData.reraRegisterNo}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="aadhaarNo"
//                     className="form-control"
//                     id="inputAadhaarNo"
//                     placeholder="Aadhaar No *"
//                     value={formData.aadhaarNo}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="panNo"
//                     className="form-control"
//                     id="inputPanNo"
//                     placeholder="Pan No *"
//                     value={formData.panNo}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="form-group">
//               <textarea
//                 name="address"
//                 cols="40"
//                 rows="3"
//                 className="form-control"
//                 placeholder="Address *"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control"
//                 pattern="[0-9+]{10,15}"
//                 id="inputPhone"
//                 placeholder="Phone *"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="captcha"
//                 className="form-control"
//                 id="inputCaptcha"
//                 placeholder="Captcha *"
//                 value={formData.captcha}
//                 onChange={handleChange}
//               />
//             </div>

//             <button type="submit" className="btn2">
//               Create Account
//             </button>
//             <p className="loginToAct">
//               Already have an account? <a href="#">Login</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
