import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// routes
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
dotenv.config();
app.use(cors());
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)

// const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  try{
    mongoose.connect(process.env.CONNECTION_URL)
    console.log('데이터베이스가 정상적으로 작동 중입니다.')
  }catch(err){
    console.log(err)
  }
  console.log('서버가 정상적으로 작동 중 입니다.')
})