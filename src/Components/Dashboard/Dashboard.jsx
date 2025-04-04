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

  // Debug log for initial component mount
  useEffect(() => {
    console.log('Dashboard component mounted');
  }, []);

  // UseEffect to extract the username from the JWT token in cookies
  useEffect(() => {
    console.log('Checking for JWT token...');
    const token = Cookies.get('jwttoken');
    console.log('Token from cookies:', token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);  
        console.log('Decoded Token:', decodedToken);
        console.log('Setting username to:', decodedToken.username);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.warn('No token found in cookies');
    }
  }, []);

  // Debug log for username changes
  useEffect(() => {
    console.log('Username updated:', username);
  }, [username]);

  // Fetch property data and other details when the username is available
  useEffect(() => {
    if (username) {
      console.log('Fetching user data for username:', username);
      const fetchUserData = async () => {
        try {
          console.log('Fetching user details...');
          const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
          const userData = await userResponse.json();
          console.log('User data received:', userData);
    
          console.log('Fetching user package details...');
          const listingResponse = await fetch(`https://www.townmanor.ai/api/userpackage/${username}`);
          const listingData = await listingResponse.json();
          console.log('Listing data received:', listingData);
          
          setprofileData(userData);
    
          let propertyListingArray = [];
          if (listingData.propertylisting) {
            console.log('Parsing property listing...');
            propertyListingArray = JSON.parse(listingData.propertylisting);
            console.log('Parsed property listing:', propertyListingArray);
          }
    
          if (propertyListingArray.length > 0) {
            console.log('Fetching property details for', propertyListingArray.length, 'properties');
            const propertyDetailsPromises = propertyListingArray.map(async (propertyId) => {
              propertyId = propertyId.replace(/["[\]]/g, '');
              console.log('Fetching property details for ID:', propertyId);
    
              const propertyResponse = await fetch(`https://www.townmanor.ai/api/owner-property/${propertyId}`);
              const propertyData = await propertyResponse.json();
    
              if (propertyData.message === 'Property not found') {
                console.warn('Property not found for ID:', propertyId);
                return null;
              }
              return propertyData;
            });
    
            const propertyDetails = await Promise.all(propertyDetailsPromises);
            const validProperties = propertyDetails.filter(property => property !== null);
            console.log('Valid properties fetched:', validProperties.length);
            setPropertyData(validProperties);
          } else {
            console.log('No properties found in listing');
          }
        } catch (error) {
          console.error('Error in fetchUserData:', error);
        }
      };
  
      fetchUserData();
    }
  }, [username]);

  // Fetch package data when username is available
  useEffect(() => {
    if (username) {
      console.log('Fetching package data for username:', username);
      const fetchPackageData = async () => {
        try {
          const packageResponse = await fetch(`https://www.townmanor.ai/api/userpackage/${username}`);
          const packageData = await packageResponse.json();
          console.log('Package data received:', packageData);
    
          if (packageData.message !== 'Package not found') {
            console.log('Parsing package data...');
            const parsedPackageData = JSON.parse(packageData.package_json);
            console.log('Parsed package data:', parsedPackageData);
            
            setPackageData(parsedPackageData);

            console.log('Parsing subscription history...');
            const parsedSubHistoryData = JSON.parse(packageData.subscription_history);
            console.log('Parsed subscription history:', parsedSubHistoryData);
            
            setsubscriptionData(parsedSubHistoryData);
          } else {
            console.warn('Package not found for user:', username);
          }
        } catch (error) {
          console.error('Error in fetchPackageData:', error);
        }
      };
  
      fetchPackageData();
    }
  }, [username]);

  // Debug log for state changes
  useEffect(() => {
    console.log('Dashboard state updated:', {
      username,
      propertyDataLength: propertyData.length,
      packageData,
      subscriptionData,
      profileData
    });
  }, [username, propertyData, packageData, subscriptionData, profileData]);

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
