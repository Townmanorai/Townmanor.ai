import React from 'react';
import { useParams } from 'react-router-dom';
import TopRentedProperties from '../HomePage/TopRentedProperties';
import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';

import "./PropertiesForSaleRent.css";

const PropertiesForSaleRent = () => {
    const { stateName } = useParams();
    
    return (
        <div className="properties-for-sale-rent">
            <p className="properties-title">
                List of properties for sale/rent in {stateName}
            </p>
            <TopRentedProperties stateName={stateName} />
            <ExclusiveOwnerProperties stateName={stateName} />
        </div>
    );
};

export default PropertiesForSaleRent;
