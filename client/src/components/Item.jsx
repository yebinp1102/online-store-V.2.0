import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Item = ({post}) => {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(`/detail/${post._id}`)
  }

  return (
    <Container onClick={openDetail} >
      <div className='img' style={{backgroundImage: `url(${post.selectedFile})`} }></div>
      <div className='productInfo'>
        <div className='flex-row'>
          <p>판매자 : {post.username}</p>
          <p>{post.createdAt.substr(0,10)}</p>
        </div>
        <h3 className='title'>{post.title.length > 23 ? `${(post.title).slice(0,23)}...` : post.title}</h3>
        <p className='price'>{post.price ? `가격 :${post.price.toLocaleString('ko-KR')} 원(won)` : null}</p>
      </div>
    </Container>
  )
}

export default Item

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  height: 350px;

  .img{
    background-color: pink;
    background-size: cover;
    height: 250px;
  }

  .productInfo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    padding: .75rem;
    font-size: 14px;

    p{
      margin-bottom: 5px;
      color: gray;
    }

    .flex-row{
      display: flex;
      justify-content: space-between;
    }

    .title{
      margin: 10px 0;
    }
    
    .price{
      display: flex;
      justify-content: flex-end;
    }
  }
`;