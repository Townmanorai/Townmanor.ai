// import React, { useState } from 'react';
// import "../../common.css";
// import "../../commonsecond.css";

// const ForgotPassword = ({ onForgotPassword }) => {
//   const [email, setEmail] = useState('');

//   const handleChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email) {
//       onForgotPassword(email);
//     } else {
//       alert('Please enter a valid email address');
//     }
//   };

//   return (
//     <div className="forgot-password-form tab-pane fade active show" role="tabpanel" id="forgot-password-form">
//       <div className="form-title_top">
//         <h3>Forgot Your Username?</h3>
//         <p className="text-muted">Enter your email to receive an OTP to reset your credentials.</p>
//       </div>
//       <div className="form-wr-content">
//         <form method="post" action="#forgot_password" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               id="inputEmail"
//               placeholder="Email *"
//               value={email}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn2">Send OTP</button>
//           <p className="loginToAct">
//             Remember your credentials? <a href="#">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;



import React, { useState } from "react";

const ForgotPassword = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     if (email) {
       onForgotPassword(email);
     } else {
       alert('Please enter a valid email address');
     }
  };

  return (
    <div className="forgot-password-form">
      <div className="form-title_top"></div>
      <h3>Forgot Your Username?</h3>
      <p className="text-muted">
        Enter your email to receive an OTP to reset your credentials.
      </p>
      <div className="form-wr-content">
        <form method="post" onSubmit={handleSubmit}>
          <div className="Insurance_fill_form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail_f"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <button type="submit" className="btn2">
                            Send OTP
                        </button> */}
            <button type="submit" className="btn2">
              Send OTP
            </button>
            <p className="loginToAct">
              Remember your credentials? <a href="#">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
