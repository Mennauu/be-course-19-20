import validator from 'validator'

import message from '../../data/messages.json'
import User from '../../database/models/user.js'
// import { generateRandomFemaleUsers, generateRandomMaleUsers } from './generateRandomUsers.js'

export const registerUser = (req, res) => {
  const { username, password } = req.body
  const passwordCheck = req.body['password-check']

  // generateRandomFemaleUsers()
  // generateRandomMaleUsers()

  // Validate username length
  if (!validator.isByteLength(username, { min: 3, max: 20 })) {
    req.flash('error', message.usernameLength)

    return res.redirect('back')
  }

  // Check if username contains only letters and numbers
  if (!validator.isAlphanumeric(username)) {
    req.flash('error', message.usernameCheck)

    return res.redirect('back')
  }

  // Validate password length
  if (!validator.isByteLength(password, { min: 6, max: 256 })) {
    req.flash('error', message.passwordLength)

    return res.redirect('back')
  }

  // Validate if confirmed password is equal to password
  if (!validator.equals(passwordCheck, password)) {
    req.flash('error', message.passwordConfirmedCheck)

    return res.redirect('back')
  }

  createNewUser(req, res, username, password)
}

const createNewUser = (req, res, username, password) => {
  const newUser = new User({ username, password, firstVisit: true })

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

        req.login(newUser, () => res.redirect('/home'))
      }
    }
  })
}
