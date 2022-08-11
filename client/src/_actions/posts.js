import * as api from '../api'
import { CREATE, START_LOADING, FETCH_ALL, END_LOADING, FETCH_BY_SEARCH, FETCH_ONE, DELETE, UPDATE, LIKEPOST, COMMENT } from '../_reducers/types'

export const getPost = (id) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const {data} = await api.fetchPost(id);
    dispatch({type: FETCH_ONE, payload: {post: data}})
  }catch(err){
    console.log(err)
  }
}

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

export const deletePost = (id) => async(dispatch) => {
  try{
    await api.deletePost(id)
    dispatch({type: DELETE, payload: id})
  }catch(err){
    console.log(err)
  }
}

export const updatePost = (id, post, navigate) => async(dispatch) => {
  try{
    // data는 업데이트된 포스팅 정보를 갖게 됨
    const {data} = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data })
    navigate(`/detail/${id}`)
  }catch(err){
    console.log(err)
  }
}

export const likePost = (id) => async(dispatch) => {
  try{
    const {data} = await api.likePost(id);
    dispatch({ type: LIKEPOST, payload: data })
  }catch(err){
    console.log(err)
  }
}

export const commentPost = (value, id) => async(dispatch) => {
  try{
    const { data } = await api.comment(value, id)
    dispatch({type: COMMENT, payload: data })
    return data.comments
  }catch(err){
    console.log(err)
  }
}