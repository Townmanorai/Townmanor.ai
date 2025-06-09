// AuthContainer.js

import React, { useEffect, useState } from 'react';
import Login from './LoginForm';
import Signup from './SignUpForm';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './AuthContainer.css'
import '../common.css';
import '../commonsecond.css';

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState('log-in-form');
  const [username, setUsername] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const token = getCookie('jwttoken');
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAuthenticated = !!decoded.username;
      setUsername(decoded.username);
    } catch (error) {
 
    }
  } else {
    
  }

  return (
    <div className="wrapper ConTentFlex Body_back_Img">
      <div className="container">
        <div className="selio_sw_win_wrapper LoginRegister_page">
          <div className="Topar_logo_head text-center">
            <a href="/" className="navbar-brand">
              <img width="250" src="./footer-logo.png" alt="TownManor" />
            </a>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="ci sw_widget sw_wrap">
                <ul className="nav nav-tabs sw-sign-form-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className={`nav-link log-in ${activeTab === 'log-in-form' ? 'active' : ''}`}
                      href="#log-in-form"
                      role="tab"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('log-in-form');
                      }}
                    >
                      Log in
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link sign-up ${activeTab === 'sign-up-form' ? 'active' : ''}`}
                      href="#sign-up-form"
                      role="tab"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('sign-up-form');
                      }}
                    >
                      Sign Up
                    </a>
                  </li>
                </ul>
                <div className="forms-_row_area">
                  <div className="tab-content">
                    <div className={`log-in-form tab-pane fade ${activeTab === 'log-in-form' ? 'active show' : ''}`} role="tabpanel" id="log-in-form">
                      <Login />
                    </div>
                    <div className={`sign-up-form tab-pane fade ${activeTab === 'sign-up-form' ? 'active show' : ''}`} role="tabpanel" id="sign-up-form">
                      <Signup />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;

