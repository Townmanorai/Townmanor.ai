import React, { useState } from 'react';

const PropertyCompare = () => {
  // Dummy JSON data for the session compare and other dynamic values
  const dummyData = {
    sessionCompare: {
      '101': 'Property A',
      '102': 'Property B',
    },
    estateDataId: 101,
    langCode: 'en',
    listingUri: '/property-listing',
  };

  const [sessionCompare, setSessionCompare] = useState(dummyData.sessionCompare);

  const handleAddToCompare = () => {
    // Handle adding to compare (dummy functionality)
    setSessionCompare({ ...sessionCompare, [dummyData.estateDataId]: 'New Property' });
  };

  const handleRemoveFromCompare = () => {
    // Handle removing from compare (dummy functionality)
    const updatedCompare = { ...sessionCompare };
    delete updatedCompare[dummyData.estateDataId];
    setSessionCompare(updatedCompare);
  };

  return (
    <div className="widget widget-posts widget-compare">
      <h3 className="widget-title">Compare</h3>
      <div className="clearfix text-left">
        {Object.keys(sessionCompare).includes(String(dummyData.estateDataId)) ? (
          <a className="btn btn-success" id="remove_from_compare" href="#" onClick={handleRemoveFromCompare}>
            Remove from comparison list
          </a>
        ) : (
          <a className="btn2" id="add_to_compare" href="#" onClick={handleAddToCompare}>
            Add to comparison list
          </a>
        )}
      </div>
      <div className="compare-content">
        <ul className="compare-list">
          {Object.entries(sessionCompare).map(([key, value]) => (
            <li key={key} data-id={key}>
              <a href={`${dummyData.listingUri}/${key}/${dummyData.langCode}/${value}`}>{`${key}, ${value}`}</a>
            </li>
          ))}
        </ul>
        {Object.keys(sessionCompare).length > 1 && (
          <a className="btn2" href={`/propertycompare/${dummyData.estateDataId}/${dummyData.langCode}`}>
            Compare listings
          </a>
        )}
      </div>
    </div>
  );
};

export default PropertyCompare;
