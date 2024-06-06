const { Schema, default: mongoose, models, model } = require("mongoose");

const FollowSchema = new Schema({
  source: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  destination: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
})

const Follow = models?.Follow || model('Follow', FollowSchema)

export default Follow