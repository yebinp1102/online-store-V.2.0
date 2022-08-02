import Post from '../models/Post.js'

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


export const getPosts = async (req, res) => {
  try{
    const posts = await Post.find()
    res.status(200).json(posts)
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

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