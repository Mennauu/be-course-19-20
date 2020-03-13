import Events from '@utilities/events'
import setTabIndexOfChildren from '@utilities/set-tabindex-of-children'
import cookies from 'js-cookie'

const COOKIE_BAR_HOOK = '[js-hook-cookies-bar]'
const COOKIE_OPTIONS_BUTTON_HOOK = '[js-hook-cookies-settings-button]'

const COOKIE_FORM_HOOK = '[js-hook-cookies-form]'
const COOKIE_FORM_SUBMIT_HOOK = '[js-hook-cookies-form-accept]'
const COOKIE_OPTION_HOOK = '[js-hook-cookies-option]'

const COOKIEBAR_COOKIE_NAME = 'accepted'
const COOKIEBAR_COOKIE_VERSION = 'version'
const SHOW_CLASS = 'cookie-bar--is-visible'

const COOKIE_DEFAULT_VALUE = '1'
const COOKIE_DECLINED_VALUE = '0'

const JS_HOOK_OVERLAY = '[js-hook-overlay]'
const SHOW_OVERLAY_CLASS = 'overlay--is-active'

class Cookies {
  constructor() {
    this.cookiebar = document.querySelector(COOKIE_BAR_HOOK)
    this.cookiebarOptionsButton = document.querySelector(COOKIE_OPTIONS_BUTTON_HOOK)

    this.cookiebarVersion = this.cookiebar.dataset.policyVersion || COOKIE_DEFAULT_VALUE

    this.overlay = document.querySelector(JS_HOOK_OVERLAY)

    this.form = {}
    this.form.element = document.querySelector(COOKIE_FORM_HOOK)

    this.hostname = window.location.hostname
    this.cookiePrefix = 'default'
    this.hostname = window.location.hostname

    this.cookieName = {
      functional: 'functional',
      analytics: 'analytics',
      social: 'social',
      advertising: 'advertising',
      other: 'other',
    }

    if (this.form.element) {
      this.form.url = this.form.element.getAttribute('action')
      this.form.options = [...this.form.element.querySelectorAll(COOKIE_OPTION_HOOK)]
      this.form.submit = this.form.element.querySelector(COOKIE_FORM_SUBMIT_HOOK)
    }

    this.config = {
      cookiePrefix: this.cookiePrefix,
      version: this.cookiebarVersion,
      cookies: [
        {
          name: this.cookieName.functional,
          default: COOKIE_DEFAULT_VALUE,
        },
        {
          name: this.cookieName.analytics,
          default: COOKIE_DEFAULT_VALUE,
        },
        {
          name: this.cookieName.social,
          default: COOKIE_DECLINED_VALUE,
        },
        {
          name: this.cookieName.advertising,
          default: COOKIE_DECLINED_VALUE,
        },
        {
          name: this.cookieName.other,
          default: COOKIE_DECLINED_VALUE,
        },
      ],
    }

    this.init()
  }

  init() {
    if (this.getCookie(COOKIEBAR_COOKIE_VERSION) !== this.config.version) {
      this._removeInvalidatedCookies()
    }

    this._setDefaultCookies()

    this._bindEvents()

    if (this.form.element) {
      this._prefillFormCookies()
    }

    if (!this.getCookie(COOKIEBAR_COOKIE_NAME)) {
      this.setCookie(COOKIEBAR_COOKIE_NAME, COOKIE_DECLINED_VALUE)
    }

    if (
      (this.getCookie(COOKIEBAR_COOKIE_VERSION) !== this.config.version && !this.form.element) ||
      (this.getCookie(COOKIEBAR_COOKIE_NAME) === COOKIE_DECLINED_VALUE && !this.form.element)
    ) {
      this._show()
    }
  }

