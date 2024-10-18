import React from "react";
import { useNavigate } from "react-router-dom";

const ownerDetailsPlans = [
  {
    oldDetails: 5,
    currentDetails: 10,
    oldPrice: "200.00",
    price: "100.00",
    benefits: ["Access to 10 owner details", "Valid for 90 days"],
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "b9d9080c71f0f2e7a546",
      productinfo: "Owner Details Plan 1",
      amount: "100",
      currency_code: "Coins",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "samplehash1",
    },
    claimed: false,
  },
  {
    oldDetails: 20,
    currentDetails: 25,
    oldPrice: "500.00",
    price: "300.00",
    benefits: ["Access to 25 owner details", "Valid for 90 days"],
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "a60bbf658dbf00611316",
      productinfo: "Owner Details Plan 2",
      amount: "300",
      currency_code: "Coins",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "samplehash2",
    },
    claimed: false,
  },
  {
    oldDetails: 50,
    currentDetails: 60,
    oldPrice: "1000.00",
    price: "600.00",
    benefits: ["Access to 75 owner details", "Popular Option" , "Valid for 90 days"],
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "txnid3",
      productinfo: "Owner Details Plan 3",
      amount: "800",
      currency_code: "Coins",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "samplehash3",
    },
    claimed: false,
  },
  {
    oldDetails: 75,
    currentDetails: 100,
    oldPrice: "2000.00",
    price: "1000.00",
    benefits: ["Access to 100 owner details","Valid for 90 days"],
    formAction: "https://secure.payu.in/_payment",
    hiddenInputs: {
      key: "UvTrjC",
      txnid: "txnid3",
      productinfo: "Owner Details Plan 3",
      amount: "800",
      currency_code: "Coins",
      email: "rnjha2001@gmail.com",
      firstname: "Ravindra",
      lastname: "Ravindra",
      surl: "https://townmanor.in/customform/payUSuccess",
      furl: "https://townmanor.in/customform/payUFail",
      phone: "",
      hash: "samplehash3",
    },
    claimed: false,
  },
];

