// LIB IMPORTS
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

// COMPONENTS IMPORT
import Pagination from "../Pagination";
import ShimmerTable from "../Shimmer";

// CONSTANTS IMPORT
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../Pagination/constants";
import { FETCH_TIMEOUT, PROJECTS_URL } from "../../constant";

// CSS IMPORT
import "./index.css";
import Error from "../Error";

const Table = ({ tableKeys }) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [fetchingState, setFetchingState] = useState({ isLoading: true, isError: false });

  useEffect(() => {
    try {
      const fetchProjects = async () => {
        const res = await fetch(PROJECTS_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT) });
        const data = await res.json();
        setProjects(data);
        setFetchingState({ isLoading: false, isError: false });
      };

      fetchProjects();
    } catch (e) {
      setFetchingState({ isLoading: false, isError: e });
    }
  }, []);

  const handlePagination = useCallback(
    (pageNumber) => {
      if (pageNumber === currentPage) return;
      setCurrentPage(pageNumber);
    },
    [currentPage]
  );

  if (fetchingState.isLoading) {
    return <ShimmerTable count={DEFAULT_PAGE_SIZE} tableKeys={tableKeys} />;
  }

  if (fetchingState.isError) return <Error />;

  const renderProjects = (postsPerPage = 5) => {
    const startSlice = (currentPage - 1) * postsPerPage;
    const endSlice = currentPage * postsPerPage + 1;
    const projectsToRender = projects.slice(startSlice, endSlice);

    return projectsToRender.map((project, idx) => {
      const evenOddClass = idx % 2 === 0 ? "even" : "odd";

      const rowValueKeys = Object.keys(tableKeys);
      return (
        <tr key={`${idx}-head`} className={evenOddClass}>
          {rowValueKeys.map((key) => (
            <td key={key}>{project[tableKeys[key]]}</td>
          ))}
        </tr>
      );
    });
  };

  const renderHeader = () => {
    const headerKeys = Object.keys(tableKeys);
    return (
      <thead>
        <tr>
          {headerKeys.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTable = () => {
    return (
      <table className="styled-table">
        {renderHeader()}
        <tbody>{renderProjects(DEFAULT_PAGE_SIZE)}</tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTable()}
      <Pagination
        totalProjects={projects.length}
        postsPerPage={DEFAULT_PAGE_SIZE}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;

Table.propTypes = {
  tableKeys: PropTypes.obj,
};
