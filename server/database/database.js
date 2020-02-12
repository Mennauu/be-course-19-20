const mongoose = require('mongoose')

require('dotenv').config()

const server = 'localhost'
const database = 'dating'
const uristring = process.env.MONGODB_URI || `mongodb://${server}/${database}`

class Database {
  constructor() {
    this.connect()
  }

  connect() {
    mongoose
      .connect(uristring, { useNewUrlParser: true })
      .then(() => {
        // mongoose.connection.db.dropDatabase();
        console.log('Database connection successful: ' + uristring)
      })
      .catch(err => {
        console.error('Database connection error: ' + uristring)
        console.error(err)
      })
  }
}

module.exports = new Database()
