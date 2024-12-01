import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not_found_container">
      <h1 className="error_title">404</h1>
      <p className="error_message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to={"/"} className="home_link">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
