import express from 'express'
import { addToLikesList, removeItemFromCart, getListItems, getCartLists} from '../controllers/user.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/addToLikesList', auth, addToLikesList)
router.get('/removeFromCart', auth, removeItemFromCart)
router.post('/listItems', auth, getListItems)
router.post('/getCartLists', auth, getCartLists)

export default router