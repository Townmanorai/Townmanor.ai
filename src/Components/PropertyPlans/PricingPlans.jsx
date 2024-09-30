// import React from "react";
// import "../common.css";
// import "../commonsecond.css";
// import "./PricingPlans.css";
// import FAQSection from "./SubscriptionFAQSection";

// const pricingPlans = [
//   {
//     name: "Free",
//     price: "0.00",
//     oldPrice: null,
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: true,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "b9d9080c71f0f2e7a546",
//       productinfo: "Free",
//       amount: "0",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "90ca1e438a4b9597b4dbde035188cc747e75c27cd93e6ab881255b6c59961d66944bce70a2928f730f8131a688daac180c864f74906b34a4ef6c965a2881cc20",
//     }
//   },
//   {
//     name: "Starter",
//     price: "200.00",
//     oldPrice: "1000.00",
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "a60bbf658dbf00611316",
//       productinfo: "Starter",
//       amount: "236",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b",
//     }
//   },
//   {
//     name: "Premium",
//     price: "500.00",
//     oldPrice: "2500.00",
//     duration: "30 Days",
//     benefits: [
//       "30 Days",
//       "5 : Number of Listing",
//       "3 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "138bbe8209b70752bf5c",
//       productinfo: "Premium",
//       amount: "590",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "188b6f8bf863375a7a831b3d010f9963407f3b0182d2c12f70b54c88b84ae781aa08131d710807c8acecd3d2ada27ea6f7559784bd1923c4b14ae4a26e3dd0b2",
//     }
//   },
//   {
//     name: "Business",
//     price: "2500.00",
//     oldPrice: "12500.00",
//     duration: "90 Days",
//     benefits: [
//       "90 Days",
//       "25 : Number of Listing",
//       "18 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "51dde8b5e503d3f31950",
//       productinfo: "Business",
//       amount: "2950",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "b1be88ffd1350460394fa8d03049a67cb0e08192c3aa3e907cf1b5d4be14d3d1f5e0a28ef03f8326c693a335b56afa9b3130dd5ddefcb607c8363feccde98673",
//     }
//   },



// ];

