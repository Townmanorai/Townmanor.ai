import React, { useState, useEffect } from 'react'
import "./Rent.css"

import RentAgreementContract from './RentAgreementContract'
import PropertyDetailForm from './PropertyDetailForm';
import OwnerDetailForm from './OwnerDetailForm';
import TenantDetailForm from './TenantDetailForm';
import PaymentVerification from './PaymentVerification';

function Rent() {
  // Initialize from localStorage if available, otherwise use default values
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('rentAgreementCurrentStep');
    return savedStep ? parseInt(savedStep) : 1;
  });
  
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('rentAgreementFormData');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Contract Details
      city: '',
      securityRefundableAmount: '',
      stampPaper: 0,
      agreementDuration: 0,
      monthlyRent: 0,
      rentMaintenance: false,
      otherCharges: false,
      agreementStart: '',
      yearlyIncrementInRent: '',
      identity: '',
      noticePeriod: 0,
      lockInPeriod: 0,
      
      // Property Details
      propertyType: '',
      floorNumber: 0,
      configuration: '',
      area: 0,
      propertyNumber: 0,
      buildingName: '',
      locality: '',
      pincode: 0,
      state: '',
      
      // Owner Details
      landlordName: '',
      landlordAge: 0,
      landlordPhone: '',
      landlordAddress: '',
      landlordIdentityProofNumber: '',
      landlordIdentityType: '',
      landlordEmail: '',
      landlordGender: '',
      
      // Tenant Details
      tenantName: '',
      tenantAge: 0,
      tenantPhone: '',
      tenantAddress: '',
      tenantIdentityProofNumber: '',
      tenantIdentityType: '',
      tenantEmail: '',
      tenantGender: '',
      
      // Payment & Verification
      consent: false,
      tenantVerified: false,
      landlordVerified: false,
      needPhysicalCopy: false,
      transactionId: '',
      totalAmount: ''
    };
  });

  // Save form data and current step to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rentAgreementFormData', JSON.stringify(formData));
    localStorage.setItem('rentAgreementCurrentStep', currentStep.toString());
  }, [formData, currentStep]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFormData = (stepData) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        ...stepData
      };
      return updatedData;
    });
  };
  
  // Function to clear saved form data (can be used when form is successfully submitted)
  const clearSavedFormData = () => {
    localStorage.removeItem('rentAgreementFormData');
    localStorage.removeItem('rentAgreementCurrentStep');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RentAgreementContract
            formData={formData}
            onFormDataChange={handleFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PropertyDetailForm
            formData={formData}
            onFormDataChange={handleFormData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <OwnerDetailForm
            formData={formData}
            onFormDataChange={handleFormData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <TenantDetailForm
            formData={formData}
            onFormDataChange={handleFormData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <PaymentVerification
            formData={formData}
            onFormDataChange={handleFormData}
            onPrev={handlePrev}
            onSubmitSuccess={clearSavedFormData} // Clear saved data on successful submission
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rent-contract-detail-progressbar">
        <div className={`rent-contract-detail-step ${currentStep >= 1 ? 'rent-contract-detail-step-active' : ''}`}>
          <span>1</span>
          <span>Contract Detail</span>
        </div>
        <div className={`rent-contract-detail-step ${currentStep >= 2 ? 'rent-contract-detail-step-active' : ''}`}>
          <span>2</span>
          <span>Property Detail</span>
        </div>
        <div className={`rent-contract-detail-step ${currentStep >= 3 ? 'rent-contract-detail-step-active' : ''}`}>
          <span>3</span>
          <span>Owner Detail</span>
        </div>
        <div className={`rent-contract-detail-step ${currentStep >= 4 ? 'rent-contract-detail-step-active' : ''}`}>
          <span>4</span>
          <span>Tenant Detail</span>
        </div>
        <div className={`rent-contract-detail-step ${currentStep >= 5 ? 'rent-contract-detail-step-active' : ''}`}>
          <span>5</span>
          <span>Payment & Verification</span>
        </div>
      </div>
      {renderStep()}
    </>
  )
}

export default Rent