import React, { useState } from 'react';


import "../common.css";
import "../commonsecond.css";
import FaqComponent from '../HomePage/FaqComponent';

const faqData = [
  { id: 1, question: "What is a Credit Score?", answer: "Credit score is a 3-digit number that shows how likely you are to get credit. When you need a loan, a bank or any lender looks at this score to understand how likely you are to pay the money back. Credit scores range from 300 to 900." },
  { id: 2, question: "How can a Credit Score help me?", answer: "When you apply for a credit card or a loan, lenders like banks and non-banking finance companies check your credit score to see whether you have the ability to repay the loan. If you have a higher credit score, you are likely to receive a lower rate of interest." },
  { id: 3, question: "Will my Credit Score drop if I check my credit score?", answer: "Checking your credit score will not reduce it because you are not officially applying for credit. In fact, it is good to check your credit score at least once in 3 months." },
  { id: 4, question: "Why don’t I have a Credit Score?", answer: "Scoring models cannot generate a score without enough credit information. If you have little or no credit history available, you probably will not have a credit score." },
  { id: 5, question: "I have a CIBIL Score. Why can I not see it here?", answer: "This could be due to a technical issue or data inconsistency. Kindly retry with the correct details." },
  { id: 6, question: "Will my Credit Score drop if I apply for new credit?", answer: "The first step a bank takes when you apply for new credit or a loan is to check your credit score from the bureau, this is also called making a hard credit enquiry. A hard enquiry might temporarily lower your credit score." },
  { id: 7, question: "How is my Credit Score calculated?", answer: "Your credit score is calculated after considering multiple factors, such as payment history, age of all credit lines, number of recent credit enquiries, and total active credit accounts among others. It’s important that you check your credit score on your own before applying for a loan." }
];

const CreditScoreFAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    // <section className="faq-section paddinngTB" id="faqs1">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-12">
    //         <div className="faq-title text-center pb-3">
    //           <h3>Frequently Asked Questions</h3>
    //         </div>
    //       </div>

    //       <div className="col-md-10 offset-md-1">
    //         <div className="faq" id="accordion">
    //           {faqData.map(faq => (
    //             <div key={faq.id} className="card">
    //               <div className="card-header" id={`faqHeading-${faq.id}`}>
    //                 <div className="mb-0">
    //                   <h5 className="faq-title" onClick={() => toggleFAQ(faq.id)}>
    //                     <span className="badge">{faq.id}</span>
    //                     {faq.question}
    //                     <span className="float-right">{openId === faq.id ? '-' : '+'}</span>
    //                   </h5>
    //                 </div>
    //               </div>
    //               <div
    //                 aria-labelledby={`faqHeading-${faq.id}`}
    //                 className={`collapse ${openId === faq.id ? "show" : ""}`}
    //                 id={`faqCollapse-${faq.id}`}
    //               >
    //                 <div className="card-body">
    //                   <p>{faq.answer}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <>
    <FaqComponent faqs={faqData}/>
    </>
  );
};

export default CreditScoreFAQ;
