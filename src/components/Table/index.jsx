// LIB IMPORTS
import { useCallback, useEffect, useState } from "react";

// COMPONENTS IMPORT
import Pagination from "../Pagination";
import ShimmerTable from "../Shimmer";

// CONSTANTS IMPORT
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../Pagination/constants";
import { FETCH_TIMEOUT, PROJECTS_URL, TABLE_HEADERS } from "../../constant";

// CSS IMPORT
import "./index.css";

const Index = () => {
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

  if (fetchingState.isLoading) return <ShimmerTable count={DEFAULT_PAGE_SIZE} />;

  const renderProjects = (postsPerPage = 5) => {
    const startSlice = (currentPage - 1) * postsPerPage;
    const endSlice = currentPage * postsPerPage + 1;
    const projectsToRender = projects.slice(startSlice, endSlice);

    return projectsToRender.map((project, idx) => {
      const evenOddClass = idx % 2 === 0 ? "even" : "odd";

      return (
        <tr key={project["s.no"]} className={evenOddClass}>
          <td>{project["s.no"]}</td>
          <td>{project["percentage.funded"]}</td>
          <td>{project["amt.pledged"]}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>{TABLE_HEADERS.COL1}</th>
            <th>{TABLE_HEADERS.COL2}</th>
            <th>{TABLE_HEADERS.COL3}</th>
          </tr>
        </thead>
        <tbody>{renderProjects(5)}</tbody>
      </table>
      <Pagination
        totalProjects={projects.length}
        postsPerPage={DEFAULT_PAGE_SIZE}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Index;
