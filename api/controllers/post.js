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