



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyLead.css'; 

function PropertyLead({ propertyData }) {
  const [leadData, setLeadData] = useState(propertyData || []);
  const [leadDetails, setLeadDetails] = useState({});

  useEffect(() => {
    // Fetch lead details for each property
    leadData.forEach(property => {
      axios.get(`https://www.townmanor.ai/api/property_lead/${property.id}`)
        .then(response => {
          // console.log(`API Response for property ${property.id}:`, response.data); // Debug: Log the API response
          setLeadDetails(prevDetails => ({
            ...prevDetails,
            [property.id]: response.data // Store lead details based on property ID
          }));
        })
        .catch(error => {
          console.error(`Error fetching lead details for property ${property.id}:`, error);
        });
    });
  }, [leadData]);

  return (
    <div className="property-leads-container">
      <h3>Property Leads</h3>
      <ul>
        {leadData.map(property => (
          <li key={property.id}>
            <strong>Property ID:</strong> {property.id} <br />
            <strong>Property Name:</strong> {property.property_name} <br />
            <strong>Price:</strong> {property.price} <br />
            <strong>City:</strong> {property.city}, {property.locality} <br />
            
            {leadDetails[property.id] && Array.isArray(leadDetails[property.id]) ? (
              <>
                <strong>Lead Details:</strong> <br />
                <div className="lead-details">
                  {leadDetails[property.id].map((lead, index) => (
                    <div key={index}>
                      <strong>Name:</strong> {lead.name} <br />
                      <strong>Phone:</strong> {lead.phone} <br />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>Loading lead details...</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyLead;
