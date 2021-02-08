export const getUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER", payload: user });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_USER" });
  } catch (error) {
    console.log(error);
  }
};
