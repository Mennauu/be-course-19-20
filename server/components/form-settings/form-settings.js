import debounce from 'debounce'

const JS_HOOK_NEXT_BUTTON = '[js-hook-next-button]'
const JS_HOOK_INPUT_NAME = '[js-hook-input-name]'
const JS_HOOK_GENDER_FORM = '[js-hook-gender-form]'

const CLASS_INPUT_IS_VISIBLE = 'form__item--is-visible'

class FormSettings {
  constructor(element) {
    this.form = element
    this.inputName = element.querySelector(JS_HOOK_INPUT_NAME)
    this.genderForm = element.querySelector(JS_HOOK_GENDER_FORM)

    this.nextButton = element.querySelector(JS_HOOK_NEXT_BUTTON)

    this.inputName.focus()
    this.disableButton()
    this.bindEvents()
  }

  bindEvents() {
    this.nextButton.addEventListener('click', () => this.formHandler())
    this.inputName.addEventListener(
      'keydown',
      debounce(element => {
        this.enableButton(element)
      }, 200),
    )
  }

  formHandler() {
    // this.genderForm.classList.add(CLASS_INPUT_IS_VISIBLE)
    // if (this.genderForm.classList.contains(CLASS_INPUT_IS_VISIBLE)) {
    //   this.scrollToPosition()
    // }
  }

  scrollToPosition() {
    this.genderForm.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    })
  }

  enableButton(element) {
    const elementLength = element.srcElement.value.length

    if (elementLength >= 2 && this.nextButton.hasAttribute('disabled')) {
      this.nextButton.removeAttribute('disabled')
    }

    if (elementLength < 2 && !this.nextButton.hasAttribute('disabled')) {
      this.disableButton()
    }
  }

  disableButton() {
    this.nextButton.setAttribute('disabled', '')
  }

  submitForm() {
    this.form.submit()
  }
}

const getUpperParent = element => element.parentNode.parentNode

export default FormSettings
