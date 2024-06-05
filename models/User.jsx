import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  image: String,
  cover: String,
  bio: String,
  postsCount: {type: Number, default: 0},
}, {
  timestamps: true
})

const User = models?.User || model('User', UserSchema)

export default User