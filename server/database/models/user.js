const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  avatar: String,
  images: [],
  hobbies: [],
  interests: [],
})

module.exports = mongoose.model('User', userSchema)
