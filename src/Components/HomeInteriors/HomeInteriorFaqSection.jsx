import React, { useState } from 'react';
import "../common.css";
import "../commonsecond.css";
import FaqComponent from '../HomePage/FaqComponent';

// Dummy JSON data

const faqs = [
  {
    id: 1,
    question: "What services do you offer for home interiors?",
    answer: "We offer comprehensive home interior services including modular kitchen design, living room interiors, bedroom design, bathroom renovation, false ceiling work, and complete home makeover solutions."
  },
  {
    id: 2,
    question: "How long does a typical home interior project take to complete?",
    answer: "The duration varies based on the scope of work. A basic modular kitchen might take 15-20 days, while a complete home interior project can take 45-60 days. We provide detailed timelines during consultation."
  },
  {
    id: 3,
    question: "Do you provide free consultation?",
    answer: "Yes, we offer free initial consultation where our design experts visit your home, understand your requirements, and provide preliminary design suggestions and cost estimates."
  },
  {
    id: 4,
    question: "What is the warranty period for your interior work?",
    answer: "We provide a 5-year warranty on our modular products and a 1-year warranty on our workmanship. This covers any manufacturing defects or installation issues."
  },
  {
    id: 5,
    question: "Do you use branded materials?",
    answer: "Yes, we use premium quality branded materials from reputed manufacturers. We provide detailed material specifications and can customize based on your preferences and budget."
  },
  {
    id: 6,
    question: "Can you work within my budget?",
    answer: "Absolutely! We offer flexible design solutions that can be customized to different budget ranges. Our team will work with you to create the best possible design within your budget constraints."
  },
  {
    id: 7,
    question: "Do you provide 3D visualization before starting the work?",
    answer: "Yes, we provide detailed 3D designs of your space before starting the work. This helps you visualize the final outcome and make any necessary changes to the design."
  },
  {
    id: 8,
    question: "What is your payment structure?",
    answer: "We follow a transparent payment structure: 40% advance, 40% during execution, and 20% upon completion. We accept all major payment modes including UPI, cards, and bank transfers."
  },
  {
    id: 9,
    question: "Do you handle all necessary permits and approvals?",
    answer: "Yes, we assist in obtaining all necessary permits and approvals required for interior work. Our team ensures compliance with local building codes and regulations."
  },
  {
    id: 10,
    question: "What after-sales services do you provide?",
    answer: "We provide comprehensive after-sales support including regular maintenance checks, repair services, and 24/7 customer support for any queries or issues."
  },
  {
    id: 11,
    question: "Can you renovate existing interiors?",
    answer: "Yes, we specialize in both new interior projects and renovation of existing spaces. Our team can transform your current interior while maintaining structural integrity."
  },
  {
    id: 12,
    question: "Do you provide project management services?",
    answer: "Yes, we provide dedicated project managers who oversee the entire project, ensuring timely completion, quality control, and smooth coordination between different aspects of the work."
  }
];
const faqs2 = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click the 'Sign Up' button in the top right corner of our website. Fill in your email address, create a password, and follow the verification steps. Once completed, you'll have full access to your account.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Click the 'Forgot Password' link on the login page. Enter your email address and we'll send you instructions to reset your password. Follow the link in the email to create a new password.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway.",
  },
];
const HomeInteriorFaqSection = () => {
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
   <>
   <FaqComponent faqs={faqs}/>
   </>
  );
};

export default HomeInteriorFaqSection;
