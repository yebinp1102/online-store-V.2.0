import express from 'express'
import { addToLikesList } from '../controllers/user.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/addToLikesList', auth, addToLikesList)

export default router