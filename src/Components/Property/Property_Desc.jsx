import React, { useState } from "react";

import "../common.css";
import "../commonsecond.css";

// Dummy data
const estateData = {
  option_17: "This is a long description for the property. It provides details about the property, its features, and the surrounding areas. The description can be very detailed and might exceed the limit of 300 characters, at which point a 'Read More' button is shown to reveal the full content. The first 300 characters will be shown initially, and the rest will be revealed when the user clicks the 'Read More' button. This is an effective way to keep the UI clean while allowing users to access all the information they need if they're interested."
};

const Property_Desc = ({ description = estateData.option_17 }) => {
  // Ensure description is a valid string
  if (!description) {
    return <p>No description available.</p>;
  }

  const readMore = description.length > 300;
  const shortDescription = readMore ? description.substring(0, 300) + "..." : description;

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="descp-text">
      <h3>Description</h3>
      <div id="textHide" className={showFullText ? "hidden" : ""}>
        {shortDescription}
      </div>
      <div id="text" className={showFullText ? "visible" : "hidden"}>
        {description}
      </div>
      <br />
      {readMore && (
        <div className="btn-container">
          <button
            id="toggle"
            className="btn-default submit btn-spc float-left"
            onClick={toggleText}
          >
            {showFullText ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Property_Desc;
