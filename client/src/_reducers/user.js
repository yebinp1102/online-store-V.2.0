import { ADDTOLIKESLIST } from "./types";

const user = (state = {}, action) => {
  switch(action.type){
    case ADDTOLIKESLIST : 
      return {
        ...state,
        userData : {
          ...state.userData,
          cart: action.payload
        }
      }
    default:
      return state;
  }
}

export default user 