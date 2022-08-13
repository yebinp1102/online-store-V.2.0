import React from 'react'
import styled from 'styled-components'

const HotItem = ({item}) => {
  return (
    <Container>
      <img src={item.selectedFile} alt='상품 이미지' />
      <p className='title'>{item.title}</p>
    </Container>
  )
}

export default HotItem

const Container = styled.div`
  background-color: #fff;
  height: 350px;
  border-radius: 10px;
  width: 255px;
  padding: 10px;
  margin: 10px;
  flex: none;
  border: 1px solid lightgray;

  img{
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
  
  .title{
    margin-top: 10px;
    padding: 0 5px;
    font-size: 15px;
  }
`;