import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PropertyBoosterStyles.css';

const PropertyBoosterModal = ({ isOpen, onClose, username, userData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const boosterPlans = [
    {
      id: 1,
      name: '7 Days Booster',
      price: 1.00,
      duration: 7,
      features: [
        'Top Search Results',
        'Featured Section Display',
        'Enhanced Visibility',
        'Priority Listing'
      ]
    },
    {
      id: 2,
      name: '15 Days Booster',
      price: 1.00,
      duration: 15,
      features: [
        'Top Search Results',
        'Featured Section Display',
        'Enhanced Visibility',
        'Priority Listing'
      ]
    }
  ];

  useEffect(() => {
    if (isOpen && step === 1) {
      fetchUserProperties();
    }
  }, [isOpen, username]);

  const fetchUserProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.townmanor.ai/api/owner-property/username/${username}`);
      setProperties(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties. Please try again.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.property_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setStep(2);
  };

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan);
    try {
      // Generate a unique transaction ID
      const txnid = 'TXN_' + Date.now();
      
      // Prepare payment details with correct PayU structure
      const paymentData = {
        key: 'UvTrjC', // PayU Merchant Key
        txnid: txnid,
        amount: plan.price.toString(),
        productinfo: `Property Booster - ${plan.name}`,
        firstname: userData?.name_surname || username || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        surl: `http://townmanor.ai/payu/success/${selectedProperty.id}`,
        furl: `http://townmanor.ai/payu/failure`,
        udf1: selectedProperty.id.toString(), // Custom field for property ID
        service_provider: 'payu_paisa'
      };

      // Validate required fields
      const requiredFields = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !paymentData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}. Please update your profile with the required information.`);
      }

      // Call backend to get payment hash and URL
      const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

      if (!response.data || !response.data.paymentUrl || !response.data.params) {
        throw new Error('Invalid payment response received');
      }

      // Create and submit payment form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.paymentUrl;

      // Add all the PayU parameters received from backend
      Object.entries(response.data.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert(error.response?.data?.message || error.message || 
        'Failed to initiate payment. Please ensure all required information is provided and try again.');
    }
  };

  // Handle payment response
  useEffect(() => {
    const handlePaymentResponse = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('status');
      const txnid = urlParams.get('txnid');
      const mihpayid = urlParams.get('mihpayid');
      const error = urlParams.get('error');

      if (status === 'success' && txnid) {
        // Verify the payment status with backend
        axios.get(`https://townmanor.ai/api/payu/verify/${txnid}`)
          .then(response => {
            if (response.data.status === 'success') {
              alert(`Payment successful! Transaction ID: ${mihpayid}`);
              window.location.reload();
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          })
          .catch(err => {
            console.error('Verification failed:', err);
            alert('Payment verification failed. Please contact support.');
          });
      } else if (status === 'failure' || error) {
        alert(`Payment failed. ${error || 'Please try again.'}`);
      }
    };

    if (window.location.search) {
      handlePaymentResponse();
    }
  }, []);

  const handleClose = () => {
    setStep(1);
    setSelectedProperty(null);
    setSelectedPlan(null);
    setSearchQuery('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="property_booster_overlay_abxy123" onClick={handleClose}>
      <div className="property_booster_modal_abxy123" onClick={e => e.stopPropagation()}>
        <button className="close_button_abxy123" onClick={handleClose}>
          <FaTimes />
        </button>

        <div className="steps_indicator_abxy123">
          <div className={`step_abxy123 ${step >= 1 ? 'active' : ''}`}>1. Select Property</div>
          <div className={`step_abxy123 ${step >= 2 ? 'active' : ''}`}>2. Choose Plan</div>
        </div>

        {error && (
          <div className="error_message_abxy123">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="step_content_abxy123">
            <h2>Select a Property to Boost</h2>
            <div className="search_box_abxy123">
              <FaSearch className="search_icon_abxy123" />
              <input
                type="text"
                placeholder="Search your properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="properties_list_abxy1234">
              {loading ? (
                <div className="loading_abxy123">Loading properties...</div>
              ) : filteredProperties.length === 0 ? (
                <div className="no_properties_abxy123">
                  {searchQuery ? 'No properties match your search' : 'No properties found'}
                </div>
              ) : (
                filteredProperties.map(property => (
                  <div
                    key={property.id}
                    className={`property_item_abxy1234 ${selectedProperty?.id === property.id ? 'selected' : ''}`}
                    onClick={() => handlePropertySelect(property)}
                  >
                    <img
                      src={property.image_repository ? 
                        `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${JSON.parse(property.image_repository)[0]}` : 
                        '/placeholder.jpg'
                      }
                      alt={property.property_name}
                    />
                    <div className="property_info_abxy123">
                      <h3>{property.property_name}</h3>
                      <p>₹{property.price} {property.pricerange}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step_content_abxy123">
            <h2>Choose Your Booster Plan</h2>
            <div className="plans_container_abxy123">
              {boosterPlans.map(plan => (
                <div
                  key={plan.id}
                  className={`plan_card_abxy123 ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <h3>{plan.name}</h3>
                  <div className="plan_price_abxy123">₹{plan.price}</div>
                  <div className="plan_duration_abxy123">{plan.duration} Days</div>
                  <ul className="plan_features_abxy123">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <FaCheckCircle className="feature_icon_abxy123" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="select_plan_btn_abxy123">
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyBoosterModal; 