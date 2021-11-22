
import Posts from "../../components/posts/posts";
import "./Home.css";
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react";
import {authAction} from '../../store/authSlice'
import { useLocation } from "react-router";

export default function Home() {
  const posts = useSelector(state => state.auth.allBlogs)
  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(() => {
    dispatch(authAction.login(localStorage.getItem("token")));
    const getData = async () => {
      try {
        let url;
        if(location.search) {
          url = "/api/posts/" + location.search
        } else {
          url = "/api/posts"
        }
        const res = await fetch(url, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        if (res.ok) {
          const json = await res.json();
          dispatch(authAction.setBlog(json));
        } else {
          localStorage.removeItem('token')
          dispatch(authAction.login(null))
        }
      } catch (error) {
        console.log(error);
      }
    };

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

    getData();
    getUser();
  }, [dispatch, location.search]);

  return (
    <>
      {/* <Header /> */}
      <div className="home">
          <Posts posts={posts} />
      </div>
    </>
  );
}
