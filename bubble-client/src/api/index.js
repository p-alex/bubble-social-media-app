import axios from "axios";
const url = "https://bubble-social-media-app.herokuapp.com";
export const fetchPosts = () => axios.get(`${url}/api`);
export const deletePost = (id) => axios.delete(`${url}/delete-post/${id}`);
export const likePost = (id, googleId) =>
  axios.patch(`${url}/like-post/${id}`, { googleId });
export const unlikePost = (id, googleId) =>
  axios.patch(`${url}/unlike-post/${id}`, { googleId });
export const addComment = (commentData) =>
  axios.patch(`${url}/add-comment/${commentData.id}`, { commentData });
