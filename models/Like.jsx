const { Schema, default: mongoose, models, model } = require("mongoose");

const LikeSchema = new Schema({
  author: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  post: {type: mongoose.Types.ObjectId, ref: 'Post', required: true},
}, {
  timestamps: true,
})

const Like = models?.Like || model('Like', LikeSchema)

export default Like