// const PricingPlans = () => {
//   return (
//     <>
//     <div className="wpart">
//     <section className="Pricing_palns">
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-lg-12">
//             <div className="widget-panel rr5">
//               <div className="text-center">
//                 <h2 className="title">
//                   Find the Perfect Plan for Your Property Needs
//                 </h2>
//                 <p>
//                   Explore our tailored pricing plans designed to meet your
//                   specific real estate goals. Whether you’re looking to buy,
//                   sell, or invest, we offer flexible options that fit your
//                   budget and requirements. Choose the plan that’s right for you
//                   and take the next step with confidence.
//                 </p>
//               </div>
//               <div className="content-box">
//                 <table
//                   className="table table-striped data_table price-pg24 dataTable"
//                   id="DataTables_Table_0"
//                 >
//                   <tbody>
//                     <tr>
//                       {pricingPlans.map((plan, index) => (
//                         <td className="rg5Class" key={index}>
//                           <ul className="price-data-22">
//                             <li className="pckg-name">{plan.name}</li>
//                             {plan.oldPrice && (
//                               <li style={{ fontSize: "17px" }}>
//                                 <del>
//                                   <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                   {plan.oldPrice}
//                                 </del>
//                                 <span>/{plan.duration}</span>
//                               </li>
//                             )}
//                             <li className="price_plans">
//                               <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                               {plan.price}
//                               <span>/{plan.duration}</span>
//                             </li>
//                             <form action={plan.formAction} method="post">
//                               {Object.keys(plan.hiddenInputs).map((key) => (
//                                 <input
//                                   key={key}
//                                   type="hidden"
//                                   name={key}
//                                   value={plan.hiddenInputs[key]}
//                                 />
//                               ))}
//                               {plan.claimed ? (
//                                 <a href="#" className="subs-now">
//                                   Already Claimed
//                                 </a>
//                               ) : (
//                                 <input
//                                   type="submit"
//                                   className="subs-now"
//                                   value="Choose Plan"
//                                 />
//                               )}
//                             </form>
//                             <div className="bottom_list">
//                               {plan.benefits.map((benefit, idx) => (
//                                 <li key={idx}>
//                                   <span className="list_icon_">
//                                     <svg
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width="16"
//                                       height="16"
//                                       fill="currentColor"
//                                       className="bi bi-check"
//                                       viewBox="0 0 16 16"
//                                     >
//                                       <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
//                                     </svg>
//                                   </span>
//                                   {benefit}
//                                 </li>
//                               ))}
//                             </div>
//                           </ul>
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="widget-panel rr5">
//               <div className="text-center">
//                 <h2 className="title">
//                   Find the Perfect Plan for Your Property Needs
//                 </h2>
//                 <p>
//                   Explore our tailored pricing plans designed to meet your
//                   specific real estate goals. Whether you’re looking to buy,
//                   sell, or invest, we offer flexible options that fit your
//                   budget and requirements. Choose the plan that’s right for you
//                   and take the next step with confidence.
//                 </p>
//               </div>
//               <div className="content-box">
//                 <table
//                   className="table table-striped data_table price-pg24 dataTable"
//                   id="DataTables_Table_0"
//                 >
//                   <tbody>
//                     <tr>
//                       {pricingPlans.map((plan, index) => (
//                         <td className="rg5Class" key={index}>
//                           <ul className="price-data-22">
//                             <li className="pckg-name">{plan.name}</li>
//                             {plan.oldPrice && (
//                               <li style={{ fontSize: "17px" }}>
//                                 <del>
//                                   <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                   {plan.oldPrice}
//                                 </del>
//                                 <span>/{plan.duration}</span>
//                               </li>
//                             )}
//                             <li className="price_plans">
//                               <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                               {plan.price}
//                               <span>/{plan.duration}</span>
//                             </li>
//                             <form action={plan.formAction} method="post">
//                               {Object.keys(plan.hiddenInputs).map((key) => (
//                                 <input
//                                   key={key}
//                                   type="hidden"
//                                   name={key}
//                                   value={plan.hiddenInputs[key]}
//                                 />
//                               ))}
//                               {plan.claimed ? (
//                                 <a href="#" className="subs-now">
//                                   Already Claimed
//                                 </a>
//                               ) : (
//                                 <input
//                                   type="submit"
//                                   className="subs-now"
//                                   value="Choose Plan"
//                                 />
//                               )}
//                             </form>
//                             <div className="bottom_list">
//                               {plan.benefits.map((benefit, idx) => (
//                                 <li key={idx}>
//                                   <span className="list_icon_">
//                                     <svg
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width="16"
//                                       height="16"
//                                       fill="currentColor"
//                                       className="bi bi-check"
//                                       viewBox="0 0 16 16"
//                                     >
//                                       <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
//                                     </svg>
//                                   </span>
//                                   {benefit}
//                                 </li>
//                               ))}
//                             </div>
//                           </ul>
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     <FAQSection />
//     </div>
// </>
//   );
// };

// export default PricingPlans;


//---------------------------------------------------------------------------------------------------------------

// import React from "react";
// import "../common.css";
// import "../commonsecond.css";
// import "./PricingPlans.css";
// import FAQSection from "./SubscriptionFAQSection";
// import AgentsPlans from "./AgentPlans";
// import AgentAccessDetails from "./AgentAccessDetails";
// import PlansInfo from "./PlansInfo";

// const pricingPlans = [
//   {
//     name: "Free",
//     price: "0.00",
//     oldPrice: null,
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: true,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "b9d9080c71f0f2e7a546",
//       productinfo: "Free",
//       amount: "0",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "90ca1e438a4b9597b4dbde035188cc747e75c27cd93e6ab881255b6c59961d66944bce70a2928f730f8131a688daac180c864f74906b34a4ef6c965a2881cc20",
//     }
//   },
//   {
//     name: "Starter",
//     price: "200.00",
//     oldPrice: "1000.00",
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "a60bbf658dbf00611316",
//       productinfo: "Starter",
//       amount: "236",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b",
//     }
//   },
//   {
//     name: "Premium",
//     price: "500.00",
//     oldPrice: "2500.00",
//     duration: "30 Days",
//     benefits: [
//       "30 Days",
//       "5 : Number of Listing",
//       "3 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "138bbe8209b70752bf5c",
//       productinfo: "Premium",
//       amount: "590",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "188b6f8bf863375a7a831b3d010f9963407f3b0182d2c12f70b54c88b84ae781aa08131d710807c8acecd3d2ada27ea6f7559784bd1923c4b14ae4a26e3dd0b2",
//     }
//   },
//   {
//     name: "Business",
//     price: "2500.00",
//     oldPrice: "12500.00",
//     duration: "90 Days",
//     benefits: [
//       "90 Days",
//       "25 : Number of Listing",
//       "18 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "51dde8b5e503d3f31950",
//       productinfo: "Business",
//       amount: "2950",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "b1be88ffd1350460394fa8d03049a67cb0e08192c3aa3e907cf1b5d4be14d3d1f5e0a28ef03f8326c693a335b56afa9b3130dd5ddefcb607c8363feccde98673",
//     }
//   },



