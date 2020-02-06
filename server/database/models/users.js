const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  user_id: Number,
})

module.exports = mongoose.model('Users', usersSchema)
