// import React from 'react'
// import DashboardTopSection from './DahbaordTopImage';
// import "../../common.css";
// import "../../commonsecond.css";
// import DashboardNavbar from './DashboardNavbar';
// // import DashboardNavbar from './DynamicDashboard';

// const propertyData = [
//   {
//     id: 1340,
//     name: "Rishabh Cloud 9 Towers",
//     listingType: "Rent Properties",
//     propertyType: "Apartment",
//     possessionDate: "",
//     editLink: "https://townmanor.in/frontend/editproperty/en/1340",
//     deleteLink: "https://townmanor.in/frontend/deleteproperty/en/1340"
//   }
// ];

// const packageData = [
//   {
//     id: 2,
//     name: "Starter",
//     price: "200.00 INR",
//     daysLimit: "30, 2024-09-21 12:20:46",
//     listingsLimit: 1,
//     featuredLimit: 1
//   }
// ];

// function Dashboard() {
//   return (
//     <>
//     <div className='userDashboard'>
//         <DashboardTopSection />
//         {/* <DashboardNavbar /> */}
//         <DashboardNavbar propertyData={propertyData} packageData={packageData}/>
//     </div>    
//     </>
//   )
// }

// export default Dashboard


//----------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import DashboardTopSection from './DahbaordTopImage';
// import "../../common.css";
// import "../../commonsecond.css";
// import DashboardNavbar from './DashboardNavbar';

// function Dashboard() {
//   const { username } = useParams();
//   const [propertyData, setPropertyData] = useState([]);
//   const [packageData, setPackageData] = useState([]); // Placeholder for package data

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Fetch user data (including property listing)
//         const userResponse = await fetch(`http://localhost:3030/user/${username}`);
//         const userData = await userResponse.json();

//         console.log('User Data:', userData);

//         // Fetch property details based on property IDs in userData.propertylisting
//         if (userData.propertylisting && userData.propertylisting.length > 0) {
//           const propertyDetailsPromises = userData.propertylisting.map(async (propertyId) => {
//             // Parse the propertyId to remove quotes or extra characters
//             propertyId = propertyId.replace(/["[\]]/g, ''); // Remove quotes and brackets if it's stringified

//             const propertyResponse = await fetch(`http://localhost:3030/property/${propertyId}`);
//             const propertyData = await propertyResponse.json();

//             // Log the property details or handle if property not found
//             console.log(`Fetched property ${propertyId}:`, propertyData);

//             if (propertyData.message === 'Property not found') {
//               console.warn(`Property with ID ${propertyId} not found.`);
//               return null; // Skip if property not found
//             }

//             return propertyData;
//           });

//           // Wait for all property data to be fetched
//           const propertyDetails = await Promise.all(propertyDetailsPromises);
          
//           // Filter out any null values for properties that were not found
//           const validProperties = propertyDetails.filter(property => property !== null);
//           setPropertyData(validProperties);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUserData();
//   }, [username]);

//   console.log('Property Data:', propertyData);

//   return (
//     <div className='userDashboard'>
//       <DashboardTopSection />
//       <DashboardNavbar propertyData={propertyData} packageData={packageData} />
//     </div>
//   );
// }

// export default Dashboard;


//---------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react'; 
// import { useParams } from 'react-router-dom';
// import DashboardTopSection from './DahbaordTopImage';
// import "../../common.css";
// import "../../commonsecond.css";
// import DashboardNavbar from './DashboardNavbar';

// function Dashboard() {
//   const { username } = useParams();
//   const [propertyData, setPropertyData] = useState([]);
//   const [packageData, setPackageData] = useState(null); 
//   const [subscriptionData, setsubscriptionData] = useState(null); 
//   const [profileData, setprofileData] = useState(null); 
  

//   // First useEffect: Fetch property data (no changes made)
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Fetch user data (including property listing)
//         const userResponse = await fetch(`http://localhost:3030/user/${username}`);
//         const userData = await userResponse.json();
  
//         const listingResponse = await fetch(`http://localhost:3030/userpackage/${username}`);
//         const listingData = await listingResponse.json();
//         setprofileData(userData);
//         console.log('listingData Data:', listingData);
  
//         // Parse propertylisting if it's a string
//         let propertyListingArray = [];
//         if (listingData.propertylisting) {
//           propertyListingArray = JSON.parse(listingData.propertylisting);
//         }
  
//         // Fetch property details based on property IDs in propertyListingArray
//         if (propertyListingArray.length > 0) {
//           const propertyDetailsPromises = propertyListingArray.map(async (propertyId) => {
//             propertyId = propertyId.replace(/["[\]]/g, ''); // Remove quotes and brackets if it's stringified
  
//             const propertyResponse = await fetch(`http://localhost:3030/property/${propertyId}`);
//             const propertyData = await propertyResponse.json();
  
//             if (propertyData.message === 'Property not found') {
//               return null; // Skip if property not found
//             }
//             return propertyData;
//           });
  
//           const propertyDetails = await Promise.all(propertyDetailsPromises);
//           const validProperties = propertyDetails.filter(property => property !== null);
//           setPropertyData(validProperties);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchUserData();
//   }, [username]);
  

