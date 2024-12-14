import React from 'react';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Handle page click event
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Render page numbers dynamically, only showing 5 pages at a time
  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2); // Start page, ensuring it's within valid range
    let endPage = Math.min(totalPages, currentPage + 2); // End page, ensuring it's within valid range

    // Adjust if not enough pages before or after the current page
    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 5); // Show first 5 pages when at the start
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4); // Show last 5 pages when at the end
    }

    // Generate page numbers based on calculated range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <a href="#" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav aria-label="Page navigation example" className="pagination properties">
      <ul className="pagination">
        {/* Previous Button */}
        {currentPage > 1 && (
          <li>
            <a href="#" onClick={() => handlePageClick(currentPage - 1)}>&lt;</a>
          </li>
        )}

        {/* Render page numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        {currentPage < totalPages && (
          <li>
            <a href="#" onClick={() => handlePageClick(currentPage + 1)}>&gt;</a>
          </li>
        )}
      </ul>

      {/* Current Page Display */}
      {/* <div className="current-page-info">
        <p>
          You are on page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>.
        </p>
      </div> */}
    </nav>
  );
};

export default Pagination;
