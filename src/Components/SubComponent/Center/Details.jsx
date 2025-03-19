// Details.jsx
import React from "react";
import "./Details.css";
import CenterDetails from "./Overview/CenterDetails";
import ContactForm from "./Overview/ContactForm";
import InhouseOwner from "./Inhouseservices/InhouseOwner"
import Amenities from "./Amenities/Amenities";
import Brochure from "./Brochure/Brochure";
import Distance from "./Distance/Distance";
import Floorplan from "./Floorplan/Floorplan";
import Propnav from "./Propnav/Propnav";
import Empty from "./Empty/Empty";
import Description from "./Description/Description";
import WriteReview from "./WriteReview/writereview";

// const property = {
//   "id": 1,
//   "city": "Chennai",
//   "locality": "Adyar",
//   "property_name": "Sunrise Apartments",
//   "address": "12 Sunrise Street",
//   "configuration": "3BHK",
//   "area_detail": "1400 sqft",
//   "area_type": "Carpet",
//   "bathroom": 3,
//   "balcony": 2,
//   "description": "Spacious apartment with sea view",
//   "furnish_type": "Semi-Furnished",
//   "rera_id": "RERA7890",
//   "floor_no": 7,
//   "total_floor": 15,
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
//   "amenities": ["Cable TV","Internet","Court","Dishwasher","Heating","Gymnasium","Microwave","Lift","CCTV","Intercom ","Security","Parking","Park/Garden","Pool",],
//   "metro": "1km",
//   "school": "500m",
//   "hospital": "2km",
//   "mall": "1.5km",
//   "restaurant": "200m",
//   "bus": "300m",
//   "cinema": "400m",
//   "country": "India",
//   "image_repository": ["./image1.jpg", "./image2.jpg", "./image3.jpg"],
//   "lat": null,
//   "lng": null,
//   "projectDetails": "A luxury development offering sea views and high-end amenities."
// };

function Details({property}) {

  return (
    <>
      <div className="container-detail">
        <Propnav />
      </div>
      <div className="center-detail">
        <div className="property-container">
          <div className="details-box">
            <CenterDetails property={property}/>
            <InhouseOwner />
            <Empty />
           
            <Amenities property={property}/>
            <Description property={property}/>
            <Distance property={property}/>
            <Floorplan property={property}/>
            <WriteReview property={property}/>
          </div>

          <div className="contact">
            <ContactForm />
            <Brochure property={property} /> 
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
