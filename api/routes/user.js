import express from 'express'
import { addToLikesList, removeItemFromCart, getListItems, getCartLists, successPurchase} from '../controllers/user.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/addToLikesList', auth, addToLikesList)
router.get('/removeFromCart', auth, removeItemFromCart)
router.post('/listItems', auth, getListItems)
router.post('/getCartLists', auth, getCartLists)
router.post('/successPurchase', auth, successPurchase)

export default router