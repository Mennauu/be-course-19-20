const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  name: String,
  images: [],
  hobbies: [],
  interests: [],
})

module.exports = mongoose.model('User', userSchema)
