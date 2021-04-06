export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "COMMENT":
    case "UNLIKE":
    case "LIKE": {
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
