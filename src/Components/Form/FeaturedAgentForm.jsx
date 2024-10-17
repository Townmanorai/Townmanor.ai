// import React, { useState } from 'react';
// import './FeaturedAgentForm.css';

// const FeaturedAgentForm = () => {
//   const dummyData = {
//     propertyName: 'Luxury Apartments',
//     agentName: 'John Doe',
//     agentUsername: 'johndoe123',
//     city: 'Delhi',
//     state: 'Delhi NCR',
//     address: '123, Main Street, Delhi',
//     totalListings: 10,
//     registeredAgent: 'Yes',
//     reraId: 'RERA1234',
//     pointsRequired: 2000,
//   };

//   // const [formData, setFormData] = useState({
//   //   propertyName: '',
//   //   agentName: '',
//   //   agentUsername: '',
//   //   city: '',
//   //   state: '',
//   //   address: '',
//   //   totalListings: '',
//   //   registeredAgent: '',
//   //   reraId: '',
//   //   pointsRequired: 2000,
//   // });

//   const [formData, setFormData] = useState(dummyData);
//   const [selectedListing, setSelectedListing] = useState('self');
//   const [selectedAgentType, setSelectedAgentType] = useState('featured');
//   const [walletPoints, setWalletPoints] = useState(3000); // Example wallet balance

//   const handleListingChange = (type) => {
//     if (type === 'self') {
//       setFormData(dummyData);
//     } else {
//       setFormData({
//         propertyName: '',
//         agentName: '',
//         agentUsername: '',
//         city: '',
//         state: '',
//         address: '',
//         totalListings: '',
//         registeredAgent: '',
//         reraId: '',
//         pointsRequired: formData.pointsRequired,
//       });
//     }
//     setSelectedListing(type);
//   };

//   const handleAgentTypeChange = (type) => {
//     setSelectedAgentType(type);
//     const pointsRequired = type === 'featured' ? 2000 : 5000;
//     setFormData((prevData) => ({
//       ...prevData,
//       pointsRequired,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (walletPoints < formData.pointsRequired) {
//       console.log('Redirect to Add Points to Wallet');
//     } else {
//       console.log('Form Submitted:', formData);
//     }
//   };

//   return (
//     <div className="top-featured-agent-form">
//     <div className="featured-agent-form">
//       <h3>List Yourself as an Agent</h3>

//       <div className="button-group">
//         <button
//           className={selectedListing === 'self' ? 'active' : ''}
//           onClick={() => handleListingChange('self')}
//         >
//           List by Yourself
//         </button>
//         <button
//           className={selectedListing === 'other' ? 'active' : ''}
//           onClick={() => handleListingChange('other')}
//         >
//           List by Other Name
//         </button>
//       </div>

//       <div className="button-group">
//         <button
//           className={selectedAgentType === 'featured' ? 'active' : ''}
//           onClick={() => handleAgentTypeChange('featured')}
//         >
//           Featured Agent (2000 Points)
//         </button>
//         <button
//           className={selectedAgentType === 'spotlight' ? 'active' : ''}
//           onClick={() => handleAgentTypeChange('spotlight')}
//         >
//           Agent On Spotlight (5000 Points)
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Property Name/Project Name</label>
//           <input
//             type="text"
//             name="propertyName"
//             value={formData.propertyName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Agent Name</label>
//           <input
//             type="text"
//             name="agentName"
//             value={formData.agentName}
//             onChange={handleChange}
//             required
//           />
//         </div>

        // <div className="form-group">
        //   <label>Agent Username</label>
        //   <input
        //     type="text"
        //     name="agentUsername"
        //     value={formData.agentUsername}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label>City</label>
        //   <select
        //     name="city"
        //     value={formData.city}
        //     onChange={handleChange}
        //     required
        //   >
        //     <option value="">Select City</option>
        //     <option value="Delhi">Delhi</option>
        //     <option value="Noida">Noida</option>
        //     <option value="Gurugram">Gurugram</option>
        //     <option value="Ghaziabad">Ghaziabad</option>
        //   </select>
        // </div>

        // <div className="form-group">
        //   <label>State</label>
        //   <select
        //     name="state"
        //     value={formData.state}
        //     onChange={handleChange}
        //     required
        //   >
        //     <option value="">Select State</option>
        //     <option value="Delhi NCR">Delhi NCR</option>
        //   </select>
        // </div>

        // <div className="form-group">
        //   <label>Address</label>
        //   <input
        //     type="text"
        //     name="address"
        //     value={formData.address}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label>Total No. of Property Listing (Optional)</label>
        //   <input
        //     type="number"
        //     name="totalListings"
        //     value={formData.totalListings}
        //     onChange={handleChange}
        //   />
        // </div>

        // <div className="form-group">
        //   <label>Registered Agent (Optional)</label>
        //   <input
        //     type="text"
        //     name="registeredAgent"
        //     value={formData.registeredAgent}
        //     onChange={handleChange}
        //   />
        // </div>

        // <div className="form-group">
        //   <label>RERA Id (Optional)</label>
        //   <input
        //     type="text"
        //     name="reraId"
        //     value={formData.reraId}
        //     onChange={handleChange}
        //   />
        // </div>

        // <div className="form-group">
        //   <label>Points Required</label>
        //   <input
        //     type="number"
        //     name="pointsRequired"
        //     value={formData.pointsRequired}
        //     readOnly
        //   />
        // </div>

