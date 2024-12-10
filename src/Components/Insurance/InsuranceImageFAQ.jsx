import React, { useState } from 'react';

// Dummy JSON data for insurance companies
const insuranceCompanies = {
    generalLife: [
      { id: 'aviva', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Aviva_Insurance.webp', alt: 'Aviva Insurance' },
      { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
      { id: 'birla', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Birla_Sunlife_Insurance.webp', alt: 'Birla Sunlife Insurance' },
      { id: 'canara', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Canara_HSBC_Insurance.webp', alt: 'Canara HSBC Insurance' },
      { id: 'edelweis', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Edelweis_Tokio_Insurance.webp', alt: 'Edelweis Tokio Insurance' },
      { id: 'exide', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Exide-insurance.webp', alt: 'Exide Insurance' },
    ],
    health: [
      { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
      { id: 'aditya', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Aditya-Birla-Insurance.webp', alt: 'Aditya Birla Insurance' },
      { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
      { id: 'care', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Care-Insurance.webp', alt: 'Care Insurance' },
      { id: 'cholamandalam', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Cholamandalam-Insurance.webp', alt: 'Cholamandalam Insurance' },
      { id: 'future', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Future-Generali-Insurance.webp', alt: 'Future Generali Insurance' },
      { id: 'hdfc', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/HDFC-ERGO-Insurance.webp', alt: 'HDFC ERGO Insurance' },
      { id: 'icici', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/ICICI-Lombard-Insurance.webp', alt: 'ICICI Lombard Insurance' },
      { id: 'iffco', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/IFFCO-Tokio-Insurance.webp', alt: 'IFFCO Tokio Insurance' },
      { id: 'kotak', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Kotak-Insurance.webp', alt: 'Kotak Insurance' },
      { id: 'manipal', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Manipal-Cigna-Insurance.webp', alt: 'Manipal Cigna Insurance' },
    ],
    motor: [
      { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
      { id: 'cholamandalam', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Cholamandalam-Insurance.webp', alt: 'Cholamandalam Insurance' },
      { id: 'future', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Future-Generali-Insurance.webp', alt: 'Future Generali Insurance' },
      { id: 'hdfc', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/HDFC-ERGO-Insurance.webp', alt: 'HDFC ERGO Insurance' },
      { id: 'icici', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/ICICI-Lombard-Insurance.webp', alt: 'ICICI Lombard Insurance' },
      { id: 'iffco', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/IFFCO-Tokio-Insurance.webp', alt: 'IFFCO Tokio Insurance' },
      { id: 'kotak', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Kotak-Insurance.webp', alt: 'Kotak Insurance' },
      { id: 'national', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/National-Insurance.webp', alt: 'National Insurance' },
    ]
  };

const InsuranceSectionFAQ = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFaqClick = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <section id="partners-section">
      <div className="container">
        <div className="insurance-companies-section">
          <ul className="nav nav-pills nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                href="#info"
                role="tab"
                className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => handleTabClick('info')}
              >
                General/ Life Insurance
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#ratings"
                role="tab"
                className={`nav-link ${activeTab === 'ratings' ? 'active' : ''}`}
                onClick={() => handleTabClick('ratings')}
              >
                Health Insurance
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#plus"
                role="tab"
                className={`nav-link ${activeTab === 'plus' ? 'active' : ''}`}
                onClick={() => handleTabClick('plus')}
              >
                Motor Insurance
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className={`tab-pane ${activeTab === 'info' ? 'fade show active' : 'fade'}`} role="tabpanel" id="info">
              <div id="insurance-companies-list">
                {insuranceCompanies.generalLife.map(company => (
                  <div className="PartnerCompanyImgDiv" key={company.id}>
                    <a className="tm-insurance-company__logo" href="#">
                      <img src={company.imgSrc} alt={company.alt} />
                    </a>
                  </div>
                ))}
              </div>
              <br />
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
                        <div className="card">
                          <div className="card-header" id="faqHeading-1">
                            <div className="mb-0">
                              <h5 className="faq-title" onClick={() => handleFaqClick('faqCollapse-1')}>
                                <span className="badge">1</span> What is Life Insurance?
                              </h5>
                            </div>
                          </div>
                          <div className={`collapse ${expandedFaq === 'faqCollapse-1' ? 'show' : ''}`} aria-labelledby="faqHeading-1" id="faqCollapse-1">
                            <div className="card-body">
                              <p>Life insurance is a contract in which the insurer guarantees a payment to a beneficiary upon the death of the insured person.</p>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="faqHeading-1">
                            <div className="mb-0">
                              <h5 className="faq-title" onClick={() => handleFaqClick('faqCollapse-1')}>
                                <span className="badge">2</span>  What is a term life insurance policy?
                              </h5>
                            </div>
                          </div>
                          <div className={`collapse ${expandedFaq === 'faqCollapse-1' ? 'show' : ''}`} aria-labelledby="faqHeading-1" id="faqCollapse-1">
                            <div className="card-body">
                              <p>Term life insurance provides coverage for a specific period. If the insured dies during this period, the nominee receives the death benefit.</p>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="faqHeading-1">
                            <div className="mb-0">
                              <h5 className="faq-title" onClick={() => handleFaqClick('faqCollapse-1')}>
                                <span className="badge">3</span> What is whole life insurance?
                              </h5>
                            </div>
                          </div>
                          <div className={`collapse ${expandedFaq === 'faqCollapse-1' ? 'show' : ''}`} aria-labelledby="faqHeading-1" id="faqCollapse-1">
                            <div className="card-body">
                              <p>Whole life insurance provides coverage for the insured’s entire life and includes a savings component known as cash value, which grows over time.</p>
                            </div>
                          </div>
                        </div>
                        {/* Add more FAQs as needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={`tab-pane ${activeTab === 'ratings' ? 'fade show active' : 'fade'}`} role="tabpanel" id="ratings">
              <div id="insurance-companies-list">
                {insuranceCompanies.health.map(company => (
                  <div className="PartnerCompanyImgDiv" key={company.id}>
                    <a className="tm-insurance-company__logo" href="#">
                      <img src={company.imgSrc} alt={company.alt} />
                    </a>
                  </div>
                ))}
              </div>
              <br />
              <section className="faq-section paddinngTB" id="faqs1">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="faq-title text-center pb-3">
                        <h3>Health Insurance FAQs</h3>
                      </div>
                    </div>
                    <div className="col-md-10 offset-md-1">
                      <div className="faq" id="accordion">
                        <div className="card">
                          <div className="card-header" id="faqHeading-2">
                            <div className="mb-0">
                              <h5 className="faq-title" onClick={() => handleFaqClick('faqCollapse-6')}>
                                <span className="badge">1</span> What is Health Insurance?
                              </h5>
                            </div>
                          </div>
                          <div className={`collapse ${expandedFaq === 'faqCollapse-6' ? 'show' : ''}`} aria-labelledby="faqHeading-2" id="faqCollapse-6">
                            <div className="card-body">
                              <p>Health insurance is a type of insurance that covers medical expenses incurred due to illnesses or injuries.</p>
                            </div>
                          </div>
                        </div>
                        {/* Add more FAQs as needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={`tab-pane ${activeTab === 'plus' ? 'fade show active' : 'fade'}`} role="tabpanel" id="plus">
              <div id="insurance-companies-list">
                {insuranceCompanies.motor.map(company => (
                  <div className="PartnerCompanyImgDiv" key={company.id}>
                    <a className="tm-insurance-company__logo" href="#">
                      <img src={company.imgSrc} alt={company.alt} />
                    </a>
                  </div>
                ))}
              </div>
              <br />
              <section className="faq-section paddinngTB" id="faqs1">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="faq-title text-center pb-3">
                        <h3>Motor Insurance FAQs</h3>
                      </div>
                    </div>
                    <div className="col-md-10 offset-md-1">
                      <div className="faq" id="accordion">
                        <div className="card">
                          <div className="card-header" id="faqHeading-2">
                            <div className="mb-0">
                              <h5 className="faq-title" onClick={() => handleFaqClick('faqCollapse-14')}>
                                <span className="badge">1</span> What is Car Insurance?
                              </h5>
                            </div>
                          </div>
                          <div className={`collapse ${expandedFaq === 'faqCollapse-14' ? 'show' : ''}`} aria-labelledby="faqHeading-2" id="faqCollapse-14">
                            <div className="card-body">
                              <p>Car insurance is a policy purchased by vehicle owners to mitigate costs associated with getting into an accident or damage to the vehicle.</p>
                            </div>
                          </div>
                        </div>
                        {/* Add more FAQs as needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceSectionFAQ;
