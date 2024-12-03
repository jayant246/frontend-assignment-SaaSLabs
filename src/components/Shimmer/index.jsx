// LIB IMPORTS
import PropTypes from "prop-types";

// CSS IMPORT
import "./index.css";
import { TABLE_HEADERS } from "../../constant";

const ShimmerTable = ({ count }) => {
  return (
    <div className="shimmer-container">
      <table className="shimmer-table">
        <thead>
          <tr>
            <th>{TABLE_HEADERS.COL1}</th>
            <th>{TABLE_HEADERS.COL2}</th>
            <th>{TABLE_HEADERS.COL3}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className="shimmer-line shimmer-line-short"></div>
              </td>
              <td>
                <div className="shimmer-line shimmer-line-medium"></div>
              </td>
              <td>
                <div className="shimmer-line shimmer-line-long"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="shimmer-pagination">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="shimmer-circle"></div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerTable;

ShimmerTable.propTypes = {
  count: PropTypes.number,
};
