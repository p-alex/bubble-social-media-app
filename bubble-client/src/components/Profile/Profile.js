import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { getPosts } from "../../actions/posts";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const history = useHistory();
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    dispatch(getPosts());
    if (posts) {
      const newArray = [];
      posts.map((post) => {
        if (post.user.name === user.name) {
          newArray.push(post.images);
        }
        return null;
      });
      setUserPosts(newArray);
    }
  }, []);
  return (
    <>
      {userPosts ? (
        <div>
          Profile
          <p>{user.name}</p>
          <img src={user.imageUrl} alt={user.name}></img>
          <p>{user.email}</p>
          <div className="imageContainer">
            {userPosts.map((img, id) => {
              return <img src={img} alt={id} key={id} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
