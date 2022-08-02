import * as api from '../api'
import { CREATE, START_LOADING, FETCH_ALL, END_LOADING, FETCH_BY_SEARCH } from '../_reducers/types'

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

export const getPosts = (page) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING})
  }catch(err){
    console.log(err.message)
  }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: {data}})
    dispatch({ type: END_LOADING})
  }catch(err){
    console.log(err)
  }
}