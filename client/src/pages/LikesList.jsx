import React from 'react'
import styled from 'styled-components';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, getCartLists } from '../_actions/user';
import UserCardBlock from '../components/UserCardBlock';
import { useState } from 'react';

const LikesList = () => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('profile'))
  const userId = userInfo.result._id
  const realCartDetail = useSelector((state) => state.user.CartLists)

  const [Total, setTotal] = useState(0);

  useEffect(()=>{
    dispatch(getCartLists(userId))
  },[dispatch])

  const calculateTotal = (realCartDetail) => {
    let total = 0;

    realCartDetail.map(item => {
      if(item.price){
        total += parseInt(item.price, 10)
      }
    })
    setTotal(total)
  }

  useEffect(()=>{
    if(realCartDetail){
      calculateTotal(realCartDetail)
    }
  },[realCartDetail])

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
  }

  return (
    <Container>
      <div className='listWrap'>
        <div className='header'>
          <h2>나의 찜 목록</h2>
        </div>
        <UserCardBlock products={realCartDetail} removeItem={removeFromCart} />
        <TotalPrice>
          <p><strong>총 금액 :</strong>{Total.toLocaleString()} 원(won)</p>
        </TotalPrice>
      </div>
    </Container>
  )
}

export default LikesList

const Container = styled.div`
  margin-top: 100px;
  width: 100vw;

  .listWrap{
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }
`;

const TotalPrice = styled.div`
  margin-top: 3rem;
`;