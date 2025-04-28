import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../common.css';
import '../commonsecond.css';
import './SignUpFormauth.css';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaExclamationCircle, 
  FaGoogle,
  FaMobileAlt,
  FaArrowLeft
} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";


const LoginForm = () => {
  const { signInWithGoogle, setupPhoneAuth, verifyPhoneCode } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Phone authentication states
  const [phoneAuthMode, setPhoneAuthMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Initiating Google sign in...');
      const result = await signInWithGoogle();
      console.log('Google sign in result:', result);
      
      toast.success('Google sign in successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google');
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  // Handle Phone Authentication
  const handlePhoneAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Format phone number with country code if not provided
      let formattedPhone = phoneNumber;
      if (!phoneNumber.startsWith('+')) {
        formattedPhone = `+91${phoneNumber}`; // Default to India (+91)
      }
      
      console.log('Sending verification code to:', formattedPhone);
      
      // Make sure the recaptcha container exists
      if (!document.getElementById('recaptcha-container')) {
        const recaptchaDiv = document.createElement('div');
        recaptchaDiv.id = 'recaptcha-container';
        document.body.appendChild(recaptchaDiv);
      }
      
      const confirmation = await setupPhoneAuth(formattedPhone);
      setConfirmationResult(confirmation);
      setShowVerificationInput(true);
      toast.success('Verification code sent to your phone');
    } catch (error) {
      console.error('Phone Auth Error:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify Phone Code
  const verifyCode = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Verifying code:', verificationCode);
      const result = await verifyPhoneCode(confirmationResult, verificationCode);
      console.log('Phone Verification Result:', result);
      
      if (result.user) {
        toast.success('Logged in successfully with phone!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Code Verification Error:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with username:', formData.username);
      
      const response = await fetch('https://www.townmanor.ai/api/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.username, 
          password: formData.password 
        }),
        credentials: 'include'
      });
    
      const data = await response.json();
      console.log('Login response:', data);
    
      if (response.ok) {
        // Check if the token is in the response data
        if (data.token) {
          // Set the token in cookies with proper attributes
          document.cookie = `jwttoken=${data.token}; path=/; secure; samesite=strict`;
          console.log('JWT token saved to cookies');
          
          // Debug cookies
          console.log('Current cookies after login:', document.cookie);
        } else {
          console.warn('No token found in login response');
        }
        
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Something went wrong. Please try again later.');
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {!showForgotPassword ? (
        <div className="auth-split-layout">
          <div className="auth-right-panel">
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && (
                <div className="auth-form-error">
                  <FaExclamationCircle />
                  <span>{error}</span>
                </div>
              )}
              
              {!phoneAuthMode ? (
                <>
                  {/* Username */}
                  <div className="auth-form-group">
                    <input
                      type="text"
                      name="username"
                      className="auth-input"
                      placeholder="Username or Email"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                    />
                    <FaUser size={18} className="auth-input-icon" />
                  </div>
                  
                  {/* Password */}
                  <div className="auth-form-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="auth-input"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                    <div 
                      className="auth-input-icon" 
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  
                  {/* Remember me and Forgot Password */}
                  <div className="auth-form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="auth-checkbox-group" style={{ margin: 0 }}>
                      <div className="auth-checkbox-container">
                        <input
                          type="checkbox"
                          className="auth-checkbox"
                          id="rememberCheckbox"
                          checked={rememberMe}
                          onChange={handleCheckboxChange}
                        />
                        <span className="auth-checkbox-mark"></span>
                      </div>
                      <label className="auth-checkbox-label" htmlFor="rememberCheckbox">
                        Remember me
                      </label>
                    </div>
                    
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                      }}
                      style={{ 
                        color: 'var(--auth-primary)',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '0.875rem'
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  
                  {/* Submit Button */}
                  <button type="submit" className="auth-submit-button" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </>
              ) : (
                <>
                  {/* Phone Authentication Form */}
                  <div className="auth-form-group">
                    <input
                      type="tel"
                      className="auth-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number (e.g., +919876543210)"
                    />
                    <FaMobileAlt className="auth-input-icon" />
                  </div>
                  
                  {!showVerificationInput ? (
                    <button 
                      type="button" 
                      className="auth-submit-button" 
                      onClick={handlePhoneAuth}
                      disabled={loading || !phoneNumber}
                    >
                      {loading ? 'Sending Code...' : 'Send Verification Code'}
                    </button>
                  ) : (
                    <>
                      <div className="auth-form-group">
                        <input
                          type="text"
                          className="auth-input"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Enter Verification Code"
                        />
                      </div>
                      <button 
                        type="button" 
                        className="auth-submit-button" 
                        onClick={verifyCode}
                        disabled={loading || !verificationCode}
                      >
                        {loading ? 'Verifying...' : 'Verify Code'}
                      </button>
                    </>
                  )}
                  
                  {/* Invisible reCAPTCHA container */}
                  <div id="recaptcha-container"></div>
                </>
              )}

              {/* Social Login Options */}
              <div className="auth-social-buttons">
                <button
                  type="button"
                  className="auth-google-button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '12px 16px',
                    marginBottom: '12px',
                    backgroundColor: '#fff',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <FcGoogle style={{ marginRight: '10px', color: '#DB4437' }} /> 
                  Sign in with Google
                </button>
                
                <button
                  type="button"
                  className="auth-phone-button"
                  onClick={() => setPhoneAuthMode(!phoneAuthMode)}
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <FaMobileAlt style={{ marginRight: '10px', color: '#4285F4' }} /> 
                  {phoneAuthMode ? 'Use Username Instead' : 'Use Phone Instead'}
                </button>
              </div>
              
              <p className="loginToAct">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      )}

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

export default LoginForm;



