import React from 'react'
import styled from 'styled-components'
// 컴포넌트
import Header from '../components/Header'




const Home = () => {
  return (
    <Container>
      <Header />
    </Container>
  )
}

export default Home

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eee;
`;