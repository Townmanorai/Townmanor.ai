import React, { useState } from "react";
import "./Listage.css";

const agents = [
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Ayush",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  // Add more data here up to 10 or more for testing
];

const owners = [
  {
    id: 1,
    profileImg: "https://via.placeholder.com/50",
    name: "Sunny",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  {
    id: 2,
    profileImg: "https://via.placeholder.com/50",
    name: "Sunny",
    phoneNumber: "9234567890",
    configuration: "2 BHK",
    price: "$100,000",
  },
  // Add more data here up to 10 or more for testing
];

function Listage() {
  const [view, setView] = useState("agent");
  const [itemsToShow, setItemsToShow] = useState(5); // Start with showing 5 items initially

  const dataToDisplay = view === "agent" ? agents : owners;

  const loadMore = () => {
    setItemsToShow((prevCount) => prevCount + 5);
  };

  const loadLess = () => {
    setItemsToShow(5); // Reset to the initial 2 items
  };

  return (
    <div className="col-list">
      <div className="col-l-head">
        <button className={`toggle-btn ${view === "owner" ? "active" : ""}`} onClick={() => setView("owner")}>
          Owner
        </button>
        <button className={`toggle-btn ${view === "agent" ? "active" : ""}`} onClick={() => setView("agent")}>
          Agent
        </button>
      </div>

      {/* Table structure */}

      <div className="col-l-table">
        <table className="table-list">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Ph. Number</th>
              <th>Configuration</th>
              <th>Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.slice(0, itemsToShow).map((person, index) => (
              <tr key={person.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={person.profileImg}
                    alt="Profile"
                    className="profile-img"
                  />
                </td>
                <td>{person.name}</td>
                <td>{person.phoneNumber}</td>
                <td>{person.configuration}</td>
                <td>{person.price}</td>
                <td>
                  <button className="view-details-btn">Show More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More / Load Less Buttons */}
      <div className="load-buttons">
        {itemsToShow < dataToDisplay.length && (
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        )}
        {itemsToShow > 5 && (
          <button className="load-less-btn" onClick={loadLess}>
            Load Less
          </button>
        )}
      </div>
    </div>
  );
}

export default Listage;
