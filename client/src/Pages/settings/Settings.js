import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/sidebar";
import "./settings.css";

export default function Settings() {
  const user = useSelector(state => state.auth.user)

  const uploadImage = async (data) => {
    const url = {url : data}
    const res = await fetch('/api/upload/setpicture', {
      method: "POST",
      headers: {
        'token': localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(url)
    })
    if(res.ok) {
      window.location.href = '/settings'
    }
  }

  const deleteAccount = async e => {
    try {
      console.log(user.id)
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      if(res.ok) {
        localStorage.removeItem('token')
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fileChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    formData.append("image", files[0]);

    try {
        const res = await fetch('/api/upload', {
          method: "POST",
          headers: {
            'token': localStorage.getItem('token')
          },
          body: formData
        })
        if(res.ok) {
          const json = await res.json()
          uploadImage(json)
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={deleteAccount}>Delete Your Account</span>
        </div>
        <form className="settingsForm">
          <label htmlFor="">Profile Picture</label>
          <div className="settingsPP">
            <img
              src={user.profile_pic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              name="image"
              id="fileInput"
              onChange={fileChange}
            />
          </div>
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Ahnaf" />
          <label htmlFor="">Email</label>
          <input type="email" placeholder="ahnaf@test.com" />
          <label htmlFor="">Password</label>
          <input type="password" />
          <button className="settingsSubmit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
