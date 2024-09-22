import React from "react";
import "../common.css";
import "../commonsecond.css";

// Dummy JSON for category_options_52
const categoryOptions52 = [
  {
    option_name: "Security",
    option_value: true,
    icon: "🔒",
  },
  {
    option_name: "Parking",
    option_value: true,
    icon: "🚗",
  },
  {
    option_name: "Gymnasium",
    option_value: false,
    icon: "🏋️",
  },
  // Add more options as needed
];

const PropertyAmenitiesOutdoor = () => {
  return (
    <>
      {categoryOptions52.length > 0 && (
        <div className="features-dv">
          <h3>OutDoor Amenities</h3>
          <form className="form_field">
            <ul>
              {categoryOptions52.map((val, key) => (
                val.option_value && (
                  <li className="input-field" key={key}>
                    <input
                      type="checkbox"
                      name="cc"
                      id={`c52${key}`}
                      checked={val.option_value}
                      readOnly
                    />
                    <label htmlFor={`c52${key}`}>
                      <span></span>
                      <small>{val.option_name} {val.icon}</small>
                    </label>
                  </li>
                )
              ))}
            </ul>
          </form>
        </div>
      )}
    </>
  );
};

export default PropertyAmenitiesOutdoor;
