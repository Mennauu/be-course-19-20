export const login = (req, res) => {
  res.render('login')
  console.log(req.flash('error'))
}
