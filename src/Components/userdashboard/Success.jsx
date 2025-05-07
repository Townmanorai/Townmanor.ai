import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PropertyBoosterStyles.css';

const Success = () => {
    const navigate = useNavigate();
    const { propertyId } = useParams();

    useEffect(() => {
        const updatePropertyPriority = async () => {
            try {
                // Update property priority
                await axios.put(`https://www.townmanor.ai/api/owner-property/priority/${propertyId}`);
                
                // After successful update, redirect to dashboard after 12 seconds
                setTimeout(() => {
                    navigate('/userdashboard');
                }, 12000);
            } catch (error) {
                console.error('Error updating property priority:', error);
                // Still redirect to dashboard after 12 seconds even if there's an error
                setTimeout(() => {
                    navigate('/userdashboard');
                }, 12000);
            }
        };

        updatePropertyPriority();
    }, [propertyId, navigate]);

    return (
        <div className="success-container">
            <div className="success-content">
                <div className="success-icon">✓</div>
                <h1>Payment Successful!</h1>
                <p>Your property boost has been activated.</p>
                <p>You will be redirected to your dashboard in a few seconds...</p>
            </div>
        </div>
    );
};

export default Success; 