// ];

// const PricingPlans = () => {
//   return (
//     <>
//     <div className="wpart">
//     <section className="Pricing_palns">
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-lg-12">
//             <div className="widget-panel rr5">
//               <div className="text-center">
//                 <h2 className="title">
//                   Find the Perfect Plan for Your Property Needs
//                 </h2>
//                 <p>
//                   Explore our tailored pricing plans designed to meet your
//                   specific real estate goals. Whether you’re looking to buy,
//                   sell, or invest, we offer flexible options that fit your
//                   budget and requirements. Choose the plan that’s right for you
//                   and take the next step with confidence.
//                 </p>
//               </div>
//               <div className="content-box">
//                 <table
//                   className="table table-striped data_table price-pg24 dataTable"
//                   id="DataTables_Table_0"
//                 >
//                   <tbody>
//                     <tr>
//                       {pricingPlans.map((plan, index) => (
//                         <td className="rg5Class" key={index}>
//                           <ul className="price-data-22">
//                             <li className="pckg-name">{plan.name}</li>
//                             {plan.oldPrice && (
//                               <li style={{ fontSize: "17px" }}>
//                                 <del>
//                                   <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                   {plan.oldPrice}
//                                 </del>
//                                 <span>/{plan.duration}</span>
//                               </li>
//                             )}
//                             <li className="price_plans">
//                               <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                               {plan.price}
//                               <span>/{plan.duration}</span>
//                             </li>
//                             <form action={plan.formAction} method="post">
//                               {Object.keys(plan.hiddenInputs).map((key) => (
//                                 <input
//                                   key={key}
//                                   type="hidden"
//                                   name={key}
//                                   value={plan.hiddenInputs[key]}
//                                 />
//                               ))}
//                               {plan.claimed ? (
//                                 <a href="#" className="subs-now">
//                                   Already Claimed
//                                 </a>
//                               ) : (
//                                 <input
//                                   type="submit"
//                                   className="subs-now"
//                                   value="Choose Plan"
//                                 />
//                               )}
//                             </form>
//                             <div className="bottom_list">
//                               {plan.benefits.map((benefit, idx) => (
//                                 <li key={idx}>
//                                   <span className="list_icon_">
//                                     <svg
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width="16"
//                                       height="16"
//                                       fill="currentColor"
//                                       className="bi bi-check"
//                                       viewBox="0 0 16 16"
//                                     >
//                                       <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
//                                     </svg>
//                                   </span>
//                                   {benefit}
//                                 </li>
//                               ))}
//                             </div>
//                           </ul>
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <AgentsPlans />
//             <AgentAccessDetails />
//             <PlansInfo />
//           </div>
//         </div>
//       </div>
//     </section>
//     <FAQSection />
//     </div>
// </>
//   );
// };

// export default PricingPlans;



// import React, { useEffect, useRef } from "react";
// import { Fireworks } from "fireworks-js";  // Import fireworks-js
// import "../common.css";
// import "../commonsecond.css";
// import "./PricingPlans.css";
// import FAQSection from "./SubscriptionFAQSection";
// import AgentsPlans from "./AgentPlans";
// import AgentAccessDetails from "./AgentAccessDetails";
// import PlansInfo from "./PlansInfo";

