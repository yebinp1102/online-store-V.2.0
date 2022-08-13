import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CircularProgress} from '@material-ui/core'

// 컴포넌트
import { useDispatch, useSelector} from 'react-redux'
import { getHotItems } from '../_actions/posts';
import HotItem from './HotItem';

const HotItems = () => {
  const dispatch = useDispatch()
  const { hotItems, isLoading } = useSelector(state => state.posts)
  const carousel = useRef(null)

  useEffect(()=>{
    dispatch(getHotItems())
  },[])

  const handleLeftClick = (e) => {
    e.preventDefault()
    carousel.current.scrollLeft -= carousel.current.offsetWidth
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }

  return (
    <Container className='responsiveContainer'>
        <h2>인기 상품</h2>
        <hr/>
        { isLoading || !hotItems ? 
          <LoadingContainer>
            <CircularProgress/>
          </LoadingContainer>
          : (
            <Carousel ref={carousel}>
              <div className='postWrap'>
                {hotItems.map((item) => {
                  return (
                    <HotItem item={item} key={item._id} />
                  )
                })}
              </div>
            </Carousel>
          )
        }
        <div className='sliderButtons'>
          <ArrowBackIcon  onClick={handleLeftClick}/>
          <ArrowForwardIcon onClick={handleRightClick} />  
        </div>
    </Container>
  )
}

export default HotItems

const Container = styled.div`
  position: relative;
  h2{
    padding-top: 60px;
  }

  hr{
    margin: 30px 0;
  }

  .sliderButtons{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 115%;

    svg{
      font-size: 2.25rem;
      border: 4px solid gray;
      border-radius: 50%;
      cursor: pointer;
      color: gray;
    }
  }
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 50px;

  ::-webkit-scrollbar{
    display: none;
  }

  .postWrap{
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 0;
`;