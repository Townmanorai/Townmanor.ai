import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import './PropertyEditForm.css';

function PropertyEditForm() {
  const { index } = useParams();
  const [propertyData, setPropertyData] = useState({
    id: null,
    pincode: null,
    city: '',
    locality: null,
    property_name: '',
    address: '',
    configuration: '',
    area_detail: '',
    area_type: '',
    bathroom: null,
    balcony: null,
    description: '',
    furnish_type: null,
    rera_id: '',
    floor_no: null,
    total_floor: null,
    construction_status: '',
    property_date: null,
    property_facing: null,
    price: null,
    maintenance_charge: null,
    token_amount: null,
    pricerange: 'Lakh',
    money_type: 'Rupees',
    amenities: [],
    country: 'india',
    lat: null,
    lng: null,
    length: null,
    width: null,
    montly_rent: null,
    securitydeposit: null,
    current_lease: null,
    remaining_time: null,
    boundary_wall: null,
    no_of_open_side: null,
    floor_allowed: null,
    modifyinterior: null,
    lock_in_period: null,
    metro: null,
    school: null,
    hospital: null,
    mall: null,
    restaurant: null,
    bus: null,
    cinema: null,
    leased: 'no',
    floorplan: [],
    image_repository: [],
    username: null,
    status: 1,
    Commercial: null,
    purpose: '',
    category: '',
    residential: ''
  });
  const [floorplan, setfloorplan] = useState([]);
  const [photos, setphotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/owner-property/${index}`);
        const data = response.data;

        // Parse JSON strings for amenities, image_repository, and floorplan
        try {
          // Handle double-stringified JSON
          if (typeof data.amenities === 'string') {
            data.amenities = JSON.parse(JSON.parse(data.amenities));
          }
          if (typeof data.image_repository === 'string') {
            data.image_repository = JSON.parse(JSON.parse(data.image_repository));
          }
          if (typeof data.floorplan === 'string') {
            data.floorplan = JSON.parse(JSON.parse(data.floorplan));
          }
        } catch (e) {
          // If double parsing fails, try single parsing
          try {
            if (typeof data.amenities === 'string') {
              data.amenities = JSON.parse(data.amenities);
            }
            if (typeof data.image_repository === 'string') {
              data.image_repository = JSON.parse(data.image_repository);
            }
            if (typeof data.floorplan === 'string') {
              data.floorplan = JSON.parse(data.floorplan);
            }
          } catch (err) {
            console.error('Error parsing JSON data:', err);
          }
        }
        
        // Ensure arrays are initialized even if parsing fails
        data.amenities = Array.isArray(data.amenities) ? data.amenities : [];
        data.image_repository = Array.isArray(data.image_repository) ? data.image_repository : [];
        data.floorplan = Array.isArray(data.floorplan) ? data.floorplan : [];

        setfloorplan(data.floorplan);
        setphotos(data.image_repository);
        setPropertyData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [index]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleBooleanChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData((prevData) => {
      const updatedAmenities = checked
        ? [...prevData.amenities, id]
        : prevData.amenities.filter((amenity) => amenity !== id);
      return { ...prevData, amenities: updatedAmenities };
    });
  };

  const handleDeletePhoto = (photoToDelete) => {
    // Update the state after deleting the photo
    setphotos(prevPhotos => prevPhotos.filter(photo => photo !== photoToDelete));
  };

  // Handle Deleting a Floorplan
  const handleDeleteFloorplan = (floorplanToDelete) => {
    // Update the state after deleting the floorplan
    setfloorplan(prevFloorplans => prevFloorplans.filter(floor => floor !== floorplanToDelete));
  };

  const handleFloorplanChange = async (event) => {
    const files = Array.from(event.target.files);
    
    // Check if the current floorplans plus the new files exceed the limit
    if (files.length + floorplan.length > 4) {
      alert('You can upload up to 4 floorplans.');
      files.splice(4 - floorplan.length); // Limit the number of files
    }
    
    // Prepare the FormData to send to the backend
    const formData = new FormData();
    files.forEach(file => {
      formData.append("images", file); // 'floorplans' is the key expected by the backend
    });

    try {
      // Upload the floorplans to the backend
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if the upload was successful
      if (response.status === 200) {
        const uploadedFloorplanPaths = response.data.fileUrls;
        const trimmedFloorplanPaths = uploadedFloorplanPaths.map((path) => {
          return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", ""); // Adjust path
        });

        setfloorplan((prevFloorPlans) => [...prevFloorPlans, ...trimmedFloorplanPaths]);
      } else {
        console.error('Error uploading floorplans:', response);
        alert('Failed to upload floorplans');
      }
    } catch (error) {
      console.error('Error uploading floorplans:', error);
      alert('An error occurred while uploading the floorplans');
    }
  };

  const handlePhotosChange = async (event) => {
    const files = Array.from(event.target.files);
    
    // Check if the current photos plus the new files exceed the limit
    // if (files.length + photos.length > 10) {
    //   alert('You can upload up to 10 photos.');
    //   files.splice(10 - photos.length); // Limit the number of files
    // }

    // Prepare the FormData to send to the backend
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file); // 'images' is the key expected by the backend
    });

    try {
      // Upload the photos to the backend
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if the upload was successful
      if (response.status === 200) {
        const uploadedImagePaths = response.data.fileUrls;
        const trimmedImagePaths = uploadedImagePaths.map((path) => {
          return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", "");
        });

        setphotos((prevPhotos) => [...prevPhotos, ...trimmedImagePaths]);
      } else {
        console.error('Error uploading images:', response);
        alert('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading the images');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a copy of the data to submit
    const dataToSubmit = {
      ...propertyData,
      // Handle arrays properly - ensure they remain as arrays
      floorplan: floorplan,
      image_repository: photos,
      amenities: Array.isArray(propertyData.amenities) 
        ? propertyData.amenities 
        : typeof propertyData.amenities === 'string'
          ? JSON.parse(propertyData.amenities)
          : [],
      // Format date properly
      property_date: null,
      // Ensure numeric fields are numbers, not strings
      price: Number(propertyData.price) || null,
      area_detail: Number(propertyData.area_detail) || null,
      bathroom: Number(propertyData.bathroom) || null,
      balcony: Number(propertyData.balcony) || null,
      floor_no: Number(propertyData.floor_no) || null,
      total_floor: Number(propertyData.total_floor) || null,
      metro: Number(propertyData.metro) || null,
      school: Number(propertyData.school) || null,
      hospital: Number(propertyData.hospital) || null,
      mall: Number(propertyData.mall) || null,
      restaurant: Number(propertyData.restaurant) || null,
      bus: Number(propertyData.bus) || null,
      cinema: Number(propertyData.cinema) || null,
      lat: Number(propertyData.lat) || null,
      lng: Number(propertyData.lng) || null,
      montly_rent: Number(propertyData.montly_rent) || null,
      securitydeposit: Number(propertyData.securitydeposit) || null,
      // Ensure empty strings are converted to null
      leased: propertyData.leased || null,
      Commercial: propertyData.Commercial || null
    };

    // Remove any undefined values and convert empty strings to null
    Object.keys(dataToSubmit).forEach(key => {
      if (dataToSubmit[key] === undefined || dataToSubmit[key] === '') {
        dataToSubmit[key] = null;
      }
    });

    console.log('Data being submitted:', dataToSubmit);
    
    try {
      const response = await axios.put(`https://www.townmanor.ai/api/owner-property/${index}`, dataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Property updated successfully');
        console.log('Server response:', response.data);
        
        // Refresh the data after successful update
        const refreshResponse = await axios.get(`https://www.townmanor.ai/api/owner-property/${index}`);
        const refreshedData = refreshResponse.data;
        
        // Parse the refreshed data
        try {
          // Handle single or double stringified JSON
          if (typeof refreshedData.amenities === 'string') {
            try {
              refreshedData.amenities = JSON.parse(JSON.parse(refreshedData.amenities));
            } catch {
              refreshedData.amenities = JSON.parse(refreshedData.amenities);
            }
          }
          if (typeof refreshedData.image_repository === 'string') {
            try {
              refreshedData.image_repository = JSON.parse(JSON.parse(refreshedData.image_repository));
            } catch {
              refreshedData.image_repository = JSON.parse(refreshedData.image_repository);
            }
          }
          if (typeof refreshedData.floorplan === 'string') {
            try {
              refreshedData.floorplan = JSON.parse(JSON.parse(refreshedData.floorplan));
            } catch {
              refreshedData.floorplan = JSON.parse(refreshedData.floorplan);
            }
          }
        } catch (err) {
          console.error('Error parsing refreshed data:', err);
        }
        
        // Ensure arrays are properly initialized
        refreshedData.amenities = Array.isArray(refreshedData.amenities) ? refreshedData.amenities : [];
        refreshedData.image_repository = Array.isArray(refreshedData.image_repository) ? refreshedData.image_repository : [];
        refreshedData.floorplan = Array.isArray(refreshedData.floorplan) ? refreshedData.floorplan : [];
        
        setPropertyData(refreshedData);
        setfloorplan(refreshedData.floorplan);
        setphotos(refreshedData.image_repository);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'An error occurred while updating the property. ';
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.response?.data?.details?.sqlMessage) {
        errorMessage += error.response.data.details.sqlMessage;
      } else if (error.message) {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
    }
  };

  if (!propertyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="townmanor-property-edit-container">
      <h1 className="townmanor-property-edit-title">Property Edit Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="username" className="townmanor-property-edit-label">Username</label>
          <input type="text" className="townmanor-property-edit-input" id="username" value={propertyData.username || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="purpose" className="townmanor-property-edit-label">Purpose</label>
          <select className="townmanor-property-edit-select" id="purpose" value={propertyData.purpose} onChange={handleChange}>
            <option value="">Select Purpose</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="category" className="townmanor-property-edit-label">Category</label>
          <select className="townmanor-property-edit-select" id="category" value={propertyData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {propertyData.category === 'residential' && (
          <div className="townmanor-property-edit-group">
            <label htmlFor="residential" className="townmanor-property-edit-label">Residential Type</label>
            <select className="townmanor-property-edit-select" id="residential" value={propertyData.residential} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="builderfloor">Builder Floor</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="independenthouse">Independent House</option>
            </select>
          </div>
        )}

        {propertyData.category === 'commercial' && (
          <div className="townmanor-property-edit-group">
            <label htmlFor="Commercial" className="townmanor-property-edit-label">Commercial Type</label>
            <select className="townmanor-property-edit-select" id="Commercial" value={propertyData.Commercial} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>
        )}

        <div className="townmanor-property-edit-group">
          <label htmlFor="description" className="townmanor-property-edit-label">Description</label>
          <textarea className="townmanor-property-edit-textarea" id="description" rows="3" value={propertyData.description} onChange={handleChange}></textarea>
        </div>

        {/* Location Information */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="pincode" className="townmanor-property-edit-label">Pincode</label>
          <input type="text" className="townmanor-property-edit-input" id="pincode" value={propertyData.pincode || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="city" className="townmanor-property-edit-label">City</label>
          <input type="text" className="townmanor-property-edit-input" id="city" value={propertyData.city} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="locality" className="townmanor-property-edit-label">Locality</label>
          <input type="text" className="townmanor-property-edit-input" id="locality" value={propertyData.locality || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="property_name" className="townmanor-property-edit-label">Property Name</label>
          <input type="text" className="townmanor-property-edit-input" id="property_name" value={propertyData.property_name} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="address" className="townmanor-property-edit-label">Address</label>
          <input type="text" className="townmanor-property-edit-input" id="address" value={propertyData.address} onChange={handleChange} />
        </div>

        {/* Property Details */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="configuration" className="townmanor-property-edit-label">Configuration</label>
          <input type="text" className="townmanor-property-edit-input" id="configuration" value={propertyData.configuration} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="area_detail" className="townmanor-property-edit-label">Area Detail</label>
          <input type="text" className="townmanor-property-edit-input" id="area_detail" value={propertyData.area_detail} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="area_type" className="townmanor-property-edit-label">Area Type</label>
          <select className="townmanor-property-edit-select" id="area_type" value={propertyData.area_type} onChange={handleChange}>
            <option value="">Select Area Type</option>
            <option value="Built-up area">Built-up area</option>
            <option value="Super Built-up area">Super Built-up area</option>
            <option value="Carpet area">Carpet area</option>
          </select>
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="bathroom" className="townmanor-property-edit-label">Bathrooms</label>
          <input type="number" className="townmanor-property-edit-input" id="bathroom" value={propertyData.bathroom || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="balcony" className="townmanor-property-edit-label">Balconies</label>
          <input type="number" className="townmanor-property-edit-input" id="balcony" value={propertyData.balcony || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="furnish_type" className="townmanor-property-edit-label">Furnishing Status</label>
          <select className="townmanor-property-edit-select" id="furnish_type" value={propertyData.furnish_type || ''} onChange={handleChange}>
            <option value="">Select Furnishing</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully-Furnished">Fully-Furnished</option>
          </select>
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="property_facing" className="townmanor-property-edit-label">Property Facing</label>
          <select className="townmanor-property-edit-select" id="property_facing" value={propertyData.property_facing || ''} onChange={handleChange}>
            <option value="">Select Facing</option>
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

        {/* Price Information */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="price" className="townmanor-property-edit-label">Price</label>
          <input type="number" className="townmanor-property-edit-input" id="price" value={propertyData.price || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="pricerange" className="townmanor-property-edit-label">Price Range</label>
          <select className="townmanor-property-edit-select" id="pricerange" value={propertyData.pricerange} onChange={handleChange}>
            <option value="Lakh">Lakh</option>
            <option value="Crore">Crore</option>
          </select>
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="money_type" className="townmanor-property-edit-label">Currency</label>
          <select className="townmanor-property-edit-select" id="money_type" value={propertyData.money_type} onChange={handleChange}>
            <option value="Rupees">Rupees</option>
            <option value="Dollars">Dollars</option>
          </select>
        </div>

        {/* Additional Details */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="rera_id" className="townmanor-property-edit-label">RERA ID</label>
          <input type="text" className="townmanor-property-edit-input" id="rera_id" value={propertyData.rera_id || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="floor_no" className="townmanor-property-edit-label">Floor Number</label>
          <input type="text" className="townmanor-property-edit-input" id="floor_no" value={propertyData.floor_no || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="total_floor" className="townmanor-property-edit-label">Total Floors</label>
          <input type="number" className="townmanor-property-edit-input" id="total_floor" value={propertyData.total_floor || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="construction_status" className="townmanor-property-edit-label">Construction Status</label>
          <select className="townmanor-property-edit-select" id="construction_status" value={propertyData.construction_status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
            <option value="New Launch">New Launch</option>
          </select>
        </div>

        {/* Plot/Land Specific Fields */}
        {(propertyData.category === 'residential' && propertyData.residential === 'plot') || 
         (propertyData.category === 'commercial' && propertyData.Commercial === 'land') ? (
          <div className="townmanor-property-edit-conditional-section">
            <div className="townmanor-property-edit-group">
              <label htmlFor="length" className="townmanor-property-edit-label">Length</label>
              <input type="number" className="townmanor-property-edit-input" id="length" value={propertyData.length || ''} onChange={handleChange} />
            </div>

            <div className="townmanor-property-edit-group">
              <label htmlFor="width" className="townmanor-property-edit-label">Width</label>
              <input type="number" className="townmanor-property-edit-input" id="width" value={propertyData.width || ''} onChange={handleChange} />
            </div>

            <div className="townmanor-property-edit-group">
              <label htmlFor="no_of_open_side" className="townmanor-property-edit-label">Number of Open Sides</label>
              <input type="number" className="townmanor-property-edit-input" id="no_of_open_side" value={propertyData.no_of_open_side || ''} onChange={handleChange} />
            </div>

            <div className="townmanor-property-edit-group">
              <label htmlFor="boundary_wall" className="townmanor-property-edit-label">Boundary Wall</label>
              <select className="townmanor-property-edit-select" id="boundary_wall" value={propertyData.boundary_wall || ''} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        ) : null}

        {/* Amenities */}
        <div className="townmanor-property-edit-group">
          <label className="townmanor-property-edit-label">Amenities</label>
          <div className="townmanor-property-edit-amenities-grid">
            {[
              "Air Conditioner", "Wifi", "Park", "Lift", "Security", "Play Area", 
              "CCTV", "Power Backup", "Multipurpose Hall", "Multipurpose Court", 
              "Swimming Pool", "Club House", "Community Hall", "Garden", "Sports Facility"
            ].map((amenity) => (
              <div key={amenity} className="townmanor-property-edit-checkbox-group">
                <input
                  className="townmanor-property-edit-checkbox"
                  type="checkbox"
                  id={amenity}
                  checked={propertyData.amenities.includes(amenity)}
                  onChange={handleAmenitiesChange}
                />
                <label className="townmanor-property-edit-checkbox-label" htmlFor={amenity}>
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Locations */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="metro" className="townmanor-property-edit-label">Metro Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="metro" value={propertyData.metro || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="school" className="townmanor-property-edit-label">School Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="school" value={propertyData.school || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="hospital" className="townmanor-property-edit-label">Hospital Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="hospital" value={propertyData.hospital || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="mall" className="townmanor-property-edit-label">Mall Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="mall" value={propertyData.mall || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="restaurant" className="townmanor-property-edit-label">Restaurant Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="restaurant" value={propertyData.restaurant || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="bus" className="townmanor-property-edit-label">Bus Stop Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="bus" value={propertyData.bus || ''} onChange={handleChange} />
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="cinema" className="townmanor-property-edit-label">Cinema Distance (km)</label>
          <input type="text" className="townmanor-property-edit-input" id="cinema" value={propertyData.cinema || ''} onChange={handleChange} />
        </div>

        {/* Lease Information */}
        <div className="townmanor-property-edit-group">
          <label htmlFor="current_lease" className="townmanor-property-edit-label">Property Type</label>
          <select className="townmanor-property-edit-select" id="current_lease" value={propertyData.current_lease || ''} onChange={handleChange}>
            <option value="">Select Property Type</option>
            <option value="freehold">Freehold</option>
            <option value="leasehold">Leasehold</option>
          </select>
        </div>

        <div className="townmanor-property-edit-group">
          <label htmlFor="leased" className="townmanor-property-edit-label">Currently Leased</label>
          <select className="townmanor-property-edit-select" id="leased" value={propertyData.leased} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {propertyData.leased === 'yes' && (
          <div className="townmanor-property-edit-conditional-section">
            <div className="townmanor-property-edit-group">
              <label htmlFor="montly_rent" className="townmanor-property-edit-label">Monthly Rent</label>
              <input type="number" className="townmanor-property-edit-input" id="montly_rent" value={propertyData.montly_rent || ''} onChange={handleChange} />
            </div>

            <div className="townmanor-property-edit-group">
              <label htmlFor="securitydeposit" className="townmanor-property-edit-label">Security Deposit</label>
              <input type="number" className="townmanor-property-edit-input" id="securitydeposit" value={propertyData.securitydeposit || ''} onChange={handleChange} />
            </div>

            <div className="townmanor-property-edit-group">
              <label htmlFor="remaining_time" className="townmanor-property-edit-label">Remaining Time</label>
              <input type="text" className="townmanor-property-edit-input" id="remaining_time" value={propertyData.remaining_time || ''} onChange={handleChange} />
            </div>

            <div className="townmanor-property-edit-group">
              <label htmlFor="lock_in_period" className="townmanor-property-edit-label">Lock-in Period</label>
              <input type="text" className="townmanor-property-edit-input" id="lock_in_period" value={propertyData.lock_in_period || ''} onChange={handleChange} />
            </div>
          </div>
        )}

        {/* Floor Plans */}
        <div className="townmanor-property-edit-upload-section">
          <label htmlFor="floorplan" className="townmanor-property-edit-label">Floor Plans</label>
          <input
            type="file"
            className="townmanor-property-edit-input"
            id="floorplan"
            multiple
            onChange={handleFloorplanChange}
          />
          <div className="townmanor-property-edit-upload-title">Uploaded Floorplans:</div>
          <ul className="townmanor-property-edit-upload-list">
            {floorplan.map((floor, index) => (
              <div key={index} className="townmanor-property-edit-upload-item">
                <img className="townmanor-property-edit-upload-image" src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/'+floor} alt={`Floorplan ${index + 1}`} />
                <li>{floor}</li>
                <MdDelete
                  onClick={() => handleDeleteFloorplan(floor)}
                  className="townmanor-property-edit-upload-delete"
                />
              </div>
            ))}
          </ul>
        </div>

        {/* Property Images */}
        <div className="townmanor-property-edit-upload-section">
          <label htmlFor="image_repository" className="townmanor-property-edit-label">Property Images</label>
          <input
            type="file"
            className="townmanor-property-edit-input"
            id="image_repository"
            multiple
            onChange={handlePhotosChange}
          />
          <div className="townmanor-property-edit-upload-title">Uploaded Images:</div>
          <ul className="townmanor-property-edit-upload-list">
            {photos.map((photo, index) => (
              <div key={index} className="townmanor-property-edit-upload-item">
                <img className="townmanor-property-edit-upload-image" src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/'+photo} alt={`Property ${index + 1}`} />
                <li>{photo}</li>
                <MdDelete
                  onClick={() => handleDeletePhoto(photo)}
                  className="townmanor-property-edit-upload-delete"
                />
              </div>
            ))}
          </ul>
        </div>

        <div className="townmanor-property-edit-group">
          <button type="submit" className="townmanor-property-edit-submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default PropertyEditForm;
