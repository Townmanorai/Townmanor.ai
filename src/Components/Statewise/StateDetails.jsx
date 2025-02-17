import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './StateDetails.css';
import TopRentedProperties from '../HomePage/TopRentedProperties';
import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';
import dummyCitiesData from '../../JsonData/ecity.json';
// import NewLaunchedProjects from '../HomePage/NewLaunchedProjects';
// import UpComingProjects from '../HomePage/UpComingProjects';

const StateDetails = () => {
    const { stateName } = useParams(); // Get the selected state from the URL

    const stateData = dummyCitiesData[stateName]; // Get the state data
    const cities = stateData?.cities || []; // Access cities array safely

    return (
        <>
            <div className="state-details-page">
                <h2 className="State-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {stateData && stateData.image && (
                        <img
                            src={stateData.image}
                            alt={stateName}
                            style={{
                                width: '40px',
                                height: '40px',
                                marginRight: '10px',
                                borderRadius: '15px'
                            }}
                        />
                    )}
                    {stateName}
                </h2>
                
                <div className="options-container">
                    <Link to={`/properties-for-sale-rent/${stateName}`} style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
                        {/* <img
                            src="/property-images.png"
                            style={{ width: '50px', height: '50px', marginRight: '5px', borderRadius: '15px' }} 
                            alt="Properties For Sale/Rent"
                        /> */}
                        Properties For Sale/Rent
                    </Link>
                    <Link to={`/pay-house-tax-online/${stateName}`} style={{ display: 'flex', alignItems: 'center' ,justifyContent: 'center'}}>
                        {/* <img
                            src="/house-tax.jpeg"
                            style={{ width: '50px', height: '50px', marginRight: '5px', borderRadius: '15px' }} 
                            alt="Pay House Tax Online"
                        /> */}
                        Pay House Tax Online
                    </Link> 
                    <Link to={`/land-record-verification/${stateName}`} style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
                        {/* <img
                            src="/lang-veri-images.png"
                            style={{ width: '50px', height: '50px', marginRight: '5px', borderRadius: '15px' }} 
                            alt="Land Record Verification"
                        /> */}
                        Land Record Verification
                    </Link>
                    <Link to={stateData?.reraLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
                        {/* <img
                            src="/rera-logo.png"
                            style={{ width: '50px', height: '50px', marginRight: '5px', borderRadius: '15px' }} 
                            alt="RERA"
                        /> */}
                        RERA
                    </Link>
                </div>

                <div className="cities-list">
                    <h3>Cities in {stateName}</h3>
                    <ul>
                        {cities.map((city, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Link to={`/stateName/${stateName}/city/${city.city_name}`} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={city.image}
                                        alt={city.city_name}
                                        style={{
                                            width: '30px',
                                            height: '30px',
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
            {/* <NewLaunchedProjects stateName={stateName}/> */}
            <TopRentedProperties stateName={stateName} />
            <ExclusiveOwnerProperties stateName={stateName} />
            {/* <UpComingProjects stateName={stateName}/> */}
            </div>
            
        </>
    );
};

export default StateDetails;
