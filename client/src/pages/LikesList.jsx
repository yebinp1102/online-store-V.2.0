import React from 'react'
import styled from 'styled-components';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, getLists } from '../_actions/user';
import UserCardBlock from '../components/UserCardBlock';
import { useState } from 'react';

const LikesList = () => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('profile'))
  const lists = userInfo.result.cart
  const cartDetail = useSelector((state) => state.user.cartDetail)
  console.log('cartDetail :',cartDetail)
  console.log('lists:',lists)

  const [Total, setTotal] = useState(0);

  useEffect(()=>{
    dispatch(getLists(lists))
  },[dispatch])

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map(item => {
      if(item.price){
        total += parseInt(item.price, 10) * item.quantity
      }
    })
    setTotal(total)
  }

  useEffect(()=>{
    if(cartDetail){
      calculateTotal(cartDetail)
    }
  },[cartDetail])

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
      .then(res => {

      })
  }

  return (
    <Container>
      <div className='listWrap'>
        <div className='header'>
          <h2>나의 찜 목록</h2>
        </div>
        <UserCardBlock products={cartDetail} removeItem={removeFromCart} />
        <TotalPrice>
          <p><strong>총 금액 :</strong>{Total} 원(won)</p>
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