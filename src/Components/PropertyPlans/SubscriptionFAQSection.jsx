import React, { useState } from 'react';
import "./SubscriptionFAQSection.css"
import FaqComponent from '../HomePage/FaqComponent';

// Dummy JSON data for FAQs
const faqData = [
  {
    id: 1,
    question: "What is included in each subscription plan?",
    answer: (
      <div>
        <table border="1" cellspacing="0" cellpadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', color: '#000' }}>
          <thead>
            <tr>
              <th><b>Plan</b></th>
              <th><b>Cost</b></th>
              <th><b>Duration</b></th>
              <th><b>Number of Listings</b></th>
              <th><b>Featured Listing Limit</b></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Free</b></td>
              <td>₹0.00(One Time)</td>
              <td>One Time</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><b>Starter</b></td>
              <td>₹200.00(One Time)</td>
              <td>One Time</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><b>Premium</b></td>
              <td>₹500.00(30 Days)</td>
              <td>30 Days</td>
              <td>5</td>
              <td>3</td>
            </tr>
            <tr>
              <td><b>Business</b></td>
              <td>₹2500.00(90 Days)</td>
              <td>90 Days</td>
              <td>25</td>
              <td>18</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
  {
    id: 2,
    question: "What are the differences between the Free and Starter plans?",
    answer: (
      <p>
        Free Plan: This plan costs ₹0.00 and is a one-time payment that allows for 1 listing and 1 featured listing. It is ideal for those who want to test our services with minimal commitment.
        <br />
        Starter Plan: Priced at ₹200.00 as a one-time payment, the Starter Plan also includes 1 listing and 1 featured listing. The primary difference from the Free Plan is that it offers additional support and potential access to enhanced features.
      </p>
    )
  },
  {
    id: 3,
    question: "Can I modify or cancel my subscription after purchasing?",
    answer: (
      <p>
        Modification: You can upgrade your plan at any time. For downgrades or other modifications, please contact our support team for assistance.
        <br />
        Cancellation: Refunds are not typically provided after the subscription has started, but you can cancel future renewals. Please refer to our Refund Policy for more details.
      </p>
    )
  },

  
  {
    id: 6,
    question: "How can I track my usage of listings and featured listings?",
    answer: (
      <p>
        You can track your usage of listings and featured listings through your account dashboard, which provides real-time updates on your remaining quotas. To access and download your invoice, click on your profile, select "My Properties," then choose "Subscription Plan," and download the invoice from there. This allows you to keep detailed records of your usage and billing.
      </p>
    )
  },
  {
    id: 7,
    question: "Who should I contact if I have questions or need assistance?",
    answer: (
      <p>
        If you have any queries or need assistance, please reach out to our support team. You can contact us via email at <a href="mailto:support@example.com">support@example.com</a> or by phone at (123) 456-7890. Our team is available to help you with any issues or questions regarding your subscription plan.
      </p>
    )
  }
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleCollapse = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
   <>
   <FaqComponent faqs={faqData}/>
   </>
  );
};

export default FAQSection;
