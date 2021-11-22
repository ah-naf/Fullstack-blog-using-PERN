import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../../store/authSlice";
import "./login.css";

export default function Login() {
  const dispatch = useDispatch();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetail),
      });

      if (res.ok) {
        const json = await res.json();
        dispatch(authAction.login(json.token));
        localStorage.setItem("token", json.token);
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="form-container">
        <h2>Login</h2>
        <form className="loginForm" onSubmit={submitForm}>
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email..."
            value={loginDetail.email}
            onChange={(e) =>
              setLoginDetail({ ...loginDetail, email: e.target.value })
            }
            required
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginDetail.password}
            onChange={(e) =>
              setLoginDetail({ ...loginDetail, password: e.target.value })
            }
            required
          />
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <Link to="/register" className="loginRegisterButton link">
          Register
        </Link>
      </div>
    </div>
  );
}
