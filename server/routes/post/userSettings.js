import message from '../../data/messages.json'
import User from '../../database/models/user.js'

export const userSettings = (req, res) => {
  User.updateOne(
    { _id: req.session.passport.user },
    {
      _id: req.session.passport.user,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      attraction: req.body.attraction,
      fromAge: req.body.fromAge,
      toAge: req.body.toAge,
      avatar: `assets/uploads/${req.file.filename}`,
      level: req.body.level,
      firstVisit: false,
    },
    (err, result) => {
      if (err) {
        req.flash('error', message.userSettingsFail)

        return res.redirect('back')
      }

      if (result) {
        req.flash('error', message.userSettingsSuccess)

        return res.redirect('back')
      }
    },
  )
}
