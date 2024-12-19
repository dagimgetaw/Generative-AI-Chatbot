import { Link, useNavigate } from "react-router-dom";
import "./Join.css";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email format is not correct.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Submit data to the backend
    axios
      .post("http://localhost:3001/signup", {
        username,
        email,
        password,
      })
      .then((result) => {
        if (result.data === "success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data || "An error occurred during signup.");
      });
  };

  const toggleShowPass1 = () => setShowPassword1((prev) => !prev);
  const toggleShowPass2 = () => setShowPassword2((prev) => !prev);

  return (
    <div className="join_container">
      <div className="join_left">
        <h2>Welcome Back</h2>
        <Link to="/login" className="join_link">
          <button className="join_button">Login</button>
        </Link>
      </div>
      <div className="join_right">
        <h2>Signup Form</h2>
        <form className="join_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            // type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password_container">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle_password"
              onClick={toggleShowPass1}
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password_container">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Repeat Password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle_password"
              onClick={toggleShowPass2}
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="join_submit">
            Sign Up
          </button>
          {error && <p className="error_text">{error}</p>}
          <p className="form_text">
            Already a member?{" "}
            <Link to="/login" className="join_link">
              <span> Login now</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
