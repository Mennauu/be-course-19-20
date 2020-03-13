export const register = (req, res) => {
  if (req.user) {
    res.redirect('/home')
  } else {
    res.render('register', { error: req.flash('error'), firstvisit: true })
  }
}
