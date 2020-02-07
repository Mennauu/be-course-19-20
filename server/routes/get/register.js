export const register = (req, res) => {
  res.render('register', { error: req.flash('error_message') })
}
