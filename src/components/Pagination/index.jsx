// LIB IMPORTS
import React from "react";
import PropTypes from "prop-types";

// CSS IMPORT
import "./index.css";

const Pagination = (props) => {
  const { postsPerPage, totalProjects, currentPage, handlePagination } = props;

  const totalPages = Math.ceil(totalProjects / postsPerPage);

  const handlePrevClick = () => handlePagination(currentPage - 1);

  const handleNextClick = () => handlePagination(currentPage + 1);

  const getPage = (pageNumber) => {
    return (
      <button
        className={`${currentPage === pageNumber ? "active" : ""} pagination-button`}
        onClick={() => handlePagination(pageNumber)}
        key={pageNumber}
      >
        {pageNumber}
      </button>
    );
  };

  const getPages = () => {
    let start = 1,
      end = totalPages,
      ifDots = false,
      startLi = null;

    if (totalPages > 5) {
      if (currentPage >= 5) {
        const newEnd = currentPage + 2; // Adjust end range dynamically (2 pages after current)
        start = currentPage - 2; // Adjust start range dynamically (2 pages before current)
        ifDots = true;

        if (newEnd <= totalPages) {
          end = newEnd;
        } else {
          end = totalPages;
          start = currentPage - (4 - (totalPages - currentPage));
        }

        // Ensure start does not go below 1
        if (start < 1) {
          start = 1;
        }
      } else {
        end = 5; // Show pages 1-5 initially
      }
    }

    if (ifDots) {
      startLi = getPage(1); // Add the first page
    }

    const paginationNumbers = [];
    for (let i = start; i <= end; i++) {
      paginationNumbers.push(getPage(i));
    }

    return (
      <div>
        {startLi && (
          <>
            {startLi}
            <span>...</span>
          </>
        )}
        {paginationNumbers}
      </div>
    );
  };

  const renderPrevButton = () => {
    const isPrevButtonDisabled = currentPage === 1;

    return (
      <button
        onClick={isPrevButtonDisabled ? null : handlePrevClick}
        disabled={isPrevButtonDisabled}
        className={`pagination-button ${isPrevButtonDisabled ? "disabled" : ""}`}
      >
        Prev
      </button>
    );
  };

  const renderNextButton = () => {
    const isNextButtonDisabled = currentPage === totalPages;

    return (
      <button
        onClick={isNextButtonDisabled ? null : handleNextClick}
        disabled={isNextButtonDisabled}
        className={`pagination-button ${isNextButtonDisabled ? "disabled" : ""}`}
      >
        Next
      </button>
    );
  };

  return (
    <div className="pagination-container">
      {renderPrevButton()}
      {getPages()}
      {renderNextButton()}
    </div>
  );
};
export default React.memo(Pagination);

Pagination.propTypes = {
  postsPerPage: PropTypes.number,
  totalProjects: PropTypes.number,
  currentPage: PropTypes.number,
  handlePagination: PropTypes.func,
};
