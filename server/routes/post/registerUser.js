import User from '../../database/models/user.js'
import validator from 'validator'
import error from '../../data/errors.json'

export const registerUser = (req, res) => {
  const { username, password } = req.body

  if (!validator.isByteLength(username, { min: 3 })) {
    req.flash('error_message', error.usernameLength)

    res.redirect('back')
  }

  if (!validator.isAlpha(username)) {
    console.log(error.usernameCheck)
    req.flash('error_message', error.usernameCheck)

    return res.redirect('back')
  }
  if (!validator.isByteLength(password, { min: 5 })) return console.log(error.passwordLength)

  const newUser = new User({ username, password })

  User.findOne({ username }, (err, result) => {
    if (err) console.log(err)

    if (result !== null) {
      console.log(`Username: ${username} already in database`)
      res.redirect(`${process.env.LOCAL_URI}home`)
    } else if (newUser.save()) {
      console.log(`Username: ${username} has been saved`)
      res.redirect(`${process.env.LOCAL_URI}home`)
    } else {
      console.log('There was an error trying to save the user')
    }
  })
}
