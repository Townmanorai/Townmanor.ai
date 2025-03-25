import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To get access to location
import MainPage from './MainPage'; 
import "../../common.css";
import "../../commonsecond.css";
import { Helmet } from 'react-helmet';

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
    fetch(`https://www.townmanor.ai/api/owner-property/filter?city=${encodedCity}&configuration=${encodedConfiguration}&furnish_type=${encodedFurnishType}&construction_status=${encodedConstructionStatus}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setResults(data); 
        setTotalPages(data.length); // Assuming data contains 'totalPages'
      })
      .catch(error => console.error('Error fetching property data:', error));
  },[location.search]); // Dependencies include location.search and currentPage
  const generateMetaKeywords = (properties) => {
    const keywords = properties.map(property => {
      const configuration = property.configuration || 'Apartment';
      const city = property.city || '';
      const price = property.pricerange || 'Price not available';
      return `${configuration} in ${city} at ${price}`;
    });

    return keywords.join(', ');
  };
  return (
    <>
    <Helmet>
        <meta name="keywords" content={generateMetaKeywords(results)} />
        <meta name="description" content="Find your dream property in Noida and Greater Noida. Explore a wide variety of apartments, villas, and homes for sale or rent. Get the best deals with Town Manor." />
        <title>Search Properties</title>
      </Helmet>
    <div>
      {/* Render the MainPage component, passing the necessary props */}
      <MainPage
        results={results}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} // For handling pagination
      />
    </div>
    </>
  );
};

export default SearchPropertyPage;


