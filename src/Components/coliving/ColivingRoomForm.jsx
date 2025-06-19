import React, { useState } from 'react';
import styles from './ColivingRoomForm.module.css';

const initialRoom = {
  price: '',
  area: '',
  bathroom: false,
  bedroom: '',
  dedicated_work_space: false,
  property_id: '',
  occupied: false,
  facilitie: '',
  locking: false,
};

export default function ColivingRoomForm({ propertyId }) {
  const [room, setRoom] = useState({ ...initialRoom, property_id: propertyId });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send room data to your backend
  };

  if (submitted) {
    return <div className={styles.roomFormContainer}><h3>Room details submitted!</h3></div>;
  }

  return (
    <form className={styles.roomFormContainer} onSubmit={handleSubmit}>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Price</label>
        <input
          className={styles.roomInput}
          name="price"
          type="number"
          value={room.price}
          onChange={handleChange}
          required
          placeholder="Enter price"
        />
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Area (sq ft)</label>
        <input
          className={styles.roomInput}
          name="area"
          type="number"
          value={room.area}
          onChange={handleChange}
          required
          placeholder="Enter area in sq ft"
        />
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Bathroom</label>
        <select
          className={styles.roomInput}
          name="bathroom"
          value={room.bathroom ? 'yes' : 'no'}
          onChange={e => setRoom(prev => ({ ...prev, bathroom: e.target.value === 'yes' }))}
          required
        >
          <option value="">Choose Yes or No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Bedroom</label>
        <input
          className={styles.roomInput}
          name="bedroom"
          value={room.bedroom}
          onChange={handleChange}
          required
          placeholder="Enter bedroom type (e.g. Single, Double)"
        />
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Dedicated Work Space</label>
        <select
          className={styles.roomInput}
          name="dedicated_work_space"
          value={room.dedicated_work_space ? 'yes' : 'no'}
          onChange={e => setRoom(prev => ({ ...prev, dedicated_work_space: e.target.value === 'yes' }))}
          required
        >
          <option value="">Choose Yes or No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Occupied</label>
        <select
          className={styles.roomInput}
          name="occupied"
          value={room.occupied ? 'yes' : 'no'}
          onChange={e => setRoom(prev => ({ ...prev, occupied: e.target.value === 'yes' }))}
          required
        >
          <option value="">Choose Yes or No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Facilities</label>
        <textarea
          className={styles.roomTextarea}
          name="facilitie"
          value={room.facilitie}
          onChange={handleChange}
          placeholder="List facilities separated by commas"
        />
      </div>
      <div className={styles.roomFormGroup}>
        <label className={styles.roomLabel}>Locking</label>
        <select
          className={styles.roomInput}
          name="locking"
          value={room.locking ? 'yes' : 'no'}
          onChange={e => setRoom(prev => ({ ...prev, locking: e.target.value === 'yes' }))}
          required
        >
          <option value="">Choose Yes or No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button className={styles.roomButton} type="submit">Submit Room Details</button>
    </form>
  );
}