// const pricingPlans = [
//   {
//     name: "Free",
//     price: "0.00",
//     oldPrice: null,
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: true,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "b9d9080c71f0f2e7a546",
//       productinfo: "Free",
//       amount: "0",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "90ca1e438a4b9597b4dbde035188cc747e75c27cd93e6ab881255b6c59961d66944bce70a2928f730f8131a688daac180c864f74906b34a4ef6c965a2881cc20",
//     }
//   },
//   {
//     name: "Starter",
//     price: "200.00",
//     oldPrice: "1000.00",
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "a60bbf658dbf00611316",
//       productinfo: "Starter",
//       amount: "236",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b",
//     }
//   },
//   {
//     name: "Premium",
//     price: "500.00",
//     oldPrice: "2500.00",
//     duration: "30 Days",
//     benefits: [
//       "30 Days",
//       "5 : Number of Listing",
//       "3 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "138bbe8209b70752bf5c",
//       productinfo: "Premium",
//       amount: "590",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "188b6f8bf863375a7a831b3d010f9963407f3b0182d2c12f70b54c88b84ae781aa08131d710807c8acecd3d2ada27ea6f7559784bd1923c4b14ae4a26e3dd0b2",
//     }
//   },
//   {
//     name: "Business",
//     price: "2500.00",
//     oldPrice: "12500.00",
//     duration: "90 Days",
//     benefits: [
//       "90 Days",
//       "25 : Number of Listing",
//       "18 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "51dde8b5e503d3f31950",
//       productinfo: "Business",
//       amount: "2950",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "b1be88ffd1350460394fa8d03049a67cb0e08192c3aa3e907cf1b5d4be14d3d1f5e0a28ef03f8326c693a335b56afa9b3130dd5ddefcb607c8363feccde98673",
//     }
//   },



// ];

// const PricingPlans = () => {
//   const fireworksContainerRef = useRef(null);

//   const triggerFireworks = () => {
//     const container = fireworksContainerRef.current;

//     // Initialize fireworks
//     const fireworks = new Fireworks(container, {
//       autoresize: true,
//       opacity: 0.5,
//       acceleration: 1.05,
//       friction: 0.97,
//       gravity: 1.5,
//       particles: 150,
//       traceLength: 3,
//       traceSpeed: 10,
//     });

//     fireworks.start();

//     // Stop fireworks after a few seconds
//     setTimeout(() => {
//       fireworks.stop();
//     }, 3000); // 3 seconds
//   };

//   return (
//     <>
//       {/* Fireworks container */}
//       <div ref={fireworksContainerRef} className="fireworks-container"></div>

//       <div className="wpart">
//         <section className="Pricing_palns">
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-12">
//                 <div className="widget-panel rr5">
//                   <div className="text-center">
//                     <h2 className="title">
//                       Find the Perfect Plan for Your Property Needs
//                     </h2>
//                     <p>
//                       Explore our tailored pricing plans designed to meet your
//                       specific real estate goals. Whether you’re looking to buy,
//                       sell, or invest, we offer flexible options that fit your
//                       budget and requirements. Choose the plan that’s right for
//                       you and take the next step with confidence.
//                     </p>
//                   </div>
//                   <div className="content-box">
//                     <table
//                       className="table table-striped data_table price-pg24 dataTable"
//                       id="DataTables_Table_0"
//                     >
//                       <tbody>
//                         <tr>
//                           {pricingPlans.map((plan, index) => (
//                             <td className="rg5Class" key={index}>
//                               <ul className="price-data-22">
//                                 <li className="pckg-name">{plan.name}</li>
//                                 {plan.oldPrice && (
//                                   <li style={{ fontSize: "17px" }}>
//                                     <del>
//                                       <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                       {plan.oldPrice}
//                                     </del>
//                                     <span>/{plan.duration}</span>
//                                   </li>
//                                 )}
//                                 <li className="price_plans">
//                                   <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                   {plan.price}
//                                   <span>/{plan.duration}</span>
//                                 </li>
//                                 <form action={plan.formAction} method="post">
//                                   {Object.keys(plan.hiddenInputs).map((key) => (
//                                     <input
//                                       key={key}
//                                       type="hidden"
//                                       name={key}
//                                       value={plan.hiddenInputs[key]}
//                                     />
//                                   ))}
//                                   {plan.claimed ? (
//                                     <a href="#" className="subs-now">
//                                       Already Claimed
//                                     </a>
//                                   ) : (
//                                     <input
//                                       type="submit"
//                                       className="subs-now"
//                                       value="Choose Plan"
//                                       onClick={triggerFireworks}  // Fireworks on click
//                                     />
//                                   )}
//                                 </form>
//                                 <div className="bottom_list">
//                                   {plan.benefits.map((benefit, idx) => (
//                                     <li key={idx}>
//                                       <span className="list_icon_">
//                                         <svg
//                                           xmlns="http://www.w3.org/2000/svg"
//                                           width="16"
//                                           height="16"
//                                           fill="currentColor"
//                                           className="bi bi-check"
//                                           viewBox="0 0 16 16"
//                                         >
//                                           <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
//                                         </svg>
//                                       </span>
//                                       {benefit}
//                                     </li>
//                                   ))}
//                                 </div>
//                               </ul>
//                             </td>
//                           ))}
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <AgentsPlans />
//                 <AgentAccessDetails />
//                 <PlansInfo />
//               </div>
//             </div>
//           </div>
//         </section>
//         <FAQSection />
//       </div>
//     </>
//   );
// };

