import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userAuthReducer } from "./reducers/userReducers";
import { userListReducer } from "./reducers/userListReducer";

const reducers = combineReducers({
  userAuth: userAuthReducer,
  userList: userListReducer,
});

const initialState = {};

const middelwares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middelwares))
);

export default store;
