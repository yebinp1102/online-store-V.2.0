import * as api from '../api'
import { ADDTOLIKESLIST, REMOVE_CART_ITEM, LIKESLIST, END_LOADING, START_LOADING} from '../_reducers/types'


export const addToLikesList = (id, userId) => async(dispatch) => {
  try{
    const { data } = await api.addToLikesList(id, userId)
    dispatch({ type: ADDTOLIKESLIST, payload: data})
  }catch(err){
    console.log(err)
  }
}

export const removeCartItem = (productId) => async(dispatch) => {
  try{
    const {data} = await api.removeItemFromCart(productId)
    // {data}에는 productInfo와 cart 정보가 담겨 있어야 함.
    // 두 정보를 조합해서 cartDetail 업데이트.
    data.cart.forEach(item => {
      data.productInfo.forEach((product, idx) =>{
        if(item.id === product._id){
          console.log('일치합니다.')
          data.productInfo[idx].quantity = item.quantity
        }
      })
    })
    dispatch({type: REMOVE_CART_ITEM, payload: data})
  }catch(err){
    console.log(err)
  }
}

export const getLists = (lists) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const {data} = await api.getListItems(lists);

    lists.forEach(cartItem => {
      data.forEach((productDetail, i) => {
        if(cartItem.id === productDetail._id){
          data[i].quantity = cartItem.quantity
        }
      })
    })

    dispatch({ type: LIKESLIST, payload: data})
    dispatch({ type: END_LOADING})
  }catch(err){
    console.log('찜 목록 페이지에서 상품 정보를 불러오는데 실패 했습니다.')
  }
}