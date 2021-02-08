import axios from "axios";

export const fetchPosts = () => axios.get("/api");
export const deletePost = (id) => axios.delete(`/delete-post/${id}`);
export const likePost = (id, googleId) =>
  axios.patch(`/like-post/${id}`, { googleId });
export const unlikePost = (id, googleId) =>
  axios.patch(`/unlike-post/${id}`, { googleId });
export const addComment = (commentData) =>
  axios.patch(`/add-comment/${commentData.id}`, { commentData });
