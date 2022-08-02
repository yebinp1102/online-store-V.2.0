import express from 'express'
import { createPost, getPosts, getPostsBySearch } from '../controllers/post.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/search', getPostsBySearch);

export default router