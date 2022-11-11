import { ADDTOLIKESLIST, REMOVE_CART_ITEM, LIKESLIST } from "./types";

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
    case REMOVE_CART_ITEM :
      return {
        ...state,
        cartDetail: action.payload.productInfo,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      }
    case LIKESLIST :
      return {
        ...state,
        cartDetail : action.payload
      }
    default:
      return state;
  }
}

export default user 