// export default PricingPlans;



// --------------------------------------------------------------------------------------------------------------------


// import React, { useEffect, useRef } from "react";
// import { Fireworks } from "fireworks-js";  // Import fireworks-js
// import "../common.css";
// import "../commonsecond.css";
// import "./PricingPlans.css";
// import FAQSection from "./SubscriptionFAQSection";
// import AgentsPlans from "./AgentPlans";
// import AgentAccessDetails from "./AgentAccessDetails";
// import PlansInfo from "./PlansInfo";

// const pricingPlans = [
//   {
//     name: "Free",
//     price: "0.00",
//     oldPrice: null,
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: true,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "b9d9080c71f0f2e7a546",
//       productinfo: "Free",
//       amount: "0",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "90ca1e438a4b9597b4dbde035188cc747e75c27cd93e6ab881255b6c59961d66944bce70a2928f730f8131a688daac180c864f74906b34a4ef6c965a2881cc20",
//     }
//   },
//   {
//     name: "Starter",
//     price: "200.00",
//     oldPrice: "1000.00",
//     duration: "One Time",
//     benefits: [
//       "One Time",
//       "1 : Number of Listing",
//       "1 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "a60bbf658dbf00611316",
//       productinfo: "Starter",
//       amount: "236",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b",
//     }
//   },
//   {
//     name: "Premium",
//     price: "500.00",
//     oldPrice: "2500.00",
//     duration: "30 Days",
//     benefits: [
//       "30 Days",
//       "5 : Number of Listing",
//       "3 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "138bbe8209b70752bf5c",
//       productinfo: "Premium",
//       amount: "590",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "188b6f8bf863375a7a831b3d010f9963407f3b0182d2c12f70b54c88b84ae781aa08131d710807c8acecd3d2ada27ea6f7559784bd1923c4b14ae4a26e3dd0b2",
//     }
//   },
//   {
//     name: "Business",
//     price: "2500.00",
//     oldPrice: "12500.00",
//     duration: "90 Days",
//     benefits: [
//       "90 Days",
//       "25 : Number of Listing",
//       "18 : Featured Listing Limit",
//     ],
//     claimed: false,
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "51dde8b5e503d3f31950",
//       productinfo: "Business",
//       amount: "2950",
//       currency_code: "INR",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "b1be88ffd1350460394fa8d03049a67cb0e08192c3aa3e907cf1b5d4be14d3d1f5e0a28ef03f8326c693a335b56afa9b3130dd5ddefcb607c8363feccde98673",
//     }
//   },



// ];

// const PricingPlans = () => {
//   const fireworksContainerRef = useRef(null);

//   useEffect(() => {
//     const container = fireworksContainerRef.current;

//     // Initialize fireworks
//     const fireworks = new Fireworks(container, {
//       autoresize: true,
//       opacity: 0.5,
//       acceleration: 1.05,
//       friction: 0.97,
//       gravity: 1.5,
//       particles: 500,
//       traceLength: 100,
//       traceSpeed: 10,
//     });

//     // Start fireworks when component mounts
//     fireworks.start();

//     // Stop fireworks after 3 seconds
//     setTimeout(() => {
//       fireworks.stop();
//     }, 10000); // 3 seconds

//     // Cleanup function to stop fireworks if component unmounts
//     return () => {
//       fireworks.stop();
//     };
//   }, []);  // Empty dependency array ensures this only runs once when the component mounts

