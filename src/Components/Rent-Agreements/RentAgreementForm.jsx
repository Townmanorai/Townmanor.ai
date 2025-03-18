import React, { useState } from 'react';
import './RentAgreement.css';
import { FaPlus, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const RentAgreementForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Agreement Details
    agreementCity: '',
    agreementType: 'Rental Agreement',
    agreementDate: '',
    
    // Landlord Details
    landlordTitle: '',
    landlordName: '',
    landlordParentTitle: '',
    landlordParentName: '',
    landlordContact: '',
    landlordEmail: '',
    landlordPAN: '',
    landlordAadhaar: '',
    landlordAddress1: '',
    landlordAddress2: '',
    landlordCity: '',
    landlordPincode: '',
    
    // Tenant Details
    tenantTitle: '',
    tenantName: '',
    tenantParentTitle: '',
    tenantParentName: '',
    tenantContact: '',
    tenantEmail: '',
    tenantPAN: '',
    tenantAadhaar: '',
    tenantAddress1: '',
    tenantAddress2: '',
    tenantCity: '',
    tenantPincode: '',
    
    // Property Details
    rentAmount: '',
    rentPaymentDay: '',
    rentIncrement: '',
    refundableDeposit: '',
    noticePeriod: '',
    lockInPeriod: '',
    agreementStartDate: '',
    
    // Property Utilities
    utilities: []
  });

  // Define slideVariants at the component level
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUtilityChange = (index, quantity) => {
    const newUtilities = [...formData.utilities];
    newUtilities[index] = quantity;
    setFormData(prev => ({
      ...prev,
      utilities: newUtilities
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here we'll add the payment integration and API call
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const calculateProgress = () => {
    return (step / 5) * 100;
  };

  const calculateSectionProgress = (section) => {
    let totalFields = 0;
    let filledFields = 0;

    switch(section) {
      case 'landlord':
        totalFields = 12; // Total number of landlord fields
        filledFields = Object.values({
          landlordTitle: formData.landlordTitle,
          landlordName: formData.landlordName,
          landlordParentTitle: formData.landlordParentTitle,
          landlordParentName: formData.landlordParentName,
          landlordContact: formData.landlordContact,
          landlordEmail: formData.landlordEmail,
          landlordPAN: formData.landlordPAN,
          landlordAadhaar: formData.landlordAadhaar,
          landlordAddress1: formData.landlordAddress1,
          landlordAddress2: formData.landlordAddress2,
          landlordCity: formData.landlordCity,
          landlordPincode: formData.landlordPincode
        }).filter(value => value !== '').length;
        break;
      case 'tenant':
        totalFields = 12; // Total number of tenant fields
        filledFields = Object.values({
          tenantTitle: formData.tenantTitle,
          tenantName: formData.tenantName,
          tenantParentTitle: formData.tenantParentTitle,
          tenantParentName: formData.tenantParentName,
          tenantContact: formData.tenantContact,
          tenantEmail: formData.tenantEmail,
          tenantPAN: formData.tenantPAN,
          tenantAadhaar: formData.tenantAadhaar,
          tenantAddress1: formData.tenantAddress1,
          tenantAddress2: formData.tenantAddress2,
          tenantCity: formData.tenantCity,
          tenantPincode: formData.tenantPincode
        }).filter(value => value !== '').length;
        break;
      case 'property':
        totalFields = 7; // Total number of property fields
        filledFields = Object.values({
          rentAmount: formData.rentAmount,
          rentPaymentDay: formData.rentPaymentDay,
          rentIncrement: formData.rentIncrement,
          refundableDeposit: formData.refundableDeposit,
          noticePeriod: formData.noticePeriod,
          lockInPeriod: formData.lockInPeriod,
          agreementStartDate: formData.agreementStartDate
        }).filter(value => value !== '').length;
        break;
      default:
        return 0;
    }

    return Math.round((filledFields / totalFields) * 100);
  };

  const renderSectionProgress = (section) => {
    const progress = calculateSectionProgress(section);
    return (
      <div className="townmanor-section-progress">
        <div className="townmanor-section-progress-bar">
          <div 
            className="townmanor-section-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="townmanor-section-progress-text">
          <span>Section Progress</span>
          <span>{progress}%</span>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="townmanor-rent-step">
            <h2 className="townmanor-lease-deed-title">LEASE DEED</h2>
            <p className="townmanor-lease-deed-date">
              This Lease Deed/Rent Agreement is executed at {formData.agreementCity} on day, {formData.agreementDate}.
            </p>
            <div className="townmanor-form-grid">
              <div className="townmanor-form-group">
                <label>Agreement City*</label>
                <select 
                  name="agreementCity" 
                  value={formData.agreementCity}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
              <div className="townmanor-form-group">
                <label>Agreement Type*</label>
                <select 
                  name="agreementType" 
                  value={formData.agreementType}
                  onChange={handleChange}
                  required
                >
                  <option value="Rental Agreement">Rental Agreement</option>
                </select>
              </div>
              <div className="townmanor-form-group">
                <label>Agreement Date*</label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="townmanor-rent-step">
            <h3>BETWEEN (Lessor-1 and/ or the First Party)</h3>
            <div className="townmanor-form-grid">
              <div className="townmanor-form-group">
                <label>Title*</label>
                <select
                  name="landlordTitle"
                  value={formData.landlordTitle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Ms">Ms.</option>
                </select>
              </div>
              <div className="townmanor-form-group">
                <label>Landlord Name*</label>
                <input
                  type="text"
                  name="landlordName"
                  value={formData.landlordName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>S/O or Parent's Title*</label>
                <select
                  name="landlordParentTitle"
                  value={formData.landlordParentTitle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                </select>
              </div>
              <div className="townmanor-form-group">
                <label>Parent's Name*</label>
                <input
                  type="text"
                  name="landlordParentName"
                  value={formData.landlordParentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Contact Number*</label>
                <input
                  type="tel"
                  name="landlordContact"
                  value={formData.landlordContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Email ID*</label>
                <input
                  type="email"
                  name="landlordEmail"
                  value={formData.landlordEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>PAN Number*</label>
                <input
                  type="text"
                  name="landlordPAN"
                  value={formData.landlordPAN}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Aadhaar Number*</label>
                <input
                  type="text"
                  name="landlordAadhaar"
                  value={formData.landlordAadhaar}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="townmanor-form-group townmanor-form-group-full-width">
              <label>Address Line 1*</label>
              <input
                type="text"
                name="landlordAddress1"
                value={formData.landlordAddress1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="townmanor-form-group townmanor-form-group-full-width">
              <label>Address Line 2</label>
              <input
                type="text"
                name="landlordAddress2"
                value={formData.landlordAddress2}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="townmanor-add-landlord-btn">
              <FaPlus /> Add Landlord
            </button>
          </div>
        );

      case 3:
        return (
          <div className="townmanor-rent-step">
            <h3>AND (Lessee-1 and/ or Second Party)</h3>
            <div className="townmanor-form-grid">
              <div className="townmanor-form-group">
                <label>Title*</label>
                <select
                  name="tenantTitle"
                  value={formData.tenantTitle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Ms">Ms.</option>
                </select>
              </div>
              <div className="townmanor-form-group">
                <label>Tenant Name*</label>
                <input
                  type="text"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>S/O or Parent's Title*</label>
                <select
                  name="tenantParentTitle"
                  value={formData.tenantParentTitle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                </select>
              </div>
              <div className="townmanor-form-group">
                <label>Parent's Name*</label>
                <input
                  type="text"
                  name="tenantParentName"
                  value={formData.tenantParentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Contact Number*</label>
                <input
                  type="tel"
                  name="tenantContact"
                  value={formData.tenantContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Email ID*</label>
                <input
                  type="email"
                  name="tenantEmail"
                  value={formData.tenantEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>PAN Number*</label>
                <input
                  type="text"
                  name="tenantPAN"
                  value={formData.tenantPAN}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Aadhaar Number*</label>
                <input
                  type="text"
                  name="tenantAadhaar"
                  value={formData.tenantAadhaar}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="townmanor-form-group townmanor-form-group-full-width">
              <label>Address Line 1*</label>
              <input
                type="text"
                name="tenantAddress1"
                value={formData.tenantAddress1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="townmanor-form-group townmanor-form-group-full-width">
              <label>Address Line 2</label>
              <input
                type="text"
                name="tenantAddress2"
                value={formData.tenantAddress2}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="townmanor-add-tenant-btn">
              <FaPlus /> Add Tenant
            </button>
          </div>
        );

      case 4:
        return (
          <div className="townmanor-rent-step">
            <h3>Property Details</h3>
            <div className="townmanor-form-grid">
              <div className="townmanor-form-group">
                <label>Monthly Rent Amount*</label>
                <input
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Rent Payment Day*</label>
                <input
                  type="number"
                  name="rentPaymentDay"
                  value={formData.rentPaymentDay}
                  onChange={handleChange}
                  min="1"
                  max="31"
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Rent Increment (%)*</label>
                <input
                  type="number"
                  name="rentIncrement"
                  value={formData.rentIncrement}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Refundable Deposit*</label>
                <input
                  type="number"
                  name="refundableDeposit"
                  value={formData.refundableDeposit}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Notice Period (Days)*</label>
                <input
                  type="number"
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="townmanor-form-group">
                <label>Lock-in Period (Months)*</label>
                <input
                  type="number"
                  name="lockInPeriod"
                  value={formData.lockInPeriod}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="townmanor-rent-step">
            <h3>ANNEXURE 1</h3>
            <p className="annexure-description">
              Items provided by the LESSOR at the time of execution of Lease Deed between the LESSOR and the LESSEE are as follows:
            </p>
            <div className="utilities-list">
              <table className="utilities-table">
                <thead>
                  <tr>
                    <th>Sr no</th>
                    <th>Item</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'AC(s)', 'Aircooler(s)', 'Bed(s)', 'Bulb(s)', 'Chair(s)',
                    'Cupboard(s)', 'Curtain(s)', 'Electric Geyser(s)', 'Fan(s)',
                    'Gas Geyser(s)', 'Refrigerator(s)', 'Sofa(s)', 'Table(s)',
                    'Tube Light(s)', 'TV(s)', 'Washing Machine(s)', 'Watercooler(s)'
                  ].map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                      <td>
                        <div className="quantity-control">
                          <button 
                            type="button" 
                            onClick={() => handleUtilityChange(index, Math.max(0, (formData.utilities[index] || 0) - 1))}
                          >
                            -
                          </button>
                          <span>{formData.utilities[index] || 0}</span>
                          <button 
                            type="button"
                            onClick={() => handleUtilityChange(index, (formData.utilities[index] || 0) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="add-custom-utility-btn">
                <FaPlus /> Add Custom Utilities
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="townmanor-rent-form">
      <h1>Rent Agreement</h1>
      <p className="townmanor-form-description">Create your rental agreement online in a swift and hassle free manner</p>
      
      <div className="townmanor-progress-bar">
        <div className="townmanor-progress-track">
          <div 
            className="townmanor-progress-fill"
            style={{ width: `${calculateProgress()}%` }}
          />
          <div className="townmanor-progress-steps">
            <div className={`townmanor-progress-step ${step >= 1 ? 'active' : ''}`}>
              <div className="townmanor-step-number">1</div>
              <div className="townmanor-step-label">Agreement Details</div>
            </div>
            <div className={`townmanor-progress-step ${step >= 2 ? 'active' : ''}`}>
              <div className="townmanor-step-number">2</div>
              <div className="townmanor-step-label">Landlord Details</div>
            </div>
            <div className={`townmanor-progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="townmanor-step-number">3</div>
              <div className="townmanor-step-label">Tenant Details</div>
            </div>
            <div className={`townmanor-progress-step ${step >= 4 ? 'active' : ''}`}>
              <div className="townmanor-step-number">4</div>
              <div className="townmanor-step-label">Property Details</div>
            </div>
            <div className={`townmanor-progress-step ${step >= 5 ? 'active' : ''}`}>
              <div className="townmanor-step-number">5</div>
              <div className="townmanor-step-label">Utilities</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="townmanor-rent-step">
          {renderStep()}
          {step === 2 && renderSectionProgress('landlord')}
          {step === 3 && renderSectionProgress('tenant')}
          {step === 4 && renderSectionProgress('property')}
        </div>
        <div className="townmanor-form-navigation">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="townmanor-btn-secondary"
            >
              <FaArrowLeft /> Previous
            </button>
          )}
          {step < 5 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="townmanor-btn-primary"
            >
              Next <FaArrowRight />
            </button>
          ) : (
            <button 
              type="submit" 
              className="townmanor-btn-primary"
            >
              Submit & Proceed to Payment
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RentAgreementForm; 