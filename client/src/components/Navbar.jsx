import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'
import styled from 'styled-components'
import img from '../img/logo.png'
import { logout } from '../_actions/auth';



const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(()=>{
    const token = user?.token;
    if(token){
      const decodedToken = decode(token)
      // token의 유효기간이 끝난 경우, 자동 로그아웃
      if(decodedToken.exp * 1000 < new Date().getTime()) UserLogout()
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])

  const UserLogout = () => {
    dispatch(logout());
    setUser(null);
  }

  return (
    <Nav>
      <div className='responsiveContainer'>
        <div className='leftMenu'>
          <a href='/'>
            <img className='logo' src={img} alt='logo' />
          </a>
          <ul>
            <li>메뉴</li>
            <li>메뉴</li>
            <li>메뉴</li>
            <li>메뉴</li>
          </ul>
        </div>
        <div className='rightMenu'>
          {user ? (
            <>
              <Link to='/posting'>상품 올리기</Link>
              <Link to='/profile'>내 프로필</Link>
              <p onClick={UserLogout}>로그아웃</p>
            </>
          ) : (
            <>
              <Link to='/auth'>로그인</Link>
            </>
          )}
        </div>
      </div>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(255, 255, 255, .7);
  transition: all .1s ease-in;

  &:hover{
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
  }

  .responsiveContainer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .leftMenu{
    display: flex;
    align-items: center;

    .logo{
      height: 5rem;
    }

    p{
      margin-right: 50px;
      cursor: pointer;
    }

    ul{
      display: flex;
      
      li{
        padding-bottom: 5px;
        cursor: pointer;
        margin-left: 2rem;
      }
      li:hover{
        border-bottom: 1px solid #fff;
      }
    }
  }

  .rightMenu{
    display: flex;
    gap: 30px;
  }
`;  