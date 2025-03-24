import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import "./Andromeda.css";

const faqs = [
  {
    id: 1,
    question: "What Is The Minimum Salary Required For A Home Loan?",
    answer: "A home loan is a secured loan provided by banks and financial institutions to help you purchase a property, such as a house or plot, or for construction or renovation purposes."
  },
  {
    id: 2,
    question: "What Documents Are Needed To Apply?",
    answer: "A home loan is a secured loan provided by banks and financial institutions to help you purchase a property, such as a house or plot, or for construction or renovation purposes."
  },
  {
    id: 3,
    question: "How Long Does Loan Approval Take?",
    answer: "A home loan is a secured loan provided by banks and financial institutions to help you purchase a property, such as a house or plot, or for construction or renovation purposes."
  },
  {
    id: 4,
    question: "What Is The Minimum Salary Required For A Home Loan?",
    answer: "A home loan is a secured loan provided by banks and financial institutions to help you purchase a property, such as a house or plot, or for construction or renovation purposes."
  }
];

const FAQSection = () => {
  return (
    <div className="faq-containerx">
      <h2 className="faq-titlex">Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-itemx">
           <div className="faq-number">{faq.id}</div>
            <div className="faq-contentx">
              <p className="faq-questionx">{faq.question}</p>
              <p className="faq-answerx">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
