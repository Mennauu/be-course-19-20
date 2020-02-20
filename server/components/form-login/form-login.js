import validator from 'validator'

const JS_HOOK_INPUT_USERNAME = '[js-hook-input-username]'
const JS_HOOK_INPUT_PASSWORD = '[js-hook-input-password]'

class FormLogin {
  constructor(element) {
    this.form = element
    this.inputUsername = element.querySelector(JS_HOOK_INPUT_USERNAME)
    this.inputPassword = element.querySelector(JS_HOOK_INPUT_PASSWORD)

    this.bindEvents()
  }

  bindEvents() {
    this.form.addEventListener('submit', () => this.formHandler(event))
  }

  formHandler(event) {
    event.preventDefault()
    console.log(this.inputUsername.value)
    if (validator.isByteLength(this.inputUsername.value, { min: 3, max: 20 })) {
      console.log(`Username isn't long enough`)
    }
  }
}

export default FormLogin
