// Set correct Content Type Header per file extension
exports.serveContentTypes = (req, res, next) => {
  const extensionIndex = req.originalUrl.lastIndexOf('.')
  const extension = req.originalUrl.slice(extensionIndex)

  res.set('Content-Type', extension === '.js' ? 'text/javascript' : 'text/css')
  next()
}
