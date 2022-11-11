import express from 'express'
import { addToLikesList, removeItemFromCart, getListItems} from '../controllers/user.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/addToLikesList', auth, addToLikesList)
router.get('/removeFromCart', auth, removeItemFromCart)
router.post('/listItems', auth, getListItems)

export default router