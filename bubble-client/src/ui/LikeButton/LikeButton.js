import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/posts";

export default function LikeButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLike = (e, postId, googleId) => {
    e.preventDefault();
    dispatch(likePost(postId, googleId));
  };
  const handleUnlike = (e, postId, googleId) => {
    e.preventDefault();
    dispatch(unlikePost(postId, googleId));
  };
  const handleRedirect = () => {
    history.push("/auth");
  };
  return (
    <>
      {props.isLoggedIn ? (
        <>
          {props.isLiked ? (
            <div
              className="like_wrapper"
              onClick={(e) => handleUnlike(e, props.postId, props.googleId)}
              style={{ cursor: "pointer", color: "#0A369D" }}
            >
              <i className="fas fa-heart"></i>
            </div>
          ) : (
            <div
              className="like_wrapper"
              onClick={(e) => handleLike(e, props.postId, props.googleId)}
              style={{ cursor: "pointer" }}
            >
              <i className="far fa-heart"></i>
            </div>
          )}
        </>
      ) : (
        <i
          className="far fa-heart"
          onClick={handleRedirect}
          style={{ cursor: "pointer" }}
        ></i>
      )}
    </>
  );
}
