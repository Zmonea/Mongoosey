const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  gold: {type: Number, default: 300},
  cart: []
})

const User = mongoose.model('User', userSchema)

module.exports = User