//   // Second useEffect: Fetch package data separately
//   useEffect(() => {
//     const fetchPackageData = async () => {
//       try {
//         const packageResponse = await fetch(`http://localhost:3030/userpackage/${username}`);
//         const packageData = await packageResponse.json();
  
//         if (packageData.message !== 'Package not found') {
//           // Parse the stringified package_json to a JS object
//           const parsedPackageData = JSON.parse(packageData.package_json);
          
//           setPackageData(parsedPackageData); // Set the parsed package data
//           console.log('Parsed Package Data:', parsedPackageData);

//           const parsedSubHistoryData = JSON.parse(packageData.subscription_history);
          
//           setsubscriptionData(parsedSubHistoryData); // Set the parsed package data
//           console.log('Parsed Subs History Data:', parsedSubHistoryData);
//         } else {
//           console.warn('Package not found for user:', username);
//         }
//       } catch (error) {
//         console.error('Error fetching package data:', error);
//       }
//     };
  
//     fetchPackageData();
//   }, [username]);

//   // console.log('Property Data:', propertyData);
//   // console.log('Package Data:', packageData);

//   return (
//     <div className='userDashboard'>
//       <DashboardTopSection />
//       <DashboardNavbar propertyData={propertyData} packageData={packageData} subscriptionData={subscriptionData} profileData={profileData}/>
//     </div>
//   );
// }

// export default Dashboard;


//------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react'; 
import Cookies from 'js-cookie';  // Assuming you are using 'js-cookie' to handle cookies
import {jwtDecode} from 'jwt-decode';  // To decode the JWT
import DashboardTopSection from './DahbaordTopImage';
import "../../common.css";
import "../../commonsecond.css";
import DashboardNavbar from './DashboardNavbar';

function Dashboard() {
  const [username, setUsername] = useState('');  // Initialize username state
  const [propertyData, setPropertyData] = useState([]);
  const [packageData, setPackageData] = useState(null); 
  const [subscriptionData, setsubscriptionData] = useState(null); 
  const [profileData, setprofileData] = useState(null); 

  // UseEffect to extract the username from the JWT token in cookies
  useEffect(() => {
    const token = Cookies.get('jwttoken'); // Retrieve the token from cookies
    console.log('Token from cookies:', token);  // Log the retrieved token for debugging

    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);  
        console.log('Decoded Token:', decodedToken);
        setUsername(decodedToken.username); // Set the username from the token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in cookies');
    }
  }, []);

  // Fetch property data and other details when the username is available
  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          // Fetch user data (including property listing)
          const userResponse = await fetch(`http://localhost:3030/user/${username}`);
          const userData = await userResponse.json();
    
          const listingResponse = await fetch(`http://localhost:3030/userpackage/${username}`);
          const listingData = await listingResponse.json();
          setprofileData(userData);
          console.log('listingData Data:', listingData);
    
          // Parse propertylisting if it's a string
          let propertyListingArray = [];
          if (listingData.propertylisting) {
            propertyListingArray = JSON.parse(listingData.propertylisting);
          }
    
          // Fetch property details based on property IDs in propertyListingArray
          if (propertyListingArray.length > 0) {
            const propertyDetailsPromises = propertyListingArray.map(async (propertyId) => {
              propertyId = propertyId.replace(/["[\]]/g, ''); // Remove quotes and brackets if it's stringified
    
              const propertyResponse = await fetch(`http://localhost:3030/property/${propertyId}`);
              const propertyData = await propertyResponse.json();
    
              if (propertyData.message === 'Property not found') {
                return null; // Skip if property not found
              }
              return propertyData;
            });
    
            const propertyDetails = await Promise.all(propertyDetailsPromises);
            const validProperties = propertyDetails.filter(property => property !== null);
            setPropertyData(validProperties);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchUserData();
    }
  }, [username]);

  // Fetch package data when username is available
  useEffect(() => {
    if (username) {
      const fetchPackageData = async () => {
        try {
          const packageResponse = await fetch(`http://localhost:3030/userpackage/${username}`);
          const packageData = await packageResponse.json();
    
          if (packageData.message !== 'Package not found') {
            // Parse the stringified package_json to a JS object
            const parsedPackageData = JSON.parse(packageData.package_json);
            
            setPackageData(parsedPackageData); // Set the parsed package data
            console.log('Parsed Package Data:', parsedPackageData);

            const parsedSubHistoryData = JSON.parse(packageData.subscription_history);
            
            setsubscriptionData(parsedSubHistoryData); // Set the parsed package data
            console.log('Parsed Subs History Data:', parsedSubHistoryData);
          } else {
            console.warn('Package not found for user:', username);
          }
        } catch (error) {
          console.error('Error fetching package data:', error);
        }
      };
  
      fetchPackageData();
    }
  }, [username]);

  return (
    <div className='userDashboard'>
      <DashboardTopSection />
      <DashboardNavbar 
        propertyData={propertyData} 
        packageData={packageData} 
        subscriptionData={subscriptionData} 
        profileData={profileData} 
      />
    </div>
  );
}

export default Dashboard;
