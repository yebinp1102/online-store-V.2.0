import { LOGOUT, SIGNIN, SIGNUP } from "./types";

export default (auth = {}, action) => {
  switch(action.type){
    case SIGNUP : 
      return auth;
    case SIGNIN :
      localStorage.setItem('profile', JSON.stringify({...action?.payload}))
      return action?.payload
    case LOGOUT :
      localStorage.clear()
      return auth
    default:
      return auth;
  }
}