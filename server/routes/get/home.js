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
        if (err) console.log(err)

        if (results) {
          const persons = results.map(async match => {
            return await filterData(match)
          })

          const possibleMatches = await Promise.all(persons)

          const matches = await User.find({ _id: { $in: req.user.matched } }, results => results)

          res.render('home', {
            navigation: dataNavigation,
            username: req.user.username,
            avatar: req.user.avatar || avatar,
            authenticated: true,
            firstvisit: req.user.firstVisit,
            name: req.user.name || req.user.username,
            possibleMatches,
            matched: matches || [],
          })
        }
      })
    } else {
      res.render('home', {
        navigation: dataNavigation,
        username: req.user.username,
        avatar: req.user.avatar || avatar,
        authenticated: true,
        firstvisit: req.user.firstVisit,
        name: req.user.name || req.user.username,
      })
    }
  } else {
    res.redirect('/login')
  }
}

const filterData = ({ _id, username, avatar, age, gender, level }) => {
  return {
    id: _id,
    username,
    avatar,
    age,
    gender,
    level,
  }
}
