import React from "react";


import "../common.css";
import "../commonsecond.css";

// Dummy data to simulate PHP variables
const pageDocuments = [
  {
    url: "https://example.com/document1.pdf",
    filename: "document1.pdf",
  },
  {
    url: "https://example.com/document2.docx",
    filename: "document2.docx",
  },
];

// Helper function to get file extension
const getFileExtension = (filename) => {
  return filename.split('.').pop();
};

const Property_Documents = () => {
  return (
    <>
      {pageDocuments && pageDocuments.length > 0 && (
        <div className="descp-text">
          <h3>Documents files</h3>
          <ul className="documents_list">
            {pageDocuments.map((val, index) => (
              <li key={index}>
                <a href={val.url}>
                  {/* Check if file icon exists (simulated here with dummy check) */}
                  <img
                    src={`assets/img/icons/filetype/${getFileExtension(val.filename)}.png`}
                    alt={val.filename}
                    onError={(e) => {
                      e.target.src = "assets/img/icons/filetype/default.png"; // Fallback to default icon if file doesn't exist
                    }}
                  />
                  {val.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Property_Documents;
