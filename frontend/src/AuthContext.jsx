import { createContext, useState, useContext, useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react"; // useClerk and useUser are useful for accessing Clerk's auth state

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser(); // Use Clerk's hook to get the signed-in state and user info
  const [username, setUsername] = useState(""); // Store the username in context
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [showSignupPopup, setShowSignupPopup] = useState(false); // Popup visibility

  useEffect(() => {
    if (isSignedIn) {
      setUsername(user?.firstName || "User"); // Set the username from Clerk's user data
      setIsAuthenticated(true); // Update authentication status
    } else {
      setUsername(""); // Reset username when logged out
      setIsAuthenticated(false);
    }
  }, [isSignedIn, user]);

  const login = (username) => {
    setUsername(username); // Set username from manual login (MongoDB or Clerk)
    setIsAuthenticated(true); // Mark user as authenticated
    setShowSignupPopup(false);
  };

  const logout = () => {
    setUsername(""); // Reset username
    setIsAuthenticated(false); // Set authentication to false
    setShowSignupPopup(false); // Hide popup when logged out
    signOut(); // Clerk logout
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, // Use Clerk's isSignedIn for actual status
        username, // Use username set after login
        login,
        logout,
        showSignupPopup,
        setShowSignupPopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
