import React from "react";
import moment from "moment";
import "./CommentBox.scss";
export default function CommentBox({ commentData }) {
  return (
    <div className="commentBox">
      <div className="commentBox_userAndDate">
        <div className="commentBox_user">
          <img src={commentData.user.imageUrl} alt={commentData.user.name} />
          <small>{commentData.user.name}</small>
        </div>
        <div className="commentBox_date">
          <small>{moment(commentData.date).fromNow()}</small>
        </div>
      </div>
      <div className="commentBox_commentText">
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
}
