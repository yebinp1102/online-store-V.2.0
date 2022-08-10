import React, { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { commentPost } from '../_actions/posts'

const CommentSection = ({post}) => {
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const commentRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'))

  const handleClick = async () => {
    const finalComment = `${user.result.username} : ${comment}`
    const newComment = await dispatch(commentPost(finalComment, post._id))
    setComments(newComment)
    setComment('');
    commentRef.current.scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <CommentWrap>
      <h3>상품 후기</h3>
      <hr/>
      <Review>
        {comments.length > 0 ? (
          <>
            {comments.map((comment, i) => (
              <div key={i}>
                <p className='review'><strong>{comment.split(':')[0]}</strong> : {comment.split(':')[1]}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <p>아직 상품 후기가 없습니다. 상품을 구매하고 첫 후기를 남겨보세요!</p>
          </>
        )}
        <div ref={commentRef} />
      </Review>
      {user?.result?.username && (
        <CommentBox>
          <textarea 
            label="comment"
            placeholder='상품 후기를 작성 해주세요'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className='submit' disabled={!comment} onClick={handleClick}>작성하기</button>
        </CommentBox>
      )}
    </CommentWrap>
  )
}

export default CommentSection

const CommentWrap = styled.div`
  margin-top: 80px;
`;

const Review = styled.div`

  .review{
    margin: 40px 0;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  
  textarea{
    border: 1px solid lightgray;
    height: 150px;
    width: 100%;
    margin-bottom: 20px;
    padding: 1rem;
    border-radius: 5px;
    font-size: .75rem;
  }

  .submit{
    padding: .5rem;
    font-size: .75rem;
    border: none;
    border-radius: 5px;
  }
`;