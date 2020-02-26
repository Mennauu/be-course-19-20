import homeNavigation from '../../data/homeNavigation.json'

export const root = (req, res) => {
  if (req.user) {
    res.redirect('/home')
  } else {
    res.render('root', {
      navigation: homeNavigation,
      bodyClass: 't-root',
    })
  }
}
