import { ADDTOLIKESLIST, REMOVE_CART_ITEM, LIKESLIST, GETCARTLISTS, ON_SUCCESS_PURCHASE } from "./types";

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
        CartLists: action.payload.productInfo,
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
    case GETCARTLISTS :
      return {
        ...state,
        CartLists: action.payload.cartLists.data
      }
    case ON_SUCCESS_PURCHASE : 
      return {
        ...state
      }
    default:
      return state;
  }
}

export default user 