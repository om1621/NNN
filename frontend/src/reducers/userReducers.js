import {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILED,
} from "../actions/actionTypes";

export const userAuthReducer = (
  state = { loading: false, user: null, err: null },
  action
) => {
  switch (action.type) {
    case USER_AUTH_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_AUTH_SUCCESS: {
      return {
        loading: false,
        user: action.value,
        err: null,
      };
    }
    case USER_AUTH_FAILED: {
      return {
        loading: false,
        user: null,
        err: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
