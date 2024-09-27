// import React, { useState } from 'react';
// import "../common.css";
// import "../commonsecond.css";

// const dummyEstateData = {
//   estate_data_option_67: 'John Doe',
//   estate_data_option_68: '+1234567890', // Phone number
//   estate_data_option_72: 'I am an experienced agent with years of expertise.',
//   estate_data_option_73: 'Mon - Fri: 9:00 AM - 6:00 PM',
//   estate_data_option_70: 'https://facebook.com/agent',
//   estate_data_option_71: 'https://twitter.com/agent',
//   estate_data_option_69: 'https://agentwebsite.com',
//   estate_data_option_74: '/cm-img2.webp',
//   agent_image_url: '/cm-img2.webp',
//   agent_url: '/agent/john-doe',
//   agent_mail: 'agent@example.com', // Email address
// };

// const dummyFormValues = {
//   firstname: '',
//   email: '',
//   phone: '',
//   address: '',
//   message: '',
//   fromdate: '',
//   todate: '',
//   captcha: '',
// };

// const ContactListingAgent = () => {
//   const [formValues, setFormValues] = useState(dummyFormValues);
//   const [walletBalance, setWalletBalance] = useState(10); // User's wallet balance
//   const [isPhoneVisible, setIsPhoneVisible] = useState(false); // Phone visibility
//   const [isEmailVisible, setIsEmailVisible] = useState(false); // Email visibility

//   const handleInputChange = (e) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formValues);
//   };

//   const handleShowPhoneNumber = () => {
//     if (walletBalance >= 10) {
//       setIsPhoneVisible(true);
//       setWalletBalance(walletBalance - 10); // Deduct 10 rupees from wallet for phone
//     } else {
//       alert('Insufficient balance to view the phone number.');
//     }
//   };

//   const handleShowEmailAddress = () => {
//     if (walletBalance >= 5) {
//       setIsEmailVisible(true);
//       setWalletBalance(walletBalance - 5); // Deduct 5 rupees from wallet for email
//     } else {
//       alert('Insufficient balance to view the email address.');
//     }
//   };

//   return (
//     <div className="widget widget-form" id="form-contact">
//       <h3 className="widget-title mt-0">Contact Listing Agent</h3>

//       {/* Display wallet balance */}
//       <div className="wallet-info">
//         <p>Your Wallet Balance: ₹{walletBalance}</p>
//       </div>

//       <div className="contct-info">
//         <img
//           src={dummyEstateData.estate_data_option_74 || dummyEstateData.agent_image_url}
//           alt={dummyEstateData.estate_data_option_67}
//         />
//         <div className="contct-nf">
//           <h3>
//             <a href={dummyEstateData.agent_url} title={dummyEstateData.estate_data_option_67}>
//               {dummyEstateData.estate_data_option_67}
//             </a>
//           </h3>
//           {/* <h4>Agent Address</h4> */}

//           {/* Phone number logic */}
//           <span>
//             {isPhoneVisible ? (
//               <span>
//                 <i className="la la-phone"></i> {dummyEstateData.estate_data_option_68} {/* Show phone if balance deducted */}
//               </span>
//             ) : (
//               <button onClick={handleShowPhoneNumber} className="btn2">
//                 <i className="la la-phone"></i> Show Phone Number (₹10)
//               </button>
//             )}
//           </span>

//           {/* Email address logic */}
//           <span>
//             {isEmailVisible ? (
//               <a href={`mailto:${dummyEstateData.agent_mail}`} title={dummyEstateData.agent_mail}>
//                 <i className="la la-envelope-o"></i> {dummyEstateData.agent_mail}
//               </a>
//             ) : (
//               <button onClick={handleShowEmailAddress} className="btn2">
//                 <i className="la la-envelope-o"></i> Show Email Address (₹5)
//               </button>
//             )}
//           </span>
//         </div>
//       </div>

