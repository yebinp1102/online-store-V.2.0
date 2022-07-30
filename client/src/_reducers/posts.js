import {CREATE, START_LOADING} from './types'

// posts === state
const posts = (state = { isLoading: true, posts: [] }, action) => {
  switch(action.type){
    case START_LOADING : 
      return {...state, isLoading: true}
    case CREATE : 
      return { ...state, posts: [...state, action.payload]}
    default :
      return state;
  }
}


export default posts