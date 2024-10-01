import React from 'react';
import "../common.css";
import "../commonsecond.css";

// Dummy JSON data
const dummyData = [
  {
    bankName: "IDFC FIRST Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/idfc.webp",
    interestRate: "8.75% - 10.5%",
    loanAmount: "₹1L - ₹10Cr",
    emiPerLakh: "₹2,064 - ₹2,149",
    processingFees: "Up to 3.5% of the loan amount",
    prePaymentCharges: "Foreclosure charges 5% of the loan amount"
  },
  {
    bankName: "HDFC Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/hdfc-bank.webp",
    interestRate: "8.35% - 9.4%",
    loanAmount: "₹1L - ₹10Cr",
    emiPerLakh: "₹2,044 - ₹2,095",
    processingFees: "₹4,999 One time fee",
    prePaymentCharges: "4% of the outstanding principal (loan tenure between 13 - 24 months)"
  },
  {
    bankName: "Axis Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/axis-bank.webp",
    interestRate: "8.7% - 13.3%",
    loanAmount: "₹1L - ₹5Cr",
    emiPerLakh: "₹2,061 - ₹2,291",
    processingFees: "0.50%(Min ₹10,000) one time fee",
    prePaymentCharges: "0 - 2%"
  },
  {
    bankName: "Kotak Bank Home Loan",
    bankImage: "https://townmanor.in/templates/selio/assets/selfImages/kotak-mahindra.webp",
    interestRate: "8.7% - 9.6%",
    loanAmount: "₹10L - ₹10Cr",
    emiPerLakh: "₹2,061 - ₹2,105",
    processingFees: "Up to 3% of loan amount",
    prePaymentCharges: "0-12 months: Lock-in period 1- 3 years: 4% + GST 3 years onwards: 2% + GST"
  }
];

const BankLoanSection = () => {
  return (
    <div className="container">
      {dummyData.map((bank, index) => (
        <div key={index} className="DescriptionBank_FirstTable position-relative mt-4">
          <div className="DescriptionBank_Details">
            <div className="InterestRateNew_indTiles">
              <div className="InterestRateNew_tileHeading InterestRateNew_borderleft">
                <div className="InterestRateNew_bankName">
                  <figure>
                    <img
                      alt={`${bank.bankName}`}
                      loading="lazy"
                      width="150"
                      height="35"
                      decoding="async"
                      className="imgResponsive cursorPointer InterestRateNew_banklogo__abhL2"
                      style={{ color: 'transparent' }}
                      src={bank.bankImage}
                    />
                  </figure>
                  <a href="#">
                    <h3 className="BankName">{bank.bankName}</h3>
                  </a>
                </div>
                <button
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="btn-calc InterestRateNew_instantApply"
                >
                  Apply Now
                </button>
              </div>
              <ul className="InterestRateNew_bankDetails__Pcbs_">
                <li>
                  <p className="opt60">Interest Rate</p>
                  <p className="fontsemiBold">{bank.interestRate}</p>
                </li>
                <li>
                  <p className="opt60">Loan Amount</p>
                  <p className="fontsemiBold">{bank.loanAmount}</p>
                </li>
                <li>
                  <p className="opt60">EMI Per Lakh</p>
                  <p className="fontsemiBold">{bank.emiPerLakh}</p>
                </li>
                <li>
                  <p className="opt60">Processing Fees</p>
                  <div className="fontsemiBold">{bank.processingFees}</div>
                </li>
                <div className="InterestRateNew_lastLi__DoD8Q">
                  <p className="opt60">Pre-Payment Charges</p>
                  <div className="fontsemiBold">{bank.prePaymentCharges}</div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankLoanSection;
