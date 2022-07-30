import { combineReducers } from "redux";
import auth from './auth'
import posts from './posts'

const rootReducer = combineReducers({
  posts,
  auth
})

export default rootReducer