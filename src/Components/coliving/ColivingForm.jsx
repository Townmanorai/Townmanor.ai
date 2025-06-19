import React, { useState } from 'react';
import styles from './ColivingForm.module.css';

const initialProperty = {
  property_name: '',
  configuration_type: '',
  area: '',
  parking: false,
  floor: '',
  available_date: '',
  description: '',
  amenities: '',
  nearby_location: '',
  image: '',
  address: '',
  latitude: '',
  longitude: '',
};

export default function ColivingForm({ onSuccess }) {
  const [property, setProperty] = useState(initialProperty);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data for API
    const payload = {
      property_name: property.property_name,
      configuration: property.configuration_type, // Assuming configuration_type is the configuration
      configuration_type: property.configuration_type,
      area: property.area,
      parking: property.parking ? 1 : 0,
      floor: Number(property.floor),
      available_date: property.available_date,
      description: property.description,
      amenities: property.amenities,
      nearby_location: property.nearby_location,
      image: property.image ? property.image.split(',').map(url => url.trim()) : [],
      address: property.address,
      latitude: property.latitude ? Number(property.latitude) : undefined,
      longitude: property.longitude ? Number(property.longitude) : undefined,
    };
    try {
      const response = await fetch('https://townmanor.ai/api/coliving', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data && data.id && onSuccess) {
        onSuccess(data.id); // Forward the id to the next step
      }
    } catch (error) {
      alert('Failed to submit property. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Coliving Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Property Name</label>
          <input
            className={styles.input}
            name="property_name"
            value={property.property_name}
            onChange={handleChange}
            required
            placeholder="Enter property name"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Configuration Type</label>
          <input
            className={styles.input}
            name="configuration_type"
            value={property.configuration_type}
            onChange={handleChange}
            required
            placeholder="e.g. 2BHK, Studio, etc."
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Area</label>
          <input
            className={styles.input}
            name="area"
            value={property.area}
            onChange={handleChange}
            required
            placeholder="Enter area (e.g. 1200 sqft)"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Parking</label>
          <select
            className={styles.input}
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
        <div className={styles.formGroup}>
          <label className={styles.label}>Floor</label>
          <input
            className={styles.input}
            name="floor"
            type="number"
            value={property.floor}
            onChange={handleChange}
            required
            placeholder="Enter floor number"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Available Date</label>
          <input
            className={styles.input}
            name="available_date"
            type="date"
            value={property.available_date}
            onChange={handleChange}
            required
            placeholder="Select available date"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={property.description}
            onChange={handleChange}
            required
            placeholder="Describe the property"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Amenities</label>
          <textarea
            className={styles.textarea}
            name="amenities"
            value={property.amenities}
            onChange={handleChange}
            placeholder="List amenities separated by commas"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nearby Location</label>
          <input
            className={styles.input}
            name="nearby_location"
            value={property.nearby_location}
            onChange={handleChange}
            placeholder="Nearby landmarks or locations"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL</label>
          <input
            className={styles.input}
            name="image"
            value={property.image}
            onChange={handleChange}
            placeholder="Paste image URL"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input
            className={styles.input}
            name="address"
            value={property.address}
            onChange={handleChange}
            required
            placeholder="Enter full address"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Latitude</label>
          <input
            className={styles.input}
            name="latitude"
            value={property.latitude}
            onChange={handleChange}
            placeholder="Latitude (optional)"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Longitude</label>
          <input
            className={styles.input}
            name="longitude"
            value={property.longitude}
            onChange={handleChange}
            placeholder="Longitude (optional)"
          />
        </div>
        <button className={styles.button} type="submit">Add Room Details</button>
      </form>
    </div>
  );
}
