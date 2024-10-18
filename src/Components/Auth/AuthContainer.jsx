
// AuthContainer.js

import React, { useEffect, useState } from 'react';
import Login from './LoginForm';
import Signup from './SignUpForm';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../common.css';
import '../commonsecond.css';

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState('log-in-form');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Get the token from cookies
    const token = Cookies.get('jwttoken'); // Retrieve the token from cookies
    console.log('Token from cookies:', token);  // Log the retrieved token for debugging

    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);  
        console.log('Decoded Token:', decodedToken);
        setUsername(decodedToken.username); // Set the username from the token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in cookies');
    }
  }, []);

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


//------------------------------------------------------------------



// import React, { useState } from 'react';
// import LoginForm from './LoginForm';
// import SignupForm from './SignUpForm';
// import dummyUserData from './dummyUserData.json';
// import "./AuthContainer.css";
// import "../../common.css";
// import "../../commonsecond.css";

// const AuthContainer = ({ onUserLogin }) => { // Accept the onUserLogin prop
//     const [activeTab, setActiveTab] = useState('log-in-form'); // Default is login form

//     const handleLogin = async (username, password) => {
//         console.log("Login", username, password);
//         try {
//             const response = await fetch('http://localhost:3030/login', { 
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 onUserLogin(data.user); // Pass the user data to the parent
//                 alert(data.message);
//                 window.location.href = '/'; // Redirect to home page
//             } else {
//                 const errorData = await response.json();
//                 alert(errorData.message);
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };

//     const handleSignup = (newUser) => {
//         dummyUserData.users.push(newUser);
//         onUserLogin(newUser); // Pass the new user data to the parent
//         alert("Signup successful");
//     };

//     return (
//         <div className="wrapper ConTentFlex Body_back_Img">
//             <div className="container">
//                 <div className="selio_sw_win_wrapper LoginRegister_page">
//                     <div className="Topar_logo_head text-center">
//                         <a href="/homepage" className="navbar-brand">
//                             <img width="250" src="./footer-logo.png" alt="TownManor" />
//                         </a>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-6 offset-md-3">
//                             <div className="ci sw_widget sw_wrap">
//                                 <ul className="nav nav-tabs sw-sign-form-tabs" role="tablist">
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link log-in ${activeTab === 'log-in-form' ? 'active' : ''}`}
//                                             href="#log-in-form"
//                                             role="tab"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setActiveTab('log-in-form');
//                                             }}
//                                         >
//                                             Log in
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link sign-up ${activeTab === 'sign-up-form' ? 'active' : ''}`}
//                                             href="#sign-up-form"
//                                             role="tab"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setActiveTab('sign-up-form');
//                                             }}
//                                         >
//                                             Sign Up
//                                         </a>
//                                     </li>
//                                 </ul>
//                                 <div className="forms-_row_area">
//                                     <div className="tab-content">
//                                         {activeTab === 'log-in-form' && (
//                                             <div className="tab-pane fade active show" id="log-in-form">
//                                                 <LoginForm onLogin={handleLogin} />
//                                             </div>
//                                         )}
//                                         {activeTab === 'sign-up-form' && (
//                                             <div className="tab-pane fade active show" id="sign-up-form">
//                                                 <SignupForm onSignup={handleSignup} />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthContainer;




//----------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import LoginForm from './LoginForm';
// import SignupForm from './SignUpForm';
// import dummyUserData from './dummyUserData.json';
// import "./AuthContainer.css";
// import "../../common.css";
// import "../../commonsecond.css";

// const AuthContainer = () => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [activeTab, setActiveTab] = useState('log-in-form'); // Default is login form

//     // const handleLogin = (username, password) => {
//     //     const user = dummyUserData.users.find(
//     //         (user) => user.username === username && user.password === password
//     //     );
//     //     if (user) {
//     //         setCurrentUser(user);
//     //         console.log(username, password);
//     //         alert("Login successful");
            
//     //     } else {
//     //         console.log(username, password);
//     //         alert("Invalid credentials");
//     //     }
//     // };

//     const handleLogin = async (username, password) => {
//         console.log("Login", username,password);
//         try {
//             const response = await fetch('http://localhost:3030/login', { 
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setCurrentUser(data.user); // Save user data if needed
//                 alert(data.message); // Notify user of successful login
//                 window.location.href = '/'; // Redirect to home page
//             } else {
//                 const errorData = await response.json();
//                 alert(errorData.message); // Show error message
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };


//     const handleSignup = (newUser) => {
//         dummyUserData.users.push(newUser);
//         setCurrentUser(newUser);
//         console.log(newUser);
//         alert("Signup successful");
//     };

