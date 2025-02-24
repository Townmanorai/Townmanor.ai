import React from 'react';
import SearchResult from './SearchResult';

export const SearchResultsList = ({ results, setSelectedCity, setSelectedLocality, setFormData, formData, fetchLocalities, clearCityResults, clearLocalityResults }) => {
  const handleCityClick = (city) => {
    setSelectedCity(city);
    setFormData({ ...formData, city });
    fetchLocalities(city, '');
    clearCityResults();
  };

  const handleLocalityClick = (locality) => {
    setSelectedLocality(locality);
    setFormData({ ...formData, sector: locality });
    clearLocalityResults();
  };

  return (
    <ul className="list-group">
      {results.map((result) => (
        <SearchResult
          key={result.id}
          result={result}
          handleCityClick={handleCityClick}
          handleLocalityClick={handleLocalityClick}
        />
      ))}
    </ul>
  );
};
