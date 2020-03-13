import rootNavigation from '../../data/rootNavigation.json'

export const root = (req, res) => {
  if (req.user) {
    res.redirect('/home')
  } else {
    res.render('root', {
      navigation: rootNavigation,
      bodyClass: 't-root',
      firstvisit: true,
    })
  }
}
