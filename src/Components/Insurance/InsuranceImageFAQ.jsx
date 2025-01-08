import React, { useState, useRef } from 'react';

// Dummy JSON data for insurance companies
const faqs = [
  {
    id: 1,
    question: "What is Life Insurance?",
    answer: "Life insurance is a contract in which the insurer guarantees a payment to a beneficiary upon the death of the insured person."
  },
  {
    id: 2,
    question: "What is a term life insurance policy?",
    answer: "Term life insurance provides coverage for a specific period. If the insured dies during this period, the nominee receives the death benefit."
  },
  {
    id: 3,
    question: "What is whole life insurance?",
    answer: "Whole life insurance provides coverage for the insured’s entire life and includes a savings component known as cash value, which grows over time."
  },
  {
    id: 4,
    question: "What is a beneficiary in life insurance?",
    answer: "A beneficiary is the person or entity who receives the death benefit when the insured person passes away."
  },
  {
    id: 5,
    question: "Can I take multiple life insurance policies?",
    answer: "Yes, there is no limit to how many life insurance policies you can hold, but each policy should meet the insurer’s underwriting criteria."
  }
];
const motorInsuranceFaqs = [
  {
    id: 1,
    question: "What is Motor Insurance?",
    answer: "Motor insurance is a contract between a vehicle owner and an insurer to provide financial protection in case of accidents, theft, or damage to the vehicle."
  },
  {
    id: 2,
    question: "What is a third-party motor insurance policy?",
    answer: "Third-party motor insurance covers the damages or injuries caused to a third party by the insured vehicle, but it does not cover the damage to the insured vehicle."
  },
  {
    id: 3,
    question: "What is comprehensive motor insurance?",
    answer: "Comprehensive motor insurance covers both third-party liability as well as damage to the insured vehicle due to accidents, theft, or natural calamities."
  },
  {
    id: 4,
    question: "What is a deductible in motor insurance?",
    answer: "A deductible is the amount the policyholder has to pay out-of-pocket before the insurance company covers the remaining costs in the event of a claim."
  },
  {
    id: 5,
    question: "Can I transfer my motor insurance policy to another person?",
    answer: "Yes, you can transfer your motor insurance policy to another person, provided the vehicle ownership is transferred to that person as well."
  }
];
const faqs2 = [
  {
    id: 1,
    question: "What is Health Insurance?",
    answer: "Health insurance is a type of insurance that covers medical expenses incurred due to illnesses or injuries."
  },
  {
    id: 2,
    question: "What is a cashless hospital network?",
    answer: "A cashless hospital network allows policyholders to receive treatment without paying upfront, as the insurer directly settles the bill with the hospital."
  },
  {
    id: 3,
    question: "What is a pre-existing condition in health insurance?",
    answer: "A pre-existing condition is a medical condition that existed before the policy was purchased. Some policies may have waiting periods before covering these conditions."
  },
  {
    id: 4,
    question: "Does health insurance cover like COVID-19 treatment?",
    answer: "Most health insurance policies cover COVID-19 treatment, but it’s important to check with your insurer for specific details."
  },
  {
    id: 5,
    question: "Can I add family members to my health insurance policy?",
    answer: "Yes, you can opt for a family floater plan, which covers multiple family members under a single health insurance policy."
  },
  {
    id: 6,
    question: "What is a waiting period in health insurance?",
    answer: "A waiting period is the time span after which certain treatments or conditions will be covered under the policy. Pre-existing conditions often have a waiting period."
  },
  {
    id: 7,
    question: "What is critical illness insurance?",
    answer: "Critical illness insurance provides a lump sum benefit if the insured is diagnosed with a serious illness, such as cancer, heart attack, or stroke."
  }
];
const insuranceCompanies = {
  generalLife: [
    { id: 'aviva', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Aviva_Insurance.webp', alt: 'Aviva Insurance' },
    { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
    { id: 'birla', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Birla_Sunlife_Insurance.webp', alt: 'Birla Sunlife Insurance' },
    { id: 'canara', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Canara_HSBC_Insurance.webp', alt: 'Canara HSBC Insurance' },
    { id: 'edelweis', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Edelweis_Tokio_Insurance.webp', alt: 'Edelweis Tokio Insurance' },
    { id: 'exide', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Exide-insurance.webp', alt: 'Exide Insurance' },
    { id: 'futureGenerali', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Future-Generali-Insurance.webp', alt: 'Future Generali Insurance' },
    { id: 'hdfcLife', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/HDFC_Life_Insurance.webp', alt: 'HDFC Life Insurance' },
    { id: 'iciciPru', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/ICICI_Pru_Insurance.webp', alt: 'ICICI Prudential Insurance' },
    { id: 'idbiFed', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/IDBI_Fed_Insurance.webp', alt: 'IDBI Federal Insurance' },
    { id: 'indiafirst', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/indiafirst-insurance.webp', alt: 'IndiaFirst Insurance' },
    { id: 'kotak', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Kotak-Insurance.webp', alt: 'Kotak Insurance' },
    { id: 'licIndia', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/lic-india_Insurance.webp', alt: 'LIC India Insurance' },
    { id: 'maxLife', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Maxlife-insurance.webp', alt: 'Max Life Insurance' },
    { id: 'national', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/National-Insurance.webp', alt: 'National Insurance' },
    { id: 'oriental', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Oriental-Insurance.webp', alt: 'Oriental Insurance' },
    { id: 'pnbMetlife', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Pnb_Metlife_Insurance.webp', alt: 'PNB MetLife Insurance' },
    { id: 'reliance', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Reliance-Insurance.webp', alt: 'Reliance Insurance' },
    { id: 'relianceNippon', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/reliance-nippon-insurance.webp', alt: 'Reliance Nippon Insurance' },
    { id: 'sahara', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/sahara-insurance.webp', alt: 'Sahara Insurance' },
    { id: 'shriram', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Shriram_insurance.webp', alt: 'Shriram Insurance' },
    { id: 'tataAia', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/TATA_AIA_Insurance.webp', alt: 'TATA AIA Insurance' }
  ],
  health: [
    { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
    { id: 'adityaBirla', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Aditya-Birla-Insurance.webp', alt: 'Aditya Birla Insurance' },
    { id: 'bajajAllianz', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
    { id: 'care', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Care-Insurance.webp', alt: 'Care Insurance' },
    { id: 'cholamandalam', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Cholamandalam-Insurance.webp', alt: 'Cholamandalam Insurance' },
    { id: 'futureGenerali', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Future-Generali-Insurance.webp', alt: 'Future Generali Insurance' },
    { id: 'hdfcErgo', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/HDFC-ERGO-Insurance.webp', alt: 'HDFC ERGO Insurance' },
    { id: 'iciciLombard', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/ICICI-Lombard-Insurance.webp', alt: 'ICICI Lombard Insurance' },
    { id: 'iffcoTokio', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/IFFCO-Tokio-Insurance.webp', alt: 'IFFCO Tokio Insurance' },
    { id: 'kotak', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Kotak-Insurance.webp', alt: 'Kotak Insurance' },
    { id: 'manipalCigna', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Manipal-Cigna-Insurance.webp', alt: 'Manipal Cigna Insurance' }
  ],
  motor: [
    { id: 'bajaj', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Bajaj-Allianz-Insurance.webp', alt: 'Bajaj Allianz Insurance' },
  { id: 'cholamandalam', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Cholamandalam-Insurance.webp', alt: 'Cholamandalam Insurance' },
  { id: 'futureGenerali', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Future-Generali-Insurance.webp', alt: 'Future Generali Insurance' },
  { id: 'hdfcErgo', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/HDFC-ERGO-Insurance.webp', alt: 'HDFC ERGO Insurance' },
  { id: 'iciciLombard', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/ICICI-Lombard-Insurance.webp', alt: 'ICICI Lombard Insurance' },
  { id: 'iffcoTokio', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/IFFCO-Tokio-Insurance.webp', alt: 'IFFCO Tokio Insurance' },
  { id: 'kotak', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Kotak-Insurance.webp', alt: 'Kotak Insurance' },
  { id: 'national', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/National-Insurance.webp', alt: 'National Insurance' },
  { id: 'newIndiaAssurance', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/New-India-Assurance-Insurance.webp', alt: 'New India Assurance Insurance' },
  { id: 'oriental', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Oriental-Insurance.webp', alt: 'Oriental Insurance' },
  { id: 'reliance', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Reliance-Insurance.webp', alt: 'Reliance Insurance' },
  { id: 'royalSundaram', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Royal-Sundaram-Insurance.webp', alt: 'Royal Sundaram Insurance' },
  { id: 'sbi', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/SBI-Insurance.webp', alt: 'SBI Insurance' },
  { id: 'tataAig', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/TATA-AIG-Insurance.webp', alt: 'TATA AIG Insurance' },
  { id: 'unitedIndia', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/United-India-Insurance.webp', alt: 'United India Insurance' },
  { id: 'universalSompo', imgSrc: 'https://townmanor.in/templates/selio/assets/selfImages/Universal_Sompo-1.webp', alt: 'Universal Sompo Insurance' }
  ]
};

const InsuranceSectionFAQ = () => {
  const [activeTab, setActiveTab] = useState('info');
  
  // Creating references for each section (General, Health, Motor)
  const generalLifeRef = useRef(null);
  const healthRef = useRef(null);
  const motorRef = useRef(null);

  const handleTabClick = (tabId, sectionRef) => {
    setActiveTab(tabId);
    // Scroll to the appropriate section smoothly
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
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
    <section id="partners-section">
      <div className="container">
        <div className="insurance-companies-section">
          <ul className="nav nav-pills nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => handleTabClick('info', generalLifeRef)}
              >
                General/ Life Insurance
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'ratings' ? 'active' : ''}`}
                onClick={() => handleTabClick('ratings', healthRef)}
              >
                Health Insurance
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'plus' ? 'active' : ''}`}
                onClick={() => handleTabClick('plus', motorRef)}
              >
                Motor Insurance
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className={`tab-pane ${activeTab === 'info' ? 'fade show active' : 'fade'}`}
              role="tabpanel"
              ref={generalLifeRef} // Reference for General Life Insurance Section
            >
              <div id="insurance-companies-list">
                {insuranceCompanies.generalLife.map(company => (
                  <div className="PartnerCompanyImgDiv" key={company.id}>
                    <a className="tm-insurance-company__logo" href="#">
                      <img src={company.imgSrc} alt={company.alt} />
                    </a>
                  </div>
                ))}
              </div>
              <section className="faq-section paddinngTB" id="faqs1" style={{
                marginLeft:'auto',
                height:'62vh !important'
              }}> 
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
            </div>
            <div
              className={`tab-pane ${activeTab === 'ratings' ? 'fade show active' : 'fade'}`}
              role="tabpanel"
              ref={healthRef} // Reference for Health Insurance Section
            >
              <div id="insurance-companies-list">
                {insuranceCompanies.health.map(company => (
                  <div className="PartnerCompanyImgDiv" key={company.id}>
                    <a className="tm-insurance-company__logo" href="#">
                      <img src={company.imgSrc} alt={company.alt} />
                    </a>
                  </div>
                ))}
              </div>
              <section className="faq-section paddinngTB" id="faqs1" style={{
                marginLeft:'auto',
                height:'62vh !important'
              }}> 
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="faq-title text-center pb-3">
              <h3>Frequently Asked Questions</h3>
            </div>
          </div>

         
           <div className="col-md-10 offset-md-1">
                        <div className="faq">
                            {faqs2.map((faq, index) => (
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
            </div>
            <div
              className={`tab-pane ${activeTab === 'plus' ? 'fade show active' : 'fade'}`}
              role="tabpanel"
              ref={motorRef} // Reference for Motor Insurance Section
            >
              <div id="insurance-companies-list">
                {insuranceCompanies.motor.map(company => (
                  <div className="PartnerCompanyImgDiv" key={company.id}>
                    <a className="tm-insurance-company__logo" href="#">
                      <img src={company.imgSrc} alt={company.alt} />
                    </a>
                  </div>
                ))}
              </div>
              <section className="faq-section paddinngTB" id="faqs1" style={{
                marginLeft:'auto',
                height:'62vh !important'
              }}> 
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="faq-title text-center pb-3">
              <h3>Frequently Asked Questions</h3>
            </div>
          </div>

         
           <div className="col-md-10 offset-md-1">
                        <div className="faq">
                            {motorInsuranceFaqs.map((faq, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceSectionFAQ;
