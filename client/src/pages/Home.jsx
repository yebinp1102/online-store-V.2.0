import React from 'react'
import styled from 'styled-components'
// 컴포넌트
import Header from '../components/Header'
import Posts from '../components/Posts'




const Home = () => {
  return (
    <Container>
      <Header />
      <Posts />
    </Container>
  )
}

export default Home

const Container = styled.div`
`;