import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { FaUser, FaUsers } from "react-icons/fa6";
import "./ESignSelectType_unqtwq.css";
import { useNavigate } from "react-router-dom";

const ESignSelectType = () => {
  const navigate = useNavigate();
  const handleredirection = (url)=>{
    navigate(url)
  }
  return (
    <div className="unqtwq_esign_select_wrap">
      <div className="unqtwq_esign_select_title">
        <FaRegFileAlt className="unqtwq_esign_select_icon" />
        <h2>eSign Documents</h2>
        <p>
          Choose how you want to sign your documents electronically. Our secure
          eSignature solutions comply with all legal requirements.
        </p>
      </div>
      <div className="unqtwq_esign_select_options">
        <div className="unqtwq_esign_select_card">
          <div className="unqtwq_esign_select_radio">
            <input type="radio" id="single" name="esignType" />
            <label htmlFor="single"></label>
          </div>
          <div className="unqtwq_esign_select_card_icon">
            <FaUser />
          </div>
          <div className="unqtwq_esign_select_card_body">
            <h3>Single Party Signing</h3>
            <span className="unqtwq_esign_select_card_sub">
              <FaUser className="unqtwq_esign_select_card_subicon" /> One signer
            </span>
            <p className="unqtwq_esign_select_card_desc">
              Use this option when you need to sign documents yourself. Fast, simple, and legally binding.
            </p>
            <ul className="unqtwq_esign_select_card_list">
              <li>Sign documents in minutes</li>
              <li>Legally binding electronic signature</li>
              <li>Secure document storage</li>
            </ul>
            <button
              type="button"
              className="unqtwq_esign_select_btn"
              onClick={() => handleredirection("/esign2")}
            >
              Select Single Party
            </button>
          </div>
        </div>
        <div className="unqtwq_esign_select_card">
          <div className="unqtwq_esign_select_radio">
            <input type="radio" id="two" name="esignType" />
            <label htmlFor="two"></label>
          </div>
          <div className="unqtwq_esign_select_card_icon">
            <FaUsers />
          </div>
          <div className="unqtwq_esign_select_card_body">
            <h3>Two Party Signing</h3>
            <span className="unqtwq_esign_select_card_sub">
              <FaUsers className="unqtwq_esign_select_card_subicon" /> Multiple signers
            </span>
            <p className="unqtwq_esign_select_card_desc">
              Perfect for contracts requiring multiple signatures. Send documents to all parties for signing.
            </p>
            <ul className="unqtwq_esign_select_card_list">
              <li>Collect signatures from multiple parties</li>
              <li>Automatic email notifications</li>
              <li>Track signing progress in real-time</li>
            </ul>
            <button
              type="button"
              className="unqtwq_esign_select_btn"
              onClick={() => handleredirection("/esign3")}
            >
              Select Two Party
            </button>
          </div>
        </div>
      </div>
      <div className="unqtwq_esign_select_footer">
        <div className="unqtwq_esign_select_footer_icon">✔</div>
        <div>
          <strong>Secure & Legally Binding</strong>
          <p>
            Our eSignature solution is compliant with ESIGN Act and UETA regulations, making all electronically signed documents legally binding. We use enterprise-grade encryption to protect your documents and personal information.
          </p>
          <div className="unqtwq_esign_select_footer_tags">
            <span>256-bit encryption</span>
            <span>ESIGN Act compliant</span>
            <span>Signer authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESignSelectType;
