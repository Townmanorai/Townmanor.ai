// import React, { useState } from 'react';

// const LoginForm = ({ langCheck, flashdataMessage, configItem, siteUrl, loginUrlFacebook }) => {
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


import React, { useState } from 'react';
import '../common.css';
import '../../src/commonsecond.css';

const Login = ({ onLogin }) => {
  console.log('AuthContainer ');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="log-in-form tab-pane fade" role="tabpanel" id="log-in-form">
      <div className="form-title_top"></div>
      <div className="form-wr-content">
        <form method="post" action="#sw_login" onSubmit={handleSubmit}>
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
                autoComplete="username" // Added for better autofill support
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
                autoComplete="current-password" // Added for better autofill support
              />
              <i className="toggle-password fa fa-fw fa-eye-slash"></i>
            </div>
            <div className="form-cp">
              <div className="form-group">
                <div className="input-field">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    value="true"
                  />
                  <label htmlFor="remember">
                    <span></span>
                    <small>Remember me</small>
                  </label>
                </div>
              </div>
              <a
                href="/admin/user/forgetpassword"
                className="forgot-password"
                title="Forgot Password?"
              >
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn2">
              Sign In
            </button>
            <p className="mt-3">
              Don't have an account?{' '}
              <a href="#" className="forgot-password create-op" title="Create?">
                Sign Up
              </a>
            </p>
          </div>
        </form>
        <a href="#" className="fb-btn">
          <i className="fa fa-facebook" aria-hidden="true"></i>
          Sign in with Facebook
        </a>
        <a href="#" className="gl-btn">
          <i className="fa fa-google" aria-hidden="true"></i>
          Sign in with Google
        </a>
        <a href="#" className="fb-btn">
          <i className="fa fa-twitter" aria-hidden="true"></i>
          Sign in with Twitter
        </a>
      </div>
    </div>
  );
};

export default Login;
