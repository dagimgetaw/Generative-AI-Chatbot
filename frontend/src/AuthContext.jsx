import { createContext, useState, useContext } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide authentication data
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // Store the username

  // Login function to set user as authenticated and store username
  const login = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  // Logout function to clear authentication data
  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
