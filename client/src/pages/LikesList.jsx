import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LikesList = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user)
  console.log(userData)

  return (
    <div>LikesList</div>
  )
}

export default LikesList