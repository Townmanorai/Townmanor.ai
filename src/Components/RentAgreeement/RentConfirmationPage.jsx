import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './RentConfirmationPage__uniqueStyle.css';

function RentConfirmationPage() {
  return (
    <div className="rent-confirmation-unique-root-x7z">
      <AiOutlineCheckCircle className="rent-confirmation-unique-checkmark-x7z" />
      <div className="rent-confirmation-unique-title-x7z">
        Thank You for eSigning<br />the Document
      </div>
      <div className="rent-confirmation-unique-desc-x7z">
        You will receive the signed document shortly via email.
      </div>
    </div>
  );
}

export default RentConfirmationPage