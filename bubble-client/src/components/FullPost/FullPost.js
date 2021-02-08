import React, { useRef, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import "./FullPost.scss";
import Spinner from "../../ui/Spinner";
import LikeButton from "../../ui/LikeButton/LikeButton";
import DeleteButton from "../../ui/DeleteButton/DeleteButton";
import CommentForm from "../CommentForm/CommentForm";
import CommentBox from "../CommentBox/CommentBox";
import PopImage from "../PopImage/PopImage";
const FullPost = (props) => {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const dummy = useRef();
  const scrollUp = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const [isPopImage, setIsPopImage] = useState(false);
  const handleImagePopUp = (img) => {
    setIsPopImage(!isPopImage);
    console.log(isPopImage);
  };
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, id) => {
          if (post._id === props.id) {
            return (
              <main className="post" key={id}>
                {isPopImage ? (
                  <PopImage
                    img={post.images[0]}
                    handleImagePopUp={handleImagePopUp}
                  />
                ) : null}
                <div className="post_images">
                  {post.images.map((img, id) => {
                    return (
                      <img
                        key={id}
                        src={img}
                        alt={id}
                        onClick={handleImagePopUp}
                      />
                    );
                  })}
                </div>
                <div className="post_contentContainer">
                  <div className="post_userAndDate mb">
                    <div className="post_user">
                      <img src={post.user.imageUrl} alt="hello" />
                      <p>{post.user.name}</p>
                    </div>
                    <span>{moment(post.date).fromNow()}</span>
                  </div>
                  <div className="post_description mb">
                    <p>{post.description}</p>
                  </div>
                  <hr />
                  <br />
                  <div className="post_likes">
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
                  <div className="post_comments">
                    {post.comments.length ? (
                      <>
                        <i className="far fa-comment"></i>
                        <p>{post.comments.length}</p>
                      </>
                    ) : (
                      <p>Be the first who writes a comment!</p>
                    )}
                  </div>
                  <div className="post_commentBox">
                    {post.comments.length
                      ? post.comments.map((comment, id) => {
                          return (
                            <CommentBox
                              user={user}
                              commentData={comment}
                              key={id}
                            />
                          );
                        })
                      : null}
                    <div ref={dummy}></div>
                  </div>

                  {user ? (
                    <CommentForm
                      postId={post._id}
                      user={user}
                      scrollUp={scrollUp}
                    />
                  ) : null}

                  {user.name === post.user.name ? (
                    <DeleteButton id={post._id} reload="/" />
                  ) : null}
                </div>
              </main>
            );
          } else {
            return null;
          }
        })
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default FullPost;
