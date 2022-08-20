import { combineReducers } from "redux";
import auth from './auth'
import posts from './posts'
import user from "./user";

const rootReducer = combineReducers({
  posts,
  auth,
  user
})

export default rootReducer