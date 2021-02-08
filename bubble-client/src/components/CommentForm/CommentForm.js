import React, { useState, useRef, useEffect } from "react";
import "./CommentForm.scss";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/posts";
export default function CommentBox({ postId, user, scrollUp }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  let textareaRef = useRef();
  const handleSubmit = async (e, id, user) => {
    e.preventDefault();
    let data = { id, user, comment, date: Date.now() };

    await dispatch(addComment(data));
    setTimeout(scrollUp());
    setComment("");
  };
  useEffect(() => {
    scrollUp();
  });
  return (
    <form
      className="commentForm"
      onSubmit={(e) => handleSubmit(e, postId, user)}
      ref={textareaRef}
    >
      <label>Comment: </label>
      <textarea
        placeholder="Comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button type="submit">Add Comment</button>
    </form>
  );
}
