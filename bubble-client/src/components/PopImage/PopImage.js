import React from "react";
import "./PopImage.scss";
export default function PopImage({ img, handleImagePopUp }) {
  return (
    <div className="imagePopOut">
      <div className="close" onClick={handleImagePopUp}>
        <i class="fas fa-times"></i>
      </div>
      <img src={img} alt="1" />
    </div>
  );
}
