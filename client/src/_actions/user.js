import * as api from '../api'
import { ADDTOLIKESLIST } from '../_reducers/types'


export const addToLikesList = (id, userId) => async(dispatch) => {
  try{
    const { data } = await api.addToLikesList(id, userId)
    dispatch({ type: ADDTOLIKESLIST, payload: data})
  }catch(err){
    console.log(err)
  }
}