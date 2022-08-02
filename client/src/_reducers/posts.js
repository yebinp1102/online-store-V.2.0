import {CREATE, START_LOADING, FETCH_ALL, END_LOADING} from './types'

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
        posts: action.payload
    };
    default :
      return state;
  }
}


export default posts