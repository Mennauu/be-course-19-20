import dataNavigation from '../../data/navigation.json'

export const home = (req, res) => {
  if (req.user) {
    res.render('home', {
      navigation: dataNavigation,
    })
  } else {
    res.redirect('/login')
  }
}
