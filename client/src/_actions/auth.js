import * as api from '../api'
import { LOGOUT, SIGNIN, SIGNUP } from '../_reducers/types'

export const signIn = (formData, navigate) => async(dispatch) => {
  try{
    const {data} = await api.signIn(formData);
    dispatch({ type:SIGNIN, payload: data })
    navigate('/')
  }catch(err){
    console.log(err.message)
  }
}

export const signUp = (formData, navigate) => async(dispatch) => {
  try{
    const {data} = await api.signUp(formData);
    dispatch({type: SIGNUP, payload : data})
    alert('회원이 되신 것을 축하합니다.')
    navigate('/')
  }catch(err){
    console.log(err.message);
  }
}

export const logout = () => async(dispatch) => {
  try{
    dispatch({type: LOGOUT})
    alert('로그아웃 되었습니다.')
    window.location.replace('/')
  }catch(err){
    console.log(err)
  }
}