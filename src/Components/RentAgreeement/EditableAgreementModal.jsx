import React from 'react';
import { FaTimes } from 'react-icons/fa';
import EditableAgreement from './EditableAgreement';
import './EditableAgreementModal.css';

const EditableAgreementModal = ({ isOpen, onClose, agreementData, onSaveContent }) => {
  if (!isOpen) return null;

  return (
    <div className="editable-agreement-modal-overlay">
      <div className="editable-agreement-modal">
        <div className="editable-agreement-modal-header">
          <h2>Edit Rent Agreement</h2>
          <button onClick={onClose} className="editable-agreement-close-btn">
            <FaTimes />
          </button>
        </div>
        <div className="editable-agreement-modal-content">
          <EditableAgreement 
            agreementData={agreementData} 
            onSaveContent={(htmlContent) => {
              onSaveContent(htmlContent);
              onClose();
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default EditableAgreementModal;
