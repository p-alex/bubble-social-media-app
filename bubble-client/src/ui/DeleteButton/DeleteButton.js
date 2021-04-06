import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../actions/posts";
export default function DeleteButton({ id, reload }) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(deletePost(id));
        history.push(reload);
      }}
      style={{ background: "#F04A26" }}
    >
      <i class="far fa-trash-alt"></i>Delete
    </button>
  );
}
