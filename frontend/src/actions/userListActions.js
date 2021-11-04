import {
  GET_USERLIST_REQUEST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAILED,
} from "./actionTypes.js";
import User from "../api/User.js";

export const getUserList = () => async (dispatch) => {
  dispatch({
    type: GET_USERLIST_REQUEST,
  });

  try {
    const { data } = await User.get("/");
    console.log(data);
    dispatch({
      type: GET_USERLIST_SUCCESS,
      value: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_USERLIST_FAILED,
    });
  }
};
