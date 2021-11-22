import Single from "./Pages/single/single";
import Topbar from "./components/topbar/Topbar";
import Write from "./Pages/write/Write";
import Settings from "./Pages/settings/Settings";
import Login from "./Pages/login/Login";
import Home from "./Pages/home/Home";
import Register from "./Pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAction } from "./store/authSlice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.login(localStorage.getItem("token")));

    const getUser = async () => {
      try {
        const res = await fetch("/api/users", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        if (res.ok) {
          const json = await res.json();
          dispatch(authAction.setUser(json));
        } else {
          localStorage.removeItem('token')
          dispatch(authAction.login(null))
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/write" element={isLoggedIn ? <Write /> : <Login />} />
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Login />}
        />
        <Route path="/post/:postId" element={isLoggedIn ? <Single /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
