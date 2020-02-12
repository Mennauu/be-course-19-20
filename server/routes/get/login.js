export const login = (req, res) => {
  res.render('login', { success: req.flash('success'), error: req.flash('error') })
}
