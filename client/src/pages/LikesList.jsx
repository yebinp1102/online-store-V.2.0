import React from 'react'
import styled from 'styled-components';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, getCartLists, onSuccessPurchase } from '../_actions/user';
import UserCardBlock from '../components/UserCardBlock';
import { useState } from 'react';
import Paypal from '../components/Paypal'

const LikesList = () => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('profile'))
  const userId = userInfo.result._id
  const realCartDetail = useSelector((state) => state.user.CartLists)
  console.log(realCartDetail)
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

  const transactionSuccess = (data) => {
    dispatch(onSuccessPurchase({
      paymentData: data,
      cartDetail : realCartDetail
    })).then(res =>{
      if(res.payload.success){
        setTotal(0);
      }
    })
  }

  return (
    <Container>
      <div className='listWrap'>
        <div className='header'>
          <h2>나의 찜 목록</h2>
        </div>
        {realCartDetail?.length ? (
            <div>
              <UserCardBlock products={realCartDetail} removeItem={removeFromCart} />
              <TotalPrice>
                <p><strong>총 금액 :</strong>{Total.toLocaleString()} 원(won) / {(Total/1329.8).toFixed(2)}$ USD</p>
                <Paypal 
                  total={Number(Total)}
                  onSuccess={transactionSuccess}
                />
              </TotalPrice>
            </div>
          ) : (
            <p className='noList'>아직까지 찜한 상품이 없습니다.</p>
          )}
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

  .noList{
    margin-top: 100px;
    font-size: 1.5rem;
    text-align: center;
  }
`;

const TotalPrice = styled.div`
  margin-top: 3rem;
`;