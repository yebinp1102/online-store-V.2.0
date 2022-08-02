import express from 'express'
import { createPost, getPosts } from '../controllers/post.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/', auth, createPost)
router.get('/', getPosts)

export default router