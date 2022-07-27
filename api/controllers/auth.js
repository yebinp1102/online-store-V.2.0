import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// 로그인
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try{
    const exsitingUser = await User.findOne({ email })
    if(!exsitingUser) return res.status(404).json({message: "존재하지 않는 유저입니다."})
    const isPwdVaild = await bcrypt.compare(password, exsitingUser.password);
    if(!isPwdVaild) return res.status(404).json({message: "비밀번호가 일치하지 않습니다."})
    const token = jwt.sign({email: exsitingUser.email, id: exsitingUser._id}, 'test', {expiresIn: "12h"})
    res.status(200).json({result: exsitingUser, token})
  }catch(err){
    res.status(500).json({message: '로그인에 실패 했습니다.'})
  }
}

// 회원가입
export const signup = async (req, res) => {
  const {username, email, password, confirmPassword} = req.body;
  try{
    const exsitingUser = await User.findOne({ email })
    if(exsitingUser) return res.status(400).json({message: "이미 다른 사용자가 사용 중인 이메일 입니다."})
    if(password !== confirmPassword) return res.status(400).json({message: "비밀번호가 일치하지 않습니다."})
    const hashedPwd = await bcrypt.hash(password, 10)
    const result = await User.create({username, email, password: hashedPwd})
    // 토큰의 유효 기간은 12시간이며, 사용자의 이메일과 고유 식별 번호에 대한 정보를 담고 있다.
    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "12h"})
    res.status(200).json({result, token})
  }catch(err){
    res.status(500).json({message: '회원가입에 실패 했습니다.'})
  }
}