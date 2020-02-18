class FormLogin {
  constructor(element) {
    this.element = element

    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener('submit', this.formHandler())
  }

  formHandler(event) {
    console.log(event)
  }
}

export default FormLogin
