import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../../store/authSlice";
import "../login/login.css";

export default function Register() {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
      });
      if (res.ok) {
        const json = await res.json()
        dispatch(authAction.login(json.token));
        localStorage.setItem("token", json.token);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="login">
      <div className="form-container">
        <h2 className="registerTitle">Register</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            required
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                username: e.target.value,
              })
            }
          />
          <label>Email</label>
          <input
            required
            className="registerInput"
            type="text"
            placeholder="Enter your email..."
            onChange={(e) =>
              setRegisterDetails({ ...registerDetails, email: e.target.value })
            }
          />
          <label>Password</label>
          <input
            required
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                password: e.target.value,
              })
            }
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>

        <Link to="/login" className="loginRegisterButton link">
          Login
        </Link>

        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong
          </span>
        )}
      </div>
    </div>
  );
}
