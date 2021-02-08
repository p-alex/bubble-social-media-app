const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const PostModel = require("../models/Post");

router.post("/add-post", (req, res) => {
  const newPost = PostModel({
    user: req.body.user,
    images: req.body.image,
    description: req.body.description,
  });
  newPost.save();
  res.redirect("/");
});

router.delete("/delete-post/:id", (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  PostModel.findByIdAndRemove(id)
    .then(() => {
      console.log(`Post with id: ${id} has been deleted!`);
      res.json({ message: "success!" });
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: "" });
    });
});

router.patch("/like-post/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const post = await PostModel.findById(id);
  const updatePost = await PostModel.findByIdAndUpdate(
    id,
    { likes: [...post.likes, req.body.googleId] },
    { new: true }
  );
  res.json(updatePost);
});

router.patch("/unlike-post/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const googleId = req.body.googleId;
  const post = await PostModel.findById(id);
  const updatedLikesArray = post.likes.filter((user) => user !== googleId);
  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    { likes: updatedLikesArray },
    { new: true }
  );
  res.json(updatedPost);
});

router.patch("/add-comment/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const post = await PostModel.findById(id);
  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    {
      comments: [...post.comments, req.body.commentData],
    },
    { new: true }
  );
  console.log(updatedPost._id);
  res.json(updatedPost);
});

module.exports = router;
