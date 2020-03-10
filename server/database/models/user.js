const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  age: Number,
  gender: String,
  attractedGender: String,
  ageMin: Number,
  ageMax: Number,
  level: String,
  avatar: String,
  images: [],
})

module.exports = mongoose.model('User', userSchema)
