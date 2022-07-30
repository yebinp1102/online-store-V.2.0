import * as api from '../api'
import { CREATE, START_LOADING } from '../_reducers/types'

export const createPost = (post) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    // data는 새로운 포스팅 정보를 갖게 됨
    const {data} = await api.createPost(post);
    dispatch({type: CREATE, payload: data})
  }catch(err){
    console.log(err)
  }
}