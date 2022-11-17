import User from '../models/User.js'
import Post from '../models/Post.js'
import Payment from '../models/Payment.js'
import async from 'async'

export const addToLikesList = async(req, res) => {
  // id는 상품의 id 이고, userId는 사용자의 id
  const {id, userId} = req.body;
  try{
    let duplicate = false;
    const userInfo = await User.findById(userId)
    userInfo.cart.forEach((item) => {
      if(item.id === id){
        duplicate = true;
      }
    })
    // 이미 찜 목록에 해당 상품이 있는 경우, 해당 상품 리스트에서 삭제하기
    // if(duplicate){
    //   const userCart = await User.findByIdAndUpdate(userId,{ $inc : { "cart.$.quantity" : 1 }},{new: true})
    //   return res.status(200).json(userCart)
    if(!duplicate){ // 찜 목록에 상품이 없는 경우
      const userCart = await User.findByIdAndUpdate(userId, {$push : { cart: { id, quantity: 1, date: Date.now() } } }, { new : true })
      return res.status(200).json(userCart)
    }

  }catch(err){
    res.status(500).json({message: err.message})
  }
}

export const removeItemFromCart = async(req, res) => {
  try{
    // DB의 users collection > cart에 저장된 리스트에서 해당 품목 삭제
    const userInfo = await User.findOneAndUpdate(
        {_id: req.userId}, // req.user._id가 유저 아이디랑 일치하는지 확인, 아니면 어디서 찾을지 고민 ㄱㄱ
        {"$pull": {"cart" : {"id": req.query.id}}}, // DB에 있는 user collection의 cart 카페고리에서 쿼리의 아이디와 일치하는 상품의 id를 찾아서 제거함
        {new: true}
      )
    let cart = userInfo.cart
    let array = cart.map(item => { // 해당 품목을 제외한 나머지 찜 상품들의 id를 배열로 저장.
      return item.id
    })
    const productInfo = await Post.find({_id: { $in: array}})
    res.status(200).json({productInfo, cart})
  }catch(err){
    res.status(500).json({message: err.message})
  }
  // 리덕스 store에 저장된 cartDetail에서 해당 품목 삭제
}

export const getListItems = async(req, res) => {
  const idList = req.body;
  const ids = idList.map(item => {
    return item.id
  })
  try{
    const likelists = await Post.find({_id : { $in : ids }})
    res.status(200).json(likelists)
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

export const getCartLists = async(req, res) => {
  const id = req.query.id
  try{
    const [cartLists] = await User.find({_id: id})
    res.status(200).json(cartLists.cart)
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

export const successPurchase = async(req, res) => {
  // 1. user collection의 history 필드 안에 간단 결제 정보 push
  let history = [];
  let transactionData = {}

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      paymentId: req.body.paymentData.paymentID
    })
  })
  console.log('userData from middleware :', req.user)
  // 2. payment collection에 구체적인 결제 정보 push
  transactionData.user = {
    id: req.userId
  }
  transactionData.data = req.body.paymentData
  transactionData.product = history

  try{
    const user = await User.findOneAndUpdate(
      {_id: req.userId},
      {$push: {history: history}, $set: {cart: []}},
      { new: true }
    )

    // Payment collection에 transactionData 정보 저장
    const payment = new Payment(transactionData);
    payment.save()

  // 3. post collection의 sold 필드 업데이트 시키기
  let products = [];
  payment.product.forEach(item => {
    products.push({id: item.id})
  })

  async.eachSeries(products, (item, callback) => {
    Post.updateOne(
      {_id: item.id},
      {$inc: {
        "sold" : item.quantity
      }},
      {new: false},
      callback
    )
  })

  // Post.updateOne()
  // Post.updateMany()

  }catch(err){
    res.status(500).json({message: err.message})
  }
}