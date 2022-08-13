import React from 'react'
import styled from 'styled-components'
// 컴포넌트
import Header from '../components/Header'
import Posts from '../components/Posts'
import HotItems from '../components/HotItems'



const Home = () => {
  return (
    <Container>
      <Header />
      <div className='bg-gray'>
        <HotItems />
      </div>
      <Posts />
    </Container>
  )
}

export default Home

const Container = styled.div`
  .bg-gray{
    background-color: #eee;
  }
`;