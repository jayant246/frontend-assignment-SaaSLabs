import { ERROR_MSG } from "../../constant";
import "./index.css";

const Error = () => {
  const handleRefresh = () => {
    // Reload the page when the user clicks the refresh button
    window.location.reload();
  };

  return (
    <div className="error-container">
      <p>{ERROR_MSG.HEADING}</p>
      <button onClick={handleRefresh}>{ERROR_MSG.CTA}</button>
    </div>
  );
};

export default Error;
