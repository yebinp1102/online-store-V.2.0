import React, { useState } from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
// 아이콘
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../_actions/auth';

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // true이면 회원가입, false면 로그인 양식 보여주기
  const [isSignup, setIsSingup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
      dispatch(signUp(formData, navigate))
    }else{
      dispatch(signIn(formData, navigate))
    }
  }
  

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const switchMode = () => {
    setIsSingup((prev) => !prev)
  }

  return (
    <AuthWrap>
      <div className='formContainer'>
        <form autoComplete='off' className='form' onSubmit={handleSubmit}>
          <TopLogo>
            <LockOpenIcon className='authIcon' />
            <h3 className='title'>{isSignup ? "회원가입" : "로그인"}</h3>  
          </TopLogo>
          <div className='inputFields'>
            {isSignup && (
              <input 
                name='username'
                type='text'
                placeholder='이름 username'
                onChange={handleChange}
              />
            )}
            <input 
              name='email'
              type='email'
              placeholder='이메일 email'
              onChange={handleChange}
            />
            <div className='pwd'>
              <input 
                name='password'
                type={showPwd ? 'string' : 'password'}
                placeholder='비밀번호 password'
                onChange={handleChange}
              />
              {showPwd ? 
                <VisibilityOffIcon onClick={() => setShowPwd(!showPwd)} />
                :
                <RemoveRedEyeIcon onClick={() => setShowPwd(!showPwd)} />
              }
            </div>
            {isSignup && (
              <div className='pwd'>
                <input 
                  name='confirmPassword'
                  type={showPwd ? 'string' : 'password'}
                  placeholder='비밀번호 확인 confirm password'
                  onChange={handleChange}
                />
                {showPwd ? 
                  <VisibilityOffIcon onClick={() => setShowPwd(!showPwd)} />
                  :
                  <RemoveRedEyeIcon onClick={() => setShowPwd(!showPwd)} />
                }
              </div>
            )}
          </div>
          {isSignup ? 
            <button disabled={!formData.email || !formData.password || !formData.username || !formData.confirmPassword ? true : false} className='submitBtn' type='submit'>회원가입</button>
            :
            <button disabled={!formData.email || !formData.password ? true : false} className='submitBtn' type='submit'>로그인</button>
          }
          <p className='switch' onClick={switchMode}>{isSignup ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}</p>
        </form>
      </div>
    </AuthWrap>
  )
}

export default Auth

const AuthWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: lightgray;

  .formContainer{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .form{
      min-width: 400px;
      background: #fff;
      padding: 2rem;
      border-radius: 10px;
      display: flex;
      flex-direction: column;

      .inputFields{
        display: flex;
        flex-direction: column;

        input{
          padding: .75rem .5rem;
          border: 1px solid lightgray;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .pwd{
          position: relative;

          input{
            width: 100%;
          }

          svg{
            position: absolute;
            right: .5rem;
            top: .5rem;
          }
        }
      }

      .submitBtn{
        border: none;
        padding: .5rem 1rem;
        background-color: rgb(242, 82, 135);
        color: #fff;
        border-radius: 5px;
      }

      .submitBtn:disabled{
        background-color: gray;
      }

      .switch{
        cursor: pointer;
        margin-top: 40px;
      }
    }
  }
`;


const TopLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  color: rgb(242, 82, 135);

  .authIcon{
    margin-right: 10px;
    background-color: rgb(242, 82, 135);
    color: #fff;
    box-sizing: content-box;
    padding: 5px;
    border-radius: 50%;
  }
`;