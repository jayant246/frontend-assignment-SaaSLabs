// LIB IMPORTS
import PropTypes from "prop-types";

// CSS IMPORT
import "./index.css";

const ShimmerTable = ({ count, tableKeys }) => {
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

  return (
    <div className="shimmer-container">
      <table className="shimmer-table">
        {renderHeader()}
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
  tableKeys: PropTypes.object,
};
