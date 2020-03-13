export const error = (req, res) => {
  res.render('error', { firstvisit: true })
}
