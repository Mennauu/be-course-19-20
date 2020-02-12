;(function() {
  'use strict'

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  var formLogin = function formLogin() {
    var JS_HOOK_FORM_LOGIN = '[js-hook-form-login]'
    var ELEMENT_FORM_LOGIN = document.querySelector(JS_HOOK_FORM_LOGIN) || null

    if (ELEMENT_FORM_LOGIN !== null) {
      var FormLogin =
        /*#__PURE__*/
        (function() {
          function FormLogin(element) {
            _classCallCheck(this, FormLogin)

            this.element = element
            this.bindEvents()
          }

          _createClass(FormLogin, [
            {
              key: 'bindEvents',
              value: function bindEvents() {
                this.element.addEventListener('submit', this.formHandler(event))
              },
            },
            {
              key: 'formHandler',
              value: function formHandler(event) {
                event.preventDefault()
                console.log('dit is een test')
              },
            },
          ])

          return FormLogin
        })()

      new FormLogin(ELEMENT_FORM_LOGIN)
    }
  }

  var init = function init() {
    formLogin()
  }

  init()
})()
