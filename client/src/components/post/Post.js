import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ post,index }) {
  const random = Math.floor(Math.random() * 10) % 2
  console.log(random)
  return (
    <div className={`post ${random ? 'bati': 'lomba'}`}>
      {post.photo && <img className="postImg" src={post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, index) => {
            return (
              <span className="postCat" key={index}>
                {c.name}
              </span>
            );
          })}
        </div>
        <span className="postDate">
          {new Date(post.createdat).toDateString()}
        </span>
        <Link to={`/post/${post.id}`} className='link'>
          <span className="postTitle">{post.post_title}</span>
        </Link>
      </div>
      {/* <p className="postDesc">{post.post_desc}</p> */}
    </div>
  );
}
