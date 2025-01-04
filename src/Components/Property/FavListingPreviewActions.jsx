import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const FavListingPreviewActions = ({ propertyId }) => {
  const [favoriteAdded, setFavoriteAdded] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      const token = Cookies.get("jwttoken");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUsername(decodedToken.username);

          const response = await axios.get(
            `https://www.townmanor.ai/api/api/favorites/${decodedToken.username}`
          );

          const favoriteProperties = response.data.map((fav) =>
            String(fav.property_id)
          );
          setFavoriteAdded(favoriteProperties.includes(String(propertyId)));
        } catch (error) {
          console.error("Error checking user or favorites:", error.response?.data || error.message);
        }
      } else {
        console.log("Token not found. Redirecting to login.");
        // window.location.href = "https://www.townmanor.ai/auth";
      }
    };

    checkUserLogin();
  }, [propertyId]);

  const addToFavorites = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username) {
      window.location.href = "https://www.townmanor.ai/auth";
      return;
    }

    try {
      const response = await axios.post(
        "https://www.townmanor.ai/api/api/favorites",
        {
          username,
          property_id: propertyId,
        }
      );
      if (response.status === 201) {
        setFavoriteAdded(true);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username) {
      window.location.href = "https://www.townmanor.ai/auth";
      return;
    }

    try {
      const response = await axios.delete(
        "https://www.townmanor.ai/api/api/favorites",
        {
          data: { username, property_id: propertyId },
        }
      );
      if (response.status === 200) {
        setFavoriteAdded(false);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="listing_preview_actions">
      <div className="fav">
        <button
          id="add_to_favorites"
          className="btn2"
          style={{ display: favoriteAdded ? "none" : "inline-block" }}
          onClick={addToFavorites}
          disabled={isLoading || favoriteAdded}
        >
          {isLoading ? "Adding..." : <><i className="la la-star-o"></i> Add to favorites</>}
        </button>

        <button
          id="remove_from_favorites"
          className="btn2"
          style={{ display: favoriteAdded ? "inline-block" : "none" }}
          onClick={removeFromFavorites}
          disabled={isLoading || !favoriteAdded}
        >
          {isLoading ? "Removing..." : <><i className="la la-star"></i> Remove from favorites</>}
        </button>
      </div>
    </div>
  );
};

export default FavListingPreviewActions;







// import React, { useState } from "react";

// import "../common.css";
// import "../commonsecond.css";


// // Dummy data to simulate favorite status
// const estateData = {
//   estate_data_id: 1,
//   isFavorite: false, // Assume the initial favorite status
// };

// const FavListingPreviewActions = () => {
//   const [favoriteAdded, setFavoriteAdded] = useState(estateData.isFavorite);

//   // Toggle favorite status
//   const addToFavorites = (e) => {
//     e.preventDefault();
//     setFavoriteAdded(true);
//   };

//   const removeFromFavorites = (e) => {
//     e.preventDefault();
//     setFavoriteAdded(false);
//   };

//   return (
//     <div className="listing_preview_actions">
//       <div className="fav">
//         <a
//           href="#"
//           id="add_to_favorites"
//           className="btn2"
//           style={{ display: favoriteAdded ? "none" : "inline-block" }}
//           onClick={addToFavorites}
//         >
//           <i className="la la-star-o"></i> Add to favorites
//         </a>
//         <a
//           href="#"
//           id="remove_from_favorites"
//           className="btn2"
//           style={{ display: favoriteAdded ? "inline-block" : "none" }}
//           onClick={removeFromFavorites}
//         >
//           <i className="la la-star"></i> Remove from favorites
//         </a>
//       </div>
//       <div className="rep">
//         {/* Placeholder for custom property report widget */}
//         {/* <p>Property report widget will go here.</p> */}
//       </div>
//     </div>
//   );
// };

// export default FavListingPreviewActions;
