import React, { useState } from "react";

import "../common.css";
import "../commonsecond.css";


// Dummy data to simulate favorite status
const estateData = {
  estate_data_id: 1,
  isFavorite: false, // Assume the initial favorite status
};

const FavListingPreviewActions = () => {
  const [favoriteAdded, setFavoriteAdded] = useState(estateData.isFavorite);

  // Toggle favorite status
  const addToFavorites = (e) => {
    e.preventDefault();
    setFavoriteAdded(true);
  };

  const removeFromFavorites = (e) => {
    e.preventDefault();
    setFavoriteAdded(false);
  };

  return (
    <div className="listing_preview_actions">
      <div className="fav">
        <a
          href="#"
          id="add_to_favorites"
          className="btn2"
          style={{ display: favoriteAdded ? "none" : "inline-block" }}
          onClick={addToFavorites}
        >
          <i className="la la-star-o"></i> Add to favorites
        </a>
        <a
          href="#"
          id="remove_from_favorites"
          className="btn2"
          style={{ display: favoriteAdded ? "inline-block" : "none" }}
          onClick={removeFromFavorites}
        >
          <i className="la la-star"></i> Remove from favorites
        </a>
      </div>
      <div className="rep">
        {/* Placeholder for custom property report widget */}
        {/* <p>Property report widget will go here.</p> */}
      </div>
    </div>
  );
};

export default FavListingPreviewActions;
