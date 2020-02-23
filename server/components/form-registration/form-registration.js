import validator from 'validator'

import message from '../../data/messages.json'

const JS_HOOK_INPUT_USERNAME = '[js-hook-input-username]'
const JS_HOOK_INPUT_PASSWORD = '[js-hook-input-password]'
const JS_HOOK_FORM_ERROR = '[js-hook-form-error]'

const CLASS_FORM_ERROR = 'form__message--has-error'
const CLASS_INPUT_ERROR = 'input--has-error'

class FormRegister {
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
        message.usernameLength,
        CLASS_FORM_ERROR,
        CLASS_INPUT_ERROR,
      )
    }
    // Check if username contains only letters
    if (!validator.isAlpha(username)) {
      return this.errorHandler(
        this.messageElement,
        this.inputUsername,
        message.usernameCheck,
        CLASS_FORM_ERROR,
        CLASS_INPUT_ERROR,
      )
    }
    // Validate password length
    if (!validator.isByteLength(password, { min: 6, max: 256 })) {
      return this.errorHandler(
        this.messageElement,
        this.inputPassword,
        message.passwordLength,
        CLASS_FORM_ERROR,
        CLASS_INPUT_ERROR,
      )
    }

    this.submitForm()
  }

  errorHandler(element, input, message, formErrorClass, inputErrorClass) {
    if (element.classList.contains(formErrorClass)) {
      removeActiveClasses(element, formErrorClass)

      element.addEventListener('transitionend', () => {
        emptyMessage(element)
        addActiveClasses(element, formErrorClass)
        setMessage(element, message)
      })
    } else {
      emptyMessage(element)
      addActiveClasses(element, formErrorClass)
      setMessage(element, message)
    }

    if (input !== this.inputUsername && this.inputUsername.classList.contains(inputErrorClass)) {
      removeActiveClasses(this.inputUsername, inputErrorClass)
    }

    if (input.classList.contains(inputErrorClass)) {
      removeActiveClasses(input, inputErrorClass)

      input.addEventListener('transitionend', () => {
        addActiveClasses(input, inputErrorClass)
      })
    } else {
      addActiveClasses(input, inputErrorClass)
    }
  }

  submitForm() {
    this.form.submit()
  }
}

const setMessage = (element, message) => {
  element.textContent = message
}

const emptyMessage = element => {
  element.textContent = ''
}

const addActiveClasses = (element, errorClass) => {
  element.classList.add(errorClass)
}

const removeActiveClasses = (element, errorClass) => {
  element.classList.remove(errorClass)
}

export default FormRegister