//         <button
//           type="submit"
//           className="btn-submit"
//         >
//           {walletPoints < formData.pointsRequired ? 'Add Points to Wallet' : 'Submit'}
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default FeaturedAgentForm;



//-----------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './FeaturedAgentForm.css';

// const FeaturedAgentForm = () => {
//   // Use useLocation to get the state passed via the navigate function
//   const location = useLocation();
//   const { title, titleid } = location.state || {}; // Access title and titleid from props

//   // Dummy data with propertyName and propertyId as uneditable fields
//   const dummyData = {
//     propertyName: title || 'Default Property Name',
//     propertyId: titleid || 'Default Property Id',
//     agentName: 'John Doe',
//     agentUsername: 'johndoe123',
//     city: 'Delhi',
//     state: 'Delhi NCR',
//     address: '123, Main Street, Delhi',
//     totalListings: 10,
//     registeredAgent: 'Yes',
//     reraId: 'RERA1234',
//     pointsRequired: 2000,
//   };

//   // Set the form data with the dummy data
//   const [formData, setFormData] = useState(dummyData);
//   const [selectedListing, setSelectedListing] = useState('self');
//   const [selectedAgentType, setSelectedAgentType] = useState('featured');
//   const [walletPoints, setWalletPoints] = useState(3000); // Example wallet balance

//   const handleListingChange = (type) => {
//     setSelectedListing(type);
//     if (type === 'self') {
//       setFormData(dummyData);
//     } else {
//       setFormData({
//         propertyName: '',
//         propertyId: '',
//         agentName: '',
//         agentUsername: '',
//         city: '',
//         state: '',
//         address: '',
//         totalListings: '',
//         registeredAgent: '',
//         reraId: '',
//         pointsRequired: 2000,
//       });
//     }
//   };

//   const handleAgentTypeChange = (type) => {
//     setSelectedAgentType(type);
//     const pointsRequired = type === 'featured' ? 2000 : 5000;
//     setFormData((prevData) => ({
//       ...prevData,
//       pointsRequired,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (walletPoints < formData.pointsRequired) {
//       console.log('Redirect to Add Points to Wallet');
//     } else {
//       console.log('Form Submitted:', formData);
//     }
//   };

//   return (
//     <div className="top-featured-agent-form">
//       <div className="featured-agent-form">
//         <h3>List Yourself as an Agent</h3>

//         <div className="button-group">
//           <button
//             className={selectedListing === 'self' ? 'active' : ''}
//             onClick={() => handleListingChange('self')}
//           >
//             List by Yourself
//           </button>
//           <button
//             className={selectedListing === 'other' ? 'active' : ''}
//             onClick={() => handleListingChange('other')}
//           >
//             List by Other Name
//           </button>
//         </div>

