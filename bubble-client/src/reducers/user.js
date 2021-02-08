export default (user = "", action) => {
  switch (action.type) {
    case "GET_USER":
      localStorage.setItem("bubble-profile", JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT_USER":
      localStorage.clear();
      return "";
    default:
      return user;
  }
};
