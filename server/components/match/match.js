const JS_HOOK_MATCH = '[js-hook-match]'
const JS_HOOK_FORM_MATCH_BUTTONS = '[js-hook-form-match-button]'
const JS_HOOK_SINGLE_MATCH_WRAPPER = '[js-hook-single-match-wrapper]'

const CLASS_IS_TRANSITIONING = 'match--is-transitioning'

class Match {
  constructor(element) {
    this.form = element
    this.buttons = [...element.querySelectorAll(JS_HOOK_FORM_MATCH_BUTTONS)]
    this.matchWrapper = document.querySelector(JS_HOOK_SINGLE_MATCH_WRAPPER)

    if (!this.matchWrapper.hasChildNodes()) {
      console.log('hoi')
    }

    this.bindEvents()
  }

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

      if (data) {
        const element = this.form.closest(JS_HOOK_MATCH)

        element.classList.add(CLASS_IS_TRANSITIONING)
        element.addEventListener('transitionend', () => {
          element.remove()

          if (!this.matchWrapper.children.length) {
            this.matchWrapper.insertAdjacentHTML(
              'afterbegin',
              `<h3>I'm sorry, I can't find anyone! Maybe <a href="/profile">adjust your age range?</a></h3>`,
            )
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  submitForm() {
    this.form.submit()
  }
}

export default Match
