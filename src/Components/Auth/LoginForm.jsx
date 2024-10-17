
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State for showing the Forgot Password form
  const [showPopupLogin, setShowPopupLogin] = useState(false); // State for showing the Sign Up popup

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3030/api/users/login', {
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
        window.location.href = 'http://localhost:5173/';
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
                <p className="mt-3">
                  Don't have an account?{' '}
                  <a
                    href="#"
                    className="forgot-password create-op"
                    title="Create?"
                    onClick={() => setShowPopupLogin(true)} // Show PopupLoginForm on "Sign Up"
                  >
                    Sign Up
                  </a>
                </p>
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




//------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3030/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include', // To include cookies in the request
//       });
    
//       const data = await response.json();
//       console.log('Response:', data); // Add this for debugging
    
//       if (response.ok) {
//         window.location.href = 'http://localhost:5173/';
//       } else {
//         setError(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error('Login Error:', err);
//       setError('Something went wrong. Please try again later.');
//     }
//   };

//   return (
//     <>
//     {/* <div className="log-in-form tab-pane fade" role="tabpanel" id="log-in-form"> */}
//       <div className="form-wr-content">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               name="username"
//               className="form-control"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               autoComplete="username"
//             />
//           </div>
//           <div className="form-group position-relative">
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//             />
//           </div>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <button type="submit" className="btn2">Sign In</button>
//         </form>
//       </div>
//     {/* </div> */}
//     </>
//   );
// };

// export default Login;



//-------------------------------------------------------------------






// import React, { useState } from 'react';

// const LoginForm = ({ langCheck, flashdataMessage, configItem, siteUrl, loginUrlFacebook }) => {
//   console.log("hdhbz");
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         remember: false,
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
//         <div className="log-in-form tab-pane fade" role="tabpanel" id="log-in-form">
//             <div className="form-title_top"></div>
//             <div className="form-wr-content">
//                 <form onSubmit={handleSubmit}>
//                     {flashdataMessage && <p className="alert alert-success">{flashdataMessage}</p>}
//                     {configItem === 'demo' && (
//                         <p className="alert alert-info">{langCheck('User credentials: user, user')}</p>
//                     )}
//                     <div className="Insurance_fill_form">
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="inputUsername_l"
//                                 name="username"
//                                 placeholder={langCheck('Username')}
//                                 value={formData.username}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="form-group position-relative">
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 id="inputPassword_l"
//                                 name="password"
//                                 placeholder={langCheck('Password')}
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                             />
//                             <i className="toggle-password fa fa-fw fa-eye-slash"></i>
//                         </div>
//                         <div className="form-cp">
//                             <div className="form-group">
//                                 <div className="input-field">
//                                     <input
//                                         type="checkbox"
//                                         name="remember"
//                                         id="remember"
//                                         checked={formData.remember}
//                                         onChange={handleInputChange}
//                                     />
//                                     <label htmlFor="remember">
//                                         <span></span>
//                                         <small>{langCheck('Remember me')}</small>
//                                     </label>
//                                 </div>
//                             </div>
//                             <a href={siteUrl('/admin/user/forgetpassword')} className="forgot-password">
//                                 {langCheck('Forgot Password')}?
//                             </a>
//                         </div>
//                         <button type="submit" className="btn2">
//                             {langCheck('Sign In')}
//                         </button>
//                         <p className="mt-3">
//                             Don't have an account?{' '}
//                             <a href="#" className="forgot-password create-op">
//                                 {langCheck('Sign Up')}
//                             </a>
//                         </p>
//                     </div>
//                 </form>
//                 {configItem !== '' && loginUrlFacebook && (
//                     <a href={loginUrlFacebook} className="fb-btn">
//                         <i className="fa fa-facebook" aria-hidden="true"></i>
//                         {langCheck('Sign in with facebook')}
//                     </a>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LoginForm;

// import React, { useState } from 'react';
// import "../../common.css";
// import "../../commonsecond.css";

// const LoginForm = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onLogin(username, password);
//     };

//     return (
//         <div className="log-in-form tab-pane fade active show" role="tabpanel" id="log-in-form">
//             <div className="form-title_top"></div>
//             <div className="form-wr-content">
//                 <form method="post" onSubmit={handleSubmit}>
//                     <div className="Insurance_fill_form">
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 name="username"
//                                 className="form-control"
//                                 id="inputUsername_l"
//                                 placeholder="Username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 autoComplete="username"
//                             />
//                         </div>
//                         <div className="form-group position-relative">
//                             <input
//                                 type="password"
//                                 name="password"
//                                 className="form-control"
//                                 id="inputPassword_l"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 autoComplete="current-password"
//                             />
//                             <i className="toggle-password fa fa-fw fa-eye-slash"></i>
//                         </div>
//                         <div className="form-cp">
//                             <div className="form-group">
//                                 <div className="input-field">
//                                     <input type="checkbox" name="remember" id="remember" value="true" />
//                                     <label htmlFor="remember">
//                                         <span></span>
//                                         <small>Remember me</small>
//                                     </label>
//                                 </div>
//                             </div>
//                             <a href="/admin/user/forgetpassword" className="forgot-password" title="Forgot Password?">
//                                 Forgot Password?
//                             </a>
//                         </div>
//                         <button type="submit" className="btn2">
//                             Sign In
//                         </button>
//                         <p className="mt-3">
//                             Don't have an account?{' '}
//                             <a href="#" className="forgot-password create-op" title="Create?">
//                                 Sign Up
//                             </a>
//                         </p>
//                     </div>
//                 </form>
//                 {/* <a href="#" className="fb-btn">
//                     <i className="fa fa-facebook" aria-hidden="true"></i>
//                     Sign in with Facebook
//                 </a>
//                 <a href="#" className="gl-btn">
//                     <i className="fa fa-google" aria-hidden="true"></i>
//                     Sign in with Google
//                 </a>
//                 <a href="#" className="fb-btn">
//                     <i className="fa fa-twitter" aria-hidden="true"></i>
//                     Sign in with Twitter
//                 </a> */}
//             </div>
//         </div>
//     );
// };

