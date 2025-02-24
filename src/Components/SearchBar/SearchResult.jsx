import React from 'react';

const SearchResult = ({ result, handleCityClick, handleLocalityClick }) => {
  const handleClick = () => {
    if (result.name) {
      handleLocalityClick(result.name);
    } else if (result.city) {
      handleCityClick(result.city);
    }
  };

  return (
    <div className="search-result" onClick={handleClick}>
      {result.name ? result.name : result.city}
    </div>
  );
};

export default SearchResult;
