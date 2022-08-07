import mongoose from 'mongoose';
import Post from '../models/Post.js'

// 특정 게시글 정보 읽기
export const getPost = async (req, res) => {
  const {id} = req.params;
  try{
    const post = await Post.findById(id)
    res.status(200).json(post)
  }catch(err){
    res.status(500).json({message: err.message})
  }
}
// 게시글 생성
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString() })
  try{
    await newPost.save()
    res.status(201).json(newPost)
  }catch(err){
    res.status(500).json({message: err.message})
  }
} 

// 모든 게시글 정보 읽기
export const getPosts = async (req, res) => {
  const { page } = req.query
  try{
    const limit = 9;
    const startIndex = (Number(page) - 1) * limit
    const total = await Post.countDocuments({})
    const posts = await Post.find().sort({_id: -1}).limit(limit).skip(startIndex); // sort 메서드는 최신순으로 정렬하기 위해 사용
    res.status(200).json({ data : posts, currentPage : Number(page), numberOfPages : Math.ceil(total / limit)})
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

// 검색 결과 찾기
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try{
    const title = new RegExp(searchQuery, 'i') // 영어의 대소문자 구별을 하지 않게 설정
    const posts = await Post.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
    res.status(200).json({data : posts})
  }catch(err){
    res.status(404).json({ message: err.message})
  }
}

// 상품 삭제하기
export const deletePost = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('존재하지 않는 상품 입니다.')
  try{
    await Post.findByIdAndRemove(id);
    return res.json({message: '게시글이 성공적으로 삭제 되었습니다.'})
  }catch(err){
    res.status(500).json({message: err.message})
  }

}