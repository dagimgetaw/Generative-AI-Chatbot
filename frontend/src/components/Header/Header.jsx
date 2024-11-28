import { FaMoon, FaSun } from "react-icons/fa";
// import profile from "../../../public/assets/profile.png";
import "./Header.css";

// eslint-disable-next-line react/prop-types
const Header = ({ color, setColor }) => {
  const handleClick = () => {
    setColor(!color);
  };

  return (
    <div className={color ? "header dark_theme" : "header light_theme"}>
      <h2 className="header_title">ሚጡ GPT-12</h2>
      <div className="header_links">
        {color ? (
          <FaSun className="icon" onClick={handleClick} />
        ) : (
          <FaMoon className="icon" onClick={handleClick} />
        )}
        {/* <img src={profile} alt="profile picture" width={35} height={35} /> */}
        <button className="join">
          <a href="#">Join</a>
        </button>
      </div>
    </div>
  );
};

export default Header;
