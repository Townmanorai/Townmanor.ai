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
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const [selectedConfig, setSelectedConfig] = useState('1 BHK');
    const [selectedType, setSelectedType] = useState('House/Villa');
    const [selectedPrice, setSelectedPrice] = useState(content === 'rent' ? '5k - 10k' : '5 L - 20 Cr');

    const handleCityChange = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
        setFilteredLocalities(localities[city]);
    };

    const handleConfigChange = (event) => {
        setSelectedConfig(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    const handleSearch = () => {
        // Format city
        const formattedCity = selectedCity.toLowerCase().replace(/\s+/g, '-');

        // Determine purpose based on content
        const purpose = content === 'rent' ? 'rent' : 'sale';

        // Format price
        let priceValue;
        if (content === 'rent') {
            // Convert rent ranges to actual values
            const priceMap = {
                '5k - 10k': '10000',
                '10k-20k': '20000',
                '20k-30k': '30000',
                '30k+': '50000'
            };
            priceValue = priceMap[selectedPrice] || '10000';
        } else {
            // Convert sale ranges to actual values (in lakhs)
            const priceMap = {
                '5 L - 20 Cr': '200000000',  // 20 Cr
                '20 Cr - 50 Cr': '500000000', // 50 Cr
                '50 Cr - 100 Cr': '1000000000', // 100 Cr
                '100+ Cr': '2000000000' // 200 Cr
            };
            priceValue = priceMap[selectedPrice] || '200000000';
        }

        // Handle different URL formats based on content type
        let searchUrl;
        
        if (content === 'plotland') {
            // Format for plot/land: /search-property/city/purpose/plot/price
            searchUrl = `/search-property/${formattedCity}/${purpose}/plot/${priceValue}`;
        } 
        else if (content === 'commercial') {
            // Format for commercial: /search-property/city/purpose/type/price
            const commercialType = selectedType.toLowerCase().replace(/\s+/g, '');
            searchUrl = `/search-property/${formattedCity}/${purpose}/${commercialType}/${priceValue}`;
        } 
        else {
            // Format for residential (rent/buy): /search-property/city/configuration/purpose/type/price
            const formattedConfig = selectedConfig.replace(/\s+/g, '');
            const propertyType = selectedType.toLowerCase().replace(/\s+/g, '');
            // Replace 'house/villa' with just 'villa'
            const formattedType = propertyType === 'house/villa' ? 'villa' : propertyType;
            searchUrl = `/search-property/${formattedCity}/${formattedConfig}/${purpose}/${formattedType}/${priceValue}`;
        }

        // Navigate to search results page
        navigate(searchUrl);
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
                    {(content !== 'commercial' && content !== 'plotland') && (
                        <>
                            <div className="filter-icon">
                                {/* <FaBuilding /> */}
                                <BsFillBuildingsFill size={17} color='white' />
                            </div>
                            <select className="filter-select" value={selectedConfig} onChange={handleConfigChange}>
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
                    {content === 'commercial' && (
                        <>
                            <div className="filter-icon">
                                <FaHouse size={17} color='white' />
                            </div>
                            <select className="filter-select" value={selectedType} onChange={handleTypeChange}>
                                <option>Office Space</option>
                                <option>Shop</option>
                                <option>Retail Space</option>
                            </select>
                        </>
                    )}
                    {(content === 'rent' || content === 'buy') && (
                        <>
                            <div className="filter-icon">
                                <FaHouse size={17} color='white' />
                            </div>
                            <select className="filter-select" value={selectedType} onChange={handleTypeChange}>
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
                    <select className="filter-select" value={selectedPrice} onChange={handlePriceChange}>
                        {content === 'rent' && (
                            <>
                                <option>5k - 10k</option>
                                <option>10k-20k</option>
                                <option>20k-30k</option>
                                <option>30k+</option>
                            </>
                        )}
                        {content !== 'rent' && (
                            <>
                                <option>5 L - 20 Cr</option>
                                <option>20 Cr - 50 Cr</option>
                                <option>50 Cr - 100 Cr</option>
                                <option>100+ Cr</option>
                            </>
                        )}
                    </select>
                </div>

                <button className="search-button" onClick={handleSearch}>Search</button>
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
        </div>
    );
};

export default PropertyFilters;
