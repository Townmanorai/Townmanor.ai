import React, { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import styles from './ColivingRoomForm.module.css';


const initialRoom = {
  price: '',
  area: '',
  bathroom: '',
  bedroom: '',
  dedicated_work_space: '0',
  image: null,
};

export default function ColivingRoomForm({ onRoomsChange, propertyId}) {
  const [room, setRoom] = useState(initialRoom);
  const [rooms, setRooms] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef();
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Image upload logic (single image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Upload image to server, return URL
  const uploadImage = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('images', imageFile);
    try {
      const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data && data.fileUrls && data.fileUrls[0]) {
        return data.fileUrls[0];
      }
      return null;
    } catch (err) {
      alert('Image upload failed.');
      return null;
    }
  };

  // Add room to list and submit to API
  const handleAddRoom = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage();
    }
    const token = Cookies.get('token');
    let username = '';
    if (token) {
      const decodedToken = jwtDecode(token);
      username = decodedToken.username;
    }

    const newRoom = {
      ...room,
      price: Number(room.price),
      area: Number(room.area),
      bathroom: Number(room.bathroom),
      dedicated_work_space: Number(room.dedicated_work_space),
      image: imageUrl,
      property_id: propertyId,
      username: username,
    };
    try {
      const response = await fetch('https://townmanor.ai/api/coliving-rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) throw new Error('Failed to submit room');
      setRooms(prev => {
        const updated = [...prev, newRoom];
        if (onRoomsChange) onRoomsChange(updated);
        return updated;
      });
      setSubmitStatus('success');
      setRoom(initialRoom);
      setImageFile(null);
      setImagePreview(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleAddRoom} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.formGroup}>
          <label>Price</label>
          <input type="number" name="price" value={room.price} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label>Area</label>
          <input type="number" name="area" value={room.area} onChange={handleChange} required className={styles.input} placeholder="enter room area in sq.ft" />
        </div>
        <div className={styles.formGroup}>
          <label>Attached bathroom</label>
          <select name="bathroom" value={room.bathroom} onChange={handleChange} required className={styles.input}>
            <option value="" disabled>Select an option</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Bed size</label>
          <select name="bedroom" value={room.bedroom} onChange={handleChange} required className={styles.input}>
            <option value="" disabled>Select a bed size</option>
            <option value="Queen size">Queen size</option>
            <option value="single bed">Single bed</option>
            <option value="normal size">Normal size</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Dedicated Work Space</label>
          <select name="dedicated_work_space" value={room.dedicated_work_space} onChange={handleChange} className={styles.input}>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className={styles.formGroup + ' ' + styles.imageUpload}>
          <label>Image</label>
          <input type="file" accept=".jpg,.jpeg,.png" ref={imageInputRef} onChange={handleImageChange} />
          {imagePreview && (
            <div className={styles.imagePreviewWrapper}>
              <img src={imagePreview} alt="preview" className={styles.imagePreview} />
              <button type="button" onClick={removeImage} className={styles.removeImageBtn}>×</button>
            </div>
          )}
        </div>
        <button type="submit" className={styles.addRoomBtn}>+ Add Room</button>
      </form>
      <div className={styles.roomsListContainer}>
        <h4 className={styles.roomsListTitle}>Added Rooms</h4>
        {rooms.length === 0 && <div className={styles.noRooms}>No rooms added yet.</div>}
        <ul style={{ paddingLeft: 0 }}>
          {rooms.map((r, idx) => (
            <li key={idx} className={styles.roomItem}>
              <div className={styles.roomDetails}>
                <div><b>Price:</b> {r.price}</div>
                <div><b>Area:</b> {r.area}</div>
                <div><b>Attached bathroom:</b> {r.bathroom ? 'Yes' : 'No'}</div>
                <div><b>Bed size:</b> {r.bedroom}</div>
                <div><b>Dedicated Work Space:</b> {r.dedicated_work_space ? 'Yes' : 'No'}</div>
              </div>
              {r.image && <img src={r.image} alt="room" className={styles.roomImage} />}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        {isSubmitting && (
          <div style={{ color: '#ff4447', marginTop: 12 }}>Submitting room...</div>
        )}
        {submitStatus === 'success' && (
          <div style={{ color: 'green', marginTop: 12 }}>Room submitted successfully!</div>
        )}
        {submitStatus === 'error' && (
          <div style={{ color: 'red', marginTop: 12 }}>Failed to submit room. Please try again.</div>
        )}
      </div>
    </div>
  );
}
