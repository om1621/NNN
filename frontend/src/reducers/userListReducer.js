import {
  GET_USERLIST_REQUEST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAILED,
} from "../actions/actionTypes";

export const userListReducer = (
  state = { loading: true, userList: [] },
  action
) => {
  switch (action.type) {
    case GET_USERLIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USERLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        userList: action.value,
      };
    }
    case GET_USERLIST_FAILED: {
      return {
        loading: false,
        userList: [],
      };
    }
    default: {
      return state;
    }
  }
};
