import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import axios from "axios";
import "./NewPostForm.scss";

const Post = (props) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({ image: [], description: "" });
  const [error, setError] = useState([]);
  const history = useHistory();

  const handleImages = (file) => {
    //let baseArray = [];
    // files.map((file) => {
    //   baseArray.push(file.base64);
    //   return null;
    //});
    let imageArray = [file.base64];
    setData((prevData) => ({
      ...prevData,
      image: imageArray,
    }));
  };
  const handleDescription = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.image.length !== 0 && data.description && user) {
      axios
        .post("https://bubble-social-media-app.herokuapp.com/add-post", {
          image: data.image,
          description: data.description,
          user,
        })
        .then(() => {
          console.log("Posted!");
        })
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
          setError([error.message]);
        });
    } else {
      setError(["Something went wrong"]);
    }
  };
  return (
    <form method="POST" className="newPost_form" onSubmit={handleSubmit}>
      {error ? <p>{error}</p> : null}
      <h1>New Post</h1>
      <div className="img_wrapper">
        {data.image.map((img, id) => {
          return (
            <div key={id}>
              <img src={img} alt={id} />
            </div>
          );
        })}
      </div>
      <label>Choose image(s)</label>
      <FileBase64
        multiple={false}
        onDone={handleImages}
        name="images"
        required="true"
      />
      <br />
      <label>Description</label>
      <textarea name="description" onChange={handleDescription}></textarea>
      <button type="submit">
        <i class="fas fa-plus"></i>Add Post
      </button>
    </form>
  );
};

export default Post;
