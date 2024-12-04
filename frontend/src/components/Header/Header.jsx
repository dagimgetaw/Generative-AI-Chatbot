import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../AuthContext";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
const Header = ({ color, setColor, sidebarVisible }) => {
  const { isAuthenticated, username, logout } = useAuth(); // Access username from context
  const navigate = useNavigate();
  const { clearChats } = useContext(Context);

  const handleClick = () => {
    setColor(!color);
  };

  const handleLogout = () => {
    logout();
    clearChats();
    navigate("/login");
  };

  return (
    <div className={color ? "header dark_theme" : "header light_theme"}>
      <div className={sidebarVisible ? "full_width" : "half_width"}>
        <h2 className="header_title">ሚጡ GPT-12</h2>
        <div className="header_links">
          {color ? (
            <FaSun className="icon" onClick={handleClick} />
          ) : (
            <FaMoon className="icon" onClick={handleClick} />
          )}
          {isAuthenticated ? (
            <>
              <p className="username_display">
                Welcome, <span>{username}</span>
              </p>
              <Link to={"/"}>
                <button className="join" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <Link to={"/login"} className="join_link">
              <button className="join">Join</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
