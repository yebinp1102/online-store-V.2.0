import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username :  String,
  email : String,
  password: String, 
  confirmPassword : String,
  isAdmin: {
    type : Boolean,
    default: false,
  },
  cart : {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const User = mongoose.model('User', UserSchema)

export default User;