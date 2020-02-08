import User from '../../database/models/user.js'
import validator from 'validator'
import message from '../../data/messages.json'

export const registerUser = (req, res) => {
  const { username, password } = req.body

  if (validateUsernameLength(username)) {
    req.flash('error', message.usernameLength)

    return res.redirect('back')
  }

  if (validateUsernameAlpha(username)) {
    req.flash('error', message.usernameCheck)

    return res.redirect('back')
  }

  if (validatePasswordLength(password)) {
    req.flash('error', message.passwordLength)

    return res.redirect('back')
  }

  createNewUser(req, res, username, password)
}

const validateUsernameLength = username => !validator.isByteLength(username, { min: 3 })
const validateUsernameAlpha = username => !validator.isAlpha(username)
const validatePasswordLength = password => !validator.isByteLength(password, { min: 5 })

const createNewUser = (req, res, username, password) => {
  const newUser = new User({ username, password })

  /* Loop through database to check if username already exists */
  User.findOne({ username }, (err, result) => {
    if (err) {
      req.flash('error', message.usernameCreationFails)

      return res.redirect('back')
    }

    /* If username doesn't exist, result will always be null */
    if (result !== null) {
      req.flash('error', message.usernameIsTaken)

      return res.redirect('back')
    } else {
      const add = newUser.save()

      if (add) {
        req.flash('success', message.accountHasBeenCreated)

        res.redirect(`${process.env.LOCAL_URI}home`)
      }
    }
  })
}
