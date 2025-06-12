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
import "./colivingPricingUnique.css";
import Map from '../SearchProperty/Map';
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
              img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Placeholder image
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
        }
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
                    {room.title}
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
                      Currently occupied by {room.bookedBy} until{" "}
                      {room.bookedUntil}
                    </div>
                  )}
                </div>
                <div className="colivingPricingUniqueRoomActions">
                  <button
                    className="colivingPricingUniqueBookBtn"
                    disabled={!room.bookable}
                  >
                    Book Now
                  </button>
                  <button className="colivingPricingUniqueViewBtn">
                    View Details
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
                  lat: parseFloat(coliving.lat), 
                  lng: parseFloat(coliving.lng),
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
            <div className="colivingPricingUniqueSidebarRoomTitle">{rooms[selectedRoomIdx].title}</div>
            <div className="colivingPricingUniqueSidebarRoomId">Room ID: {rooms[selectedRoomIdx].id}</div>
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
            <button className="colivingPricingUniqueSidebarChatBtn">
              <span className="colivingPricingUniqueSidebarChatIcon">💬</span> Chat With Us
            </button>
            <button className="colivingPricingUniqueSidebarVisitBtn">
              <span className="colivingPricingUniqueSidebarVisitIcon">📅</span> Schedule A Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColivingPricing;
