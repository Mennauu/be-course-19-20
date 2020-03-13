const JS_HOOK_FORM_MATCH_BUTTONS = '[js-hook-form-match-button]'

class Match {
  constructor(element) {
    this.form = element
    this.buttons = [...element.querySelectorAll(JS_HOOK_FORM_MATCH_BUTTONS)]

    this.bindEvents()
  }

  initialLoadEvents() {}

  bindEvents() {
    for (const button of this.buttons) {
      button.addEventListener('click', () => this.formHandler(event))
    }
  }

  formHandler(event) {
    event.preventDefault()

    const buttonName = event.target.parentNode.name
      ? event.target.parentNode.name
      : event.target.name
    const buttonValue = event.target.parentNode.value
      ? event.target.parentNode.value
      : event.target.value

    this.postRequest(buttonName, buttonValue)
  }

  async postRequest(key, value) {
    try {
      const values = { [key]: value }

      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }

      const response = await fetch('/user-matches', config)
      const text = await response.text()
      const data = text === '' ? {} : JSON.parse(text)

      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  submitForm() {
    this.form.submit()
  }
}

export default Match
