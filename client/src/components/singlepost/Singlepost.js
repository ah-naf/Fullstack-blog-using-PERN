import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import "./singlepost.css";

export default function Singlepost() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [post, setPost] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const postID = location.pathname.split("/")[2];

  const postDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${postID}`, {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postID}`);
        if (res.ok) {
          const json = await res.json();
          //console.log(json);
          setPost(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postID]);

  const editDelete = () => {
    return (
      <>
        <i
          className="singlePostIcon far fa-edit"
          onClick={() => setModalShow(true)}
        ></i>
        <i className="singlePostIcon far fa-trash-alt" onClick={postDelete}></i>
      </>
    );
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        <h1 className="singlePostTitle">
          {post.post_title}
          <div className="singlePostEdit">
            {user.id === post.userid && editDelete()}
          </div>
          <EditPost
            post={post}
            postid={postID}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            <Link to={`/?user=${post.user_name}`} className="link">
              Author: <b>{post.user_name}</b>
            </Link>
          </span>
          <span className="singlePostData">
            {new Date(post.createdat).toDateString()}
          </span>
        </div>
        <p className="singlePostDesc">{post.post_desc}</p>
      </div>
    </div>
  );
}
