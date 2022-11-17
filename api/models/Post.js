import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  desc: String,
  username: String,
  creator: String, 
  tags: [String],
  selectedFile: String,
  price: Number,
  likes: {
    type: [String],
    default: []
  },
  totalLikes : {
    type: Number,
    default : 0
  },
  comments: {
    type: [String],
    default: []
  },
  sold:{
    type: Number,
    default: 0,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Post = mongoose.model('Post', postSchema)

export default Post;