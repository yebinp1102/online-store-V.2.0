import React from 'react'
import styled from 'styled-components'

const Post = () => {
  return (
    <Container>Post</Container>
  )
}

export default Post

const Container = styled.div`
  background-color: #fff;
  height: 300px;
  border-radius: 10px;
  width: 255px;
  padding: 10px;
  margin: 10px;
  flex: none;
  border: 1px solid lightgray;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;