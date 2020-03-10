import validator from 'validator'

import { addClass, emptyText, removeClass, setText } from '../../assets/javascript/pure/pure.js'
import message from '../../data/messages.json'

const JS_HOOK_INPUT_USERNAME = '[js-hook-input-username]'
const JS_HOOK_INPUT_PASSWORD = '[js-hook-input-password]'
const JS_HOOK_FORM_ERROR = '[js-hook-form-error]'

const CLASS_FORM_ERROR = 'form__message--has-error'
const CLASS_INPUT_ERROR = 'input--has-error'

class FormLogin {
  constructor(element) {
    this.form = element
    this.inputUsername = element.querySelector(JS_HOOK_INPUT_USERNAME)
    this.inputPassword = element.querySelector(JS_HOOK_INPUT_PASSWORD)
    this.messageElement = element.querySelector(JS_HOOK_FORM_ERROR)

    this.bindEvents()
  }

  bindEvents() {
    this.form.addEventListener('submit', () => this.formHandler(event))
  }

  formHandler(event) {
    event.preventDefault()

    this.validationEvents(this.inputUsername.value, this.inputPassword.value)
  }

  validationEvents(username, password) {
    // Validate username length
    if (!validator.isByteLength(username, { min: 3, max: 20 })) {
      return this.errorHandler(
        this.messageElement,
        this.inputUsername,
        message.usernameLoginLength,
        CLASS_FORM_ERROR,
        CLASS_INPUT_ERROR,
      )
    }
    // Check if username contains only letters and numbers
    if (!validator.isAlphanumeric(username)) {
      return this.errorHandler(
        this.messageElement,
        this.inputUsername,
        message.usernameLoginCheck,
        CLASS_FORM_ERROR,
        CLASS_INPUT_ERROR,
      )
    }
    // Validate password length
    if (!validator.isByteLength(password, { min: 6, max: 256 })) {
      return this.errorHandler(
        this.messageElement,
        this.inputPassword,
        message.passwordLoginLength,
        CLASS_FORM_ERROR,
        CLASS_INPUT_ERROR,
      )
    }

    this.submitForm()
  }

  errorHandler(element, input, message, formErrorClass, inputErrorClass) {
    if (element.classList.contains(formErrorClass)) {
      removeClass(element, formErrorClass)

      element.addEventListener('transitionend', () => {
        emptyText(element)
        addClass(element, formErrorClass)
        setText(element, message)
      })
    } else {
      emptyText(element)
      addClass(element, formErrorClass)
      setText(element, message)
    }

    if (input !== this.inputUsername && this.inputUsername.classList.contains(inputErrorClass)) {
      removeClass(this.inputUsername, inputErrorClass)
    }

    if (input.classList.contains(inputErrorClass)) {
      removeClass(input, inputErrorClass)

      input.addEventListener('transitionend', () => {
        addClass(input, inputErrorClass)
      })
    } else {
      addClass(input, inputErrorClass)
    }
  }

  submitForm() {
    this.form.submit()
  }
}

export default FormLogin
