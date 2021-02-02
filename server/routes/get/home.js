import rangeInclusive from 'range-inclusive'

import dataNavigation from '../../data/navigation.json'
import User from '../../database/models/user.js'

export const home = async (req, res) => {
  if (req.user) {
    const avatar = '/assets/images/avatar.svg'

    if (!req.user.firstVisit) {
      const fromAge = req.user.fromAge
      const toAge = req.user.toAge
      const allowedAges = rangeInclusive(fromAge, toAge, 1)
      let attraction = req.user.attraction

      switch (attraction) {
        case 'Males':
          attraction = 'Male'
          break
        case 'Females':
          attraction = 'Female'
          break
        default:
          attraction = 'Any'
      }

      await User.find({ age: allowedAges, gender: attraction }, async (err, results) => {
        if (err) return res.redirect('back')

        if (results) {
          const filteredResults = results.filter(
            match => !req.user.liked.includes(match._id) && !req.user.disliked.includes(match._id),
          )
          const persons = filterAllData(filteredResults)
          const matches = await User.find({ _id: { $in: req.user.matched } }, results => results)
          const matchedUser = req.flash('matcheduser')[0]
          const matchedAvatar = req.flash('matchedavatar')[0]

          res.render('home', {
            navigation: dataNavigation,
            username: req.user.username,
            avatar: req.user.avatar || avatar,
            authenticated: true,
            firstvisit: req.user.firstVisit,
            name: req.user.name || req.user.username,
            possibleMatches: persons,
            matched: matches || [],
            matcheduser: matchedUser,
            matchedavatar: matchedAvatar,
          })
        }
      })
    } else {
      const notificationMessage = req.flash('error')[0]

      res.render('home', {
        navigation: dataNavigation,
        username: req.user.username,
        avatar: req.user.avatar || avatar,
        authenticated: true,
        firstvisit: req.user.firstVisit,
        name: req.user.name || req.user.username,
        notificationMessage,
      })
    }
  } else {
    res.redirect('/login')
  }
}

const filterAllData = data => {
  return data.map(filterSingleData)
}

const filterSingleData = ({ _id, username, avatar, age, gender, level }) => {
  return {
    id: _id,
    username,
    avatar,
    age,
    gender,
    level,
  }
}
