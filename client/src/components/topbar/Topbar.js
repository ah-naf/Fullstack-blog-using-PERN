import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Topbar.css";

export default function Topbar() {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.auth.user)

  const logout = e => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">
            <a href="https://github.com/ah-naf" className='link'>CONTACT</a>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {loggedIn && <li className="topListItem" onClick={logout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {loggedIn ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.profile_pic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}