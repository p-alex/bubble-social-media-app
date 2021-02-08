import React, { useEffect } from "react";
import "./Discover.scss";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import moment from "moment";
import DeleteButton from "../../ui/DeleteButton/DeleteButton";
import LikeButton from "../../ui/LikeButton/LikeButton";
export default function Discover() {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div>
      <h1>Discover</h1>
      <div className="postsWrapper">
        {posts.length ? (
          posts.map((post) => {
            return (
              <div className="postBox" key={post._id}>
                <div className="postBox_userAndDate">
                  <div className="postBox_user">
                    <img src={post.user.imageUrl} alt={post.user.name} />
                    <div className="postBox_userWrapper">
                      <p>{post.user.name}</p>
                      <small>{moment(post.date).fromNow()}</small>
                    </div>
                  </div>
                </div>
                <Link to={`/posts/${post._id}`}>
                  <div className="postBox_images">
                    {post.images.map((img, id) => {
                      return <img key={id} src={img} alt={post.user.name} />;
                    })}
                  </div>
                </Link>
                <div className="postBox_likesAndComments">
                  <div className="postBox_likes">
                    {user ? (
                      <LikeButton
                        isLiked={post.likes.includes(user.googleId)}
                        postId={post._id}
                        googleId={user.googleId}
                        isLoggedIn={true}
                      />
                    ) : (
                      <LikeButton
                        isLiked={post.likes.includes(user.googleId)}
                        postId={post._id}
                        googleId={user.googleId}
                        isLoggedIn={false}
                      />
                    )}
                    <p>{post.likes.length}</p>
                  </div>
                  <div className="postBox_comments">
                    <i className="far fa-comment"></i>
                    <p>{post.comments.length}</p>
                  </div>
                </div>

                {user.name === post.user.name ? (
                  <DeleteButton id={post._id} reload="reload" />
                ) : null}
              </div>
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
