

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
    // console.log('Token from cookies:', token);  // Log the retrieved token for debugging

    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);  
        // console.log('Decoded Token:', decodedToken);
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
          const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
          const userData = await userResponse.json();
    
          const listingResponse = await fetch(`https://www.townmanor.ai/api/userpackage/${username}`);
          const listingData = await listingResponse.json();
          setprofileData(userData);
          // console.log('listingData Data:', listingData);
    
          // Parse propertylisting if it's a string
          let propertyListingArray = [];
          if (listingData.propertylisting) {
            propertyListingArray = JSON.parse(listingData.propertylisting);
          }
    
          // Fetch property details based on property IDs in propertyListingArray
          if (propertyListingArray.length > 0) {
            const propertyDetailsPromises = propertyListingArray.map(async (propertyId) => {
              propertyId = propertyId.replace(/["[\]]/g, ''); // Remove quotes and brackets if it's stringified
    
              const propertyResponse = await fetch(`https://www.townmanor.ai/api/property/${propertyId}`);
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
          const packageResponse = await fetch(`https://www.townmanor.ai/api/userpackage/${username}`);
          const packageData = await packageResponse.json();
    
          if (packageData.message !== 'Package not found') {
            // Parse the stringified package_json to a JS object
            const parsedPackageData = JSON.parse(packageData.package_json);
            
            setPackageData(parsedPackageData); // Set the parsed package data
            // console.log('Parsed Package Data:', parsedPackageData);

            const parsedSubHistoryData = JSON.parse(packageData.subscription_history);
            
            setsubscriptionData(parsedSubHistoryData); // Set the parsed package data
            // console.log('Parsed Subs History Data:', parsedSubHistoryData);
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
