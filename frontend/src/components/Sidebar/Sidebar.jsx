import {
  FaCog,
  FaPhone,
  FaEnvelope,
  FaChevronRight,
  FaTimes,
  FaBars, // Hamburger icon for toggling
} from "react-icons/fa";
import "./Sidebar.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Side = ({ color, sidebarVisible, setSidebarVisible }) => {
  const { clearChats, chats } = useContext(Context);
  const { isAuthenticated } = useAuth();
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleNewChatClick = () => {
    if (isAuthenticated) {
      window.open("/", "_blank");
    } else {
      setShowSignupPopup(true);
    }
  };

  const closePopup = () => {
    setShowSignupPopup(false);
  };

  const handleClick = (id) => {
    const chatElement = document.getElementById(`chat-${id}`);
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState); // Toggle the sidebar visibility
  };

  return (
    <>
      {showSignupPopup && (
        <div className="dark_overlay" onClick={closePopup}></div>
      )}

      {sidebarVisible && (
        <aside
          className={color ? "side_menu dark_theme" : "side_menu light_theme"}
        >
          <div className="new_chat">
            <button onClick={handleNewChatClick}>New Chat</button>
          </div>
          <div className="chat_history_title">
            <h2>
              <span>Chat History</span>
            </h2>
          </div>
          <div className="chat_history_list">
            <ul>
              {chats
                .filter((chat) => chat.type === "user")
                .map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleClick(chat.id)}
                    className="chat_map"
                  >
                    <FaChevronRight />
                    <li>{chat.message.slice(0, 30)}...</li>
                  </div>
                ))}
            </ul>
          </div>
          <div className="bottom_links">
            <FaCog className="icon" />
            <FaPhone className="icon" />
            <FaEnvelope className="icon" />
          </div>
        </aside>
      )}

      <button className="sidebar_toggle_button" onClick={toggleSidebar}>
        {sidebarVisible ? <FaTimes /> : <FaBars />}{" "}
        {/* Display close or hamburger icon */}
      </button>

      {showSignupPopup && (
        <div className="signup_popup">
          <div className="popup_content">
            <FaTimes className="popup_close_icon" onClick={closePopup} />
            <h3>You need to sign up or log in to create new tab</h3>
            <button className="popup_signup">
              <Link to="/signup">Sign Up</Link>
            </button>
            <button className="popup_login">
              <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Side;
