import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../AuthContext";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

// eslint-disable-next-line react/prop-types
const Header = ({ color, setColor, sidebarVisible }) => {
  const { isAuthenticated, logout, login, username } = useAuth();
  const navigate = useNavigate();
  const { clearChats } = useContext(Context);
  const { isSignedIn, user } = useUser(); // Access user info from Clerk

  const handleClick = () => {
    setColor(!color);
  };

  const handleLogout = () => {
    logout(); // Call logout from AuthContext (which now includes Clerk signOut)
    clearChats(); // Clear any data from your app
    navigate("/login"); // Redirect after logout
  };

  const handleSignIn = () => {
    if (user) {
      login(user.firstName || "OAuth User");
      console.log("User signed in:", user.firstName, user.emailAddress);
    }
    navigate("/");
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
          {isAuthenticated || isSignedIn ? (
            <>
              <p className="username_display">
                Welcome, <span>{username || user?.firstName || "User"}</span>
              </p>
              <Link to={"/"}>
                <button className="join" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="oauth_button">
                <SignedOut>
                  <SignInButton
                    mode="modal"
                    signUpFallbackRedirectUrl={handleSignIn}
                  >
                    <button className="oauth">Google</button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonOuter: "custom_user_button",
                      },
                    }}
                  />
                </SignedIn>
              </div>
              <Link to={"/login"} className="join_link">
                <button className="join">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
