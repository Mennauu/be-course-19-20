const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../database/models/user.js')

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'Incorrect username.' })

      if (!user.validatePassword(password, user.password)) return done(null, false)

      return done(null, user)
    })
  }),
)

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)))

module.exports = passport
