import dataNavigation from '../../data/navigation.json'

export const home = (req, res) => {
  if (req.user) {
    const avatar = '/assets/images/avatar.svg'

    res.render('home', {
      navigation: dataNavigation,
      username: req.user.username,
      avatar: req.user.avatar || avatar,
      authenticated: true,
    })
  } else {
    res.redirect('/login')
  }
}
