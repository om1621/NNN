import {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILED,
} from "./actionTypes";
import User from "../api/User";

export const userSignup =
  (userName, email, password, lastWankedDay, wankingCount) =>
  async (dispatch) => {
    dispatch({
      type: USER_AUTH_REQUEST,
    });

    try {
      const { data } = await User.post("/signup", {
        userName,
        email,
        password,
        lastWankedDay,
        wankingCount,
      });

      if (data.type) {
        dispatch({
          type: USER_AUTH_FAILED,
          value: data,
        });
      } else {
        localStorage.setItem("token", data.token);
        dispatch({
          type: USER_AUTH_SUCCESS,
          value: data,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_AUTH_FAILED,
        value: err,
      });
    }
  };

export const userLogin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_AUTH_REQUEST,
  });

  try {
    const { data } = await User.post("/login", {
      email,
      password,
    });

    if (data.type) {
      dispatch({
        type: USER_AUTH_FAILED,
        value: data,
      });
    } else {
      localStorage.setItem("token", data.token);
      dispatch({
        type: USER_AUTH_SUCCESS,
        value: data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_AUTH_FAILED,
      value: err,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.setItem("token", null);
  dispatch({
    type: USER_AUTH_FAILED,
    value: null,
  });
};
