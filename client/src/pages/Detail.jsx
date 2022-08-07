import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { deletePost, getPost, getPostsBySearch } from '../_actions/posts';
import { CircularProgress } from '@material-ui/core';


const Detail = () => {
  const { post, isLoading} = useSelector((state) => state.posts)
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if(isLoading){
    return <CircularProgress size='7em' />
  }

  const handleToUpdate = () => {
    navigate('/posting', {state: id})
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id))
    navigate('/');
  }

  return (
    post && 
    <Container>
        <div className='detail'>
          <Header>
            <div className='header'>
              <p>상품 등록일 : {post?.createdAt.slice(0, 10)}</p>
              <p className='creator'>판매자 : {post?.username}</p>
            </div>
            {(user?.result?._id === post?.creator) && (
              <div className='updateBtns'>
                <button className='update' onClick={handleToUpdate}>수정하기</button>
                <button className='update' onClick={handleDelete}>삭제하기</button>
              </div>
            )}
          </Header>
          <hr />
          <Info>
            <div className='postImg'>
              <img alt='상품 이미지' src={post?.selectedFile} />
            </div>
            <Description>
              <div>
                <p className='title'>{post?.title}</p>
                <p className='tags'>{post?.tags.map((tag) => `#${tag} `)}</p>
                <h2>{post.price ? `${post?.price.toLocaleString('ko-KR')}원` : ''}</h2>
              </div>
              <p className='desc'>{post?.desc}</p>
              <div className='Btns'>
                <div className='buy'>
                  <button className='buyBtn'>상품 구매하기</button>
                </div>
              </div>
            </Description>
          </Info>
        </div>
    </Container>
  )
}

export default Detail

const Container = styled.div`
  height: 100vh;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;

  .detail{
    width: 1200px;
    padding: 2rem;
    border-radius: 10px;
    background-color: #fff;

    hr{
      margin: 1.5rem 0;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 .5rem;

  .header{
    p{
      color: gray;
      margin-top: 10px;
      font-size: 15px;
    }
  }

  .updateBtns {
    display: flex;
    
    button{
      border: none;
      padding: 10px 20px;
      font-size: 15px;
      border-radius: 5px;
      cursor: pointer;
      background-color: lightgray;
      color: #000;
      }

      button:first-child{
        margin-right: 20px;
      }

      button:hover{
        background-color: gray;
        color: #fff;
      }
  }
`;

// safari 브라우저에서는 flex의 일부 속성이 동작하지 않는 에러, 고치기
const Info = styled.div`
  display: flex;
  gap: 20px;

  .postImg{
    flex: 0.5;
    padding: 1rem;

    img{
      width: 100%;
      height: auto;
    }
  }
`;

const Description = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .desc{
    line-height: 2;
    margin: 30px 0;
  }

  .title{
    font-size: 1.5rem;
  }

  .tags{
    margin: 10px 0;
    color: #00376b;
    font-size: 14px;
  }

  .Btns{
    display: flex;
    flex-direction: column;

    .buy{
      display: flex;
      flex-direction: column;

      .buyBtn{
        border: none;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
`;