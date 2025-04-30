import React, { useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChevronDown,
  FaMedal,
  FaChartLine,
  FaStar,
  FaQuestionCircle
} from "react-icons/fa";
import "./BecomeFeaturedAgentStyles.css";
import UserDashboardNavbar from "./UserDashboardNavbar";

const faqs = [
  {
    q: "How does the Featured Agent program work?",
    a: "Your listings and profile are given enhanced visibility and priority placement, helping you stand out to potential clients.",
  },
  {
    q: "Can I cancel my Featured Agent subscription?",
    a: "Yes, you can cancel anytime. There is no long-term contract or penalty.",
  },
  {
    q: "How many of my listings will be featured?",
    a: "All active listings under your account will receive featured placement.",
  },
  {
    q: "What analytics is available to a Featured Agent?",
    a: "Featured Agents get access to advanced analytics including impressions, clicks, and lead conversions.",
  },
  {
    q: "Is there a contract or minimum commitment period?",
    a: "No, you can subscribe or cancel at any time with no minimum commitment.",
  },
];

const BecomeFeaturedAgent = () => {
  const [faqOpen, setFaqOpen] = useState(Array(faqs.length).fill(false));
  const handleFaqToggle = idx => {
    setFaqOpen(open =>
      open.map((v, i) => (i === idx ? !v : v))
    );
  };

  return (
    <>
    <UserDashboardNavbar/>
    <div className="bfa_main_wrap">
      <div className="bfa_hero_section">
        <div className="bfa_hero_texts">
          <span className="bfa_hero_title">Become a Featured Agent</span>
          <span className="bfa_hero_desc">
            Stand out from the crowd, get more leads, and close more deals with our exclusive Featured Agent program.
          </span>
          <div className="bfa_hero_btns">
            <button className="bfa_btn_primary">Upgrade to Featured Agent</button>
            <button className="bfa_btn_secondary">Learn More</button>
          </div>
        </div>
        <div className="bfa_hero_img">
          <img src="/Featured.png" alt="Featured Agent" />
        </div>
      </div>

      <div className="bfa_section_title">Why Become a Featured Agent?</div>
      <span className="bfa_section_subtitle">
        Our Featured Agent program gives you the edge you need in today’s competitive real estate market.
      </span>
      <div className="bfa_benefits_row">
        <div className="bfa_benefit_card">
          <FaChartLine className="bfa_benefit_icon" />
          <span className="bfa_benefit_title">Enhanced Visibility</span>
          <span className="bfa_benefit_desc">
            Your profile and listings appear at the top of search results, increasing exposure by up to 300%.
          </span>
        </div>
        <div className="bfa_benefit_card">
          <FaStar className="bfa_benefit_icon" />
          <span className="bfa_benefit_title">Priority Listing Placement</span>
          <span className="bfa_benefit_desc">
            Your properties are showcased prominently across the platform, attracting more buyers.
          </span>
        </div>
        <div className="bfa_benefit_card">
          <FaMedal className="bfa_benefit_icon" />
          <span className="bfa_benefit_title">Premium Badge Display</span>
          <span className="bfa_benefit_desc">
            Stand out with an exclusive “Featured Agent” badge on all your listings and profile.
          </span>
        </div>
      </div>

      <div className="bfa_advantage_section">
        <div className="bfa_advantage_title">The Featured Agent Advantage</div>
        <span className="bfa_advantage_subtitle">
          Real results from real estate professionals just like you.
        </span>
        <div className="bfa_advantage_stats_row">
          <div className="bfa_advantage_stat">
            <span className="bfa_stat_value">127%</span>
            <span className="bfa_stat_label">Average increase in qualified leads</span>
          </div>
          <div className="bfa_advantage_stat">
            <span className="bfa_stat_value">3.8x</span>
            <span className="bfa_stat_label">Higher listing visibility compared to standard listings</span>
          </div>
          <div className="bfa_advantage_stat">
            <span className="bfa_stat_value">68%</span>
            <span className="bfa_stat_label">Improved response time from buyers to showing</span>
          </div>
          <div className="bfa_advantage_stat">
            <span className="bfa_stat_value">42%</span>
            <span className="bfa_stat_label">Faster closing time on properties</span>
          </div>
        </div>
      </div>

      <div className="bfa_compare_section">
        <span className="bfa_compare_title">Regular vs. Featured Agent</span>
        <span className="bfa_compare_subtitle">
          See how becoming a featured agent can transform your real estate business.
        </span>
        <div className="bfa_compare_table_wrap">
          <div className="bfa_compare_table">
            <div className="bfa_compare_table_row bfa_compare_table_head">
              <span className="bfa_compare_table_cell">Feature</span>
              <span className="bfa_compare_table_cell">Regular Agent</span>
              <span className="bfa_compare_table_cell">Featured Agent</span>
            </div>
            {[
              ["Profile Visibility", "Standard", "Premium Placement"],
              ["Listing Position", "Chronological", "Top of Search Results"],
              ["# of Listings Shown", "Limited", "All"],
              ["Analytics Dashboard", "Basic", "Advanced"],
              ["Marketing Tools", "Limited", "Comprehensive"],
              ["Lead Generation", "Standard", "Enhanced"],
              ["Client Trust Factor", "Standard", "Premium"],
            ].map((row, idx) => (
              <div className="bfa_compare_table_row" key={idx}>
                <span className="bfa_compare_table_cell">{row[0]}</span>
                <span className="bfa_compare_table_cell">{row[1]}</span>
                <span className="bfa_compare_table_cell">{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bfa_faq_section">
        <span className="bfa_faq_title">Frequently Asked Questions</span>
        <span className="bfa_faq_subtitle">
          Everything you need to know about our Featured Agent program.
        </span>
        <div className="bfa_faq_list">
          {faqs.map((faq, idx) => (
            <div className="bfa_faq_item" key={idx}>
              <button
                className="bfa_faq_question"
                onClick={() => handleFaqToggle(idx)}
              >
                <FaQuestionCircle className="bfa_faq_qicon" />
                <span>{faq.q}</span>
                <FaChevronDown
                  className={
                    "bfa_faq_chevron" +
                    (faqOpen[idx] ? " bfa_faq_chevron_open" : "")
                  }
                />
              </button>
              {faqOpen[idx] && (
                <div className="bfa_faq_answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bfa_footer_cta">
        <span className="bfa_footer_cta_title">
          Ready to Take Your Real Estate Business to the Next Level?
        </span>
        <span className="bfa_footer_cta_desc">
          Join thousands of successful agents who have transformed their business with our Featured Agent program.
        </span>
        <div className="bfa_footer_cta_btns">
          <button className="bfa_btn_secondary">Return to Dashboard</button>
          <button className="bfa_btn_primary">
            Become a Featured Agent <FaArrowRight style={{ marginLeft: 8 }} />
          </button>
        </div>
        <span className="bfa_footer_cta_guarantee">
          * 14-day money back guarantee
        </span>
      </div>
    </div>
    </>
  );
};

export default BecomeFeaturedAgent;