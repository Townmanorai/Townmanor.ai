import React, { useState } from 'react';
import "./SubscriptionFAQSection.css"

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
    id: 4,
    question: "What if I need more listings or featured listings than my current plan allows?",
    answer: (
      <p>
        You can upgrade your plan to one with higher limits. Alternatively, you can contact support to discuss custom solutions that meet your needs.
        <br />
        If you exceed the allowed number, your listings may not be displayed or featured until you upgrade your plan or purchase additional credits.
      </p>
    )
  },
  {
    id: 5,
    question: "What are the key differences between the Premium and Business plans?",
    answer: (
      <p>
        Premium Plan: Ideal for individuals or small businesses needing up to 5 listings and 3 featured listings for 30 days.
        <br />
        Business Plan: Best suited for larger businesses or real estate operations needing extensive coverage with up to 25 listings and 18 featured listings over 90 days.
      </p>
    )
  },
  {
    id: 6,
    question: "How can I track my usage of listings and featured listings, and access my invoice?",
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
                <div className="card" key={faq.id}>
                  <div className="card-header" id={`faqHeading-${faq.id}`}>
                    <div className="mb-0">
                      <h5
                        className="faq-title"
                        onClick={() => toggleCollapse(faq.id)}
                        aria-controls={`faqCollapse-${faq.id}`}
                        aria-expanded={activeId === faq.id}
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
                    className={`collapse ${activeId === faq.id ? 'show' : ''}`}
                    id={`faqCollapse-${faq.id}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      {faq.answer}
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

export default FAQSection;
