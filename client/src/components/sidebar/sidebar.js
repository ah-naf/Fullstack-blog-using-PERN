import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const user = useSelector(state => state.auth.user)
  const [cat,setCats] = useState([])


  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={user.profile_pic}
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          odit at quo similique neque nostrum accusantium aspernatur, libero
          iure in?
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((c, index) => {
            <Link key={index} to={`/?cat=${c.name}`}>
            <li className="sidebarListItem" >{c.name}</li></Link>
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
