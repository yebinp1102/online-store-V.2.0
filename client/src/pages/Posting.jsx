import React, { useState } from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { createPost, getPost, updatePost } from '../_actions/posts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import FileBase from 'react-file-base64'

const Posting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
  // 상세 페이지에서 수정하기 버튼 클릭 > 해당 상품의 _id값을 state에 담아서 전달받음.
  const { state } = useLocation();
  const post = useSelector((result) => state ? result.posts.post : null)
  const [postData, setPostData] = useState({
    title: "",
    desc: "",
    tags: [],
    selectedFile: "",
    price: "",
  })

  useEffect(()=>{
    if(state){
      dispatch(getPost(state))
    }
  },[state])

  useEffect(()=>{
    if(post){
      setPostData({
        title: post.title,
        desc: post.desc,
        tags: post.tags,
        selectedFile: post.selectedFile,
        price: Number(post.price),
      })
    }
  },[post])

  const clear = () => {
    setPostData({
      title: "",
      desc: "",
      tags: [],
      selectedFile: [],
      price: "",
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(state){
      dispatch(updatePost(state, {...postData, username: user?.result?.username }, navigate))
      clear()
    }else{
      dispatch(createPost({...postData, username: user?.result?.username }))
      clear()
      navigate('/')
    }
  }

  if(!user?.result?.username){
    return(
      <div>
        <h6>로그인 후 해당 기능을 이용해 주세요.</h6>
      </div>
    )
  }

  return (
    <Container>
      <div className='responsiveContainer'>
        <h3 className='title'>{state ? '상품 내용 수정하기' : '상품 올리기'}</h3>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <input
            name='title'
            placeholder='제목'
            type='text'
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <textarea
            name='desc'
            placeholder='상품 설명'
            type='text'
            value={postData.desc}
            onChange={(e) => setPostData({ ...postData, desc: e.target.value })}
          />
          <input
            name='tags'
            placeholder='태그'
            type='text'
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          />
          <input
            name='price'
            placeholder='가격'
            type='number'
            value={postData.price}
            onChange={(e) => setPostData({ ...postData, price: Number(e.target.value) })}
          />
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} 
          />
          <BtnWrap>
            <button className='btn' type='submit'>{ state ? "상품 내용 업데이트" : "글 올리기"}</button>
          </BtnWrap>
        </form>
      </div>
    </Container>
  )
}

export default Posting

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;

  .responsiveContainer{
    padding: 2rem;
    border-radius: 10px;
    background-color: #fff;
    width: 700px;

    .title{
      margin-bottom: 50px;
    }

    form{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      input{
        padding: .75rem;
        border: 1px solid lightgray;
        margin-bottom: 20px;
        border-radius: 5px;
      }

      textarea{
        padding: .75rem;
        min-height: 200px;
        margin-bottom: 20px;
        border: 1px solid lightgray;
      }
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;

  .btn{
    cursor: pointer;
    margin-right: 15px;
    background-color: #2155CD;
    border: none;
    border-radius: 5px;
    padding: .5rem .75rem;
    color: #fff;
  }
`;