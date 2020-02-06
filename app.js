const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')
const auth = require('./server/authentication/auth.js')
const route = require('./server/routes/routeHandler.js')
const app = express()
const port = process.env.PORT || 3000

require('./server/database/database.js')
require('dotenv').config()

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true,
})

app.disable('x-powered-by')

app.engine('html', nunjucks.render)
app.set('view engine', 'html')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  express.static(__dirname + '/assets', {
    maxAge: '365d',
    lastModified: '',
    etag: '',
  }),
)
app.use(session({ secret: 'We all love BEM', saveUninitialized: false, resave: true }))
app.use(auth.initialize())
app.use(auth.session())
app.use(flash())

app.get('/', route.root)
app.get('/login', route.login)
app.get('/logout', route.logout)
app.get('/register', route.register)
app.get('/home', route.home)
app.get('/about', route.about)
app.get('/contact', route.contact)
app.get('*', route.error)

app.post(
  '/login',
  auth.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
  }),
)

app.listen(port, () => console.log(`BE-COURSE listening on port ${port}!`))
