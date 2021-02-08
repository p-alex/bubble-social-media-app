const api = require("../api");

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id, googleId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, googleId);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (id, googleId) => async (dispatch) => {
  try {
    const { data } = await api.unlikePost(id, googleId);
    dispatch({ type: "UNLIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (commentData) => async (dispatch) => {
  try {
    const { data } = await api.addComment(commentData);
    console.log(data);
    dispatch({ type: "COMMENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
