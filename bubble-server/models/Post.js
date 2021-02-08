const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: [true, "Need user"],
  },
  images: {
    type: Array,
    required: [true, "Add images"],
  },
  description: {
    type: String,
    required: [true, "Add description"],
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model("Post", postSchema);
