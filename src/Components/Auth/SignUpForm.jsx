import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import '../common.css'; // Import any common CSS
import '../commonsecond.css'; // Import any second common CSS
import './SignUpFormauth.css'
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaIdCard, 
  FaEye, 
  FaEyeSlash, 
  FaExclamationCircle, 
  FaCheckCircle, 
  FaAt,
  FaMobileAlt 
} from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    gstNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    captchaInput: ''
  });

  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Function to generate random captcha
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captchaString = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      captchaString += chars.substring(randomIndex, randomIndex + 1);
    }
    setCaptcha(captchaString);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
    // Clear validation error when checkbox is checked
    if (validationErrors.terms) {
      setValidationErrors({
        ...validationErrors,
        terms: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      errors.fullName = 'Name should be at least 3 characters';
    }
    
    // Validate username
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      errors.username = 'Username should be at least 4 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers and underscore';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate GST Number (if provided)
    if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
      errors.gstNumber = 'Please enter a valid GST number (e.g., 27AAPFU0939F1ZV)';
    }
    
    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password should be at least 8 characters';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase, one lowercase letter and one number';
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate phone (if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Validate captcha
    if (!formData.captchaInput) {
      errors.captchaInput = 'Please enter the captcha';
    } else if (formData.captchaInput !== captcha) {
      errors.captchaInput = 'Captcha does not match';
    }
    
    // Validate terms acceptance
    if (!termsAccepted) {
      errors.terms = 'You must agree to the Terms & Conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Validate form
    if (!validateForm()) {
      // Show general error message
      setError('Please correct the errors in the form');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Form Data:', formData);

      // API call to signup endpoint
      const response = await axios.post('https://www.townmanor.ai/api/api/users/signup', {
        name_surname: formData.fullName,
        username: formData.username,
        email: formData.email,
        gstNo: formData.gstNumber,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
        captcha: formData.captchaInput,
      });

      console.log(response);
      
      // Handle success
      toast.success('User registered successfully. Please check your email to verify your account.');
      setSuccessMessage('Account created successfully! Please check your email to verify your account.');
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        username: '',
        email: '',
        gstNumber: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
        captchaInput: ''
      });
      setTermsAccepted(false);
      generateCaptcha();
      
    } catch (err) {
      console.error('Error:', err.response?.data || err);
      
      // Handle error
      setError(err.response?.data?.message || 'An error occurred during registration.');
      toast.error(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-split-layout">
        <div className="auth-right-panel">

          
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-form-error">
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
            )}
            
            {successMessage && (
              <div className="auth-form-success">
                <FaCheckCircle />
                <span>{successMessage}</span>
              </div>
            )}
            
            {/* Full Name */}
            <div className="auth-form-group">
              <input
                type="text"
                className="auth-input"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <FaUser className="auth-input-icon" />
              {validationErrors.fullName && (
                <div className="auth-input-error">{validationErrors.fullName}</div>
              )}
            </div>
            
            {/* Username */}
            <div className="auth-form-group">
              <input
                type="text"
                className="auth-input"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              <FaAt className="auth-input-icon" />
              {validationErrors.username && (
                <div className="auth-input-error">{validationErrors.username}</div>
              )}
            </div>
            
            {/* Email */}
            <div className="auth-form-group">
              <input
                type="email"
                className="auth-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
              <FaEnvelope className="auth-input-icon" />
              {validationErrors.email && (
                <div className="auth-input-error">{validationErrors.email}</div>
              )}
            </div>
            
            {/* GST Number */}
            <div className="auth-form-group">
              <input
                type="text"
                className="auth-input"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="GST Number"
              />
              <FaIdCard className="auth-input-icon" />
              {validationErrors.gstNumber && (
                <div className="auth-input-error">{validationErrors.gstNumber}</div>
              )}
            </div>
            
            {/* Password */}
            <div className="auth-form-group">
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <div 
                className="auth-input-icon" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {validationErrors.password && (
                <div className="auth-input-error">{validationErrors.password}</div>
              )}
            </div>
            
            {/* Confirm Password */}
            <div className="auth-form-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="auth-input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <div 
                className="auth-input-icon" 
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {validationErrors.confirmPassword && (
                <div className="auth-input-error">{validationErrors.confirmPassword}</div>
              )}
            </div>
            
            {/* Full Address */}
            <div className="auth-form-group">
              <textarea
                className="auth-input auth-textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
              ></textarea>
              {validationErrors.address && (
                <div className="auth-input-error">{validationErrors.address}</div>
              )}
            </div>
            
            {/* Phone Number */}
            <div className="auth-form-group">
              <input
                type="tel"
                className="auth-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <FaMobileAlt className="auth-input-icon" />
              {validationErrors.phone && (
                <div className="auth-input-error">{validationErrors.phone}</div>
              )}
            </div>
            
            {/* CAPTCHA */}
            <div className="auth-form-group">
              <div className="auth-captcha-group">
                <input
                  type="text"
                  className="auth-input auth-captcha-input"
                  name="captchaInput"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  placeholder="Enter CAPTCHA"
                />
                <div className="auth-captcha-display" onClick={generateCaptcha}>
                  {captcha}
                </div>
              </div>
              {validationErrors.captchaInput && (
                <div className="auth-input-error">{validationErrors.captchaInput}</div>
              )}
            </div>
            
            {/* Terms & Conditions */}
            <div className="auth-checkbox-group">
              <div className="auth-checkbox-container">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  id="termsCheckbox"
                  checked={termsAccepted}
                  onChange={handleCheckboxChange}
                />
                <span className="auth-checkbox-mark"></span>
              </div>
              <label className="auth-checkbox-label" htmlFor="termsCheckbox">
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>
            {validationErrors.terms && (
              <div className="auth-input-error">{validationErrors.terms}</div>
            )}
            
            {/* Submit Button */}
            <button type="submit" className="auth-submit-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            <p className="loginToAct">
              Already have an account? <a href="#">Sign In</a>
            </p>
          </form>
        </div>
      </div>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Signup;
