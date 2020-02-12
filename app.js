import './server/database/database.js'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import nunjucks from 'nunjucks'

import auth from './server/authentication/auth.js'
import { loginFail, loginSucces } from './server/data/messages.json'

const route = require('./server/routes/routeHandler.js')
const app = express()
const port = process.env.PORT || 3000

require('dotenv').config()

app.disable('x-powered-by')

app.engine('html', nunjucks.render)
app.set('view engine', 'html')

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true,
})

// Set correct Content Type Header per file extension
app.get(['*.js', '*.css'], (req, res, next) => {
  const extensionIndex = req.originalUrl.lastIndexOf('.')
  const extension = req.originalUrl.slice(extensionIndex)

  res.set('Content-Type', extension === '.js' ? 'text/javascript' : 'text/css')
  next()
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  '/assets',
  express.static(__dirname + '/assets', {
    maxAge: '365d',
    lastModified: '',
    etag: '',
  }),
)
app.use(
  '/data',
  express.static(__dirname + '/server/data', {
    maxAge: '365d',
    lastModified: '',
    etag: '',
  }),
)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Static secret (please use env file)',
    saveUninitialized: false,
    resave: true,
  }),
)
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
  '/login-authenticate',
  auth.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: loginFail,
    successFlash: loginSucces,
  }),
)

app.post('/register-user', route.registerUser)

app.listen(port, () => console.log(`Server is listening on port: ${port}`))
