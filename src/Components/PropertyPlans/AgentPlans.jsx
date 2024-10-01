import React from "react";

const pricingPlans = [
    {
      name: "Featured Agent",
      price: "2000",
      oldPrice: "10000",
      duration: "90 Days",
      benefits: [
        "90 Days",
        "Featured in Multiple Listings",
        "Boost Visibility",
      ],
      claimed: false,
      formAction: "https://secure.payu.in/_payment",
      hiddenInputs: {
        key: "UvTrjC",
        txnid: "b9d9080c71f0f2e7a546",
        productinfo: "Featured Agent",
        amount: "2000",
        currency_code: "Coins",
        email: "rnjha2001@gmail.com",
        firstname: "Ravindra",
        lastname: "Ravindra",
        surl: "https://townmanor.in/customform/payUSuccess",
        furl: "https://townmanor.in/customform/payUFail",
        phone: "",
        hash: "90ca1e438a4b9597b4dbde035188cc747e75c27cd93e6ab881255b6c59961d66944bce70a2928f730f8131a688daac180c864f74906b34a4ef6c965a2881cc20",
      },
    },
    {
      name: "Agent on Spotlight",
      price: "5000",
      oldPrice: "20000",
      duration: "90 Days",
      benefits: [
        "90 Days",
        "Exclusive Spotlight on Project",
        "Maximize Property Exposure",
      ],
      claimed: false,
      formAction: "https://secure.payu.in/_payment",
      hiddenInputs: {
        key: "UvTrjC",
        txnid: "a60bbf658dbf00611316",
        productinfo: "Agent on Spotlight",
        amount: "5000",
        currency_code: "Coins",
        email: "rnjha2001@gmail.com",
        firstname: "Ravindra",
        lastname: "Ravindra",
        surl: "https://townmanor.in/customform/payUSuccess",
        furl: "https://townmanor.in/customform/payUFail",
        phone: "",
        hash: "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b",
      },
    },
    {
      name: "Property Search Booster",
      price: "7000",
      oldPrice: "25000",
      duration: "90 Days",
      benefits: [
        "90 Days",
        "Priority Listing in Search Results",
        "Increase Property Visibility Based on Searches",
      ],
      claimed: false,
      formAction: "https://secure.payu.in/_payment",
      hiddenInputs: {
        key: "UvTrjC",
        txnid: "d75bb4d1e7634d6a60c3",
        productinfo: "Property Search Booster",
        amount: "7000",
        currency_code: "Coins",
        email: "rnjha2001@gmail.com",
        firstname: "Ravindra",
        lastname: "Ravindra",
        surl: "https://townmanor.in/customform/payUSuccess",
        furl: "https://townmanor.in/customform/payUFail",
        phone: "",
        hash: "39d233e1c0b51d7a99e86b0bc4c517d8a7dcf91a0d12f2053fa67abfa9b5e3be7f60d6b23e8d86c1acbc823c611d637e12b9b4a90bd0ff207b2c08b55702b91f4",
      },
    }
];

const AgentsPlans = () => {
  return (
    <div className="widget-panel rr5">
      <div className="text-center">
        <h2 className="title">Exclusive Plans for Property Promotion</h2>
        <p>
          Elevate your real estate game with our specialized plans. Whether you're looking to feature your listings prominently or boost their visibility in search results, we have the perfect option to enhance your online presence and attract more potential buyers.
        </p>
      </div>
      <div className="content-box">
        <table className="table table-striped data_table price-pg24 dataTable">
          <tbody>
            <tr>
              {pricingPlans.map((plan, index) => (
                <td className="rg5Class" key={index}>
                  <ul className="price-data-22">
                    <li className="pckg-name">{plan.name}</li>
                    {plan.oldPrice && (
                      <li style={{ fontSize: "17px" }}>
                        <del>{plan.oldPrice} Coins</del>
                        <span>/{plan.duration}</span>
                      </li>
                    )}
                    <li className="price_plans">
                      {plan.price} Coins
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
                      <input
                        type="submit"
                        className="subs-now"
                        value={plan.claimed ? "Already Claimed" : "Choose Plan"}
                        disabled={plan.claimed}
                      />
                    </form>
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

export default AgentsPlans;
