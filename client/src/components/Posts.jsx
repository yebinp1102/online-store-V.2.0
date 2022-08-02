import React, { useEffect } from 'react'
import styled from 'styled-components'
import Item from './Item'
import { useDispatch, useSelector} from 'react-redux'
import {CircularProgress} from '@material-ui/core'
import { getPosts } from '../_actions/posts'



const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(()=>{
    dispatch(getPosts())
  },[])


  if(!posts.length && !isLoading) return '아직까지 생성된 포스트가 없습니다. 첫 글을 남겨보세요 !'

  return (
    <Container className='responsiveContainer'>
      <h2 className='headtitle'>최신 상품</h2>
      <hr/>
      {isLoading ? 
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer> 
        : (
        <div className="postWrap">
          {posts.map((post)=>(
            <Item key={post._id} post={post} />
          ))}
        </div>
      )}
    </Container>
  )
}

export default Posts

const Container = styled.div`
  padding: 100px 0;

  .headtitle{
    text-align: center;
  }

  hr{
    margin: 40px 0;
  }

  .postWrap{
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 35px;
  }
`;

const SearchBars = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;

  .searchBtn{
    width: 200px;
    border: none;
    background-color: gray;
    color: #fff;
    padding: .75rem 1rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .searchBtn:hover{
    background-color: #555;
  }

`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 0;
`;