//     return (
//         <div className="wrapper ConTentFlex Body_back_Img">
//             <div className="container">
//                 <div className="selio_sw_win_wrapper LoginRegister_page">
//                     <div className="Topar_logo_head text-center">
//                         <a href="/homepage" className="navbar-brand">
//                             <img width="250" src="./footer-logo.png" alt="TownManor" />
//                         </a>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-6 offset-md-3">
//                             <div className="ci sw_widget sw_wrap">
//                                 <ul className="nav nav-tabs sw-sign-form-tabs" role="tablist">
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link log-in ${activeTab === 'log-in-form' ? 'active' : ''}`}
//                                             href="#log-in-form"
//                                             role="tab"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setActiveTab('log-in-form');
//                                             }}
//                                         >
//                                             Log in
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link sign-up ${activeTab === 'sign-up-form' ? 'active' : ''}`}
//                                             href="#sign-up-form"
//                                             role="tab"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setActiveTab('sign-up-form');
//                                             }}
//                                         >
//                                             Sign Up
//                                         </a>
//                                     </li>
                                    
//                                 </ul>
//                                 <div className="forms-_row_area">
//                                     <div className="tab-content">
//                                         {activeTab === 'log-in-form' && (
//                                             <div className="tab-pane fade active show" id="log-in-form">
//                                                 <LoginForm onLogin={handleLogin} />
//                                             </div>
//                                         )}
//                                         {activeTab === 'sign-up-form' && (
//                                             <div className="tab-pane fade active show" id="sign-up-form">
//                                                 <SignupForm onSignup={handleSignup} />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthContainer;











// import React from 'react';
// import LoginForm from './LoginForm';
// import SignUpForm from './SignUpForm';

// const AuthContainer = (props) => {
//     return (
//         <div className="row">
//             <div className="col-md-6 offset-md-3">
//                 <div className="ci sw_widget sw_wrap">
//                     <ul className="nav nav-tabs d-none sw-sign-form-tabs" role="tablist">
//                         <li className="nav-item">
//                             <a className="nav-link log-in" href="#log-in-form" role="tab" data-toggle="tab">
//                                 {props.langCheck('Log in')}
//                             </a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link sign-up" href="#sign-up-form" role="tab" data-toggle="tab">
//                                 {props.langCheck('Sign Up')}
//                             </a>
//                         </li>
//                     </ul>
//                     <div className="forms-_row_area">
//                         <div className="tab-content">
//                             <LoginForm {...props} />
//                             <SignUpForm {...props} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthContainer;

// import React, { useState } from 'react';
// import LoginForm from './LoginForm';
// import SignupForm from './SignUpForm';
// import dummyUserData from './dummyUserData.json';
// import "./AuthContainer.css";
// import "../../common.css";
// import "../../commonsecond.css";

// const AuthContainer = () => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [activeTab, setActiveTab] = useState('log-in-form'); // Default is login form

//     const handleLogin = (username, password) => {
//         const user = dummyUserData.users.find(
//             (user) => user.username === username && user.password === password
//         );
//         if (user) {
//             setCurrentUser(user);
//             console.log(username, password);
//             alert("Login successful");
            
//         } else {
//             console.log(username, password);
//             alert("Invalid credentials");
//         }
//     };

//     const handleSignup = (newUser) => {
//         dummyUserData.users.push(newUser);
//         setCurrentUser(newUser);
//         console.log(newUser);
//         alert("Signup successful");
//     };

//     return (
//         <div className="wrapper ConTentFlex Body_back_Img">
//             <div className="container">
//                 <div className="selio_sw_win_wrapper LoginRegister_page">
//                     <div className="Topar_logo_head text-center">
//                         <a href="/homepage" className="navbar-brand">
//                             <img width="250" src="./footer-logo.png" alt="TownManor" />
//                         </a>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-6 offset-md-3">
//                             <div className="ci sw_widget sw_wrap">
//                                 <ul className="nav nav-tabs sw-sign-form-tabs" role="tablist">
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link log-in ${activeTab === 'log-in-form' ? 'active' : ''}`}
//                                             href="#log-in-form"
//                                             role="tab"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setActiveTab('log-in-form');
//                                             }}
//                                         >
//                                             Log in
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link sign-up ${activeTab === 'sign-up-form' ? 'active' : ''}`}
//                                             href="#sign-up-form"
//                                             role="tab"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setActiveTab('sign-up-form');
//                                             }}
//                                         >
//                                             Sign Up
//                                         </a>
//                                     </li>
                                    
//                                 </ul>
//                                 <div className="forms-_row_area">
//                                     <div className="tab-content">
//                                         {activeTab === 'log-in-form' && (
//                                             <div className="tab-pane fade active show" id="log-in-form">
//                                                 <LoginForm onLogin={handleLogin} />
//                                             </div>
//                                         )}
//                                         {activeTab === 'sign-up-form' && (
//                                             <div className="tab-pane fade active show" id="sign-up-form">
//                                                 <SignupForm onSignup={handleSignup} />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthContainer;
