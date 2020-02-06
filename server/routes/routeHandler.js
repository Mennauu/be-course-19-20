const dataNavigation = require('../data/navigation.json')

exports.root = (req, res) => {
  res.redirect('/login')
}

exports.login = (req, res) => {
  res.render('login')
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

exports.home = (req, res) => {
  res.render('home', {
    navigation: dataNavigation,
  })
}

exports.about = (req, res) => {
  res.render('about', {
    navigation: dataNavigation,
  })
}

exports.contact = (req, res) => {
  res.render('contact', {
    navigation: dataNavigation,
  })
}

exports.error = (req, res) => {
  res.render('error', {
    navigation: dataNavigation,
  })
}
