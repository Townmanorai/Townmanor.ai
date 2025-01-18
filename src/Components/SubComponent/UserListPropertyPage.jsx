// import React from "react";
// import Prices from "./Imprices/Prices";
// import Subdetails from "./Subdetails/Subdetails";
// import Details from "./Center/Details";

// const property = {
//   "id": 1,
//   "username": "sunny",
//   "city": "Chennai",
//   "locality": "Adyar",
//   "property_name": "Sunrise Apartments",
//   "address": "12 Sunrise Street",
//   "configuration": "3BHK",
//   "area_detail": "1400 sqft",
//   "area_type": "Carpet",
//   "bathroom": "3",
//   "balcony": "2",
//   "description": "Spacious apartment with sea view",
//   "furnish_type": "Semi-Furnished",
//   "rera_id": "RERA7890",
//   "floor_no": "7",
//   "total_floor": "15",
//   "construction_status": "Ready to Move",
//   "property_date": "2024-08-22T18:30:00.000Z",
//   "property_facing": "North",
//   "price": 18000000,
//   "maintenance_charge": 6000,
//   "token_amount": 80000,
//   "length": 70,
//   "width": 55,
//   "monthly_rent": 55000,
//   "security_deposit": 165000,
//   "current_lease": "John Doe",
//   "remaining_time": "3 years",
//   "boundary_wall": 1,
//   "no_of_open_side": 2,
//   "floor_allowed": 8,
//   "modify_interior": 1,
//   "lock_in_period": "1 year",
//   "pricerange": "1.8-2 Cr",
//   "money_type": "INR",
//   "amenities": "[\"Gym\", \"Club House\",\"Gym\", \"Club House\"]",
//   "metro": "1km",
//   "school": "500m",
//   "hospital": "2km",
//   "mall": "1.5km",
//   "restaurant": "200m",
//   "bus": "300m",
//   "cinema": "400m",
//   "country": "India",
//   "image_repository": "./image1.jpg,./image1.jpg, ./image1.jpg, ./image1.jpg",
//   "floorplan_repository": "./isle1.png,./isle1.png, ./isle1.png, ./isle1.png",
//   "lat": "28.510228",
//   "lng": "77.417115",
//   "one_image_location": "./image1.jpg",
//   "pincode": "121121",
//   "property_for": null,
//   "category": null,
//   "residential": null,
//   "floorplan": null,
//   "Commercail": null,
//   "leased": null,
//   "purpose": "sale",
//   "FeaturedAgentsId": "[\"1\", \"2\", \"22\", \"38\"]",
//   "AgentsOnSpotlightId": "[\"1\"]",
//   "Listed_By": "Agent",
//   "type": "agent",
//   "updated_on": null,
//   "created_on": null,
//   "deleted_on": null,
//   "status": 1
// };

// const UserListPropertyPage = () => {
//   return (
//     <>
//       <div >
//         .
//       </div>

//       <div className="owner-main">
//         <Prices property={property}/>
//         <Subdetails property={property}/>
//         <Details property={property}/>
//       </div>
//     </>

//   );
// };

// export default UserListPropertyPage;


import React, { useEffect, useState } from "react";
import Prices from "./Imprices/Prices";
import Subdetails from "./Subdetails/Subdetails";
import Details from "./Center/Details";
import { useParams } from "react-router-dom"; // Import useParams to get the `id` from the URL
import Navbar from "../NavFooter/Navbar";
import "./UserListPropertyPage.css"
import axios from "axios";

const UserListPropertyPage = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property details from the API when the component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/owner-property/${id}`);
        console.log(response)
        // if (!response.ok) {
        //   throw new Error('Property not found');
        // }
       
        setProperty(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // Re-fetch if `id` changes

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if something goes wrong
  }

  if (!property) {
    return <div>Property not found</div>; // Show this if no property is fetched
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="owner-main" >
        <Prices property={property} />
        <Subdetails property={property} />
        <Details property={property} />
      </div>
    </>
  );
};

export default UserListPropertyPage;
