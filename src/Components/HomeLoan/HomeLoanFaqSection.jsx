import React from 'react';
import "../common.css";
import "../commonsecond.css";

// Dummy JSON data
const faqData = [
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
  }
];

const HomeLoanFaqSection = () => {
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
            <div className="faq" id="accordion">
              {faqData.map(faq => (
                <div key={faq.id} className="card">
                  <div className="card-header" id={`faqHeading-${faq.id}`}>
                    <div className="mb-0">
                      <h5
                        className="faq-title"
                        data-aria-controls={`faqCollapse-${faq.id}`}
                        data-aria-expanded="false"
                        data-target={`#faqCollapse-${faq.id}`}
                        data-toggle="collapse"
                      >
                        <span className="badge">{faq.id}</span>
                        {faq.question}
                      </h5>
                    </div>
                  </div>
                  <div
                    aria-labelledby={`faqHeading-${faq.id}`}
                    className="collapse"
                    data-parent="#accordion"
                    id={`faqCollapse-${faq.id}`}
                  >
                    <div className="card-body">
                      <p>{faq.answer}</p>
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