// export default LoginForm;


// import React, { useState } from 'react';
// import "../../common.css";
// import "../../commonsecond.css";
// import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component
// import PopupLoginForm from './PopupLoginForm';

// const LoginForm = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle ForgotPassword component

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onLogin(username, password);
//     };

//     const handleForgotPassword = (email) => {
//         console.log(`Sending OTP to ${email}`);
//         // Handle OTP request here
//     };

//     return (
//         <div>
//             {!showForgotPassword ? ( // Conditional rendering
//                 <div className="log-in-form tab-pane fade active show" role="tabpanel" id="log-in-form">
//                     <div className="form-title_top"></div>
//                     <div className="form-wr-content">
//                         <form method="post" onSubmit={handleSubmit}>
//                             <div className="Insurance_fill_form">
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         name="username"
//                                         className="form-control"
//                                         id="inputUsername_l"
//                                         placeholder="Username"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         autoComplete="username"
//                                     />
//                                 </div>
//                                 <div className="form-group position-relative">
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         className="form-control"
//                                         id="inputPassword_l"
//                                         placeholder="Password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         autoComplete="current-password"
//                                     />
//                                     <i className="toggle-password fa fa-fw fa-eye-slash"></i>
//                                 </div>
//                                 <div className="form-cp">
//                                     <div className="form-group">
//                                         <div className="input-field">
//                                             <input type="checkbox" name="remember" id="remember" value="true" />
//                                             <label htmlFor="remember">
//                                                 <span></span>
//                                                 <small>Remember me</small>
//                                             </label>
//                                         </div>
//                                     </div>
//                                     <a
//                                         href="#"
//                                         className="forgot-password"
//                                         title="Forgot Password?"
//                                         onClick={() => setShowForgotPassword(true)} // Show ForgotPassword form
//                                     >
//                                         Forgot Password?
//                                     </a>
//                                 </div>
//                                 <button type="submit" className="btn2">
//                                     Sign In
//                                 </button>
//                                 <p className="mt-3">
//                                     Don't have an account?{' '}
//                                     <a href="#" className="forgot-password create-op" title="Create?">
//                                         Sign Up
                                        
//                                     </a>
//                                 </p>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             ) : (
//                 <ForgotPassword onForgotPassword={handleForgotPassword} /> // Render ForgotPassword component
//             )}
//         </div>
//     );
// };

// export default LoginForm;

//---------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import "../../common.css";
// import "../../commonsecond.css";
// import './LoginForm.css';
// import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component
// import PopupLoginForm from './PopupLoginForm'; // Import PopupLoginForm component

// const LoginForm = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle ForgotPassword component
//     const [showPopupLogin, setShowPopupLogin] = useState(false); // State to toggle PopupLoginForm

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onLogin(username, password);
//     };

//     const handleForgotPassword = (email) => {
//         console.log(`Sending OTP to ${email}`);
//         // Handle OTP request here
//     };

//     return (
//         <div>
//             {!showForgotPassword ? ( // Conditional rendering for Forgot Password
//                 <div className="log-in-form tab-pane fade active show" role="tabpanel" id="log-in-form">
//                     <div className="form-title_top"></div>
//                     <div className="form-wr-content">
//                         <form method="post" onSubmit={handleSubmit}>
//                             <div className="Insurance_fill_form">
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         name="username"
//                                         className="form-control"
//                                         id="inputUsername_l"
//                                         placeholder="Username"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         autoComplete="username"
//                                     />
//                                 </div>
//                                 <div className="form-group position-relative">
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         className="form-control"
//                                         id="inputPassword_l"
//                                         placeholder="Password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         autoComplete="current-password"
//                                     />
//                                     <i className="toggle-password fa fa-fw fa-eye-slash"></i>
//                                 </div>
//                                 <div className="form-cp">
//                                     <div className="form-group">
//                                         <div className="input-field">
//                                             <input type="checkbox" name="remember" id="remember" value="true" />
//                                             <label htmlFor="remember">
//                                                 <span></span>
//                                                 <small>Remember me</small>
//                                             </label>
//                                         </div>
//                                     </div>
//                                     <a
//                                         href="#"
//                                         className="forgot-password"
//                                         title="Forgot Password?"
//                                         onClick={() => setShowForgotPassword(true)} // Show ForgotPassword form
//                                     >
//                                         Forgot Password?
//                                     </a>
//                                 </div>
//                                 <button type="submit" className="btn2">
//                                     Sign In
//                                 </button>
//                                 <p className="mt-3">
//                                     Don't have an account?{' '}
//                                     <a
//                                         href="#"
//                                         className="forgot-password create-op"
//                                         title="Create?"
//                                         onClick={() => setShowPopupLogin(true)} // Show PopupLoginForm on "Sign Up"
//                                     >
//                                         Sign Up
//                                     </a>
//                                 </p>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             ) : (
//                 <ForgotPassword onForgotPassword={handleForgotPassword} /> // Render ForgotPassword component
//             )}

//             {showPopupLogin && ( // Conditionally render PopupLoginForm when showPopupLogin is true
//                 <div className="popup-overlay">
//                     <PopupLoginForm onLogin={onLogin} />
//                     <button
//                         className="close-popup"
//                         onClick={() => setShowPopupLogin(false)} // Hide PopupLoginForm on close button click
//                     >
//                         Close
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LoginForm;
