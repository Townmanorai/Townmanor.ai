import React from "react";
import "./Subdetails.css";

const Subdetails = ({ property }) => {
  // Parse amenities if it's a string
  const amenities = typeof property.amenities === "string"? JSON.parse(property.amenities): property.amenities;

  // Ensure bathroom, balcony, floor_no, and total_floor are numbers
  const bathroom = parseInt(property.bathroom);
  const balcony = parseInt(property.balcony);
  const floor_no = parseInt(property.floor_no) ;
  const total_floor = parseInt(property.total_floor);

  // Array of subdetail items for both the upper and lower sections
  const upperDetails = [
    { label: "Bedroom", value: property.bedroom || (property.configuration ? property.configuration.match(/\d+/)?.[0] : "NA") || "NA" },
    // { label: "Bathroom", value: property.bathroom || "NA" },
    { label: "Rera Id", value: property.rera_id || "NA" },
    { label: "Ownership", value: property.ownership || "NA" },
    { label: "Configuration", value: property.configuration || "NA" },
  ];

  const lowerDetails = [
    { label: "Furnishing", value: property.furnish_type || "NA" },
    { label: "Status", value: property.construction_status || "NA" },
    // { label: "Facing", value: property.property_facing || "NA" },
    { label: "Area (sq.ft)", value: property.area_detail || "NA" },
    {
      label: "Floor No",
      value: `${property.floor_no}` || "NA",
    },
    { label: "Project", value: property.property_name || "NA" },
  ];

  return (
    <>
      <div className="subitem-div">
        {/* Upper Section */}
        <div className="upper">
          <div className="upper-div">
            {upperDetails.map((detail, index) => (
              <div className="subdetail-item" key={index}>
                <span className={`item${detail.label}`}>{detail.label}:</span>
                <div>
                  <strong>{detail.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Section */}
        <div className="lower">
          <div className="lower-div">
            {lowerDetails.map((detail, index) => (
              <div className="subdetail-item" key={index}>
                <span>{detail.label}:</span>
                <div>
                  <strong>{detail.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subdetails;
