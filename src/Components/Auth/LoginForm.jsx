import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../common.css';
import '../commonsecond.css';
import './SignUpFormauth.css';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaExclamationCircle, 
  FaCheckCircle
} from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://www.townmanor.ai/api/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // To include cookies in the request
      });
    
      const data = await response.json();
    
      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = 'https://www.townmanor.ai/';
        }, 1500);
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
              
              {/* Username */}
              <div className="auth-form-group">
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <FaUser size={18} className="auth-input-icon" />
              </div>
              
              {/* Password */}
              <div className="auth-form-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              
              {/* <p className="loginToAct">
                Don't have an account? <a href="#">Sign Up</a>
              </p> */}
            </form>
          </div>
        </div>
      ) : (
        <ForgotPassword onForgotPassword={handleForgotPassword} />
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

export default Login;



