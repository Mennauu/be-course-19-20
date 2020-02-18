;(function() {
  'use strict'

  function _typeof(obj) {
    '@babel/helpers - typeof'

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function(obj) {
        return typeof obj
      }
    } else {
      _typeof = function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }
    }

    return _typeof(obj)
  }

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]

      return arr2
    }
  }

  function _iterableToArray(iter) {
    if (
      Symbol.iterator in Object(iter) ||
      Object.prototype.toString.call(iter) === '[object Arguments]'
    )
      return Array.from(iter)
  }

  function _nonIterableSpread() {
    throw new TypeError('Invalid attempt to spread non-iterable instance')
  }

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
            this.element.addEventListener('submit', this.formHandler())
          },
        },
        {
          key: 'formHandler',
          value: function formHandler(event) {
            console.log(event)
          },
        },
      ])

      return FormLogin
    })()

  var ModuleInit =
    /*#__PURE__*/
    (function() {
      function ModuleInit() {
        _classCallCheck(this, ModuleInit)
      }

      _createClass(ModuleInit, [
        {
          key: 'async',
          value: function async(selector, moduleName, opt_arguments) {
            var _this = this

            return new Promise(function(resolve) {
              var elements = _this.findElements(selector)

              if (!elements.length) return resolve([])
              moduleName().then(function(constructor) {
                var constructors = _this.findElements(selector).map(function(element) {
                  return _this.loadConstructor(element, constructor['default'], opt_arguments)
                })

                resolve(constructors)
              })
            })
          },
        },
        {
          key: 'sync',
          value: function sync(selector, constructor, opt_arguments) {
            var _this2 = this

            this.findElements(selector).forEach(function(element) {
              return _this2.loadConstructor(element, constructor, opt_arguments)
            })
          },
        },
        {
          key: 'loadConstructor',
          value: function loadConstructor(element, constructor, opt_arguments) {
            element._initializedModules = element._initializedModules || []
            if (element._initializedModules.indexOf(constructor.name) !== -1) return

            element._initializedModules.push(constructor.name)

            if (opt_arguments) {
              var constructorArguments = [null, element]
              Array.prototype.push.apply(constructorArguments, opt_arguments)
              return new (constructor.bind.apply(constructor, constructorArguments))()
            }

            if (_typeof(constructor) === 'object') return constructor
            return new constructor(element)
          },
        },
        {
          key: 'findElements',
          value: function findElements(selector) {
            return _toConsumableArray(document.querySelectorAll(selector))
          },
        },
      ])

      return ModuleInit
    })() // IE polyfill for constructor.name

  ;(function() {
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
      Object.defineProperty(Function.prototype, 'name', {
        get: function get() {
          var funcNameRegex = /function\s([^(]{1,})\(/
          var results = funcNameRegex.exec(this.toString())
          return results && results.length > 1 ? results[1].trim() : ''
        },
        set: function set() {
          // Empty function to prevent set is not a function
        },
      })
    }
  })() // Export the module init function

  var moduleInit = new ModuleInit()

  // Components
  moduleInit.sync('[js-hook-form-login]', FormLogin)
})()
