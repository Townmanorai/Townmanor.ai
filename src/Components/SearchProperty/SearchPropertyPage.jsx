// import React, { useState, useEffect } from 'react'; // Ensure hooks are imported
// import MainPage from './MainPage'; 
// import "../../common.css";
// import "../../commonsecond.css"
// // ./1.webp
// // Dummy property data
// const dummyResults = [
//     {
//       "id": 1269,
//       "url": "https://townmanor.in/property/1269/en/max_estate360",
//       "option_10": "Max Estate360",
//       "option_1": "",  // If there's a video URL, place it here, otherwise leave empty.
//       "is_featured": true,
//       "is_favorite": false,
//       "area_type": "Super Built-up",
//       "image_repository": "./1.webp, ./2.jpg, ./3.webp",
//     //   "image_repository": "https://townmanor.in/files/strict_cache/851x678max3%20%281%29.jpg, https://townmanor.in/files/strict_cache/851x678max5%20%281%29.jpg, https://townmanor.in/files/strict_cache/851x678max4%20%281%29.jpg",
//       "thumbnail_url": "https://townmanor.in/files/strict_cache/851x678max3%20%281%29.jpg",
//       "option_38": "new",  // This refers to the badge like 'new' or 'featured'
//       "option_36": "₹ 5Cr",  // Property price
//       "option_37": "50000000",  // Raw price data for calculations
//       "option_4": "Newly Launched Properties",  // Purpose/type of property
//       "address": "Sector 36A, Gurugram",
//       "option_58": "3, 3.5, 4",  // BHK Configuration
//       "option_59": "1404-1899",  // Carpet Area in sq.ft
//       "date": "2024-08-23 10:07:57"
//     },
//     {
//       "id": 8,
//       "city": "Jaipur",
//       "locality": "Vaishali Nagar",
//       "property_name": "Royal Residency",
//       "address": "25 Royal Road",
//       "configuration": "3BHK",
//       "area_detail": "1500 sqft",
//       "area_type": "Super Built-up",
//       "bathroom": 3,
//       "balcony": 2,
//       "description": "Elegant apartment with royal interiors",
//       "furnish_type": "Furnished",
//       "rera_id": "RERA6548",
//       "floor_no": 8,
//       "total_floor": 12,
//       "resitype": "sale",
//       "construction_status": "Ready to Move",
//       "property_date": "2024-08-23 10:07:57",
//       "property_facing": "South",
//       "price": 20000000,
//       "maintenance_charge": 7000,
//       "token_amount": 100000,
//       "length": 85,
//       "width": 65,
//       "monthly_rent": 70000,
//       "security_deposit": 210000,
//       "current_lease": "Olivia Jones",
//       "remaining_time": "3 years",
//       "boundary_wall": 1,
//       "no_of_open_side": 2,
//       "floor_allowed": 6,
//       "modify_interior": 1,
//       "lock_in_period": "1 year",
//       "pricerange": "2-2.5 Cr",
//       "money_type": "INR",
//       "amenities": "[\"Gym\", \"Children's Play Area\"]",
//       "metro": "1km",
//       "school": "1.5km",
//       "hospital": "2km",
//       "mall": "1km",
//       "restaurant": "500m",
//       "bus": "300m",
//       "cinema": "400m",
//       "country": "India",
//       "image_repository": "./1.webp, ./2.jpg, ./3.webp",
//   }
//   ];

// const SearchPropertyPage = () => {
//   // Define state variables
//   const [results, setResults] = useState([]);
//   const [totalRows, setTotalRows] = useState(0);
//   const [viewGridSelected, setViewGridSelected] = useState(true); // Initially set to grid view
//   const [viewListSelected, setViewListSelected] = useState(false);

//   // Simulate fetching data from an API or server
//   // Fetch data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3030/allproperties');
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }
//         const data = await response.json(); // Parse the JSON data from the response
//         setResults(data); // Load the fetched data into state
//         setTotalRows(data.length); // Set total number of results
//       } catch (error) {
//         console.error('Error fetching property data:', error);
//       }
//     };

//     fetchData(); // Call the fetch function
//   }, []); // Empty dependency array ensures this runs only once after component mounts

//   return (
//     <div>
//       {/* Pass props to MainPage */}
//       <MainPage
//         results={results}
//         total_rows={totalRows}
//         view_grid_selected={viewGridSelected}
//         view_list_selected={viewListSelected}
//         setViewGridSelected={setViewGridSelected} // If you need to toggle views
//         setViewListSelected={setViewListSelected} // If you need to toggle views
//       />
//     </div> 
//   );
// };

// export default SearchPropertyPage;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To get access to location
import MainPage from './MainPage'; 
import "../../common.css";
import "../../commonsecond.css";

// Helper function to extract query parameters
const getQueryParams = (query) => {
  return new URLSearchParams(query);
};

const SearchPropertyPage = () => {
  // Define state variables for storing the fetched data and pagination
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get the location object for accessing the URL query parameters
  const location = useLocation();
  
  // Function to fetch data based on query parameters and current page
  useEffect(() => {
    const params = getQueryParams(location.search); // Extract query parameters
    const city = params.get('city');
    const configuration = params.get('configuration');
    const furnishType = params.get('furnish_type');
    const constructionStatus = params.get('construction_status');
    
    // Encode any values that might have special characters or spaces
    const encodedCity = encodeURIComponent(city || ''); // If no city, use an empty string
    const encodedConfiguration = encodeURIComponent(configuration || '');
    const encodedFurnishType = encodeURIComponent(furnishType || '');
    const encodedConstructionStatus = encodeURIComponent(constructionStatus || '');

    //http://localhost:5173/search-property?city=Delhi&configuration=2BHK&furnish_type=Furnished&construction_status=New&page=1 
    // Fetch the properties based on dynamic query parameters
    fetch(`http://ec2-43-205-18-191.ap-south-1.compute.amazonaws.com/api/properties?city=${encodedCity}&configuration=${encodedConfiguration}&furnish_type=${encodedFurnishType}&construction_status=${encodedConstructionStatus}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResults(data); 
        setTotalPages(data.length); // Assuming data contains 'totalPages'
      })
      .catch(error => console.error('Error fetching property data:', error));
  },[location.search]); // Dependencies include location.search and currentPage

  return (
    <div>
      {/* Render the MainPage component, passing the necessary props */}
      <MainPage
        results={results}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} // For handling pagination
      />
    </div>
  );
};

export default SearchPropertyPage;
