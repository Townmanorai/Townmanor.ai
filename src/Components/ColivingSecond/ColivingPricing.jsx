import React, { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaCar,
  FaDumbbell,
  FaBolt,
  FaWifi,
  FaTint,
  FaTv,
  FaSnowflake,
  FaCreditCard,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import {
  MdLocalParking,
  MdOutlineLocalHospital,
  MdRestaurant,
  MdShoppingCart,
  MdDirectionsBus,
  MdLocationOn,
  MdAccountBalance,
} from "react-icons/md";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import "./colivingPricingUnique.css";
import Map from '../SearchProperty/Map';
import BookingForm from './BookingForm';
// Hardcoded data as before
const rooms = [
  {
    id: 1,
    title: "Master Bedroom",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: "₹15,000/month",
    details: [
      "18 sqm with balcony",
      "Queen Bed",
      "Workspace",
      "Attached Bathroom",
      "AC",
    ],
    booked: false,
    bookable: true,
  },
  {
    id: 2,
    title: "Bedroom 2",
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    price: "₹12,000/month",
    details: [
      "14 sqm with window",
      "Single Bed",
      "Workspace",
      "Shared Bathroom",
      "AC",
    ],
    booked: false,
    bookable: true,
  },
  {
    id: 3,
    title: "Bedroom 3",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    price: "₹10,000/month",
    details: [
      "12 sqm with window",
      "Single Bed",
      "Workspace",
      "Shared Bathroom",
    ],
    booked: true,
    bookable: false,
    bookedBy: "Samantha Willson",
    bookedUntil: "July 30, 2025",
  },
];

const amenities = [
  { label: "24/7 Security", icon: <FaShieldAlt /> },
  { label: "Car Parking", icon: <FaCar /> },
  { label: "Gym", icon: <FaDumbbell /> },
  { label: "Power Backup", icon: <FaBolt /> },
  { label: "WiFi", icon: <FaWifi /> },
  { label: "Water Purifier", icon: <FaTint /> },
  { label: "TV", icon: <FaTv /> },
  { label: "Refrigerator", icon: <FaSnowflake /> },
];

const nearby = [
  { label: "Restaurants (0.5 km)", icon: <MdRestaurant /> },
  { label: "Shopping Mall (2.2 km)", icon: <MdShoppingCart /> },
  { label: "Hospital (2 km)", icon: <MdOutlineLocalHospital /> },
  { label: "Bus Stop (0.3 km)", icon: <MdDirectionsBus /> },
  { label: "Metro Station (1.5 km)", icon: <MdLocationOn /> },
  { label: "Bank/ATM (0.7 km)", icon: <MdAccountBalance /> },
];

const ColivingPricing = ({ coliving }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (!coliving?.id) return;
    fetch(`https://townmanor.ai/api/coliving-rooms/property/${coliving.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRooms(
            data.data.map((room) => ({
              id: room.id,
              title: room.bedroom || `Room ${room.id}`,
              img: room.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Use image from API
              price: `₹${room.price?.toLocaleString() || "-"}/month`,
              details: [
                `${room.area || "-"} sqft`,
                room.bedroom,
                room.dedicated_work_space ? "Workspace" : null,
                room.bathroom ? `Bathroom: ${room.bathroom}` : null,
              ].filter(Boolean),
              booked: !!room.occupied,
              bookable: !room.occupied,
              bookedBy: room.occupied || undefined,
              bookedUntil: undefined, // Not provided by API
            }))
          );
        } else {
          // If no rooms data, set empty array
          setRooms([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      });
  }, [coliving?.id]);

  const apiAmenities = (coliving?.amenities || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const apiNearby = (coliving?.nearby_location || "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

    const handleBookingFormSubmit = async (formData) => {
    try {
      const token = Cookies.get('jwttoken');
      if (!token) {
        alert('Please login to proceed.');
        return;
      }
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      const apiData = {
        user_name: username,
        property_name: coliving.property_name,
        phone_no: formData.phoneNumber,
        adhar_number: formData.aadharCard,
      };

      const response = await axios.put(`https://townmanor.ai/api/coliving-rooms/${selectedRoom.id}`, apiData);

      if (response.data.success) {
        setIsBookingFormOpen(false);
        handlePayment(selectedRoom);
      } else {
        throw new Error(response.data.message || 'Failed to submit booking details.');
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
      alert(error.response?.data?.message || error.message || 'Failed to submit booking details.');
    }
  };

  const handlePayment = async (room) => {
    try {
      // Get JWT token and decode user data
      const token = Cookies.get('jwttoken');
      if (!token) {
        alert('Please login to proceed with payment');
        return;
      }

      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      // Fetch user details from API
      const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();
      
      // Generate a unique transaction ID
      const txnid = 'OID' + Date.now();
      
      // Store property ID and payment type in localStorage
      localStorage.setItem('propertyId', coliving.id);
      localStorage.setItem('paymentType', 'coliving');
      
      // Prepare payment details with PayU structure
      const paymentData = {
        key: 'UvTrjC', // PayU Merchant Key
        txnid: txnid,
        amount: '1.00', // For testing, amount is 1 rupee
        productinfo: 'Coliving Room Booking',
        firstname: userData.name || username || '',
        email: userData.email || '',
        phone: userData.phone || '',
        surl: `https://townmanor.ai/api/boster/payu/success`,
        furl: `https://townmanor.ai/api/boster/payu/failure`,
        udf1: room.id, // Custom field for room ID
        service_provider: 'payu_paisa'
      };

      // Call backend to get payment hash and URL
      const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

      if (!response.data || !response.data.paymentUrl || !response.data.params) {
        throw new Error('Invalid payment response received');
      }

      // Create and submit payment form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.paymentUrl;

      // Add all the PayU parameters received from backend
      Object.entries(response.data.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert(error.response?.data?.message || error.message || 
        'Failed to initiate payment. Please ensure all required information is provided and try again.');
    }
  };

  return (
    <div className="colivingPricingUniqueWrap">
      <div className="colivingPricingUniqueContainer">
        <div className="colivingPricingUniqueTitle">About This Property</div>
        <div className="colivingPricingUniqueDesc">
          {coliving?.description ||
            "Spacious and modern coliving apartment with all amenities included. Perfect for working professionals and students."}
        </div>
        <div className="colivingPricingUniqueRooms">
          {rooms.map((room) => (
            <div className="colivingPricingUniqueRoomCard" key={room.id}>
              <img
                className="colivingPricingUniqueRoomImg"
                src={room.img}
                alt={room.title}
              />
              <div className="colivingPricingUniqueRoomInfo">
                <div>
                  <div className="colivingPricingUniqueRoomTitle">
                    Room {room.id}
                  </div>
                  <div className="colivingPricingUniqueRoomDetails">
                    {room.details.map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div className="colivingPricingUniqueRoomPrice">
                    {room.price}
                  </div>
                  {room.booked && (
                    <div className="colivingPricingUniqueRoomBooked">
                      Currently occupied by {room.username} for 1 month
                      
                    </div>
                  )}
                </div>
                <div className="colivingPricingUniqueRoomActions">
                  <button
                    className="colivingPricingUniqueBookBtn"
                    disabled={!room.bookable}
                    onClick={() => {
                      setSelectedRoom(room);
                      setIsBookingFormOpen(true);
                    }}
                  >
                    Book Now
                  </button>
                  {/* <button className="colivingPricingUniqueViewBtn">
                    View Details
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="colivingPricingUniqueAmenities">
          <div className="colivingPricingUniqueAmenitiesTitle">Amenities</div>
          <div className="colivingPricingUniqueAmenitiesList">
            {apiAmenities.length > 0
              ? apiAmenities.map((a, i) => (
                  <div className="colivingPricingUniqueAmenity" key={i}>
                    <span>{a}</span>
                  </div>
                ))
              : amenities.map((a, i) => (
                  <div className="colivingPricingUniqueAmenity" key={i}>
                    {a.icon}
                    <span>{a.label}</span>
                  </div>
                ))}
          </div>
        </div>
        <div className="colivingPricingUniqueLocation">
          <div className="colivingPricingUniqueLocationTitle">Location</div>
          <div className="colivingPricingUniqueMap">
            {/* {coliving?.latitude && coliving?.longitude ? (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${coliving.latitude},${coliving.longitude}&zoom=14&size=600x180&maptype=roadmap&markers=color:blue%7Clabel:P%7C${coliving.latitude},${coliving.longitude}&key=AIzaSyA-FAKEKEY`}
                alt="Map"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=CV+Raman+Nagar,Bangalore&zoom=14&size=600x180&maptype=roadmap&markers=color:blue%7Clabel:P%7C12.9916,77.6951&key=AIzaSyA-FAKEKEY"
                alt="Map"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )} */}
            <Map results={[{ 
                  lat: parseFloat(coliving.latitude), 
                  lng: parseFloat(coliving.longitude),
                  property_name: coliving.property_name,
                  locality: coliving.address,
                  city: 'Bangalore'
                }]} /> 
          </div>
          <div className="colivingPricingUniqueNearby">
            {apiNearby.length > 0
              ? apiNearby.map((n, i) => (
                  <span
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    {n}
                  </span>
                ))
              : nearby.map((n, i) => (
                  <span
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    {n.icon}
                    {n.label}
                  </span>
                ))}
          </div>
        </div>
      </div>
      <div className="colivingPricingUniqueSidebar">
        <div className="colivingPricingUniqueSidebarTabs">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              className={`colivingPricingUniqueSidebarTab${
                idx === selectedRoomIdx ? " active" : ""
              }`}
              onClick={() => setSelectedRoomIdx(idx)}
            >
              {`Room ${idx + 1}`}
            </button>
          ))}
        </div>
        {rooms[selectedRoomIdx] && (
          <div className="colivingPricingUniqueSidebarRoomSummary">
            <div className="colivingPricingUniqueSidebarRoomTitle"> Room: {rooms[selectedRoomIdx].id}</div>
            {/* <div className="colivingPricingUniqueSidebarRoomId">Room ID: {rooms[selectedRoomIdx].id}</div> */}
            <div className="colivingPricingUniqueSidebarRoomFeatures">
              {rooms[selectedRoomIdx].details.map((d, i) => (
                <span className="colivingPricingUniqueSidebarRoomFeature" key={i}>{d}</span>
              ))}
            </div>
            <div className="colivingPricingUniqueSidebarRoomLockin">
              <span className="colivingPricingUniqueSidebarRoomLockinIcon">⏱️</span>
              6 month lock-in
            </div>
            <div className="colivingPricingUniqueSidebarRoomPrice">{rooms[selectedRoomIdx].price}</div>
            <button className="colivingPricingUniqueSidebarChatBtn" disabled={!rooms[selectedRoomIdx]?.bookable}
                    onClick={() => {
                      setSelectedRoom(rooms[selectedRoomIdx]);
                      setIsBookingFormOpen(true);
                    }}>
              <span className="colivingPricingUniqueSidebarChatIcon">💬</span> Book Now 
            </button>
            {/* <button className="colivingPricingUniqueSidebarVisitBtn">
              <span className="colivingPricingUniqueSidebarVisitIcon">📅</span> Schedule A Visit
            </button> */}
          </div>
        )}
      </div>

      {/* Payment Modal */}
            {isBookingFormOpen && selectedRoom && (
        <BookingForm
          room={selectedRoom}
          coliving={coliving}
          onFormSubmit={handleBookingFormSubmit}
          onCancel={() => setIsBookingFormOpen(false)}
        />
      )}

      {isPaymentModalOpen && selectedRoom && (
        <div className="payment-modal-overlay" onClick={() => setIsPaymentModalOpen(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h2>Payment Summary</h2>
              <button onClick={() => setIsPaymentModalOpen(false)} className="payment-modal-close">
                ×
              </button>
            </div>
            <div className="payment-modal-content">
              <div className="payment-summary">
                <div className="payment-summary-item">
                  <span>Room Type</span>
                  <span>{selectedRoom.title}</span>
                </div>
                <div className="payment-summary-item">
                  <span>Amount</span>
                  <span>₹1.00</span>
                </div>
                <div className="payment-summary-total">
                  <span>Total Amount</span>
                  <span>₹1.00</span>
                </div>
                <button
                  className="payment-proceed-btn"
                  onClick={() => handlePayment(selectedRoom)}
                >
                  Pay Now
                </button>
                <div className="payment-icons">
                  <FaCreditCard /> <FaCcVisa /> <FaCcMastercard />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColivingPricing;
