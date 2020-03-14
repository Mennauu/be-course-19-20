import message from '../../data/messages.json'
import User from '../../database/models/user.js'

export const userMatches = (req, res) => {
  User.updateOne(
    { _id: req.session.passport.user },
    {
      $addToSet: req.body,
    },
    (err, success) => {
      if (err) {
        req.flash('error', message.userMatchFail)
        res.end()

        return err
      }

      if (success) {
        req.flash('error', message.userMatchSuccess)
        res.end()

        return success
      }
    },
  )

  const userID = req.body.liked ? req.body.liked : req.body.disliked

  User.findOne({ _id: userID }, (err, person) => {
    if (person.liked.includes(req.session.passport.user)) {
      User.updateOne(
        { _id: req.session.passport.user },
        {
          $addToSet: { matched: userID },
        },
        (err, success) => {
          if (err) console.log(err)
          if (success) console.log('Toegevoegd aan Matched')
        },
      )

      User.updateOne(
        { _id: userID },
        {
          $addToSet: { matched: req.session.passport.user },
        },
        (err, success) => {
          if (err) console.log(err)
          if (success) console.log('Toegevoegd aan Matched')
        },
      )
    } else {
      console.log('Geen match')
    }
  })

  res.end()
}
