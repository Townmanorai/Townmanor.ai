import React, { useState, useRef } from 'react';

import ColivingRoomForm from './ColivingRoomForm';
import './ColivingForm.css';
const initialProperty = {
  property_name: '',
  configuration_type: '',
  area: '',
  parking: false,
  floor: '',
  available_date: '',
  description: '',
  address: '',
  latitude: '',
  longitude: '',
};

export default function ColivingForm({ onSuccess }) {
  const [property, setProperty] = useState(initialProperty);
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [images, setImages] = useState([]); // Array of {file, url}
  const [imageFiles, setImageFiles] = useState([]); // For upload
  const imageInputRef = useRef();
  const [isFetchingCoords, setIsFetchingCoords] = useState(false);
  const [coordError, setCoordError] = useState('');
  const [propertyId, setPropertyId] = useState(null);

  // Tag input handlers
  const handleTagInput = (e, value, setValue, setList, list) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed && !list.includes(trimmed)) {
        setList([...list, trimmed]);
      }
      setValue('');
    }
  };
  const removeTag = (index, setList, list) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Image upload handlers
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newImages]);
    setImageFiles(prev => [...prev, ...files]);
  };
  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Form field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Image upload to server (returns array of URLs)
  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    const formData = new FormData();
    imageFiles.forEach(file => formData.append('images', file));
    try {
      const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data && data.fileUrls) {
        return data.fileUrls;
      }
      return [];
    } catch (err) {
      alert('Image upload failed.');
      return [];
    }
  };

  // Fetch coordinates from address
  const getCoordinates = async (address) => {
    try {
      const response = await fetch(`https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AlzaSyrmzWPt966TnQME5naZ_37JTMW9hNBNPVI`);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const handleFetchCoords = async () => {
    setCoordError('');
    if (!property.address) {
      setCoordError('Please enter the address first.');
      return;
    }
    setIsFetchingCoords(true);
    const coords = await getCoordinates(property.address);
    setIsFetchingCoords(false);
    if (coords) {
      setProperty(prev => ({ ...prev, latitude: coords.lat, longitude: coords.lng }));
    } else {
      setCoordError('Could not fetch coordinates. Please check the address.');
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedImageUrls = [];
    if (imageFiles.length > 0) {
      uploadedImageUrls = await uploadImages();
    }
    console.log(uploadedImageUrls);
    const payload = {
      property_name: property.property_name,
      configuration: property.configuration_type,
      configuration_type: property.configuration_type,
      area: property.area,
      parking: property.parking ? 1 : 0,
      floor: Number(property.floor),
      available_date: property.available_date,
      description: property.description,
      amenities: amenities.join(', '),
      nearby_location: locations.join(', '),
      image: uploadedImageUrls,
      address: property.address,
      latitude: property.latitude ? Number(property.latitude) : undefined,
      longitude: property.longitude ? Number(property.longitude) : undefined,
    };
    console.log(payload);
    try {
      const response = await fetch('https://townmanor.ai/api/coliving', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log(response);
      const data = await response.json();
      if (data && data.id) {
        setPropertyId(data.id);
        console.log("Property ID set:", data.id);
        if (onSuccess) onSuccess(data.id);
      }
    } catch (error) {
      alert('Failed to submit property. Please try again.');
    }
  };

  return (
    <div className="colivingform_unique_formContainer">
      <h2 className="colivingform_unique_heading">Coliving Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Property Name, Config, Area, Parking, Floor, Date, Description */}
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Property Name</label>
          <input
            className="colivingform_unique_input"
            name="property_name"
            value={property.property_name}
            onChange={handleChange}
            required
            placeholder="Enter property name"
          />
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Configuration Type</label>
          <input
            className="colivingform_unique_input"
            name="configuration_type"
            value={property.configuration_type}
            onChange={handleChange}
            required
            placeholder="e.g. 2BHK, Studio, etc."
          />
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Area</label>
          <input
            className="colivingform_unique_input"
            name="area"
            value={property.area}
            onChange={handleChange}
            required
            placeholder="Enter area (e.g. 1200 sqft)"
          />
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Parking</label>
          <select
            className="colivingform_unique_input"
            name="parking"
            value={property.parking ? 'yes' : 'no'}
            onChange={e => setProperty(prev => ({ ...prev, parking: e.target.value === 'yes' }))}
            required
          >
            <option value="">Choose Yes or No</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Floor</label>
          <input
            className="colivingform_unique_input"
            name="floor"
            type="number"
            value={property.floor}
            onChange={handleChange}
            required
            placeholder="Enter floor number"
          />
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Available Date</label>
          <input
            className="colivingform_unique_input"
            name="available_date"
            type="date"
            value={property.available_date}
            onChange={handleChange}
            required
            placeholder="Select available date"
          />
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Description</label>
          <textarea
            className="colivingform_unique_textarea"
            name="description"
            value={property.description}
            onChange={handleChange}
            required
            placeholder="Describe the property"
          />
        </div>
        {/* Amenities Tag Input */}
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Amenities</label>
          <div className="colivingform_unique_tagInputWrapper">
            {amenities.map((tag, idx) => (
              <span className="colivingform_unique_tag" key={tag}>
                {tag}
                <button type="button" className="colivingform_unique_tagRemove" onClick={() => removeTag(idx, setAmenities, amenities)}>×</button>
              </span>
            ))}
            <input
              className="colivingform_unique_tagInput"
              type="text"
              value={amenityInput}
              onChange={e => setAmenityInput(e.target.value)}
              onKeyDown={e => handleTagInput(e, amenityInput, setAmenityInput, setAmenities, amenities)}
              placeholder="Type and press Enter or comma"
            />
          </div>
        </div>
        {/* Location Tag Input */}
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Nearby Locations</label>
          <div className="colivingform_unique_tagInputWrapper">
            {locations.map((tag, idx) => (
              <span className="colivingform_unique_tag" key={tag}>
                {tag}
                <button type="button" className="colivingform_unique_tagRemove" onClick={() => removeTag(idx, setLocations, locations)}>×</button>
              </span>
            ))}
            <input
              className="colivingform_unique_tagInput"
              type="text"
              value={locationInput}
              onChange={e => setLocationInput(e.target.value)}
              onKeyDown={e => handleTagInput(e, locationInput, setLocationInput, setLocations, locations)}
              placeholder="Type and press Enter or comma"
            />
          </div>
        </div>
        {/* Image Upload */}
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Images</label>
          <input
            className="colivingform_unique_input"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png"
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          <div className="colivingform_unique_imagePreviewWrapper">
            {images.map((img, idx) => (
              <div className="colivingform_unique_imagePreview" key={idx}>
                <img src={img.url} alt={`preview-${idx}`} className="colivingform_unique_imageThumb" />
                <button type="button" className="colivingform_unique_imageRemove" onClick={() => removeImage(idx)}>×</button>
              </div>
            ))}
          </div>
        </div>
        {/* Address, Lat, Lng */}
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Address</label>
          <input
            className="colivingform_unique_input"
            name="address"
            value={property.address}
            onChange={handleChange}
            required
            placeholder="Enter full address"
          />
        </div>
        <div className="colivingform_unique_formGroup">
          <label className="colivingform_unique_label">Latitude & Longitude</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              className="colivingform_unique_input"
              name="latitude"
              value={property.latitude}
              onChange={handleChange}
              placeholder="Latitude (optional)"
              style={{ flex: 1 }}
            />
            <input
              className="colivingform_unique_input"
              name="longitude"
              value={property.longitude}
              onChange={handleChange}
              placeholder="Longitude (optional)"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="colivingform_unique_button"
              style={{ width: 'auto', minWidth: 120, padding: '0.6rem 1rem', fontSize: '0.95rem' }}
              onClick={handleFetchCoords}
              disabled={isFetchingCoords}
            >
              {isFetchingCoords ? 'Fetching...' : 'Get from Address'}
            </button>
          </div>
          {coordError && <div style={{ color: '#b71c1c', marginTop: 4, fontSize: '0.97em' }}>{coordError}</div>}
        </div>
        <button className="colivingform_unique_button" type="submit">Add Room Details</button>
      </form>
    </div>
  );
}
