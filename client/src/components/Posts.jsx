import React from 'react'
import styled from 'styled-components'
import Item from './Item'
import Paginate from './Pagination'
import { useDispatch, useSelector} from 'react-redux'
import { getPostsBySearch } from '../_actions/posts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {TextField, CircularProgress} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'

function useQuery() {
  // url의 물음표 이후부터를 문자열로 반환 -> 이것을 URLSearchParams 객체로 반환
  return new URLSearchParams(useLocation().search);
}

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if(search.trim() || tags){
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/')
    }
  }

  // input 태그에 검색어를 입력하고 "엔터"를 입력했을 때 실행되는 함수
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  
  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }
  
  if(!posts.length && !isLoading) return '아직까지 생성된 포스트가 없습니다. 첫 글을 남겨보세요 !'

  return (
    <Container className='responsiveContainer'>
      <h2 className='headtitle'>최신 상품</h2>
      <hr/>
      <SearchBars>
        <TextField 
          name='search'
          variant='outlined'
          label='상품 찾기'
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <ChipInput 
          className='chipInput'
          value={tags}
          onAdd={handleAdd}
          onDelete={handleDelete}
          fullWidth
          label="태그로 검색하기"
          variant='outlined'
        />
        <button onClick={searchPost} className="searchBtn">검색</button>
      </SearchBars>
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
      {(!searchQuery && !tags.length) && (
        <Paginate page={page} />
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