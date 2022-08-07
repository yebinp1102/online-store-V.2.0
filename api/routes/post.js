import express from 'express'
import { createPost, getPosts, getPostsBySearch, getPost, deletePost } from '../controllers/post.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/search', getPostsBySearch);
router.get('/detail/:id', getPost)
router.delete('/:id', auth, deletePost)

export default router