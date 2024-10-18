import React from 'react';
import ResultsItem from './ResultsItem';

const ResultsList = ({ results }) => {
  return (
    <div className="list-products">
      {results.map((item, key) => (
        <ResultsItem key={key} item={item} />
      ))}
    </div>
  );
};

export default ResultsList;