//   return (
//     <>
//       {/* Fireworks container positioned in the background */}
//       <div ref={fireworksContainerRef} className="fireworks-container"></div>

//       <div className="wpart">
//         <div className="diwali-celebration">
//           <div className="diwali-banner">
//             <h2>Happy Diwali!</h2>
//             <p>Celebrate the festival of lights with us</p>
//           </div>
//           <div className="diwali-lights">
//             <div className="light"></div>
//             <div className="light"></div>
//             <div className="light"></div>
//             <div className="light"></div>
//             <div className="light"></div>
//           </div>
//           <div className="diwali-diyas">
//             <div className="diya"></div>
//             <div className="diya"></div>
//             <div className="diya"></div>
//           </div>
//         </div>

//         <section className="Pricing_palns">
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-12">
//                 <div className="widget-panel rr5">
//                   <div className="text-center">
//                     <h2 className="title">
//                       Find the Perfect Plan for Your Property Needs
//                     </h2>
//                     <p>
//                       Explore our tailored pricing plans designed to meet your
//                       specific real estate goals. Whether you’re looking to buy,
//                       sell, or invest, we offer flexible options that fit your
//                       budget and requirements. Choose the plan that’s right for
//                       you and take the next step with confidence.
//                     </p>
//                   </div>
//                   <div className="content-box">
//                     <table
//                       className="table table-striped data_table price-pg24 dataTable"
//                       id="DataTables_Table_0"
//                     >
//                       <tbody>
//                         <tr>
//                           {pricingPlans.map((plan, index) => (
//                             <td className="rg5Class" key={index}>
//                               <ul className="price-data-22">
//                                 <li className="pckg-name">{plan.name}</li>
//                                 {plan.oldPrice && (
//                                   <li style={{ fontSize: "17px" }}>
//                                     <del>
//                                       <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                       {plan.oldPrice}
//                                     </del>
//                                     <span>/{plan.duration}</span>
//                                   </li>
//                                 )}
//                                 <li className="price_plans">
//                                   <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                                   {plan.price}
//                                   <span>/{plan.duration}</span>
//                                 </li>
//                                 <form action={plan.formAction} method="post">
//                                   {Object.keys(plan.hiddenInputs).map((key) => (
//                                     <input
//                                       key={key}
//                                       type="hidden"
//                                       name={key}
//                                       value={plan.hiddenInputs[key]}
//                                     />
//                                   ))}
//                                   {plan.claimed ? (
//                                     <a href="#" className="subs-now">
//                                       Already Claimed
//                                     </a>
//                                   ) : (
//                                     <input
//                                       type="submit"
//                                       className="subs-now"
//                                       value="Choose Plan"
//                                     />
//                                   )}
//                                 </form>
//                                 <div className="bottom_list">
//                                   {plan.benefits.map((benefit, idx) => (
//                                     <li key={idx}>
//                                       <span className="list_icon_">
//                                         <svg
//                                           xmlns="http://www.w3.org/2000/svg"
//                                           width="16"
//                                           height="16"
//                                           fill="currentColor"
//                                           className="bi bi-check"
//                                           viewBox="0 0 16 16"
//                                         >
//                                           <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
//                                         </svg>
//                                       </span>
//                                       {benefit}
//                                     </li>
//                                   ))}
//                                 </div>
//                               </ul>
//                             </td>
//                           ))}
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <AgentsPlans />
//                 <AgentAccessDetails />
//                 <PlansInfo />
//               </div>
//             </div>
//           </div>
//         </section>
//         <FAQSection />
//       </div>
//     </>
//   );
// };

// export default PricingPlans;


import React from "react";
import FireworksComponent from "./Fireworks";  // Import Fireworks component
import Diya from "./Diya";  // Import Diya component
import "../common.css";
import "../commonsecond.css";
import "./PricingPlans.css";
import FAQSection from "./SubscriptionFAQSection";
import AgentsPlans from "./AgentPlans";
import AgentAccessDetails from "./AgentAccessDetails";
import PlansInfo from "./PlansInfo";

