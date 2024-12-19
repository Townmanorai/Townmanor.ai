
import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State for showing the Forgot Password form
  const [showPopupLogin, setShowPopupLogin] = useState(false); // State for showing the Sign Up popup

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://www.townmanor.ai/api/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // To include cookies in the request
      });
    
      const data = await response.json();
      console.log('Response:', data); // Add this for debugging
    
      if (response.ok) {
        window.location.href = 'http://www.townmanor.ai/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      {!showForgotPassword ? (
        <div className="log-in-form tab-pane fade active show" role="tabpanel" id="log-in-form">
          <div className="form-title_top"></div>
          <div className="form-wr-content">
            <form method="post" onSubmit={handleSubmit}>
              <div className="Insurance_fill_form">
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="inputUsername_l"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                <div className="form-group position-relative">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword_l"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <i className="toggle-password fa fa-fw fa-eye-slash"></i>
                </div>
                <div className="form-cp">
                  <div className="form-group">
                    <div className="input-field">
                      <input type="checkbox" name="remember" id="remember" value="true" />
                      <label htmlFor="remember">
                        <span></span>
                        <small>Remember me</small>
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="forgot-password"
                    title="Forgot Password?"
                    onClick={() => setShowForgotPassword(true)} // Show ForgotPassword form
                  >
                    Forgot Password?
                  </a>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn2">
                  Sign In
                </button>
                {/* <p className="mt-3">
                  Don't have an account?{' '}
                  <a
                    href="#"
                    className="forgot-password create-op"
                    title="Create?"
                    onClick={() => setShowPopupLogin(true)} // Show PopupLoginForm on "Sign Up"
                  >
                    Sign Up
                  </a>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Render ForgotPassword component
        <ForgotPassword onForgotPassword={handleForgotPassword} />
      )}

      {showPopupLogin && ( // Conditionally render PopupLoginForm when showPopupLogin is true
        <div className="popup-overlay">
          <PopupLoginForm onLogin={onLogin} />
          <button
            className="close-popup"
            onClick={() => setShowPopupLogin(false)} // Hide PopupLoginForm on close button click
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;



