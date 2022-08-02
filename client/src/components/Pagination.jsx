import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../_actions/posts'
import { Link } from 'react-router-dom'
import {Pagination, PaginationItem} from '@material-ui/lab'
import styled from 'styled-components'

const Paginate = ({page}) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts)

  useEffect(()=>{
    if(page){
      dispatch(getPosts(page))
    }
  },[dispatch, page])

  return (
    <Container>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="secondary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
    </Container>
  )
}

export default Paginate

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;