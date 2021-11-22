import { useState } from "react";
import "./write.css";
import "../../components/singlepost/singlepost.css";

export default function Write() {
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [picUrl, setPicUrl] = useState(
    "http://desk87.com/assets/images/preview-not-available.jpg"
  );

  const handleChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("image", files[0]);
    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        setPicUrl(json);
        //window.location.href = '/write'
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      title: e.target[1].value,
      categories: e.target[2].value.split(","),
      desc: e.target[3].value,
      picture: picUrl,
    };
    setFormdata(value);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      {!loading && <img src={picUrl} alt="" className="writeImg" />}
      {loading && (
        <div className="loading-wrapper-container">
          <div className="loading-container">
            <p>Uploading...</p>
            <div className="loading"></div>
          </div>
        </div>
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput" onChange={handleChange}>
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            name="image"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Categories (Separate categories by ,)..."
            className="writeInput"
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
          ></textarea>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div>
  );
}
