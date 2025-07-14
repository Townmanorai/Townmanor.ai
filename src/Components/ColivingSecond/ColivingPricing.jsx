import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

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
              price: `₹${room.price?.toLocaleString() || "-"}/per night`,
              details: [
                `${room.area || "-"} sqft`,
                room.bedroom,
                room.dedicated_work_space ? "Dedicated workspace" : null,
                room.bathroom ? `Attached Bathroom` : null,
                
              ].filter(Boolean),
              booked: !!room.occupied,
              bookable: !room.occupied,
              bookedBy: room.user_name || undefined,
              bookedUntil: undefined, // Not provided by A
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
  console.log(rooms);

  const apiAmenities = (coliving?.amenities || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const apiNearby = (coliving?.nearby_location || "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);



  return (
    <div className="colivingPricingUniqueWrap">
      <div className="colivingPricingUniqueContainer">
        <div className="colivingPricingUniqueTitle">About This Property</div>
        <div className="colivingPricingUniqueDesc">
          {coliving?.description && coliving.description.length > 300 ? (
            <p>
              {isExpanded
                ? coliving.description
                : `${coliving.description.substring(0, 500)}...`}
              <button onClick={() => setIsExpanded(!isExpanded)} className="read-more-btnx">
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            </p>
          ) : (
            <p>{coliving?.description || "Spacious and modern coliving apartment with all amenities included. Perfect for working professionals and students."}</p>
          )}
        </div>
        <div className="colivingPricingUniqueRooms">
          {rooms.map((room) => (
            <div className="colivingPricingCardContainer" key={room.id}>
              <div className="colivingPricingCardImageSection">
                <img
                  className="colivingPricingCardImage"
                  src={room.img}
                  alt={room.title}
                />
                {/* {room.booked && (
                  <div className="colivingPricingCardBookedBadge">Booked</div>
                )} */}
              </div>
              <div className="colivingPricingCardDetailsSection">
                {/* <div className="colivingPricingCardHeader">
                  <span className="colivingPricingCardRoomTitle">Room {room.id}</span>
                </div> */}
                <div className="colivingPricingCardRentSection">
                  {/* <span className="colivingPricingCardRentLabel">Rent</span> */}
                  <span className="colivingPricingCardRentValue">{room.price}</span>
                  {/* <span className="colivingPricingCardRentSub">/month</span> */}
                  {/* <div className="colivingPricingCardDeposit">+Additional Deposit Initially</div> */}
                </div>
                <div className="colivingPricingCardFeatures">
                  {/* {room.details.map((k) => (
                    <div className="colivingPricingCardFeature" >{k}</div>
                  ))} */}
                    <div className="colivingPricingCardFeature" >{room.details[0]}</div>
                    <div className="colivingPricingCardFeature" >{room.details[1]}</div>
                    <div className="colivingPricingCardFeature" >{room.details[2]}</div>
                    <div className="colivingPricingCardFeature" >{coliving.state}</div>
                </div>
                {/* {room.bookedBy && (
                  <div className="colivingPricingCardOccupantSection">
                    <div className="colivingPricingCardOccupantLabel">Current Occupant</div>
                    <div className="colivingPricingCardOccupantDetails">
                      <i className="fa fa-user"></i> {room.bookedBy}
                    </div>
                  </div>
                )} */}
                <div className="colivingPricingUniqueRoomActions">
                  <button
                    className="colivingPricingUniqueBookBtn"
                    disabled={!room.bookable}
                    onClick={() => {
                      const token = Cookies.get('jwttoken');
                      if (!token) {
                        setShowLoginModal(true);
                        return;
                      }
                      navigate('/ColivingBookingPage', {
                        state: {
                          room: room,
                          coliving: coliving
                        }
                      });
                    }}
                  >
                    Booking Request
                  </button>
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
        {/* <div className="colivingPricingUniqueSidebarTabs">
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
        </div> */}
        {rooms[selectedRoomIdx] && (
          <div className="colivingPricingUniqueSidebarRoomSummary">
            {/* <div className="colivingPricingUniqueSidebarRoomTitle"> Room: {rooms[selectedRoomIdx].id}</div> */}
            {/* <div className="colivingPricingUniqueSidebarRoomId">Room ID: {rooms[selectedRoomIdx].id}</div> */}
            <div className="colivingPricingUniqueSidebarRoomFeatures">
              {rooms[selectedRoomIdx].details.map((d, i) => (
                <span className="colivingPricingUniqueSidebarRoomFeature" key={i}>{d}</span>
              ))}
            </div>
            {/* <div className="colivingPricingUniqueSidebarRoomLockin">
              <span className="colivingPricingUniqueSidebarRoomLockinIcon">⏱️</span>
              6 month lock-in
            </div> */}
            <div className="colivingPricingUniqueSidebarRoomPrice">{rooms[selectedRoomIdx].price}</div>
            <button
  className="colivingPricingUniqueSidebarChatBtn"
  disabled={!rooms[selectedRoomIdx]?.bookable}
  onClick={() => {
    const token = Cookies.get('jwttoken');
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    navigate('/ColivingBookingPage', {
      state: {
        room: rooms[selectedRoomIdx],
        coliving: coliving
      }
    });
  }}
>
  <span className="colivingPricingUniqueSidebarChatIcon">💬</span>
  {rooms[selectedRoomIdx]?.bookable ? 'Booking Request' : 'Not Available'}
</button>


            {/* Login Modal */}
            {showLoginModal && (
              <div className="login-modal-overlay" style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div className="login-modal-content" style={{
                  background: 'white', padding: 32, borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.2)', minWidth: 320, textAlign: 'center', position: 'relative'
                }}>
                  <h3 style={{marginBottom: 16}}>Please Login</h3>
                  <p style={{marginBottom: 24}}>Please login first in order to book a room.</p>
                  <button style={{marginRight: 12}} className="btn btn-primary" onClick={() => { window.location.href = '/auth'; }}>Login</button>
                  <button className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>Close</button>
                </div>
              </div>
            )}

            {/* <button className="colivingPricingUniqueSidebarVisitBtn">
              <span className="colivingPricingUniqueSidebarVisitIcon">📅</span> Schedule A Visit
            </button> */}
          </div>
        )}
      </div>


    </div>
  );
};

export default ColivingPricing;
