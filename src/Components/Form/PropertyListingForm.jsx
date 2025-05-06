import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// Import all icons
import { TbAirConditioning, TbBuildingBank, TbFridge } from "react-icons/tb";
import { FaSatelliteDish, FaWifi, FaKitchenSet, FaChargingStation, FaPersonSwimming } from "react-icons/fa6";
import { LuUtensilsCrossed, LuParkingCircle } from "react-icons/lu";
import { PiThermometerHotBold, PiPark, PiCourtBasketball, PiWarehouseLight } from "react-icons/pi";
import { GrElevator } from "react-icons/gr";
import { LiaIntercom } from "react-icons/lia";
import { MdMicrowave, MdSecurity, MdDelete } from "react-icons/md";
import { RiParkingBoxLine } from "react-icons/ri";
import { GiKidSlide, GiGasStove, GiWeightLiftingUp, GiChimney, GiGrassMushroom, GiGrass } from "react-icons/gi";
import { BiCctv } from "react-icons/bi";
import { ImPower } from "react-icons/im";
import { FaHome, FaBuilding, FaWarehouse, FaClipboardList, FaUsers, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import './PropertyListingForm.css';

const PropertyListingForm = () => {
    const navigate = useNavigate();

    // Authentication states
    const [authToken, setAuthToken] = useState('');
    const [username, setUsername] = useState('');
    const [propertyid, setpropertyid] = useState();
    // Form visibility states
    const [activeStep, setActiveStep] = useState(0);
    const [formSections, setFormSections] = useState({
        basicDetails: true,
        propertyDetails: false,
        locationDetails: false,
        amenities: false,
        media: false,
        preview: false
    });

    // Add new state variables for better control
    const [visibleSections, setVisibleSections] = useState({
        part1: true,
        part2: false,
        part3: false,
        part4: false,
        part5: false,
        part6: false
    });

    // Form data states
    const [propertyData, setPropertyData] = useState({
        category: 'residential',
        purpose: 'sale',
        propertyType: {
            residential: '',
            commercial: ''
        },
        leaseStatus: 'no',
        propertyId: null,
        coordinates: null,
        description: '',
        isLoading: false,
        floorplans: [],
        photos: [],
        details: {
            pincode: null,
            city: 'noida',
            locality: null,
            propertyName: null,
            address: null,
            configuration: null,
            areaDetail: null,
            areaType: null,
            bathroom: null,
            balcony: null,
            furnishType: null,
            reraId: null,
            floorNo: null,
            totalFloor: null,
            constructionStatus: null,
            propertyDate: null,
            propertyFacing: null,
            price: null,
            maintenanceCharge: null,
            tokenAmount: null,
            dimensions: {
                length: null,
                width: null
            },
            monthlyRent: null,
            securityDeposit: null,
            currentLease: null,
            remainingTime: null,
            boundaryWall: null,
            openSides: null,
            floorsAllowed: null,
            modifyInterior: null,
            lockInPeriod: null,
            priceRange: 'Lakh',
            moneyType: 'Rupees',
            amenities: [],
            nearbyLocations: {
                metro: { name: '', distance: null },
                school: { name: '', distance: null },
                hospital: { name: '', distance: null },
                mall: { name: '', distance: null },
                restaurant: { name: '', distance: null },
                bus: { name: '', distance: null },
                cinema: { name: '', distance: null },
                park: { name: '', distance: null }
            },
            country: 'india'
        }
    });

    // Add new state for loading
    const [isGeneratingDistances, setIsGeneratingDistances] = useState(false);

    // Progress bar steps
    const formSteps = [
        { id: 1, title: 'Basic Details' },
        { id: 2, title: 'Property Details' },
        { id: 3, title: 'Location' },
        { id: 4, title: 'Amenities' },
        { id: 5, title: 'Media' },
        { id: 6, title: 'Preview' }
    ];

    useEffect(() => {
        fetchUserAuth();
    }, []);

    const fetchUserAuth = () => {
        const token = Cookies.get('jwttoken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.username);
                setAuthToken(token);
            } catch (error) {
                console.error('Auth token decode error:', error);
                navigate('/auth');
            }
        } else {
            navigate('/auth');
        }
    };

    const handleStepChange = (step) => {
        setActiveStep(step);

        // Update section visibility
        setVisibleSections({
            part1: step === 0,
            part2: step === 1,
            part3: step === 2,
            part4: step === 3,
            part5: step === 4,
            part6: step === 5
        });
    };

    const handleNextClick = () => {
        if (activeStep < 5) {
            handleStepChange(activeStep + 1);
        }
    };

    const handlePrevClick = () => {
        if (activeStep > 0) {
            handleStepChange(activeStep - 1);
        }
    };

    const handlePurposeClick = (purpose) => {
        setPropertyData(prev => ({
            ...prev,
            purpose,
            propertyType: {
                residential: '',
                commercial: ''
            }
        }));
    };

    const handleCategoryClick = (category) => {
        setPropertyData(prev => ({
            ...prev,
            category,
            propertyType: {
                residential: '',
                commercial: ''
            }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setPropertyData(prev => ({
                    ...prev,
                    details: {
                        ...prev.details,
                        amenities: [...prev.details.amenities, value]
                    }
                }));
            } else {
                setPropertyData(prev => ({
                    ...prev,
                    details: {
                        ...prev.details,
                        amenities: prev.details.amenities.filter(amenity => amenity !== value)
                    }
                }));
            }
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setPropertyData(prev => ({
                ...prev,
                details: {
                    ...prev.details,
                    [parent]: {
                        ...prev.details[parent],
                        [child]: value
                    }
                }
            }));
            return;
        }

        if (name in propertyData.details.nearbyLocations) {
            setPropertyData(prev => ({
                ...prev,
                details: {
                    ...prev.details,
                    nearbyLocations: {
                        ...prev.details.nearbyLocations,
                        [name]: value
                    }
                }
            }));
            return;
        }

        if (name in propertyData.details) {
            setPropertyData(prev => ({
                ...prev,
                details: {
                    ...prev.details,
                    [name]: value
                }
            }));
            return;
        }

        setPropertyData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMediaUpload = async (e, type) => {
        const files = Array.from(e.target.files);
        const maxFiles = type === 'floorplans' ? 4 : 10;

        // Check if the current files plus the new files exceed the limit
        if (files.length + propertyData[type].length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} ${type}`);
            // Only allow as many as needed to stay within the limit
            files.splice(maxFiles - propertyData[type].length);
        }

        // Prepare the FormData to send to the backend
        const formData = new FormData();
        files.forEach(file => {
            formData.append("images", file); // 'images' is the key expected by the backend
        });

        try {
            // Upload the files to the backend
            const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Check if the upload was successful
            if (response.status === 200) {
                const uploadedFilePaths = response.data.fileUrls;
                console.log('Uploaded files:', uploadedFilePaths);

                // Trim the paths to remove the S3 URL prefix
                const trimmedFilePaths = uploadedFilePaths.map((path) => {
                    return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", "");
                });

                // Update the state with the trimmed paths
                setPropertyData(prev => ({
                    ...prev,
                    [type]: [...prev[type], ...trimmedFilePaths]
                }));

                console.log('Trimmed paths:', trimmedFilePaths);
            } else {
                console.error('Error uploading files:', response);
                alert(`Failed to upload ${type}`);
            }
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            alert(`An error occurred while uploading the ${type}`);
        }
    };

    const removeMedia = (fileName, type) => {
        setPropertyData(prev => ({
            ...prev,
            [type]: prev[type].filter(file => file !== fileName)
        }));
    };
    const aikey = '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'
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPropertyData(prev => ({ ...prev, isLoading: true }));

        try {
            // Validate required fields
            if (!propertyData.purpose || !propertyData.category) {
                throw new Error('Please select purpose and category');
            }

            if (!propertyData.propertyType.residential && !propertyData.propertyType.commercial) {
                throw new Error('Please select property type');
            }

            if (!propertyData.details.propertyName || !propertyData.details.address) {
                throw new Error('Property name and address are required');
            }

            // Get coordinates
            if (propertyData.details.address) {
                try {
                    const address = `${propertyData.details.propertyName}, ${propertyData.details.locality}, ${propertyData.details.city}, ${propertyData.details.country}`;
                    const geoResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            address: address,
                            key: 'AlzaSyrmzWPt966TnQME5naZ_37JTMW9hNBNPVI'
                        }
                    });

                    if (geoResponse.data.status === 'OK') {
                        const { lat, lng } = geoResponse.data.results[0].geometry.location;
                        setPropertyData(prev => ({
                            ...prev,
                            coordinates: { lat, lng }
                        }));
                    }
                } catch (error) {
                    console.error('Error getting coordinates:', error);
                }
            }

            // Submit property data
            const submissionData = {
                username: username || 'testuser',
                purpose: propertyData.purpose,
                category: propertyData.category,
                residential: propertyData.propertyType.residential || null,
                Commercail: propertyData.propertyType.commercial || null,
                description: propertyData.description,
                pincode: propertyData.details.pincode || null,
                city: propertyData.details.city || null,
                locality: propertyData.details.locality || null,
                property_name: propertyData.details.propertyName || null,
                address: propertyData.details.address || null,
                configuration: propertyData.details.configuration || null,
                area_detail: propertyData.details.areaDetail || null,
                area_type: propertyData.details.areaType || null,
                bathroom: propertyData.details.bathroom || null,
                balcony: propertyData.details.balcony || null,
                furnish_type: propertyData.details.furnishType || null,
                rera_id: propertyData.details.reraId || null,
                floor_no: propertyData.details.floorNo || null,
                total_floor: propertyData.details.totalFloor || null,
                construction_status: propertyData.details.constructionStatus || null,
                property_date: propertyData.details.propertyDate || null,
                property_facing: propertyData.details.propertyFacing || null,
                price: parseFloat(propertyData.details.price) || null,
                maintenance_charge: parseFloat(propertyData.details.maintenanceCharge) || null,
                token_amount: parseFloat(propertyData.details.tokenAmount) || null,
                pricerange: propertyData.details.priceRange || null,
                money_type: propertyData.details.moneyType || null,
                amenities: propertyData.details.amenities.length > 0 ? propertyData.details.amenities : null,
                country: propertyData.details.country || null,
                lat: propertyData.coordinates?.lat || null,
                lng: propertyData.coordinates?.lng || null,
                length: propertyData.details.dimensions?.length || null,
                width: propertyData.details.dimensions?.width || null,
                montly_rent: propertyData.details.monthlyRent || null,
                securitydeposit: propertyData.details.securityDeposit || null,
                current_lease: propertyData.details.currentLease || null,
                remaining_time: propertyData.details.remainingTime || null,
                boundary_wall: propertyData.details.boundaryWall || null,
                no_of_open_side: propertyData.details.openSides || null,
                floor_allowed: propertyData.details.floorsAllowed || null,
                modifyinterior: propertyData.details.modifyInterior || null,
                lock_in_period: propertyData.details.lockInPeriod || null,
                // Send just the distance values for nearby locations
                metro: propertyData.details.nearbyLocations.metro?.distance?.toString() || null,
                school: propertyData.details.nearbyLocations.school?.distance?.toString() || null,
                hospital: propertyData.details.nearbyLocations.hospital?.distance?.toString() || null,
                mall: propertyData.details.nearbyLocations.mall?.distance?.toString() || null,
                restaurant: propertyData.details.nearbyLocations.restaurant?.distance?.toString() || null,
                bus: propertyData.details.nearbyLocations.bus?.distance?.toString() || null,
                cinema: propertyData.details.nearbyLocations.cinema?.distance?.toString() || null,
                leased: propertyData.leaseStatus || null,
                floorplan: propertyData.floorplans.length > 0 ? propertyData.floorplans : null,
                image_repository: propertyData.photos.length > 0 ? propertyData.photos : null
            };

            console.log('Submitting data:', submissionData);
            const response = await axios.post('https://www.townmanor.ai/api/owner-property/', submissionData);

            if (response.status === 201 || response.status === 200) {
                alert('Property listed successfully!');
                setpropertyid(response.id);
                // Reset form to initial state
                setPropertyData({
                    category: 'residential',
                    purpose: 'sale',
                    propertyType: {
                        residential: '',
                        commercial: ''
                    },
                    leaseStatus: 'no',
                    propertyId: null,
                    coordinates: null,
                    description: '',
                    isLoading: false,
                    floorplans: [],
                    photos: [],
                    details: {
                        pincode: null,
                        city: 'noida',
                        locality: null,
                        propertyName: null,
                        address: null,
                        configuration: null,
                        areaDetail: null,
                        areaType: null,
                        bathroom: null,
                        balcony: null,
                        furnishType: null,
                        reraId: null,
                        floorNo: null,
                        totalFloor: null,
                        constructionStatus: null,
                        propertyDate: null,
                        propertyFacing: null,
                        price: null,
                        maintenanceCharge: null,
                        tokenAmount: null,
                        dimensions: {
                            length: null,
                            width: null
                        },
                        monthlyRent: null,
                        securityDeposit: null,
                        currentLease: null,
                        remainingTime: null,
                        boundaryWall: null,
                        openSides: null,
                        floorsAllowed: null,
                        modifyInterior: null,
                        lockInPeriod: null,
                        priceRange: 'Lakh',
                        moneyType: 'Rupees',
                        amenities: [],
                        nearbyLocations: {
                            metro: null,
                            school: null,
                            hospital: null,
                            mall: null,
                            restaurant: null,
                            bus: null,
                            cinema: null
                        },
                        country: 'india'
                    }
                });

                // Reset to first step
                setActiveStep(0);
                handleStepChange(0);
                setuserlisting();
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setPropertyData(prev => ({ ...prev, isLoading: false }));
        }
    };
    const setuserlisting = async () => {
        const url = `https://www.townmanor.ai/api/userpackage/${username}`;
        const requestBody = {
            propertylisting: propertyid, // This could be a number, string, or array
        };
        try {
            const response = await axios.put(url, requestBody);
            console.log('Property listing updated:', response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const generateDescription = async () => {
        setPropertyData(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `
                            purpose:${propertyData.purpose},
                            unittype:${propertyData.propertyType.residential || propertyData.propertyType.commercial}
                            constructionstatus:${propertyData.details.constructionStatus}
                    ->Give briefly tell about ${propertyData.details.propertyName} at ${propertyData.details.address} must including famous nearby location and available commute option with name.
                    ->tell me why we choose this property
                     on basis on these points write proper good descritiption of property and give priority to first point & strictly avoid repetition
                  `,
                        },
                    ],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${aikey}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            const rawDescription = response.data.choices[0].message.content;
            setPropertyData(prev => ({
                ...prev,
                description: rawDescription,
                isLoading: false
            }));

        } catch (error) {
            console.error("Error generating description:", error);
            setPropertyData(prev => ({ ...prev, isLoading: false }));
        }
    };

    // Add these new functions after the existing state declarations
    const getCoordinates = async (address) => {
        try {
            const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: 'AlzaSyrmzWPt966TnQME5naZ_37JTMW9hNBNPVI'
                }
            });

            if (response.data.status === 'OK') {
                const { lat, lng } = response.data.results[0].geometry.location;
                return { lat, lng };
            }
            return null;
        } catch (error) {
            console.error('Error getting coordinates:', error);
            return null;
        }
    };

    // Add handler for manual distance updates
    const handleNearbyLocationChange = (e, locationKey) => {
        const { value } = e.target;
        setPropertyData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                nearbyLocations: {
                    ...prev.details.nearbyLocations,
                    [locationKey]: {
                        ...prev.details.nearbyLocations[locationKey],
                        displayText: value
                    }
                }
            }
        }));
    };

    const getNearbyPlaceAndDistance = async (origin_lat, origin_lng, place_type) => {
        try {
            const nearbyResponse = await axios.get(`https://maps.gomaps.pro/maps/api/place/nearbysearch/json`, {
                params: {
                    keyword: place_type,
                    location: `${origin_lat},${origin_lng}`,
                    radius: 10000,
                    key: 'AlzaSyrmzWPt966TnQME5naZ_37JTMW9hNBNPVI'
                }
            });

            if (nearbyResponse.data.results && nearbyResponse.data.results.length > 0) {
                const place = nearbyResponse.data.results[0];
                const placeName = place.name;
                const { lat, lng } = place.geometry.location;

                const distanceResponse = await axios.get(`https://maps.gomaps.pro/maps/api/directions/json`, {
                    params: {
                        mode: 'driving',
                        origin: `${origin_lat},${origin_lng}`,
                        destination: `${lat},${lng}`,
                        key: 'AlzaSyrmzWPt966TnQME5naZ_37JTMW9hNBNPVI'
                    }
                });

                if (distanceResponse.data.status === 'OK') {
                    const distance = distanceResponse.data.routes[0].legs[0].distance.text;
                    const distanceNum = parseFloat(distance.replace(' km', ''));
                    return {
                        name: placeName,
                        distance: distanceNum,
                        displayText: `${placeName} (${distanceNum} km)`
                    };
                }
            }
            return null;
        } catch (error) {
            console.error('Error getting nearby place and distance:', error);
            return null;
        }
    };

    const handleAutoGenerateDistances = async () => {
        if (!propertyData.details.propertyName || !propertyData.details.address) {
            alert('Please enter property name and address first');
            return;
        }

        setIsGeneratingDistances(true);

        try {
            const address = `${propertyData.details.propertyName}, ${propertyData.details.locality}, ${propertyData.details.city}, ${propertyData.details.country}`;
            const coordinates = await getCoordinates(address);

            if (coordinates) {
                const { lat, lng } = coordinates;

                setPropertyData(prev => ({
                    ...prev,
                    coordinates: { lat, lng }
                }));

                const placeTypes = {
                    metro: 'metro station',
                    school: 'school',
                    hospital: 'hospital',
                    mall: 'Mall',
                    restaurant: 'Restuarant',
                    bus: 'bus station',
                    cinema: 'cinema',
                    park: 'Park'
                };

                const distances = {};
                for (const [key, placeType] of Object.entries(placeTypes)) {
                    const result = await getNearbyPlaceAndDistance(lat, lng, placeType);
                    if (result !== null) {
                        distances[key] = {
                            name: result.name,
                            distance: result.distance,
                            displayText: result.displayText
                        };
                    }
                }

                setPropertyData(prev => ({
                    ...prev,
                    details: {
                        ...prev.details,
                        nearbyLocations: distances
                    }
                }));
            }
        } catch (error) {
            console.error('Error generating distances:', error);
            alert('Failed to generate distances. Please try again.');
        } finally {
            setIsGeneratingDistances(false);
        }
    };

    return (
        <>
            <div className="realty-banner-container">
                {/* Banner */}
                <div className="realty-bannerx">
                    <img src="/search.jpg" className="realty-banner-img" alt="Banner" />
                    <div className="realty-banner-overlay"></div>
                    <div className="realty-banner-content">
                        <h1 className="realty-banner-title">Find the <b>Right Buyer</b>, Fast!</h1>
                        <p className="realty-banner-text">
                            Connect with millions of potential buyers and renters.
                        </p>
                        <div className="realty-banner-buttons">
                            <a href='#realty_property'> <button className="realty-banner-btn-primary">
                                <FaHome className="realty-btn-icon" size={25} />
                                Start Listing
                            </button></a>
                            {/* <button className="realty-banner-btn-secondary">
              <FaInfoCircle className="realty-btn-icon" />
              Learn More
            </button> */}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="realty-featuresx">
                    <div className="realty-feature-card">
                        <FaClipboardList className="realty-feature-icon" />
                        <h3 className="realty-feature-title">Easy Listing Process</h3>
                        <p className="realty-feature-text">List your realty in minutes with our streamlined process. Add photos, details, and set your price.</p>
                    </div>
                    <div className="realty-feature-card">
                        <FaUsers className="realty-feature-icon" />
                        <h3 className="realty-feature-title">Wide Reach</h3>
                        <p className="realty-feature-text">Connect with verified buyers and renters. Our platform reaches millions of potential customers.</p>
                    </div>
                    <div className="realty-feature-card">
                        <FaShieldAlt className="realty-feature-icon" />
                        <h3 className="realty-feature-title">Secure Transactions</h3>
                        <p className="realty-feature-text">Feel confident with our secure platform. We verify all users and protect your information.</p>
                    </div>
                </div>
            </div>
            <div className="property-listing__container">


                <div className="property-listing__progress">
                    <div className="property-listing__steps">
                        {[
                            'Basic Details',
                            'Property Details',
                            'Location Details',
                            'Amenities',
                            'Media',
                            'Preview'
                        ].map((step, index) => (
                            <button
                                key={index}
                                className={`property-listing__step ${activeStep === index ? 'property-listing__step--active' : ''}`}
                                onClick={() => handleStepChange(index)}
                                type="button"
                            >
                                <span className="property-listing__step-number">{index + 1}</span>
                                <span className="property-listing__step-text">{step}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="property-listing__form" >
                    {/* Form sections will be conditionally rendered based on activeStep */}
                    {/* Basic Details Section */}
                    {visibleSections.part1 && (
                        <div className="property-listing__section" id='realty_property'>
                            <div className="property-listing__purpose-selector">
                                <button
                                    type="button"
                                    className={`property-listing__btn ${propertyData.purpose === 'sale' ? 'property-listing__btn--active' : ''}`}
                                    onClick={() => handlePurposeClick('sale')}
                                >
                                    Sale
                                </button>
                                <button
                                    type="button"
                                    className={`property-listing__btn ${propertyData.purpose === 'rent' ? 'property-listing__btn--active' : ''}`}
                                    onClick={() => handlePurposeClick('rent')}
                                >
                                    Rent
                                </button>
                            </div>

                            <div className="property-listing__category-selector">
                                <button
                                    type="button"
                                    className={`property-listing__btn ${propertyData.category === 'residential' ? 'property-listing__btn--active' : ''}`}
                                    onClick={() => handleCategoryClick('residential')}
                                >
                                    Residential
                                </button>
                                <button
                                    type="button"
                                    className={`property-listing__btn ${propertyData.category === 'commercial' ? 'property-listing__btn--active' : ''}`}
                                    onClick={() => handleCategoryClick('commercial')}
                                >
                                    Commercial
                                </button>
                            </div>

                            {propertyData.category === 'residential' && (
                                <div className="property-listing__type-selector">
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.residential === 'apartment' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, residential: 'apartment' }
                                        }))}
                                    >
                                        Apartment
                                    </button>
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.residential === 'house/villa' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, residential: 'house/villa' }
                                        }))}
                                    >
                                        House/Villa
                                    </button>
                                    {propertyData.purpose === 'sale' && (
                                        <button
                                            className={`property-listing__btn ${propertyData.propertyType.residential === 'plot' ? 'property-listing__btn--active' : ''}`}
                                            onClick={() => setPropertyData(prev => ({
                                                ...prev,
                                                propertyType: { ...prev.propertyType, residential: 'plot' }
                                            }))}
                                        >
                                            Plot
                                        </button>
                                    )}
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.residential === 'builderfloor' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, residential: 'builderfloor' }
                                        }))}
                                    >
                                        Builder Floor
                                    </button>
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.residential === 'farmhouse' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, residential: 'farmhouse' }
                                        }))}
                                    >
                                        Farmhouse
                                    </button>
                                </div>
                            )}

                            {propertyData.category === 'commercial' && (
                                <div className="property-listing__type-selector">
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.commercial === 'officespace' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, commercial: 'officespace' }
                                        }))}
                                    >
                                        Office Space
                                    </button>
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.commercial === 'shop' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, commercial: 'shop' }
                                        }))}
                                    >
                                        Shop
                                    </button>
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.commercial === 'land' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, commercial: 'land' }
                                        }))}
                                    >
                                        Land
                                    </button>
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.commercial === 'coworkingspace' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, commercial: 'coworkingspace' }
                                        }))}
                                    >
                                        Coworking Space
                                    </button>
                                    <button
                                        className={`property-listing__btn ${propertyData.propertyType.commercial === 'showroom' ? 'property-listing__btn--active' : ''}`}
                                        onClick={() => setPropertyData(prev => ({
                                            ...prev,
                                            propertyType: { ...prev.propertyType, commercial: 'showroom' }
                                        }))}
                                    >
                                        Showroom
                                    </button>
                                </div>
                            )}

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Country</label>
                                <select
                                    className="property-listing__input"
                                    name="country"
                                    value={propertyData.details.country}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="india">India</option>
                                    <option value="uae">UAE</option>
                                    <option value="qatar">Qatar</option>
                                </select>
                            </div>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">City</label>
                                <select
                                    className="property-listing__input"
                                    name="city"
                                    value={propertyData.details.city}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {propertyData.details.country === 'india' && (
                                        <>
                                            <option value="">Select City</option>
                                            <option value="noida">Noida</option>
                                            <option value="gurgaon">Gurgaon</option>
                                            <option value="greaternoida">Greater Noida</option>
                                            <option value="ghaziabad">Ghaziabad</option>
                                            <option value="delhi">Delhi</option>
                                            <option value="faridabad">Faridabad</option>
                                            <option value="chandigarh">Chandigarh</option>
                                            <option value="Jaipur">Jaipur</option>
                                            <option value="Lucknow">Lucknow</option>
                                            <option value="Sonipat">Sonipat</option>
                                            <option value="Dehradun">Dehradun</option>
                                            <option value="Patna">Patna</option>
                                            <option value="Indore">Indore</option>
                                            <option value="Agra">Agra</option>
                                            <option value="Varanasi">Varanasi</option>
                                            <option value="Guwahati">Guwahati</option>
                                            <option value="Ahmedabad">Ahmedabad</option>
                                            <option value="Lucknow">Lucknow</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Uttarkhand">Uttarkhand</option>
                                            <option value="Bhubaneswar">Bhubaneswar</option>
                                        </>
                                    )}
                                    {propertyData.details.country === 'uae' && (
                                        <option value="dubai">Dubai</option>
                                    )}
                                    {propertyData.details.country === 'qatar' && (
                                        <option value="doha">Doha</option>
                                    )}
                                </select>
                            </div>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Locality</label>
                                <input
                                    type="text"
                                    className="property-listing__input"
                                    name="locality"
                                    placeholder="Enter locality"
                                    value={propertyData.details.locality}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Pincode</label>
                                <input
                                    type="text"
                                    className="property-listing__input"
                                    name="pincode"
                                    placeholder="Enter Pincode"
                                    value={propertyData.details.pincode}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Property Name</label>
                                <input
                                    type="text"
                                    className="property-listing__input"
                                    name="propertyName"
                                    placeholder="Enter Property Name"
                                    value={propertyData.details.propertyName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Property Address</label>
                                <input
                                    type="text"
                                    className="property-listing__input"
                                    name="address"
                                    placeholder="Enter Property Address"
                                    value={propertyData.details.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Property Details Section */}
                    {visibleSections.part2 && (
                        <div className="property-listing__section">
                            {/* Common fields for all types */}
                            <div className="property-listing__field-group">
                                <label className="property-listing__label">RERA ID</label>
                                <input
                                    type="text"
                                    className="property-listing__input"
                                    name="reraId"
                                    placeholder="Example: UPRERAPRJ72xx"
                                    value={propertyData.details.reraId}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Area Details - Show for all except residential plots */}
                            {!(propertyData.category === 'residential' && propertyData.propertyType.residential === 'plot') && (
                                <div className="property-listing__field-group">
                                    <label className="property-listing__label">Area Details (in sq.ft)</label>
                                    <div className="property-listing__input-group">
                                        <input
                                            type="number"
                                            className="property-listing__input"
                                            name="areaDetail"
                                            value={propertyData.details.areaDetail}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <select
                                            className="property-listing__input"
                                            name="areaType"
                                            value={propertyData.details.areaType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Super Built-up Area">Super Built Up Area</option>
                                            <option value="Built-up area">Built-up Area</option>
                                            <option value="Carpet Area">Carpet Area</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Residential Property Fields */}
                            {propertyData.category === 'residential' && propertyData.propertyType.residential !== 'plot' && (
                                <>
                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Configuration</label>
                                        <select
                                            className="property-listing__input"
                                            name="configuration"
                                            value={propertyData.details.configuration}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Configuration</option>
                                            <option value="1BHK">1 BHK</option>
                                            <option value="1.5BHK">1.5 BHK</option>
                                            <option value="2BHK">2 BHK</option>
                                            <option value="2.5BHK">2.5 BHK</option>
                                            <option value="3BHK">3 BHK</option>
                                            <option value="4BHK">4 BHK</option>
                                            <option value="5BHK">5 BHK</option>
                                            <option value="6BHK">6 BHK</option>
                                            <option value="6+ BHK">6+ BHK</option>
                                        </select>
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Bathroom</label>
                                        <select
                                            className="property-listing__input"
                                            name="bathroom"
                                            value={propertyData.details.bathroom}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Bathroom</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="5+">5+</option>
                                        </select>
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Balcony</label>
                                        <select
                                            className="property-listing__input"
                                            name="balcony"
                                            value={propertyData.details.balcony}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Balcony</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="5+">5+</option>
                                        </select>
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Furnish Type</label>
                                        <select
                                            className="property-listing__input"
                                            name="furnishType"
                                            value={propertyData.details.furnishType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Furnish Status</option>
                                            <option value="Fully furnished">Fully Furnished</option>
                                            <option value="Semi furnished">Semi Furnished</option>
                                            <option value="Un furnished">Unfurnished</option>
                                        </select>
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Floor Details</label>
                                        <div className="property-listing__input-group">
                                            <input
                                                type="number"
                                                className="property-listing__input"
                                                name="floorNo"
                                                placeholder="Floor Number"
                                                value={propertyData.details.floorNo}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="number"
                                                className="property-listing__input"
                                                name="totalFloor"
                                                placeholder="Total Floors"
                                                value={propertyData.details.totalFloor}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Commercial Property Fields */}
                            {propertyData.category === 'commercial' && (
                                <>
                                    {propertyData.propertyType.commercial !== 'land' && (
                                        <>
                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Floor Details</label>
                                                <div className="property-listing__input-group">
                                                    <input
                                                        type="number"
                                                        className="property-listing__input"
                                                        name="floorNo"
                                                        placeholder="Floor Number"
                                                        value={propertyData.details.floorNo}
                                                        onChange={handleInputChange}
                                                    />
                                                    <input
                                                        type="number"
                                                        className="property-listing__input"
                                                        name="totalFloor"
                                                        placeholder="Total Floors"
                                                        value={propertyData.details.totalFloor}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Furnish Type</label>
                                                <select
                                                    className="property-listing__input"
                                                    name="furnishType"
                                                    value={propertyData.details.furnishType}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Furnish Status</option>
                                                    <option value="Fully furnished">Fully Furnished</option>
                                                    <option value="Semi furnished">Semi Furnished</option>
                                                    <option value="Un furnished">Unfurnished</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {propertyData.purpose === 'rent' && (
                                        <>
                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Lock-in Period (months)</label>
                                                <input
                                                    type="number"
                                                    className="property-listing__input"
                                                    name="lockInPeriod"
                                                    placeholder="e.g., 12"
                                                    value={propertyData.details.lockInPeriod}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Security Deposit</label>
                                                <input
                                                    type="number"
                                                    className="property-listing__input"
                                                    name="securityDeposit"
                                                    placeholder="e.g., 50000"
                                                    value={propertyData.details.securityDeposit}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Monthly Rent</label>
                                                <input
                                                    type="number"
                                                    className="property-listing__input"
                                                    name="monthlyRent"
                                                    placeholder="e.g., 25000"
                                                    value={propertyData.details.monthlyRent}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {/* Plot/Land Specific Fields */}
                            {(propertyData.category === 'residential' && propertyData.propertyType.residential === 'plot') ||
                                (propertyData.category === 'commercial' && propertyData.propertyType.commercial === 'land') ? (
                                <>
                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Plot Dimensions</label>
                                        <div className="property-listing__input-group">
                                            <input
                                                type="number"
                                                className="property-listing__input"
                                                name="dimensions.length"
                                                placeholder="Length"
                                                value={propertyData.details.dimensions.length}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="property-listing__input-separator">×</span>
                                            <input
                                                type="number"
                                                className="property-listing__input"
                                                name="dimensions.width"
                                                placeholder="Width"
                                                value={propertyData.details.dimensions.width}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Number of Open Sides</label>
                                        <input
                                            type="number"
                                            className="property-listing__input"
                                            name="openSides"
                                            placeholder="e.g., 2"
                                            value={propertyData.details.openSides}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Boundary Wall</label>
                                        <select
                                            className="property-listing__input"
                                            name="boundaryWall"
                                            value={propertyData.details.boundaryWall}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </>
                            ) : null}

                            {/* Common fields for all property types */}
                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Property Facing</label>
                                <select
                                    className="property-listing__input"
                                    name="propertyFacing"
                                    value={propertyData.details.propertyFacing}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Choose Direction</option>
                                    <option value="North">North</option>
                                    <option value="South">South</option>
                                    <option value="East">East</option>
                                    <option value="West">West</option>
                                    <option value="North-East">North-East</option>
                                    <option value="North-West">North-West</option>
                                    <option value="South-East">South-East</option>
                                    <option value="South-West">South-West</option>
                                </select>
                            </div>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Construction Status</label>
                                <select
                                    className="property-listing__input"
                                    name="constructionStatus"
                                    value={propertyData.details.constructionStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Ready to Move">Ready to Move</option>
                                    <option value="Under-Construction">Under Construction</option>
                                    <option value="NewLaunch">New Launch</option>
                                </select>
                            </div>

                            {propertyData.details.constructionStatus === 'Under-Construction' && (
                                <div className="property-listing__field-group">
                                    <label className="property-listing__label">Possession Date</label>
                                    <input
                                        type="date"
                                        className="property-listing__input"
                                        name="propertyDate"
                                        value={propertyData.details.propertyDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {/* Price Details Section */}
                            <div className="property-listing__field-group">
                                <label className="property-listing__label">
                                    {propertyData.purpose === 'rent' ? 'Monthly Rent' : 'Price Details'}
                                </label>
                                <div className="property-listing__input-group">
                                    <input
                                        type="number"
                                        className="property-listing__input"
                                        name="price"
                                        placeholder="e.g., 2.10"
                                        value={propertyData.details.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <select
                                        className="property-listing__input"
                                        name="priceRange"
                                        value={propertyData.details.priceRange}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Choose Format</option>
                                        {propertyData.purpose === 'rent' ? (
                                            <>
                                                <option value="Thousand">Thousand</option>
                                                <option value="Lakh">Lakhs</option>

                                            </>
                                        ) : (
                                            <>
                                                <option value="Lakh">Lakhs</option>
                                                <option value="Crore">Crore</option>
                                                <option value="million">Million</option>
                                                <option value="billion">Billion</option>
                                            </>
                                        )}
                                    </select>
                                    <select
                                        className="property-listing__input"
                                        name="moneyType"
                                        value={propertyData.details.moneyType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Rupees">IND-Rupees</option>
                                        <option value="AED">Dubai-AED</option>
                                        <option value="Riyal">Qatar-Riyal</option>
                                    </select>
                                </div>
                            </div>

                            {propertyData.purpose === 'sale' && (
                                <div className="property-listing__field-group">
                                    <label className="property-listing__label">Token Amount</label>
                                    <input
                                        type="number"
                                        className="property-listing__input"
                                        name="tokenAmount"
                                        placeholder="e.g., 50000"
                                        value={propertyData.details.tokenAmount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {propertyData.purpose === 'rent' && (
                                <>
                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Security Deposit</label>
                                        <input
                                            type="number"
                                            className="property-listing__input"
                                            name="securityDeposit"
                                            placeholder="e.g., 50000"
                                            value={propertyData.details.securityDeposit}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="property-listing__field-group">
                                        <label className="property-listing__label">Currently Leased?</label>
                                        <select
                                            className="property-listing__input"
                                            name="leaseStatus"
                                            value={propertyData.leaseStatus}
                                            onChange={handleInputChange}
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>

                                    {propertyData.leaseStatus === 'yes' && (
                                        <>
                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Current Lease Amount</label>
                                                <input
                                                    type="number"
                                                    className="property-listing__input"
                                                    name="currentLease"
                                                    placeholder="e.g., 25000"
                                                    value={propertyData.details.currentLease}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="property-listing__field-group">
                                                <label className="property-listing__label">Remaining Lease Time (months)</label>
                                                <input
                                                    type="number"
                                                    className="property-listing__input"
                                                    name="remainingTime"
                                                    placeholder="e.g., 6"
                                                    value={propertyData.details.remainingTime}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Maintenance Charge (per month)</label>
                                <input
                                    type="number"
                                    className="property-listing__input"
                                    name="maintenanceCharge"
                                    placeholder="e.g., 1500"
                                    value={propertyData.details.maintenanceCharge}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Amenities Section */}
                    {visibleSections.part4 && (
                        <div className="property-listing__section">
                            <div className="property-listing__amenities-grid">
                                {(propertyData.propertyType.residential !== 'plot' ? [
                                    { name: 'Air Conditioner', icon: <TbAirConditioning /> },
                                    { name: 'Cable Tv', icon: <FaSatelliteDish /> },
                                    { name: 'Wifi', icon: <FaWifi /> },
                                    { name: 'Dishwasher', icon: <LuUtensilsCrossed /> },
                                    { name: 'Heating', icon: <PiThermometerHotBold /> },
                                    { name: 'Lift', icon: <GrElevator /> },
                                    { name: 'Intercomm Facility', icon: <LiaIntercom /> },
                                    { name: 'Microwave', icon: <MdMicrowave /> },
                                    { name: 'Park', icon: <PiPark /> },
                                    { name: 'Parking', icon: <LuParkingCircle /> },
                                    { name: 'Guest Parking', icon: <RiParkingBoxLine /> },
                                    { name: 'Security', icon: <MdSecurity /> },
                                    { name: 'Play Area', icon: <GiKidSlide /> },
                                    { name: 'CCTV', icon: <BiCctv /> },
                                    { name: 'Power Backup', icon: <ImPower /> },
                                    { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                    { name: 'Gym', icon: <GiWeightLiftingUp /> },
                                    { name: 'Swimming Pool', icon: <FaPersonSwimming /> },
                                    { name: 'Multipurpose Court', icon: <PiCourtBasketball /> },
                                    { name: 'Multipurpose Hall', icon: <TbBuildingBank /> },
                                    { name: 'Chimney', icon: <GiChimney /> },
                                    { name: 'Modular Kitchen', icon: <FaKitchenSet /> },
                                    { name: 'Refrigerator', icon: <TbFridge /> },
                                    { name: 'Rear Lawn', icon: <GiGrassMushroom /> },
                                    { name: 'Front Lawn', icon: <GiGrass /> },
                                    { name: 'EV Charge', icon: <FaChargingStation /> },
                                    { name: 'Club House', icon: <PiWarehouseLight /> }
                                ] : [
                                    { name: 'Park', icon: <PiPark /> },
                                    { name: 'Parking', icon: <LuParkingCircle /> },
                                    { name: 'Security', icon: <MdSecurity /> },
                                    { name: 'Play Area', icon: <GiKidSlide /> },
                                    { name: 'CCTV', icon: <BiCctv /> },
                                    { name: 'Power Backup', icon: <ImPower /> },
                                    { name: 'Gas Pipeline', icon: <GiGasStove /> }
                                ]).map((amenity, index) => (
                                    <label key={index} className="property-listing__checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={amenity.name}
                                            onChange={handleInputChange}
                                            checked={propertyData.details.amenities.includes(amenity.name)}
                                            className="property-listing__checkbox"
                                        />
                                        <span className="property-listing__amenity-icon">{amenity.icon}</span>
                                        <span className="property-listing__amenity-name">{amenity.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Location Details Section */}
                    {visibleSections.part3 && (
                        <div className="property-listing__section">
                            <button
                                type="button"
                                className="property-listing__btn property-listing__btn--primary"
                                onClick={handleAutoGenerateDistances}
                                disabled={isGeneratingDistances}
                                style={{ marginBottom: '20px' }}
                            >
                                {isGeneratingDistances ? 'Generating Distances...' : 'Auto Generate Distances'}
                            </button>
                            <div className="property-listing__nearby-grid">
                                {[
                                    { name: 'metro', label: 'Metro Station' },
                                    { name: 'bus', label: 'Bus Stop' },
                                    { name: 'school', label: 'School' },
                                    { name: 'hospital', label: 'Hospital' },
                                    { name: 'mall', label: 'Mall' },
                                    { name: 'restaurant', label: 'Restaurant' },
                                    { name: 'cinema', label: 'Cinema' },
                                    { name: 'park', label: 'Park' }
                                ].map((location, index) => (
                                    <div key={index} className="property-listing__field-group">
                                        <label className="property-listing__label">{location.label}</label>
                                        <input
                                            type="text"
                                            className="property-listing__input"
                                            name={location.name}
                                            placeholder="Distance in km"
                                            value={propertyData.details.nearbyLocations[location.name]?.displayText || ''}
                                            onChange={(e) => handleNearbyLocationChange(e, location.name)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Media Section */}
                    {visibleSections.part5 && (
                        <div className="property-listing__section">
                            {propertyData.propertyType.residential !== 'plot' && (
                                <div className="property-listing__upload-section">
                                    <div className="property-listing__upload-container">
                                        <input
                                            type="file"
                                            id="floorplan"
                                            className="property-listing__file-input"
                                            onChange={(e) => handleMediaUpload(e, 'floorplans')}
                                            multiple
                                            accept=".jpg,.png,.pdf"
                                        />
                                        <label htmlFor="floorplan" className="property-listing__upload-label">
                                            <span className="property-listing__upload-text">Choose Floor Plans</span>
                                            <small className="property-listing__upload-hint">(Up to 4 files)</small>
                                        </label>
                                    </div>

                                    {propertyData.floorplans.length > 0 && (
                                        <div className="property-listing__preview">
                                            {propertyData.floorplans.map((file, index) => (
                                                <div key={index} className="property-listing__preview-item">
                                                    <span className="property-listing__preview-name">{file}</span>
                                                    <button
                                                        className="property-listing__remove-btn"
                                                        onClick={() => removeMedia(file, 'floorplans')}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="property-listing__upload-section">
                                <div className="property-listing__upload-container">
                                    <input
                                        type="file"
                                        id="photos"
                                        className="property-listing__file-input"
                                        onChange={(e) => handleMediaUpload(e, 'photos')}
                                        multiple
                                        accept=".jpg,.png"
                                    />
                                    <label htmlFor="photos" className="property-listing__upload-label">
                                        <span className="property-listing__upload-text">Choose Property Photos</span>
                                        <small className="property-listing__upload-hint">(Up to 10 files)</small>
                                    </label>
                                </div>

                                {propertyData.photos.length > 0 && (
                                    <div className="property-listing__preview">
                                        {propertyData.photos.map((file, index) => (
                                            <div key={index} className="property-listing__preview-item">
                                                <span className="property-listing__preview-name">{file}</span>
                                                <button
                                                    className="property-listing__remove-btn"
                                                    onClick={() => removeMedia(file, 'photos')}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Preview Section */}
                    {visibleSections.part6 && (
                        <div className="property-listing__section">
                            <button
                                type="button"
                                className="property-listing__btn property-listing__btn--primary"
                                onClick={generateDescription}
                                disabled={propertyData.isLoading}
                            >
                                {propertyData.isLoading ? "Generating..." : "Generate AI Description"}
                            </button>

                            <div className="property-listing__field-group">
                                <label className="property-listing__label">Property Description</label>
                                <textarea
                                    className="property-listing__input property-listing__input--textarea"
                                    value={propertyData.description}
                                    onChange={(e) => setPropertyData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={7}
                                    placeholder="Property description will be generated here..."
                                    required
                                />
                            </div>

                            <div className="property-listing__preview-details">
                                <h3 className="property-listing__preview-title">Property Summary</h3>
                                <div className="property-listing__summary">
                                    <div className="property-listing__summary-item">
                                        <span className="property-listing__summary-label">Purpose:</span>
                                        <span className="property-listing__summary-value">{propertyData.purpose}</span>
                                    </div>
                                    <div className="property-listing__summary-item">
                                        <span className="property-listing__summary-label">Category:</span>
                                        <span className="property-listing__summary-value">{propertyData.category}</span>
                                    </div>
                                    <div className="property-listing__summary-item">
                                        <span className="property-listing__summary-label">Type:</span>
                                        <span className="property-listing__summary-value">
                                            {propertyData.propertyType.residential || propertyData.propertyType.commercial}
                                        </span>
                                    </div>
                                    <div className="property-listing__summary-item">
                                        <span className="property-listing__summary-label">Property Name:</span>
                                        <span className="property-listing__summary-value">{propertyData.details.propertyName}</span>
                                    </div>
                                    <div className="property-listing__summary-item">
                                        <span className="property-listing__summary-label">Location:</span>
                                        <span className="property-listing__summary-value">
                                            {propertyData.details.locality}, {propertyData.details.city}, {propertyData.details.country}
                                        </span>
                                    </div>
                                    {propertyData.details.areaDetail && (
                                        <div className="property-listing__summary-item">
                                            <span className="property-listing__summary-label">Area:</span>
                                            <span className="property-listing__summary-value">
                                                {propertyData.details.areaDetail} sq.ft ({propertyData.details.areaType})
                                            </span>
                                        </div>
                                    )}
                                    {propertyData.details.price && (
                                        <div className="property-listing__summary-item">
                                            <span className="property-listing__summary-label">Price:</span>
                                            <span className="property-listing__summary-value">
                                                {propertyData.details.price} {propertyData.details.priceRange} {propertyData.details.moneyType}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="property-listing__navigation">
                        {activeStep > 0 && (
                            <button
                                type="button"
                                className="property-listing__btn property-listing__btn--secondary"
                                onClick={handlePrevClick}
                            >
                                Previous
                            </button>
                        )}
                        {activeStep < 5 && (
                            <button
                                type="button"
                                className="property-listing__btn property-listing__btn--primary"
                                onClick={handleNextClick}
                            >
                                Next
                            </button>
                        )}
                        {activeStep === 5 && (
                            <button
                                type="submit"
                                className="property-listing__btn property-listing__btn--primary"
                                disabled={propertyData.isLoading}
                            >
                                {propertyData.isLoading ? 'Submitting...' : 'Submit Listing'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default PropertyListingForm; 