export const login = (req, res) => {
  if (req.user) {
    res.redirect('/home')
  } else {
    res.render('login', {
      success: req.flash('success'),
      error: req.flash('error'),
      firstvisit: true,
    })
  }
}