//         <div className="button-group">
//           <button
//             className={selectedAgentType === 'featured' ? 'active' : ''}
//             onClick={() => handleAgentTypeChange('featured')}
//           >
//             Featured Agent (2000 Points)
//           </button>
//           <button
//             className={selectedAgentType === 'spotlight' ? 'active' : ''}
//             onClick={() => handleAgentTypeChange('spotlight')}
//           >
//             Agent On Spotlight (5000 Points)
//           </button>
//         </div>

        // <form onSubmit={handleSubmit}>
        //   {/* Property Name (Uneditable) */}
        //   <div className="form-group">
        //     <label>Property Name/Project Name</label>
        //     <input
        //       type="text"
        //       name="propertyName"
        //       value={formData.propertyName}
        //       readOnly
        //     />
        //   </div>

        //   {/* Property ID (Uneditable) */}
        //   <div className="form-group">
        //     <label>Property ID</label>
        //     <input
        //       type="text"
        //       name="propertyId"
        //       value={formData.propertyId}
        //       readOnly
        //     />
        //   </div>

        //   {/* Agent Name */}
        //   <div className="form-group">
        //     <label>Agent Name</label>
        //     <input
        //       type="text"
        //       name="agentName"
        //       value={formData.agentName}
        //       onChange={handleChange}
        //       required
        //     />
        //   </div>

        //   {/* Agent Username */}
        //   <div className="form-group">
        //     <label>Agent Username</label>
        //     <input
        //       type="text"
        //       name="agentUsername"
        //       value={formData.agentUsername}
        //       onChange={handleChange}
        //       required
        //     />
        //   </div>

        //   {/* City */}
        //   <div className="form-group">
        //     <label>City</label>
        //     <select
        //       name="city"
        //       value={formData.city}
        //       onChange={handleChange}
        //       required
        //     >
        //       <option value="">Select City</option>
        //       <option value="Delhi">Delhi</option>
        //       <option value="Noida">Noida</option>
        //       <option value="Gurugram">Gurugram</option>
        //       <option value="Ghaziabad">Ghaziabad</option>
        //     </select>
        //   </div>

        //   {/* State */}
        //   <div className="form-group">
        //     <label>State</label>
        //     <select
        //       name="state"
        //       value={formData.state}
        //       onChange={handleChange}
        //       required
        //     >
        //       <option value="">Select State</option>
        //       <option value="Delhi NCR">Delhi NCR</option>
        //     </select>
        //   </div>

        //   {/* Address */}
        //   <div className="form-group">
        //     <label>Address</label>
        //     <input
        //       type="text"
        //       name="address"
        //       value={formData.address}
        //       onChange={handleChange}
        //       required
        //     />
        //   </div>

        //   {/* Total Listings */}
        //   <div className="form-group">
        //     <label>Total No. of Property Listing (Optional)</label>
        //     <input
        //       type="number"
        //       name="totalListings"
        //       value={formData.totalListings}
        //       onChange={handleChange}
        //     />
        //   </div>

        //   {/* Registered Agent */}
        //   <div className="form-group">
        //     <label>Registered Agent (Optional)</label>
        //     <input
        //       type="text"
        //       name="registeredAgent"
        //       value={formData.registeredAgent}
        //       onChange={handleChange}
        //     />
        //   </div>

        //   {/* RERA Id */}
        //   <div className="form-group">
        //     <label>RERA Id (Optional)</label>
        //     <input
        //       type="text"
        //       name="reraId"
        //       value={formData.reraId}
        //       onChange={handleChange}
        //     />
        //   </div>

        //   {/* Points Required */}
        //   <div className="form-group">
        //     <label>Points Required</label>
        //     <input
        //       type="number"
        //       name="pointsRequired"
        //       value={formData.pointsRequired}
        //       readOnly
        //     />
        //   </div>

//           {/* Submit Button */}
//           <button type="submit" className="btn-submit">
//             {walletPoints < formData.pointsRequired ? 'Add Points to Wallet' : 'Submit'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeaturedAgentForm;


//-------------------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeaturedAgentForm.css';

const FeaturedAgentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, titleid } = location.state || {};

  const [formData, setFormData] = useState({
    propertyName: title || 'Default Property Name',
    propertyId: titleid || 'Default Property Id',
    agentName: '',
    agentUsername: '',
    city: '',
    state: '',
    address: '',
    totalListings: '',
    registeredAgent: '',
    reraId: '',
    pointsRequired: '', // Will be set dynamically later if needed
  });
  const [agentLimits, setAgentLimits] = useState({});
  const [selectedListing, setSelectedListing] = useState('self');
  const [selectedAgentType, setSelectedAgentType] = useState('featured');

  const username = 'ravindra'; // Adjust based on logged-in user

  useEffect(() => {
    if (selectedListing === 'self') {
      axios.get(`http://localhost:3030/user/${username}`)
        .then((response) => {
          setFormData({
            ...formData,
            agentName: response.data.name,
            agentUsername: response.data.username,
            address: response.data.address,
          });
        });
    } else {
      setFormData({
        propertyName: title || 'Default Property Name',
        propertyId: titleid || 'Default Property Id',
        agentName: '',
        agentUsername: '',
        city: '',
        state: '',
        address: '',
        totalListings: '',
        registeredAgent: '',
        reraId: '',
        pointsRequired: '',
      });
    }
  }, [selectedListing]);

  useEffect(() => {
    axios.get(`http://localhost:3030/userplanslimit/${username}`)
      .then((response) => {
        console.log("userplanlimitresponse",response);
        console.log("userplanlimitdata[0]response",response.data);
        setAgentLimits(response.data);
        console.log("agentlimits", agentLimits);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleListingChange = (type) => {
    setSelectedListing(type);
  };

  const handleAgentTypeChange = (type) => {
    setSelectedAgentType(type);
  };

  // console.log("selectedAgentType",selectedAgentType);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Determine the correct field to update based on the selected agent type
  //   let agentLimitField = selectedAgentType === 'featured' ? 'featured_agent' : 'agent_on_spotlight';
  //   console.log("agentLimitField",agentLimitField);
  //   console.log("agentLimits[agentLimitField]",agentLimits[agentLimitField])
  //   console.log("formData",formData);
  
  //   // Parse the agent limits from string to number before performing operations
  //   if (parseInt(agentLimits[agentLimitField]) > 0) { 
  //     try {
  //       // If the selected agent type is 'spotlight', check if the property already has an agent on spotlight
  //       if (selectedAgentType === 'spotlight') {
  //         const propertyId = formData.propertyId;
  //         const propertyResponse = await axios.get(`http://localhost:3030/property/${propertyId}`);
  
  //         // If the property already has an agent in the spotlight, alert the user
  //         if (propertyResponse.data.AgentsOnSpotlightId) {
  //           alert('Spotlight ad is not available for this property.');
  //           return;
  //         }
  //       }
  
  //       // Add the agent to the ad agents table
  //       const agentResponse = await axios.post('http://localhost:3030/adsagents', { 
  //         ...formData, 
  //         agentType: selectedAgentType 
  //       });
  //       console.log("agentResponse",agentResponse)
  
  //       // Extract the new agent ID from the response
  //       const newAgentId = agentResponse.data.newAgentId; // Assuming the response contains the new agent ID
  //       console.log("newAgentId",newAgentId)
  
  //       // Decrement the user's agent limit and update it in the backend
  //       let updatedLimits = {
  //         ...agentLimits,
  //         [agentLimitField]: (parseInt(agentLimits[agentLimitField]) - 1).toString(), // Reduce the limit by 1 and convert back to string
  //       };
  //       console.log("updatedLimits",updatedLimits)
  //       await axios.put(`http://localhost:3030/userplanslimit/${username}`, updatedLimits);
  
  //       // Determine the field to update in the property table based on agent type
  //       let propertyUpdateField = selectedAgentType === 'featured' ? 'FeaturedAgentsId' : 'AgentsOnSpotlightId';
  //       console.log("propertyUpdateField",propertyUpdateField);

  //       console.log("propertyResponse",propertyResponse);
  //       console.log("propertyResponse.data[propertyUpdateField]",propertyResponse.data[propertyUpdateField] );
  //       console.log("newAgentId",newAgentId);
  //       // Get existing agent IDs for the property and ensure it's an array
  //       let existingIDs = propertyResponse.data[propertyUpdateField] || []; 
  //       if (!Array.isArray(existingIDs)) {
  //         existingIDs = [existingIDs]; // Ensure it's an array if not
  //       }
  //       existingIDs.push(newAgentId); // Add the new agent ID
  //       console.log("newAgentId",newAgentId);
  
  //       // Update the property with the new agent ID
  //       await axios.put(`http://localhost:3030/property/${formData.propertyId}`, {
  //         [propertyUpdateField]: existingIDs,
  //       });
  
  //       alert('Agent added successfully.');
  //     } catch (error) {
  //       console.error('Error submitting the form:', error);
  //       alert('An error occurred while adding the agent. Please try again.');
  //     }
  //   } else {
  //     // If the user doesn't have enough agent limits, redirect them to the pricing plans page
  //     alert('Agent not added ');
  //     navigate('/pricing-plans');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Determine the correct field to update based on the selected agent type
    let agentLimitField = selectedAgentType === 'featured' ? 'featured_agent' : 'agent_on_spotlight';
    console.log("agentLimitField", agentLimitField);
    console.log("agentLimits[agentLimitField]", agentLimits[agentLimitField]);
    console.log("formData", formData);
  
    // Parse the agent limits from string to number before performing operations
    if (parseInt(agentLimits[agentLimitField]) > 0) {    
      try {
          // If the selected agent type is 'spotlight', check if the property already has an agent on spotlight
          if (selectedAgentType === 'spotlight') {
            const propertyId = formData.propertyId;
            const propertyResponse = await axios.get(`http://localhost:3030/property/${propertyId}`);
    
            // If the property already has an agent in the spotlight, alert the user
            if (propertyResponse.data.AgentsOnSpotlightId) {
              alert('Spotlight ads is not available for this property.');
              return;
            }
          }
        // Fetch the property details
        const propertyId = formData.propertyId;
        const propertyResponse = await axios.get(`http://localhost:3030/property/${propertyId}`);
        
        // Add the agent to the ad agents table
        const agentResponse = await axios.post('http://localhost:3030/adsagents', { 
          ...formData, 
          agentType: selectedAgentType 
        });
        console.log("agentResponse", agentResponse);
  
        // Extract the new agent ID from the response
        const newAgentId = agentResponse.data.newAgentId;
        console.log("newAgentId", newAgentId);
  
        // Decrement the user's agent limit and update it in the backend
        let updatedLimits = {
          ...agentLimits,
          [agentLimitField]: (parseInt(agentLimits[agentLimitField]) - 1).toString(),
        };
        console.log("updatedLimits", updatedLimits);
        await axios.put(`http://localhost:3030/userplanslimit/${username}`, updatedLimits);
  
        // Determine the field to update in the property table based on agent type
        let propertyUpdateField = selectedAgentType === 'featured' ? 'FeaturedAgentsId' : 'AgentsOnSpotlightId';
        console.log("propertyUpdateField", propertyUpdateField);
  
        // Ensure existing agent IDs are handled as an array
        let existingIDs = JSON.parse(propertyResponse.data[propertyUpdateField] || '[]');
        existingIDs = Array.isArray(existingIDs) ? existingIDs : [existingIDs]; // Ensure it's an array
        existingIDs.push(newAgentId); // Add the new agent ID

        let newAgentIds = JSON.parse(newAgentId || '[]');
        newAgentIds= Array.isArray(newAgentId) ? newAgentId : [newAgentId]; // Ensure it's an array
        console.log(newAgentIds);
  
        console.log("existingIDs after adding new ID", existingIDs);
  
        // Update the property with the new agent ID array
        await axios.put(`http://localhost:3030/property/agents/${formData.propertyId}`, {
          [propertyUpdateField]: newAgentIds, // Send as an array
        });
  
        alert('Agent added successfully.');
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('An error occurred while adding the agent. Please try again.');
      }
    } else {
      alert('Agent not added ', updatedLimits);
      navigate('/pricing-plans');
    }
  };
  


  return (
    <div className="top-featured-agent-form">
      <div className="featured-agent-form">
        <h3>List Yourself as an Agent</h3>
        <div className="button-group">
          <button
            className={selectedListing === 'self' ? 'active' : ''}
            onClick={() => handleListingChange('self')}
          >
            List by Yourself
          </button>
          <button
            className={selectedListing === 'other' ? 'active' : ''}
            onClick={() => handleListingChange('other')}
          >
            List by Other Name
          </button>
        </div>

        <div className="button-group">
          <button
            className={selectedAgentType === 'featured' ? 'active' : ''}
            onClick={() => handleAgentTypeChange('featured')}
          >
            Featured Agent
          </button>
          <button
            className={selectedAgentType === 'spotlight' ? 'active' : ''}
            onClick={() => handleAgentTypeChange('spotlight')}
          >
            Agent On Spotlight
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Property Name (Uneditable) */}
          <div className="form-group">
            <label>Property Name/Project Name</label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              readOnly
            />
          </div>

          {/* Property ID (Uneditable) */}
          <div className="form-group">
            <label>Property ID</label>
            <input
              type="text"
              name="propertyId"
              value={formData.propertyId}
              readOnly
            />
          </div>

          {/* Agent Name */}
          <div className="form-group">
            <label>Agent Name</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Agent Username */}
          <div className="form-group">
            <label>Agent Username</label>
            <input
              type="text"
              name="agentUsername"
              value={formData.agentUsername}
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Gurugram">Gurugram</option>
              <option value="Ghaziabad">Ghaziabad</option>
            </select>
          </div>

          {/* State */}
          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="Delhi NCR">Delhi NCR</option>
            </select>
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Total Listings */}
          <div className="form-group">
            <label>Total No. of Property Listing (Optional)</label>
            <input
              type="number"
              name="totalListings"
              value={formData.totalListings}
              onChange={handleChange}
            />
          </div>

          {/* Registered Agent */}
          <div className="form-group">
            <label>Registered Agent (Optional)</label>
            <input
              type="text"
              name="registeredAgent"
              value={formData.registeredAgent}
              onChange={handleChange}
            />
          </div>

          {/* RERA Id */}
          <div className="form-group">
            <label>RERA Id (Optional)</label>
            <input
              type="text"
              name="reraId"
              value={formData.reraId}
              onChange={handleChange}
            />
          </div>

          {/* Points Required */}
          <div className="form-group">
            <label>Points Required</label>
            <input
              type="number"
              name="pointsRequired"
              value={formData.pointsRequired}
              readOnly
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeaturedAgentForm;
