import { root } from './get/root.js'
import { login } from './get/login.js'
import { logout } from './get/logout.js'
import { register } from './get/register.js'
import { home } from './get/home.js'
import { about } from './get/about.js'
import { contact } from './get/contact.js'
import { error } from './get/error.js'
import { registerUser } from './post/registerUser.js'

// GET
exports.root = (req, res) => root(req, res)
exports.login = (req, res) => login(req, res)
exports.logout = (req, res) => logout(req, res)
exports.register = (req, res) => register(req, res)
exports.home = (req, res) => home(req, res)
exports.about = (req, res) => about(req, res)
exports.contact = (req, res) => contact(req, res)
exports.error = (req, res) => error(req, res)

// POST
exports.registerUser = (req, res) => registerUser(req, res)