  _bindEvents() {
    if (this.cookiebar) {
      Events.$on('cookies::dismiss', () => this._acceptAllCookies())
    }

    if (this.form.element) {
      Events.$on('cookies::preferences-default', () => this._setDefaultPreferences())
      this.form.element.addEventListener('submit', event => this._submitFormCookies(event))
    }

    if (
      !this.getCookie(COOKIEBAR_COOKIE_NAME) ||
      !this.getCookie(COOKIEBAR_COOKIE_NAME) === COOKIE_DECLINED_VALUE
    ) {
      ;[...document.querySelectorAll('a')]
        .filter(link => link !== this.cookiebarOptionsButton)
        .forEach(link => {
          link.addEventListener('click', event => {
            const url = event.currentTarget.href
            const newTab = event.currentTarget.target === '_blank'
            const isSameDomain = this.hostname === link.hostname

            if (isSameDomain) {
              this._acceptAllCookies()

              if (url && !newTab) {
                window.location = url
              }
            }
          })
        })
    }
  }

  _setDefaultCookies() {
    this.config.cookies.forEach(cookie => {
      if (!this.getCookie(cookie.name) && cookie.default === COOKIE_DEFAULT_VALUE) {
        this.setCookie(cookie.name, cookie.default)
      }
    })
  }

  _acceptAllCookies() {
    const acceptedCookies = {}

    this.config.cookies.forEach(cookie => {
      this.setCookie(cookie.name, this.config.version)
      acceptedCookies[this.prefixCookieName(cookie.name)] = this.config.version
    })

    this._addGlobalCookies(acceptedCookies)

    window.location.reload()
  }

  _addGlobalCookies(_cookies) {
    _cookies.date = Date(Date.now())
    _cookies.version = this.config.version

    this.setCookie(COOKIEBAR_COOKIE_NAME, _cookies)
    this.setCookie(COOKIEBAR_COOKIE_VERSION, this.config.version)
  }

  _prefillFormCookies() {
    this.form.options.forEach(option => {
      if (this.getCookie(option.value) === this.config.version) {
        option.setAttribute('checked', 'checked')
      } else if (this.getCookie(option.value) === COOKIE_DECLINED_VALUE) {
        option.removeAttribute('checked')
      } else {
        option.setAttribute('checked', 'checked')
      }
    })
  }

  _removeInvalidatedCookies() {
    this.config.cookies.forEach(cookie => {
      this.removeCookie(cookie.name)
    })

    this.removeCookie(COOKIEBAR_COOKIE_NAME)
    this.removeCookie(COOKIEBAR_COOKIE_VERSION)
  }

  _submitFormCookies(event) {
    event.preventDefault()

    const acceptedCookies = {}

    this.form.options.forEach(option => {
      const { value } = option
      this.config.cookies.forEach(cookie => {
        if (cookie.name.indexOf(value) !== -1) {
          const state = option.checked ? this.config.version : COOKIE_DECLINED_VALUE
          this.setCookie(value, state)
          acceptedCookies[this.prefixCookieName(value)] = state
        }
      })
    })

    this._addGlobalCookies(acceptedCookies)

    window.location = this.form.url
  }

  _setDefaultPreferences() {
    this.form.options.forEach(option => {
      option.setAttribute('checked', 'checked')
    })
  }

  _show() {
    if (this.cookiebar) {
      this.cookiebar.classList.add(SHOW_CLASS)
      this.overlay.classList.add(SHOW_OVERLAY_CLASS)
      this.cookiebar.tabIndex = 0
      setTabIndexOfChildren(this.cookiebar, 0)

      this.cookiebar.focus()
      Events.$trigger('focustrap::activate', {
        data: {
          element: this.cookiebar,
        },
      })
    }
  }

  /**
   * Sets cookie with given value
   * @param {String} name
   * @param {any} value
   */
  setCookie(name, value) {
    cookies.set(this.prefixCookieName(name), value, { expires: 365 })
  }

  /**
   * Remove cookie with given value
   * @param {String} name
   */
  removeCookie(name) {
    cookies.remove(this.prefixCookieName(name))
  }

  /**
   * Gets cookie with given value
   * @param {String} name
   * @returns {Any} value
   */
  getCookie(name) {
    return cookies.get(this.prefixCookieName(name))
  }

  prefixCookieName(name) {
    return `${this.config.cookiePrefix}-cookie-${name}`
  }

  /**
   * Checks if cookie is valid and version is correct
   * @returns {Boolean}
   */
  cookieIsValid(name) {
    return (
      this.getCookie(COOKIEBAR_COOKIE_VERSION) === this.config.version &&
      cookies.get(this.prefixCookieName(name)) === this.config.version
    )
  }
}

export default new Cookies()
