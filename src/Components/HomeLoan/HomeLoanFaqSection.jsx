import React, { useState } from 'react';
import "../common.css";
import "../commonsecond.css";

// Dummy JSON data

const faqs = [
  {
    id: 1,
    question: "What is a Home Loan?",
    answer: "A home loan is a secured loan provided by banks and financial institutions to help you purchase a property, such as a house or plot, or for construction or renovation purposes."
  },
  {
    id: 2,
    question: "How is EMI calculated for a Home Loan?",
    answer: "EMI (Equated Monthly Installment) is calculated using the loan amount (principal), interest rate, and loan tenure. The EMI formula is: EMI = P × r × (1+r)^n / [(1+r)^n - 1] Where P = Principal, r = monthly interest rate, and n = loan tenure in months."
  },
  {
    id: 3,
    question: "What is the minimum salary required for a Home Loan?",
    answer: "The minimum salary requirement varies by lender, but typically, a monthly income of ₹25,000–₹40,000 is needed to qualify for a home loan, depending on loan size and other factors."
  },
  {
    id: 4,
    question: "How much loan can I get based on my salary?",
    answer: "Generally, banks offer a loan amount up to 60 times your monthly income. For example, if you earn ₹50,000 per month, you may be eligible for a loan of around ₹30 lakhs."
  },
  {
    id: 5,
    question: "What is a downpayment?",
    answer: "A downpayment is the portion of the property’s value that you pay upfront, usually 10–20% of the purchase price, while the remaining amount is financed through a home loan."
  },
  {
    id: 6,
    question: "What is a floating rate of interest?",
    answer: "A floating interest rate fluctuates with market conditions. If rates go down, your EMI will decrease, but if rates rise, your EMI will increase."
  },
  {
    id: 7,
    question: "What is a fixed rate of interest?",
    answer: "A fixed rate remains constant throughout the loan tenure, providing consistent EMI payments. It’s ideal for those seeking stability in repayments."
  },
  {
    id: 8,
    question: "What is the difference between fixed and floating interest rates?",
    answer: "Fixed interest rates offer stability but may be higher initially. Floating rates, while variable, can offer lower rates when the market is favorable."
  },
  {
    id: 9,
    question: "What is the Loan to Value Ratio (LTV)?",
    answer: "LTV is the ratio of the loan amount to the property’s value. For example, if a property is worth ₹50 lakhs and the loan is ₹40 lakhs, the LTV is 80%."
  },
  {
    id: 10,
    question: "What are the tax benefits of taking a home loan?",
    answer: "You can claim up to ₹2 lakh on interest under Section 24(b) and ₹1.5 lakh on principal repayment under Section 80C of the Income Tax Act."
  },
  {
    id: 11,
    question: "Can I get a home loan if I have a low credit score?",
    answer: "While it's harder to get a loan with a low CIBIL score (below 650), some lenders may still offer loans but at higher interest rates."
  },
  {
    id: 12,
    question: "How can I improve my loan eligibility?",
    answer: "Improve eligibility by increasing your income, reducing existing debt, improving your credit score, or opting for a longer tenure."
  }
];

const HomeLoanFaqSection = () => {
  const [activeIndex,setActiveIndex]= useState('');
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
};
const formatAnswer = (answer) => {
    return answer.split('\n').map((item, index) => {
        return (
            <span key={index}>
                {item}
                {index !== answer.split('\n').length - 1 && <br />}
            </span>
        );
    });
};
  return (
    <section className="faq-section paddinngTB" id="faqs1">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="faq-title text-center pb-3">
              <h3>Frequently Asked Questions</h3>
            </div>
          </div>

         
           <div className="col-md-10 offset-md-1">
                        <div className="faq">
                            {faqs.map((faq, index) => (
                                <div className="card" key={index}>
                                    <div className="card-header" id={`faqHeading-${index}`}>
                                        <div className="mb-0">
                                            <h5
                                                className="faq-title"
                                                onClick={() => toggleAnswer(index)}
                                            >
                                                <span className="badge">{index + 1}</span>{" "}
                                                {faq.question}
                                            </h5>
                                        </div>
                                    </div>

                                    <div
                                        className={`collapse ${activeIndex === index ? "show" : ""}`}
                                        id={`faqCollapse-${index}`}
                                    >
                                        <div className="card-body">
                                            {/* Format the answer with <br /> */}
                                            {formatAnswer(faq.answer)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLoanFaqSection;
