// import React, { useState } from 'react';
// import axios from 'axios';
// import './PaymentForm.css'; 

// const PaymentForm = () => {
//   const [paymentData, setPaymentData] = useState({
//     firstname: 'Ravindra',
//     email: 'ravindranathjha76@gmail.com',
//     phone: '935415623',
//     amount: '100',
//     productinfo: 'Product Name',
//     surl: 'http://localhost:5173/success', // Success URL
//     // furl: 'http://localhost:5173/failure', // Failure URL
//     furl: 'https://townmanor.in/', // Failure URL
//   });

//   const handleChange = (e) => {
//     setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
//   };

//   const initiatePayment = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(paymentData);
//       const res = await axios.post('http://localhost:3030/payu/payment', paymentData);
//       const { paymentUrl, params } = res.data;
//       console.log( paymentUrl, params);

//       // params.surl = `http://localhost:5173/success?txnid=${params.txnid}&amount=${params.amount}&firstname=${params.firstname}&email=${params.email}`;
//       // params.furl = `http://localhost:5173/failure?txnid=${params.txnid}&amount=${params.amount}&firstname=${params.firstname}&email=${params.email}`;

//       // Create a form element
//       const form = document.createElement('form');
//       form.method = 'POST';
//       form.action = paymentUrl;

//       // Add the hidden input fields in the form
//       form.innerHTML = `
//         <input type="hidden" name="key" value="${params.key}" />
//         <input type="hidden" name="txnid" value="${params.txnid}" />
//         <input type="hidden" name="amount" value="${params.amount}" />
//         <input type="hidden" name="productinfo" value="${params.productinfo}" />
//         <input type="hidden" name="firstname" value="${params.firstname}" />
//         <input type="hidden" name="email" value="${params.email}" />
//         <input type="hidden" name="phone" value="${params.phone}" />
//         <input type="hidden" name="hash" value="${params.hash}" />
//         <input type="hidden" name="surl" value="${params.surl}" />
//         <input type="hidden" name="furl" value="${params.furl}" />
//         <input type="hidden" name="service_provider" value="${params.service_provider}" />
//         <input type="submit" value="Pay Now" />
//       `;
//       console.log(form.innerHTML);
//       // Append the form to the body and submit
//       document.body.appendChild(form);
//       form.submit();
//     } catch (error) {
//       console.error('Payment initiation failed: ', error);
//     }
//   };

//   return (
//     <form className="payment-form" onSubmit={initiatePayment}>
//       <h2 className="form-title">Payment Information</h2>

//       <div className="form-group">
//         <label htmlFor="firstname">First Name:</label>
//         <input
//           type="text"
//           id="firstname"
//           name="firstname"
//           value={paymentData.firstname}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={paymentData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="phone">Phone:</label>
//         <input
//           type="text"
//           id="phone"
//           name="phone"
//           value={paymentData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="amount">Amount:</label>
//         <input
//           type="number"
//           id="amount"
//           name="amount"
//           value={paymentData.amount}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <button type="submit" className="submit-button">Pay Now</button>
//     </form>
//   );
// };

// export default PaymentForm;



//--------------------------------------------------------------------------------------------------------



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
  const location = useLocation();
  const { plan } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    firstname: 'ravindra',
    email: 'ravindranathjha76@gmail.com',
    phone: '935415623',
    amount: plan ? plan.price : '100',
    productinfo: plan ? plan.name : 'Product Name',
    surl: 'https://townmanor.ai/api/payu/success',
    furl: 'https://townmanor.ai/api/payu/failure',
  });

  console.log("PaymentForm", paymentData)
  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const initiatePayment = async (e) => {
    e.preventDefault();
    try {
      console.log(paymentData);
      const res = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);
      const { paymentUrl, params } = res.data;

      // Create a form element
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;

      // Add the hidden input fields in the form
      form.innerHTML = `
        <input type="hidden" name="key" value="${params.key}" />
        <input type="hidden" name="txnid" value="${params.txnid}" />
        <input type="hidden" name="amount" value="${params.amount}" />
        <input type="hidden" name="productinfo" value="${params.productinfo}" />
        <input type="hidden" name="firstname" value="${params.firstname}" />
        <input type="hidden" name="email" value="${params.email}" />
        <input type="hidden" name="phone" value="${params.phone}" />
        <input type="hidden" name="hash" value="${params.hash}" />
        <input type="hidden" name="surl" value="${params.surl}" />
        <input type="hidden" name="furl" value="${params.furl}" />
        <input type="hidden" name="service_provider" value="${params.service_provider}" />
        <input type="submit" value="Pay Now" />
      `;
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment initiation failed: ', error);
    }
  };

  return (
    <div className='div-payment'>
      <form className="payment-form" onSubmit={initiatePayment}>
        <h2 className="form-title">Payment Information</h2>

        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={paymentData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={paymentData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={paymentData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;
