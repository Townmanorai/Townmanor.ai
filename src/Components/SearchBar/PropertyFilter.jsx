import React, { useState } from 'react';
// import { FaLocationDot, FaBuilding, FaHome} from 'react-icons/fa';
import './PropertyFilter.css';
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const PropertyFilters = ({ filter }) => {
    const content = filter;
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const navigate= useNavigate()
    // Step 2: Create a function to handle city change
    const handleCityChange = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
        setFilteredLocalities(localities[city]);  // Filter localities based on selected city
    };
    const localities = {
        Delhi: [
            { name: 'Greater Kailash', city: 'Delhi' },
            { name: 'Defence Colony', city: 'Delhi' },
            { name: 'Vasant Kunj', city: 'Delhi' },
            { name: 'Dwarka', city: 'Delhi' },
            { name: 'South Extension', city: 'Delhi' },
        ],
        Noida: [
            { name: 'Sector 18', city: 'Noida' },
            { name: 'Sector 50', city: 'Noida' },
            { name: 'Sector 62', city: 'Noida' },
            { name: 'Sector 78', city: 'Noida' },
            { name: 'Greater Noida Expressway', city: 'Noida' },
        ],
        Gurgaon: [
            { name: 'DLF Phase 1', city: 'Gurgaon' },
            { name: 'DLF Phase 2', city: 'Gurgaon' },
            { name: 'Sector 29', city: 'Gurgaon' },
            { name: 'MG Road', city: 'Gurgaon' },
            { name: 'Sohna Road', city: 'Gurgaon' },
        ],
        Faridabad: [
            { name: 'Sector 15', city: 'Faridabad' },
            { name: 'Sector 37', city: 'Faridabad' },
            { name: 'Sector 55', city: 'Faridabad' },
            { name: 'Sainik Colony', city: 'Faridabad' },
            { name: 'Badkhal Lake', city: 'Faridabad' },
        ],
        Lucknow: [
            { name: 'Hazratganj', city: 'Lucknow' },
            { name: 'Gomti Nagar', city: 'Lucknow' },
            { name: 'Alambagh', city: 'Lucknow' },
            { name: 'Indira Nagar', city: 'Lucknow' },
            { name: 'Mahanagar', city: 'Lucknow' },
        ],
        Ghaziabad: [
            { name: 'Indirapuram', city: 'Ghaziabad' },
            { name: 'Vasundhara', city: 'Ghaziabad' },
            { name: 'Kaushambi', city: 'Ghaziabad' },
            { name: 'Raj Nagar Extension', city: 'Ghaziabad' },
            { name: 'Crossings Republik', city: 'Ghaziabad' },
        ],
        GreaterNoida: [
            { name: 'Alpha 1', city: 'GreaterNoida' },
            { name: 'Beta 2', city: 'GreaterNoida' },
            { name: 'Gamma 1', city: 'GreaterNoida' },
            { name: 'Omicron 1', city: 'GreaterNoida' },
            { name: 'Knowledge Park', city: 'GreaterNoida' },
        ],
    };
    const [filteredLocalities, setFilteredLocalities] = useState(localities['Delhi']);
    return (
        <div className="property-filters">
            <div className="property-filters-form">
                <div className="filter">
                    <div className="filter-icon">
                        <FaLocationDot size={17} color='white' />
                        {/* <CiLocationOn size={17} color='white'/> */}
                    </div>
                    <select className="filter-select" value={selectedCity} onChange={handleCityChange}>
                        <option>Delhi</option>
                        <option>Noida</option>
                        <option>Faridabad</option>
                        <option>Gurgaon</option>
                        <option>Lucknow</option>
                        <option>GreaterNoida</option>
                        <option>Ghaziabad</option>
                    </select>
                </div>

                <div className="filter" style={{
                    display: content !== 'commercial' && content !== 'plotland' ? 'block' : 'none'
                }}>

                    {(content != 'commercial' && content != 'plotland') && (
                        <>
                            <div className="filter-icon">
                                {/* <FaBuilding /> */}

                                <BsFillBuildingsFill size={17} color='white' />
                            </div>
                            <select className="filter-select">
                                <option>1 BHK</option>
                                <option>2 BHK</option>
                                <option>3 BHK</option>
                                <option>4+ BHK</option>
                            </select>
                        </>
                    )}

                </div>

                <div className="filter"
                    style={{
                        display: content !== 'plotland' ? 'block' : 'none'
                    }}
                >

                    {content == 'commercial' && (
                        <>
                            <div className="filter-icon">
                                <FaHouse size={17} color='white' />
                            </div>
                            <select className="filter-select">
                                <option>Office Space</option>
                                <option>Shop</option>
                                <option>Retail Space</option>

                            </select>
                        </>
                    )}
                    {(content == 'rent' || content == 'buy') && (
                        <>
                            <div className="filter-icon">
                                <FaHouse size={17} color='white' />
                            </div>
                            <select className="filter-select">
                                <option>House/Villa</option>
                                <option>Apartment</option>
                                <option>Plot</option>
                                <option>Commercial</option>
                            </select>
                        </>
                    )}

                </div>

                <div className="filter">
                    <div className="filter-icon">
                        <MdCurrencyRupee size={17} color='white' />
                    </div>
                    <select className="filter-select">
                        {content == 'rent' && (
                            <>
                                <option>5 k - 10k</option>
                                <option>10k-20k</option>
                                <option>20k-30k</option>
                                <option>30k+</option>
                            </>
                        )}
                        {content != 'rent' && (
                            <>
                                <option>5 L - 20 Cr</option>
                                <option>20 Cr - 50 Cr</option>
                                <option>50 Cr - 100 Cr</option>
                                <option>100+ Cr</option>
                            </>
                        )}

                    </select>
                </div>

                <button className="search-button" onClick={()=>{
                    navigate('/search-property')
                }}>Search</button>
            </div>

            <div className="popular-localities">
                <div className="localities-title">Popular Localities in {selectedCity}</div>
                <div className="localities-buttons">
                    {/* Step 3: Dynamically render localities based on the selected city */}
                    {filteredLocalities.map(locality => (
                        <button key={locality.name} className="locality-button">
                            {locality.name}
                        </button>
                    ))}
                </div>
            </div>
        
    </div >
  );
};

export default PropertyFilters;