const AgentAccessDetails = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleUnlockClick = (plan) => {
    // Navigate to /payment and pass the plan details
    navigate("/payment", { state: { plan } });
  };

  return (
    <div className="widget-panel rr5">
      <div className="text-center">
        <h2 className="title">Unlock Owner Details with Coins</h2>
        <p>
          Need more information about property owners? Unlock exclusive access
          to owner details using your coins. Choose the plan that fits your
          requirements and get in touch with potential property owners quickly
          and efficiently.
        </p>
      </div>
      <div className="content-box">
        <table className="table table-striped data_table price-pg24 dataTable">
          <tbody>
            <tr>
              {ownerDetailsPlans.map((plan, index) => (
                <td className="rg5Class" key={index}>
                  <ul className="price-data-22">
                    {plan.oldPrice && (
                      <li style={{ fontSize: "17px" }}>
                        <del>
                          <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                          {plan.oldPrice}
                        </del>
                        <span>/90 Days</span>
                      </li>
                    )}
                    <li className="price_plans">
                      <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                      {plan.price}
                      <span>/90 Days</span>
                    </li>
                    <button
                      className="subs-now"
                      onClick={() => handleUnlockClick(plan)}
                    >
                      Unlock Now
                    </button>
                    <div className="bottom_list">
                      {plan.benefits.map((benefit, idx) => (
                        <li key={idx}>
                          <span className="list_icon_">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-check"
                              viewBox="0 0 16 16"
                            >
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
  );
};

export default AgentAccessDetails;








// import React from "react";

// const ownerDetailsPlans = [
//   {
//     oldDetails: 5,
//     currentDetails: 10,
//     oldPrice: 200.00,
//     price: 100.00,
//     benefits: ["Access to 10 owner details", "Valid for 90 days"],
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "b9d9080c71f0f2e7a546",
//       productinfo: "Owner Details Plan 1",
//       amount: "100",
//       currency_code: "Coins",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "samplehash1",
//     },
//     claimed: false,
//   },
//   {
//     oldDetails: 20,
//     currentDetails: 25,
//     oldPrice: 500.00,
//     price: 300.00,
//     benefits: ["Access to 25 owner details", "Valid for 90 days"],
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "a60bbf658dbf00611316",
//       productinfo: "Owner Details Plan 2",
//       amount: "300",
//       currency_code: "Coins",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "samplehash2",
//     },
//     claimed: false,
//   },
//   {
//     oldDetails: 50,
//     currentDetails: 60,
//     oldPrice: 1000.00,
//     price: 600.00,
//     benefits: ["Access to 75 owner details", "Popular Option" , "Valid for 90 days"],
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "txnid3",
//       productinfo: "Owner Details Plan 3",
//       amount: "800",
//       currency_code: "Coins",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "samplehash3",
//     },
//     claimed: false,
//   },
//   {
//     oldDetails: 75,
//     currentDetails: 100,
//     oldPrice: 2000.00,
//     price: 1000.00,
//     benefits: ["Access to 100 owner details","Valid for 90 days"],
//     formAction: "https://secure.payu.in/_payment",
//     hiddenInputs: {
//       key: "UvTrjC",
//       txnid: "txnid3",
//       productinfo: "Owner Details Plan 3",
//       amount: "800",
//       currency_code: "Coins",
//       email: "rnjha2001@gmail.com",
//       firstname: "Ravindra",
//       lastname: "Ravindra",
//       surl: "https://townmanor.in/customform/payUSuccess",
//       furl: "https://townmanor.in/customform/payUFail",
//       phone: "",
//       hash: "samplehash3",
//     },
//     claimed: false,
//   },
// ];

// const AgentAccessDetails = () => {
//   return (
//     <div className="widget-panel rr5">
//       <div className="text-center">
//         <h2 className="title">Unlock Owner Details with Coins</h2>
//         <p>
//           Need more information about property owners? Unlock exclusive access
//           to owner details using your coins. Choose the plan that fits your
//           requirements and get in touch with potential property owners quickly
//           and efficiently.
//         </p>
//       </div>
//       <div className="content-box">
//         <table className="table table-striped data_table price-pg24 dataTable">
//           <tbody>
//             <tr>
//               {ownerDetailsPlans.map((plan, index) => (
//                 <td className="rg5Class" key={index}>
//                   <ul className="price-data-22">
//                     {/* <li className="details-count">
//                       <strong>Details: {plan.currentDetails}</strong>
//                       <del> (Old: {plan.oldDetails})</del>
//                     </li> */}
//                     {plan.oldPrice && (
//                       <li style={{ fontSize: "17px" }}>
//                         <del>
//                           <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                           {plan.oldPrice}
//                         </del>
//                         <span>/90 Days</span>
//                       </li>
//                     )}
//                     <li className="price_plans">
//                       <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                       {plan.price}
//                       <span>/90 Days</span>
//                     </li>
//                     <form action={plan.formAction} method="post">
//                       {Object.keys(plan.hiddenInputs).map((key) => (
//                         <input
//                           key={key}
//                           type="hidden"
//                           name={key}
//                           value={plan.hiddenInputs[key]}
//                         />
//                       ))}
//                       <input
//                         type="submit"
//                         className="subs-now"
//                         value={"Unlock Now"}
//                       />
//                     </form>
//                     <div className="bottom_list">
//                       {plan.benefits.map((benefit, idx) => (
//                         <li key={idx}>
//                           <span className="list_icon_">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               fill="currentColor"
//                               className="bi bi-check"
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"></path>
//                             </svg>
//                           </span>
//                           {benefit}
//                         </li>
//                       ))}
//                     </div>
//                   </ul>
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AgentAccessDetails;
