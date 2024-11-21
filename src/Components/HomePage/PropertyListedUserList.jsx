// import React, { useEffect, useState } from 'react'; 
// import { useParams } from 'react-router-dom';
// import './PropertyListedUserList.css';  // Import the CSS for additional custom styling

// const PropertyListedUserList = () => {
//   const { property_name } = useParams();
//   const [ownerDetails, setOwnerDetails] = useState([]);
//   const [agentDetails, setAgentDetails] = useState([]);
//   const [agentsCount, setAgentsCount] = useState(0);
//   const [ownersCount, setOwnersCount] = useState(0);
//   const [propertyData , setPropertyData] = useState([]);

//   useEffect(() => {
//     fetchPropertyDetails();
//   }, [property_name]);

//   const fetchPropertyDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:3030/api/properties/${property_name}`);
//       const data = await response.json();
//       console.log("Fetched data:", data);

      
//       setOwnerDetails(data.owners || []);
//       setAgentDetails(data.agents || []);
//       setAgentsCount(data.agentsCount || 0);
//       setOwnersCount(data.ownersCount || 0);
//       setPropertyData(data.property || []);
//     } catch (error) {
//       console.error('Error fetching property details:', error);
//     }
//   };

//   return (
//     <div className="container property-details-page">
//       <h2 className="text-center my-4">Details for {property_name}</h2>
//       <h2>{propertyData.id}</h2>

//       <div className="row mb-5">
//         <div className="col-md-6">
//           <div className="list-card">
//             <h3 className="text-primary">Owners (Count: {ownersCount}):</h3>
//             {ownerDetails.length > 0 ? (
//               ownerDetails.map((owner) => (
//                 <div key={owner.username} className="list-item">
//                   <p><strong>Name:</strong> {owner.name_surname}</p>
//                   <p><strong>Phone:</strong> {owner.phone}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-muted">No owners found for this property</p>
//             )}
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="list-card">
//             <h3 className="text-primary">Agents (Count: {agentsCount}):</h3>
//             {agentDetails.length > 0 ? (
//               agentDetails.map((agent) => (
//                 <div key={agent.username} className="list-item">
//                   <p><strong>Name:</strong> {agent.name_surname}</p>
//                   <p><strong>Phone:</strong> {agent.phone}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-muted">No agents found for this property</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyListedUserList;



//----------------------------------------------------------------------

import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import './PropertyListedUserList.css';  // Import the CSS for additional custom styling

const PropertyListedUserList = () => {
  const { property_name } = useParams();
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [agentDetails, setAgentDetails] = useState([]);
  const [agentsCount, setAgentsCount] = useState(0);
  const [ownersCount, setOwnersCount] = useState(0);
  const [propertyData , setPropertyData] = useState([]);

  useEffect(() => {
    fetchPropertyDetails();
  }, [property_name]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/properties/${property_name}`);
      const data = await response.json();
      console.log("Fetched data:", data);

      
      setOwnerDetails(data.owners || []);
      setAgentDetails(data.agents || []);
      setAgentsCount(data.agentsCount || 0);
      setOwnersCount(data.ownersCount || 0);
      setPropertyData(data.property || []);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  return (
    <div className="container property-details-page">
      <h2 className="text-center my-4">Details for {property_name}</h2>
      <h2>{propertyData.id}</h2>

      <div className="row mb-5">
        <div className="col-md-6">
          <div className="list-card">
            <h3 className="text-primary">Owners (Count: {ownersCount}):</h3>
            {ownerDetails.length > 0 ? (
              ownerDetails.map((owner) => (
                <div key={owner.username} className="list-item">
                  <p><strong>Name:</strong> {owner.name_surname}</p>
                  <p><strong>Phone:</strong> {owner.phone}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No owners found for this property</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="list-card">
            <h3 className="text-primary">Agents (Count: {agentsCount}):</h3>
            {agentDetails.length > 0 ? (
              agentDetails.map((agent) => (
                <div key={agent.username} className="list-item">
                  <p><strong>Name:</strong> {agent.name_surname}</p>
                  <p><strong>Phone:</strong> {agent.phone}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No agents found for this property</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListedUserList;
 