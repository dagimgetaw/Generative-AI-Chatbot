import { Link, useNavigate } from "react-router-dom";
import "./Join.css";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", { username, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const toggleShowPass = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="join_container">
      {/* Left Section */}
      <div className="join_left">
        <h2>Welcome Back</h2>
        <Link to="/login" className="join_link">
          <button className="join_button">Login</button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="join_right">
        <h2>Signup Form</h2>
        <form className="join_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password_container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle_password"
              onClick={toggleShowPass}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="google_login">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <button type="submit" className="join_submit">
            Sign Up
          </button>
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
