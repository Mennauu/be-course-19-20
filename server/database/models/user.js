const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user: String,
  hobbies: [],
  interests: [],
})

module.exports = mongoose.model('User', userSchema)
