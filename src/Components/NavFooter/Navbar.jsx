// import React, { useState, useEffect } from 'react';
// import '../common.css';
// import '../commonsecond.css';
// import './Navbar.css';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const cookieBox = document.querySelector(".wrapper_cookie");
//     const buttons = document.querySelectorAll(".button");

//     const executeCodes = () => {
//       const localStorageItem = localStorage.getItem('popupcookie');

//       if (document.cookie.includes("codinglab") || localStorageItem !== null) return;
//       cookieBox.classList.add("show");

//       buttons.forEach((button) => {
//         button.addEventListener("click", () => {
//           cookieBox.classList.remove("show");

//           if (button.id === "acceptBtn") {
//             document.cookie = "cookieBy=codinglab; max-age=" + 60 * 60 * 24 * 30;
//             localStorage.setItem('popupcookie', 'accepted');
//           }
//         });
//       });
//     };

//     window.addEventListener("load", executeCodes);
//     return () => window.removeEventListener("load", executeCodes);
//   }, []);

//   const handleMenuToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header>
//       <div className="wpart">
//         <div className="top-header widget_edit_enabled">
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="resp-grid flex-dynamic">
//                 <div className="header-address">
//                   <a href="tel://9112044171919818022996">
//                     <i className="la la-phone"></i>
//                     <span> +91-120-4417191, 9818022996</span>
//                   </a>
//                   <a href="mailto:corporate@townmanor.in" className="hide_table">
//                     <i className="la la-envelope-o"></i>
//                     <span>corporate@townmanor.in</span>
//                   </a>
//                 </div>
//               </div>
//               <div className="resp-grid flex-dynamic socail-icons">
//                 <div className="loginSignupAJ">
//                   <span className="nav-link">
//                     <i className="la la-sign-in"></i>
//                     <span>
//                       <a href="https://townmanor.in/frontend/login/en#sw_login" className="login_popup_enabled">
//                         <b className="signin-op">Sign in</b>
//                       </a>
//                       or
//                       <a href="https://townmanor.in/frontend/login/en#sw_register">
//                         <b className="reg-op">Register</b>
//                       </a>
//                     </span>
//                   </span>
//                 </div>
//                 <div className="header-social d-none d-sm-none d-md-block">
//                   <a href="#">
//                     <i className="fa fa-facebook"></i>
//                   </a>
//                   <a href="#">
//                     <i className="fa fa-twitter"></i>
//                   </a>
//                   <a href="#">
//                     <i className="fa fa-instagram"></i>
//                   </a>
//                   <a href="#">
//                     <i className="fa fa-linkedin"></i>
//                   </a>
//                 </div>
//               </div>
//               <div className="resp-grid flex"></div>
//             </div>
//           </div>
//         </div>
//         <div className="modal fade modal-country-list" id="country-modal" tabIndex="-1" role="dialog">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Select country</h5>
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <ul className="list-maps row">
//                   <li className="col-md-3 col-sm-4">
//                     <a href="https://townmanor.in/?set_country=empty">
//                       <i className="fa fa-globe"></i>
//                       <span>All countries</span>
//                       <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
//                     </a>
//                   </li>
//                   <li className="col-md-3 col-sm-4">
//                     <a href="https://townmanor.in/?set_country=88574">
//                       <span>India</span>
//                       <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
//                     </a>
//                   </li>
//                   <li className="col-md-3 col-sm-4">
//                     <a href="https://townmanor.in/?set_country=88587">
//                       <span>UAE</span>
//                       <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
//                     </a>
//                   </li>
//                   <li className="col-md-3 col-sm-4">
//                     <a href="https://townmanor.in/?set_country=88588">
//                       <span>Qatar</span>
//                       <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="wrapper_cookie">
//           {/* <div className="data">
//             <p>
//               This website employs cookies and associated technologies, as outlined in our privacy policy, to serve various purposes including website functionality, analytics, improved user experience, and targeted advertising. You have the option to consent to the use of these technologies, or to customize your preferences according to your own preferences.
//             </p>
//           </div>
//           <div className="buttons">
//             <button className="button" id="acceptBtn">Accept</button>
//             <button className="button declineBtn" id="declineBtn">Decline</button>
//           </div> */}
//         </div>
//         <div className="header widget_edit_enabled">
//           <div className="container-fluid px-4">
//             <div className="row">
//               <div className="col-xl-12">
//                 <nav className="navbar navbar-expand-lg navbar-light">
//                   <a href="https://townmanor.in/" className="navbar-brand">
//                     <img width="250" src="./navbarlogo.png" alt="Townmanor Technologies Pvt Ltd." />
//                   </a>
//                   <button className="menu-button" type="button" onClick={handleMenuToggle} aria-controls="navbarSupportedContent">
//                     <span className="icon-spar"></span>
//                     <span className="icon-spar"></span>
//                     <span className="icon-spar"></span>
//                   </button>
//                   <div className={`navbar-collapse   ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
//                     <ul className="navbar-nav mr-auto" id="main-menu">
//                       <li className="nav-item ">
//                         <a href="https://townmanor.in/en/1/home" className="nav-link ">Home</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="https://townmanor.in/en/145/search_property" className="nav-link">Search Property</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="https://townmanor.in/en/190/home_loan" className="nav-link">Home Loan</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="https://townmanor.in/en/191/insurance" className="nav-link">Insurance</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="https://townmanor.in/en/193/home_interior" className="nav-link">Home Interior</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="https://townmanor.in/en/197/subscription_plan" className="nav-link">Subscription Plan</a>
//                       </li>
//                     </ul>
//                     <div className="d-inline my-2 my-lg-0">
//                       <ul className="navbar-nav">
//                       <li class="nav-item signin-btn">
//                         <span class="nav-link">
//                           <i class="la la-sign-in"></i>
//                           <span>
//                           <a href="https://townmanor.in/frontend/login/en#sw_login" class="login_popup_enabled ">
//                             <b class="signin-op">Sign in</b>
//                           </a>
//                           </span>
//                         </span>
//                       </li>
//                         <li className="nav-item submit-btn">
//                           <a href="https://townmanor.in/frontend/login/en#sw_register" className="my-2 my-sm-0 nav-link sbmt-btn overflowVisible">
//                             <i className="icon-plus"></i>
//                             <span>Property Listing</span>
//                             <span className="FrEe">Free</span>
//                             <span className="powered_by_ai_btn">Powered By AI</span>
//                           </a>
//                         </li>
//                         <li className="nav-item signin-btn d-sm-block d-md-none"></li>
//                       </ul>
//                     </div>
//                     <a href="#" title="" className="close-menu" onClick={handleMenuToggle}>
//                       <i className="la la-close"></i>
//                     </a>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// src/NavFooter/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../common.css';
import '../commonsecond.css';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const cookieBox = document.querySelector(".wrapper_cookie");
    const buttons = document.querySelectorAll(".button");

    const executeCodes = () => {
      const localStorageItem = localStorage.getItem('popupcookie');

      if (document.cookie.includes("codinglab") || localStorageItem !== null) return;
      cookieBox.classList.add("show");

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          cookieBox.classList.remove("show");

          if (button.id === "acceptBtn") {
            document.cookie = "cookieBy=codinglab; max-age=" + 60 * 60 * 24 * 30;
            localStorage.setItem('popupcookie', 'accepted');
          }
        });
      });
    };

    window.addEventListener("load", executeCodes);
    return () => window.removeEventListener("load", executeCodes);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="wpart">
        <div className="top-header widget_edit_enabled">
          <div className="container">
            <div className="row align-items-center">
              <div className="resp-grid flex-dynamic">
                <div className="header-address">
                  <a href="tel://9112044171919818022996">
                    <i className="la la-phone"></i>
                    <span> +91-120-4417191, 9818022996</span>
                  </a>
                  <a href="mailto:corporate@townmanor.in" className="hide_table">
                    <i className="la la-envelope-o"></i>
                    <span>corporate@townmanor.in</span>
                  </a>
                </div>
              </div>
              <div className="resp-grid flex-dynamic socail-icons">
                <div className="loginSignupAJ">
                  <span className="nav-link">
                    <i className="la la-sign-in"></i>
                    <span>
                      <a href="https://townmanor.in/frontend/login/en#sw_login" className="login_popup_enabled">
                        <b className="signin-op">Sign in</b>
                      </a>
                      or
                      <a href="https://townmanor.in/frontend/login/en#sw_register">
                        <b className="reg-op">Register</b>
                      </a>
                    </span>
                  </span>
                </div>
                <div className="header-social d-none d-sm-none d-md-block">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="resp-grid flex"></div>
            </div>
          </div>
        </div>
        <div className="modal fade modal-country-list" id="country-modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select country</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="list-maps row">
                  <li className="col-md-3 col-sm-4">
                    <a href="https://townmanor.in/?set_country=empty">
                      <i className="fa fa-globe"></i>
                      <span>All countries</span>
                      <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
                    </a>
                  </li>
                  <li className="col-md-3 col-sm-4">
                    <a href="https://townmanor.in/?set_country=88574">
                      <span>India</span>
                      <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
                    </a>
                  </li>
                  <li className="col-md-3 col-sm-4">
                    <a href="https://townmanor.in/?set_country=88587">
                      <span>UAE</span>
                      <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
                    </a>
                  </li>
                  <li className="col-md-3 col-sm-4">
                    <a href="https://townmanor.in/?set_country=88588">
                      <span>Qatar</span>
                      <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper_cookie">
          {/* <div className="data">
            <p>
              This website employs cookies and associated technologies, as outlined in our privacy policy, to serve various purposes including website functionality, analytics, improved user experience, and targeted advertising. You have the option to consent to the use of these technologies, or to customize your preferences according to your own preferences.
            </p>
          </div>
          <div className="buttons">
            <button className="button" id="acceptBtn">Accept</button>
            <button className="button declineBtn" id="declineBtn">Decline</button>
          </div> */}
        </div>
        <div className="header widget_edit_enabled">
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-xl-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <Link to="/" className="navbar-brand">
                    <img width="250" src="/navbarlogo.png" alt="Townmanor Technologies Pvt Ltd." />
                  </Link>
                  <button className="menu-button" type="button" onClick={handleMenuToggle} aria-controls="navbarSupportedContent">
                    <span className="icon-spar"></span>
                    <span className="icon-spar"></span>
                    <span className="icon-spar"></span>
                  </button>
                  <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" id="main-menu">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/property" className="nav-link">Search Property</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/home-loan" className="nav-link">Home Loan</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/insurance" className="nav-link">Insurance</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/home-interior" className="nav-link">Home Interior</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/subscription-plan" className="nav-link">Subscription Plan</Link>
                      </li>
                    </ul>
                    <div className="d-inline my-2 my-lg-0">
                      <ul className="navbar-nav">
                        <li className="nav-item signin-btn">
                          <span className="nav-link">
                            <i className="la la-sign-in"></i>
                            <span>
                              <a href="https://townmanor.in/frontend/login/en#sw_login" className="login_popup_enabled">
                                <b className="signin-op">Sign in</b>
                              </a>
                            </span>
                          </span>
                        </li>
                        <li className="nav-item submit-btn">
                          <a href="https://townmanor.in/frontend/login/en#sw_register" className="my-2 my-sm-0 nav-link sbmt-btn overflowVisible">
                            <i className="icon-plus"></i>
                            <span>Property Listing</span>
                            <span className="FrEe">Free</span>
                            <span className="powered_by_ai_btn">Powered By AI</span>
                          </a>
                        </li>
                        <li className="nav-item signin-btn d-sm-block d-md-none"></li>
                      </ul>
                    </div>
                    <a href="#" title="" className="close-menu" onClick={handleMenuToggle}>
                      <i className="la la-close"></i>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;