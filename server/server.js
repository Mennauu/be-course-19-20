// Call and read process.env file
require('dotenv').config()

// Initialize database on server startup
import './database/database'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import multer from 'multer'
import nunjucks from 'nunjucks'

import { loginFail, loginSucces } from './data/messages.json'
import auth from './middleware/authentication/auth.js'

const shrinkRay = require('shrink-ray-current')
const serve = require('./middleware/headers/serve.js')
const route = require('./routes/routeHandler.js')
const upload = multer({ dest: 'server/assets/uploads/' })
const app = express()
const port = process.env.PORT || 3000

// Disable x-powered-by header
app.disable('x-powered-by')

// Configure Nunjucks as templating engine
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

nunjucks.configure(['server/views', 'server/components'], {
  express: app,
  autoescape: true,
  watch: true,
})

// Set global variables to use in templating
app.use((req, res, next) => {
  res.locals.environment = process.env.ENVIRONMENT === 'local' ? 'local' : process.env.ENVIRONMENT
  next()
})

// Brotli/GZIP HTML file compression
app.use(
  shrinkRay({
    filter: req => req.headers['accept'].includes(['text/html']),
  }),
)

// (allow other middleware to) populate req.cookies
app.use(cookieParser())

// read HTTP POST data in req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Middleware to create a server-side stored session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Static secret (please use env file)',
    saveUninitialized: false,
    resave: true,
  }),
)

/* Middleware that initialises Passport and changes 
  the (user) session id */
app.use(auth.initialize())
app.use(auth.session())

// Server side message handler
app.use(flash())

// Allow files to be accessible client-side + set cache headers
app.use(
  '/assets',
  express.static(__dirname + '/../build/assets', {
    maxAge: '365d',
    lastModified: '',
    etag: '',
  }),
)

app.use(
  '/assets/uploads',
  express.static(__dirname + '/../server/assets/uploads', {
    maxAge: '365d',
    lastModified: '',
    etag: '',
  }),
)

// app.use('/data', express.static(__dirname + '/../server/data'))

// Middleware for serving correct content type header
app.get(['*.js', '*.css'], serve.serveContentTypes)

// GET routes
app.get('/', route.root)
app.get('/login', route.login)
app.get('/logout', route.logout)
app.get('/register', route.register)
app.get('/home', route.home)
app.get('*', route.error)

// POST routes
app.post('/register-user', route.registerUser)
app.post('/user-settings', upload.single('avatar'), route.userSettings)
app.post('/user-matches', route.userMatches)
app.post(
  '/login-authenticate',
  auth.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: loginFail,
    successFlash: loginSucces,
    session: true,
  }),
)

// Initialize server
app.listen(port, () => console.log(`Server is listening on port: ${port}`))