const pricingPlans = [
  {
    name: "Free",
    price: "0.00",
    oldPrice: null,
    duration: "One Time",
    benefits: [
      "One Time",
      "1 : Number of Listing",
      "1 : Featured Listing Limit",
    ],
    claimed: true,
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "b9d9080c71f0f2e7a546",
      productinfo: "Free",
      amount: "0",
      currency_code: "INR",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "90ca1e438a4b9597b4dbde035188cc747e75c27cd93e6ab881255b6c59961d66944bce70a2928f730f8131a688daac180c864f74906b34a4ef6c965a2881cc20",
    }
  },
  {
    name: "Starter",
    price: "200.00",
    oldPrice: "1000.00",
    duration: "One Time",
    benefits: [
      "One Time",
      "1 : Number of Listing",
      "1 : Featured Listing Limit",
    ],
    claimed: false,
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "a60bbf658dbf00611316",
      productinfo: "Starter",
      amount: "236",
      currency_code: "INR",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b",
    }
  },
  {
    name: "Premium",
    price: "500.00",
    oldPrice: "2500.00",
    duration: "30 Days",
    benefits: [
      "30 Days",
      "5 : Number of Listing",
      "3 : Featured Listing Limit",
    ],
    claimed: false,
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "138bbe8209b70752bf5c",
      productinfo: "Premium",
      amount: "590",
      currency_code: "INR",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "188b6f8bf863375a7a831b3d010f9963407f3b0182d2c12f70b54c88b84ae781aa08131d710807c8acecd3d2ada27ea6f7559784bd1923c4b14ae4a26e3dd0b2",
    }
  },
  {
    name: "Business",
    price: "2500.00",
    oldPrice: "12500.00",
    duration: "90 Days",
    benefits: [
      "90 Days",
      "25 : Number of Listing",
      "18 : Featured Listing Limit",
    ],
    claimed: false,
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "51dde8b5e503d3f31950",
      productinfo: "Business",
      amount: "2950",
      currency_code: "INR",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "b1be88ffd1350460394fa8d03049a67cb0e08192c3aa3e907cf1b5d4be14d3d1f5e0a28ef03f8326c693a335b56afa9b3130dd5ddefcb607c8363feccde98673",
    }
  },
  

  
];

const PricingPlans = () => {
  return (
    <>
      <FireworksComponent />
      <Diya />

      <div className="wpart">
        <section className="Pricing_palns">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="widget-panel rr5">
                  <div className="text-center">
                    <h2 className="title">Find the Perfect Plan for Your Property Needs</h2>
                    <p>Explore our tailored pricing plans designed to meet your specific real estate goals. Whether you’re looking to buy, sell, or invest, we offer flexible options that fit your budget and requirements. Choose the plan that’s right for you and take the next step with confidence.</p>
                  </div>
                  <div className="content-box">
                    <table className="table table-striped data_table price-pg24 dataTable" id="DataTables_Table_0">
                      <tbody>
                        <tr>
                          {pricingPlans.map((plan, index) => (
                            <td className="rg5Class" key={index}>
                              <ul className="price-data-22">
                                <li className="pckg-name">{plan.name}</li>
                                {plan.oldPrice && (
                                  <li style={{ fontSize: "17px" }}>
                                    <del>
                                      <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                                      {plan.oldPrice}
                                    </del>
                                    <span>/{plan.duration}</span>
                                  </li>
                                )}
                                <li className="price_plans">
                                  <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                                  {plan.price}
                                  <span>/{plan.duration}</span>
                                </li>
                                <form action={plan.formAction} method="post">
                                  {Object.keys(plan.hiddenInputs).map((key) => (
                                    <input
                                      key={key}
                                      type="hidden"
                                      name={key}
                                      value={plan.hiddenInputs[key]}
                                    />
                                  ))}
                                  {plan.claimed ? (
                                    <a href="#" className="subs-now">
                                      Already Claimed
                                    </a>
                                  ) : (
                                    <input
                                      type="submit"
                                      className="subs-now"
                                      value="Choose Plan"
                                    />
                                  )}
                                </form>
                                <div className="bottom_list">
                                  {plan.benefits.map((benefit, idx) => (
                                    <li key={idx}>
                                      <span className="list_icon_">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
                                        </svg>
                                      </span>
                                      {benefit}
                                    </li>
                                  ))}
                                </div>
                              </ul>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <AgentsPlans />
                <AgentAccessDetails />
                <PlansInfo />
              </div>
            </div>
          </div>
        </section>
        <FAQSection />
      </div>
    </>
  );
};

export default PricingPlans;
