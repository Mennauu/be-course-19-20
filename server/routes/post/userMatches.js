import User from '../../database/models/user.js'

export const userMatches = (req, res) => {
  User.updateOne(
    { _id: req.session.passport.user },
    {
      $addToSet: req.body,
    },
    (err, success) => {
      if (err) return res.redirect('back')
      if (success) {
        const userID = req.body.liked ? req.body.liked : req.body.disliked

        User.findOne({ _id: userID }, (err, person) => {
          if (err) res.redirect('back')
          if (person) {
            if (person.liked.includes(req.session.passport.user)) {
              User.updateOne(
                { _id: req.session.passport.user },
                {
                  $addToSet: { matched: userID },
                },
                (err, success) => {
                  if (err) return res.redirect('back')
                  if (success) {
                    console.log('id is toegevoegd aan `Matched`')

                    User.updateOne(
                      { _id: userID },
                      {
                        $addToSet: { matched: req.session.passport.user },
                      },
                      (err, success) => {
                        if (err) return res.redirect('back')
                        if (success) {
                          console.log('id is toegevoegd aan `Matched` (andere user)')

                          if (req.xhr) {
                            return res.send()
                          } else {
                            return res.redirect('back')
                          }
                        }
                      },
                    )
                  }
                },
              )
            } else {
              if (req.xhr) {
                return res.end()
              } else {
                return res.redirect('back')
              }
            }
          }
        })
      }
    },
  )
}
