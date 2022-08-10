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

// post
export const createPost = (newPost) => API.post('/api/posts', newPost)
export const fetchPosts = (page) => API.get(`api/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`api/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPost = (id) => API.get(`/api/posts/detail/${id}`)
export const deletePost = (id) => API.delete(`/api/posts/${id}`)
export const updatePost = (id, updatedPost) => API.patch(`/api/posts/${id}`, updatedPost)
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`)
