import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  author: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  text: String,
  images: {type: [String]},
  parent: {type: mongoose.Types.ObjectId, ref: "Post"},
  likesCount: {type: Number, default: 0},
  commentsCount: {type: Number, default: 0},
}, {
  timestamps: true
})

const Post = models?.Post || model('Post', PostSchema)

export default Post