import validator from 'validator'

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

    this.messageElement.textContent = ''

    if (!validator.isByteLength(this.inputUsername.value, { min: 3, max: 20 })) {
      this.errorHandler(message.usernameLength)

      // this.inputUsername.classList.add(CLASS_INPUT_ERROR) -----> FIX THIS
    }
  }

  errorHandler(message) {
    this.messageElement.textContent = ''

    if (this.messageElement.classList.contains(CLASS_FORM_ERROR))
      this.messageElement.classList.remove(CLASS_FORM_ERROR)

    this.messageElement.textContent = message

    this.messageElement.classList.add(CLASS_FORM_ERROR)
  }
}

export default FormLogin
