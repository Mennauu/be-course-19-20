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
                    User.updateOne(
                      { _id: userID },
                      {
                        $addToSet: { matched: req.session.passport.user },
                      },
                      (err, success) => {
                        if (err) return res.redirect('back')
                        if (success) {
                          if (req.xhr) {
                            User.findOne({ _id: req.session.passport.user }, (err, sessionUser) => {
                              if (err) res.redirect('back')
                              if (sessionUser) {
                                const clientData = {
                                  username: person.username,
                                  avatar: person.avatar,
                                  age: person.age,
                                  id: person._id,
                                  match: true,
                                  ownUsername: sessionUser.username,
                                  ownAvatar: sessionUser.avatar,
                                }

                                return res.send(JSON.stringify(clientData))
                              }
                            })
                          } else {
                            req.flash('matchedavatar', person.avatar)
                            req.flash('matcheduser', person.username)

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
                return res.send(JSON.stringify({}))
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
