

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TopRentedProperties from '../HomePage/TopRentedProperties';
import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';
import dummyCitiesData from '../../JsonData/ecity.json'; 
// import NewLaunchedProjects from '../HomePage/NewLaunchedProjects';
// import UpComingProjects from '../HomePage/UpComingProjects';

const CityWise = () => {
    const { cityName, stateName } = useParams();

    // Use the imported JSON data
    const stateData = dummyCitiesData[stateName];
    const cities = stateData?.cities || []; // Use optional chaining and default to an empty array

    // Find the current city object
    const currentCity = cities.find(city => city.city_name === cityName);

    console.log("State Data:", stateData); // Log state data
    console.log("Cities:", cities); // Log cities

    return (
        <>
            <div className="state-details-page">
                <h2 className="State-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {currentCity && (
                        <img
                            src={currentCity.image}
                            alt={currentCity.city_name}
                            style={{
                                width: '50px',
                                height: '50px',
                                marginRight: '10px',
                                borderRadius: '15px'
                            }}
                        />
                    )}
                    {cityName}
                </h2>
                <div className="options-container">
                    <Link to={`/properties-for-sale-rent/${cityName}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/property-images.png"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                        Properties For Sale/Rent
                    </Link>

                    <Link to={`/pay-house-tax-online/${cityName}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                            src="/house-tax.jpeg"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                    Pay House Tax Online</Link>

                    <Link to={`/land-record-verification/${cityName}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                            src="/lang-veri-images.png"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                    Land Record Verification</Link>

                    <Link to={currentCity?.paytaxUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                            src="/rera-logo.png"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                    RERA</Link>
                </div>

                <div className="cities-list">
                    <h3>Other Cities in {stateName}</h3>
                    <ul>
                        {cities
                            .filter(city => city.city_name !== cityName) // Exclude the current city
                            .map((city, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link to={`/stateName/${stateName}/city/${city.city_name}`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={city.image}
                                            alt={city.city_name}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                marginRight: '10px',
                                                borderRadius: '15px'
                                            }}
                                        />
                                        <span style={{ textAlign: 'center' }}>{city.city_name}</span>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className='mt-4'>
            {/* <NewLaunchedProjects stateName={cityName}/> */}
            <TopRentedProperties stateName={cityName} />
            <ExclusiveOwnerProperties stateName={cityName} />
            {/* <UpComingProjects stateName={cityName}/> */}
            </div>
            
        </>
    );
};

export default CityWise;
