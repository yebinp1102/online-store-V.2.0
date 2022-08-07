import {CREATE, START_LOADING, FETCH_ALL, END_LOADING, FETCH_BY_SEARCH, FETCH_ONE, DELETE, UPDATE} from './types'

// posts === state
const posts = (state = { isLoading: true, posts: [] }, action) => {
  switch(action.type){
    case START_LOADING : 
      return {...state, isLoading: true}
    case END_LOADING :
      return {...state, isLoading: false}
    case CREATE : 
      return { ...state, posts: [...state, action.payload]}
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
    };
    case FETCH_ONE :
      return {
        ...state,
        post: action.payload.post
    }
    case FETCH_BY_SEARCH :
      return {
        ...state,
        posts: action.payload.data
      }
    case DELETE :
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};
    case UPDATE :
      return { ...state, posts: state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)}  
    default :
      return state;
  }
}


export default posts