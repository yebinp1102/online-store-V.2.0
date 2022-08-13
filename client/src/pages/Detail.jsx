import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { deletePost, getPost, getPostsBySearch, likePost } from '../_actions/posts';
import { CircularProgress } from '@material-ui/core';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentSection from '../components/CommentSection';

const Detail = () => {
  const { post, posts, isLoading} = useSelector((state) => state.posts)
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [likes, setLikes] = useState(post?.likes)
  console.log('post : ', post)

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    setLikes(post?.likes)
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if(isLoading){
    return <CircularProgress size='7em' />
  }

  const userId = user?.result?._id
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    await dispatch(likePost(id))
    dispatch(getPost(id))
    if(hasLikedPost){
      setLikes(post.likes.filter((id) => id !== userId))
    }else{
      setLikes([...post.likes, userId])
    }
  }

  const Likes = () => {
    return likes.find((like) => like === userId) ? (
      <div className='likes'>
        <FavoriteIcon />
        <span>좋아요 취소</span>
      </div>
    ) : (
      <div className='likes'>
        <FavoriteBorderIcon />
        <span>좋아요</span>
      </div>
    )
  }

  const handleToUpdate = () => {
    navigate('/posting', {state: id})
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id))
    navigate('/');
  }

  const openDetail = (id) => {
    navigate(`/detail/${id}`)
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

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
                <LikePost>
                  <p>{likes.length}명이 이 상품을 좋아 합니다.</p>
                  <button className='likeBtn' disabled={!user?.result} onClick={handleLike}>
                    <Likes/>
                  </button>
                </LikePost>
                <div className='buy'>
                  <button className='buyBtn'>상품 구매하기</button>
                </div>
              </div>
            </Description>
          </Info>
          {!!recommendedPosts.length && (
            <Recommendation>
              <h3>관련 추천 상품</h3>
              <hr/>
              <div className='cardWrap'>
                {recommendedPosts.map(({ title, selectedFile, _id }) => (
                  <RecommendationCard className='card' key={_id} onClick={() => openDetail(_id)}>
                    <img src={selectedFile} />
                    <h4>{title}</h4>
                  </RecommendationCard>
                ))}
              </div> 
            </Recommendation>
          )}
          <CommentSection post={post} />
        </div>
    </Container>
  )
}

export default Detail

const Container = styled.div`
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;

  .detail{
    width: 1200px;
    margin: 150px 0;
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

const LikePost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  .likeBtn{
    border: none;
    background-color: #fff;
    cursor: pointer;
    padding-bottom: .5rem;
    border-bottom: 2px solid #fff;


    .likes{
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1rem;
      color: salmon;

      span{
        padding-top: 3px;
      }
    }
  }

  .likeBtn:hover{
    border-bottom: 2px solid salmon;
  }
`;

const Recommendation = styled.div`
  margin: 100px 0;
  background-color: #eee;
  padding: 1rem;
  border-radius: 10px;

  .cardWrap{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const RecommendationCard = styled.div`
  cursor: pointer;
  padding: .75rem;
  border-radius: 10px;
  border: 2px solid #fff;

  img{
    width: 100%;
    height: auto;
  }

  h4{
    margin: 15px 0;
  }
  
`;
