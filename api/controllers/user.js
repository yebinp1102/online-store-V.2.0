import User from '../models/User.js'


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