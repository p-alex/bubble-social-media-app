const express = require("express");
const router = express.Router();
const PostModel = require("../models/Post");
router.get("/", (req, res) => {
  PostModel.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});

router.post("/specific-post", (req, res) => {
  console.log(req.body);
  const postId = req.body.id;
  PostModel.find({ _id: postId })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
