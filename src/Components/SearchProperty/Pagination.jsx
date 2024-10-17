import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
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
        {currentPage > 1 && (
          <li>
            <a href="#" onClick={() => handlePageClick(currentPage - 1)}>&lt;</a>
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <li>
            <a href="#" onClick={() => handlePageClick(currentPage + 1)}>&gt;</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
