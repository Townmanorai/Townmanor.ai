import React from 'react'
import HomeLoanForm from './HomeLoanForm';

import "../common.css";
import "../commonsecond.css";
import BankLoanSection from './BankLoanSection';
import HomeLoanFaqSection from './HomeLoanFaqSection';

const dummyData = {
    cities: ["Mumbai", "Bangalore", "Gurgaon", "Noida", "Hyderabad", "Pune"],
    occupationTypes: [
      "Salaried",
      "Self Employed Professional",
      "Partner",
      "Proprietorship",
      "Partnership/LLP",
      "Private Limited"
    ],
    formAction: "https://townmanor.in/customform/homeLoan",
    minDate: "2024-09-14"
  };

function LoanForm() {
  return (
   <>
   <div id="Description_loandetails">
   <div className="container">
            <h1 class="InnerLoanheading">Home Loan</h1>
            <p class="short_description">Turn your dream of owning a home into a reality with our top-notch home loan services. Townmanor has partnered with several banks to offer quick and convenient mortgage loans. Take advantage of our home credit loans, which come with various benefits such as competitive interest rates and smaller EMIs, allowing you to spread out your payments over a longer period of time.</p>
    </div>
   </div>

    <HomeLoanForm />
    <BankLoanSection />
    <HomeLoanFaqSection />
   </>
  )
}

export default LoanForm;
