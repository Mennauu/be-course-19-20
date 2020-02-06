const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) done(err)
      if (!user) done(null, false, { message: 'Incorrect username!' })
      if (!user.validPassword(password)) done(null, false, { message: 'Incorrect password!' })

      return done(null, user)
    })
  }),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
