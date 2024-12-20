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
    fetch(`https://www.townmanor.ai/api/properties?city=${encodedCity}&configuration=${encodedConfiguration}&furnish_type=${encodedFurnishType}&construction_status=${encodedConstructionStatus}&page=${currentPage}`)
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