//       {/* <div className="contct-info-sec">
//         <div className="desc">
//           {dummyEstateData.estate_data_option_72 && (
//             <div className="description">
//               <em>{dummyEstateData.estate_data_option_72}</em>
//             </div>
//           )}
//         </div>
//         {dummyEstateData.estate_data_option_73 && (
//           <div className="hours">
//             Office hours: {dummyEstateData.estate_data_option_73}
//           </div>
//         )}
//         <ul className="socio-links">
//           {dummyEstateData.estate_data_option_70 && (
//             <li>
//               <a className="facebook" href={dummyEstateData.estate_data_option_70}>
//                 <i className="fa fa-facebook facebook"></i>
//               </a>
//             </li>
//           )}
//           {dummyEstateData.estate_data_option_71 && (
//             <li>
//               <a className="twitter" href={dummyEstateData.estate_data_option_71}>
//                 <i className="fa fa-twitter twitter"></i>
//               </a>
//             </li>
//           )}
//           {dummyEstateData.estate_data_option_69 && (
//             <li>
//               <a className="twitter" href={dummyEstateData.estate_data_option_69}>
//                 <i className="fa fa-globe twitter"></i>
//               </a>
//             </li>
//           )}
//         </ul>
//       </div> */}

//       <div className="post-comment-sec">
//         <form onSubmit={handleSubmit} className="contact-form" id="form">
//           <div className="form-field">
//             <input
//               id="firstname"
//               name="firstname"
//               type="text"
//               placeholder="First and Last Name"
//               value={formValues.firstname}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={formValues.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <input
//               id="phone"
//               name="phone"
//               type="text"
//               placeholder="Phone"
//               value={formValues.phone}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <input
//               id="address"
//               name="address"
//               type="text"
//               placeholder="Address"
//               value={formValues.address}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <textarea
//               id="message"
//               name="message"
//               rows="3"
//               placeholder="Message"
//               value={formValues.message}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>

//           <button type="submit" className="btn2">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactListingAgent;



import React, { useState } from 'react';
import "../common.css";
import "../commonsecond.css";

const dummyEstateData = {
  estate_data_option_67: 'John Doe',
  estate_data_option_68: '+1234567890', // Phone number
  estate_data_option_72: 'I am an experienced agent with years of expertise.',
  estate_data_option_73: 'Mon - Fri: 9:00 AM - 6:00 PM',
  estate_data_option_70: 'https://facebook.com/agent',
  estate_data_option_71: 'https://twitter.com/agent',
  estate_data_option_69: 'https://agentwebsite.com',
  estate_data_option_74: '/cm-img2.webp',
  agent_image_url: '/cm-img2.webp',
  agent_url: '/agent/john-doe',
  agent_mail: 'agent@example.com', // Email address
};

const dummyFormValues = {
  firstname: '',
  email: '',
  phone: '',
  address: '',
  message: '',
  fromdate: '',
  todate: '',
  captcha: '',
};

const ContactListingAgent = () => {
  const [formValues, setFormValues] = useState(dummyFormValues);
  const [walletBalance, setWalletBalance] = useState(15); // User's wallet balance
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Visibility for both details

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
  };

  const handleShowDetails = () => {
    if (walletBalance >= 20) {
      setIsDetailsVisible(true);
      setWalletBalance(walletBalance - 20); // Deduct 20 rupees from wallet for both details
    } else {
      alert('Insufficient balance to view the details.');
    }
  };

  return (
    <div className="widget widget-form" id="form-contact">
      <h3 className="widget-title mt-0">Contact Listing Agent</h3>

      {/* Display wallet balance */}
      <div className="wallet-info">
        <p>Your Wallet Balance: ₹{walletBalance}</p>
      </div>

      <div className="contct-info">
        <img
          src={dummyEstateData.estate_data_option_74 || dummyEstateData.agent_image_url}
          alt={dummyEstateData.estate_data_option_67}
        />
        <div className="contct-nf">
          <h3>
            <a href={dummyEstateData.agent_url} title={dummyEstateData.estate_data_option_67}>
              {dummyEstateData.estate_data_option_67}
            </a>
          </h3>

          {/* Show phone and email logic */}
          {isDetailsVisible ? (
            <>
              <span>
                <i className="la la-phone"></i> {dummyEstateData.estate_data_option_68}
              </span>
              <span>
                <a href={`mailto:${dummyEstateData.agent_mail}`} title={dummyEstateData.agent_mail}>
                  <i className="la la-envelope-o"></i> {dummyEstateData.agent_mail}
                </a>
              </span>
            </>
          ) : (
            <button onClick={handleShowDetails} className="btn2">
              Show Phone Number and Email Address (₹20)
            </button>
          )}
        </div>
      </div>

      <div className="post-comment-sec">
        <form onSubmit={handleSubmit} className="contact-form" id="form">
          <div className="form-field">
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="First and Last Name"
              value={formValues.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Address"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Message"
              value={formValues.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button type="submit" className="btn2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactListingAgent;
