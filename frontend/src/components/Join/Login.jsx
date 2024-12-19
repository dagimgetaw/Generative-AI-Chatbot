import { Link } from "react-router-dom";
import "./Join.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginResult, setLoginResult] = useState("");
  const { login } = useAuth(); // Access the login function from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password }) // POST request to backend
      .then((result) => {
        if (result.data === "success") {
          setLoginResult(""); // Clear any previous error
          login(username); // Pass username to AuthContext after successful login
          navigate("/"); // Redirect on success
        } else {
          setLoginResult(result.data); // Show message on failure
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginResult("Login failed. Please try again.");
      });
  };

  const toggleShowPass = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <div className="join_container">
      {/* Left Section */}
      <div className="join_left">
        <h2>Register Now</h2>
        <Link to="/signup" className="join_link">
          <button className="join_button">Signup</button>
        </Link>
      </div>
      {/* Right Section */}
      <div className="join_right">
        <h2>Login Form</h2>
        <form className="join_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)} // Capture username input
          />
          <div className="password_container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)} // Capture password input
            />
            <button
              type="button"
              className="toggle_password"
              onClick={toggleShowPass}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="join_submit">
            Login
          </button>
          {/* Show login result message */}
          {loginResult && <p className="login_result">{loginResult}</p>}
          <p className="form_text">
            Not a member?{" "}
            <Link to="/signup" className="join_link">
              <span> Signup now</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
