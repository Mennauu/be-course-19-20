const dataNavigation = require('../data/navigation.json')

exports.home = (req, res) => {
  res.render('home', {
    layout: 'default',
    template: 'template__home',
    navigation: dataNavigation,
  })
}

exports.about = (req, res) => {
  res.render('about', {
    layout: 'default',
    template: 'template__about',
  })
}

exports.contact = (req, res) => {
  res.render('contact', {
    layout: 'default',
    template: 'template__contact',
  })
}

exports.error = (req, res) => {
  res.render('error', {
    layout: 'default',
    template: 'template__error',
  })
}
