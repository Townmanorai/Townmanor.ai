import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import '../common.css'; // Import any common CSS
import '../commonsecond.css'; // Import any second common CSS

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
    registr_terms: true,
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
      toast.error("Passwords don't match");
      return;
    }

    // Validate that all required fields are filled
    if (!formData.name_surname || !formData.username || !formData.mail || !formData.password || !formData.password_confirm || !formData.address || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // if (!formData.registr_terms) {
    //   toast.error('You must accept the terms and conditions');
    //   return;
    // }

    setError(''); // Clear error message
    setSuccessMessage(''); // Clear success message
    setLoading(true); // Start loading

    try {
      console.log('Form Data:', formData);

      // API call to signup endpoint
      const response = await axios.post('https://www.townmanor.ai/api/api/users/signup', {
        name_surname: formData.name_surname,
        username: formData.username,
        email: formData.mail,
        gstNo: formData.gstNo,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
        captcha: formData.captcha,
      });

      console.log(response);

      // Handle success
      toast.success('User registered successfully. Please check your email to verify your account.');

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
        registr_terms: true,
      });
    } catch (err) {
      console.error('Error:', err.response?.data || err);

      // Handle error
      setError(err.response?.data?.message || 'An error occurred during registration.');
      toast.error(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
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
      
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
      />
    </>
  );
};

export default Signup;
