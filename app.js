const express = require('express')
const nunjucks = require('nunjucks')
const route = require('./server/routes/routeHandler.js')
const app = express()
const port = process.env.PORT || 3000

require('dotenv').config()

nunjucks.configure('views', {
  express: app,
  autoescape: true,
})

app.disable('x-powered-by')

app.set('view engine', 'html')

app.use(
  express.static(__dirname + '/assets', {
    maxAge: '365d',
    lastModified: '',
    etag: '',
  }),
)

app.get('/', route.home)
app.get('/about', route.about)
app.get('/contact', route.contact)
app.get('*', route.error)

app.listen(port, () => console.log(`BE-COURSE listening on port ${port}!`))
