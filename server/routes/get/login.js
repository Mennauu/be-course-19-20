export const login = (req, res) => {
  res.render('login', { success: req.flash('success') })
}
