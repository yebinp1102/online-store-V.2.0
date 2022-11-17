import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    // Bearer means Bearer token which releated with jwt. however... wtf is Bearer token?
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
})

// auth
export const signIn = (formData) => API.post('/api/auth/signin', formData);
export const signUp = (formData) => API.post('/api/auth/signup', formData);

// post : version 0.2.0
export const createPost = (newPost) => API.post('/api/posts', newPost)
export const fetchPosts = (page) => API.get(`api/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`api/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPost = (id) => API.get(`/api/posts/detail/${id}`)
export const deletePost = (id) => API.delete(`/api/posts/${id}`)
export const updatePost = (id, updatedPost) => API.patch(`/api/posts/${id}`, updatedPost)
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`)
export const comment = (value, id) => API.post(`/api/posts/${id}/commentPost`, {value})

// post : version 0.2.1
export const fetchHotItems = () => API.get(`api/posts/hotItems`)

// user 
export const addToLikesList = (id, userId) => API.post('api/user/addToLikesList' ,{id, userId})
export const removeItemFromCart = (productId) => API.get(`api/user/removeFromCart?id=${productId}`)
export const getListItems = (lists) => API.post(`/api/user/listItems`, lists)
export const getCartLists = (userId) => API.post(`/api/user/getCartLists?id=${userId}`)
export const successPurchase = (data) => API.post(`/api/user/successPurchase`, data)