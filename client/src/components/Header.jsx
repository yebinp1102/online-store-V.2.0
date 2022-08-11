import React from 'react'
import styled from 'styled-components'
import img from '../img/banner.jpg'

const Header = () => {
  return (
    <Container>
      <img src={img} alt="Header Banner" />
    </Container>
  )
}

export default Header

const Container = styled.div`
  height: 550px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;