import React, { useState } from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import { createPost } from '../_actions/posts'
import { useNavigate } from 'react-router-dom'
import FileBase from 'react-file-base64'

const Posting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({
    title: "",
    desc: "",
    tags: [],
    selectedFile: "",
    price: "",
  })

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
    dispatch(createPost({...postData, username: user?.result?.username }))
    clear()
    navigate('/')
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
        <h3 className='title'>상품 올리기</h3>
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
            <button className='btn' type='submit'>글 올리기</button>
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