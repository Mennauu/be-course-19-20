import debounce from 'debounce'
import slider from 'nouislider'
import wNumb from 'wnumb'

const JS_HOOK_NEXT_BUTTON = '[js-hook-next-button]'
const JS_HOOK_INPUT_NAME = '[js-hook-input-name]'
const JS_HOOK_INPUT_AGE = '[js-hook-input-age]'
const JS_HOOK_GENDER_FORM = '[js-hook-gender-form]'
const JS_HOOK_INPUT_AGE_RANGE = '[js-hook-input-age-range]'
const JS_HOOK_SUBMIT_BUTTON = '[js-hook-submit-button]'
const JS_HOOK_LEVEL_FORM = '[js-hook-level-form]'
const JS_HOOK_INPUT_FILE = '[js-hook-input-file]'

const CLASS_INPUT_IS_VISIBLE = 'form__item--is-visible'
const CLASS_UTILITY_IS_INVISIBLE = 'u--is-hidden'
const CLASS_FORM_ITEM = 'form__item'

class FormSettings {
  constructor(element) {
    this.form = element
    this.inputName = element.querySelector(JS_HOOK_INPUT_NAME)
    // this.inputAge = element.querySelector(JS_HOOK_INPUT_AGE)
    // this.inputAgeForm = getUpperParent(this.inputAge)
    // this.genderForm = element.querySelector(JS_HOOK_GENDER_FORM)
    this.inputAgeRange = element.querySelector(JS_HOOK_INPUT_AGE_RANGE)
    this.levelForm = element.querySelector(JS_HOOK_LEVEL_FORM)
    this.fileUpload = element.querySelector(JS_HOOK_INPUT_FILE)
    this.formItems = [...element.querySelectorAll('.' + CLASS_FORM_ITEM)]

    this.nextButton = element.querySelector(JS_HOOK_NEXT_BUTTON)
    this.submitButton = element.querySelector(JS_HOOK_SUBMIT_BUTTON)

    this.initialLoadEvents()
    this.bindEvents()
  }

  initialLoadEvents() {
    this.submitButton.classList.add(CLASS_UTILITY_IS_INVISIBLE)
    this.nextButton.classList.remove(CLASS_UTILITY_IS_INVISIBLE)
    this.disableButton(this.nextButton)

    slider.create(this.inputAgeRange, {
      start: [18, 30],
      connect: true,
      tooltips: true,
      step: 1,
      range: {
        min: 18,
        max: 99,
      },
      format: wNumb({
        decimals: 0,
      }),
    })
  }

  bindEvents() {
    this.nextButton.addEventListener('click', () => this.formHandler())
    this.inputName.addEventListener(
      'keydown',
      debounce(element => {
        this.enableButton(element)
      }, 200),
    )
    this.fileUpload.addEventListener('change', () => this.formHandler())
  }

  formHandler() {
    for (const [i, item] of this.formItems.entries()) {
      if (!item.classList.contains(CLASS_INPUT_IS_VISIBLE)) {
        const itemInput = getInputFromParent(item)

        item.classList.add(CLASS_INPUT_IS_VISIBLE)

        if (itemInput) itemInput.focus()

        if (item.classList.contains('c-radio')) {
          const itemLabels = getInputsFromParent(item)

          for (const label of itemLabels) {
            label.addEventListener('click', () => this.formHandler())
          }
        }

        if (i === this.formItems.length - 1) {
          const itemLabels = getInputsFromParent(item)

          this.nextButton.classList.add(CLASS_UTILITY_IS_INVISIBLE)

          if (this.submitButton.classList.contains(CLASS_UTILITY_IS_INVISIBLE)) {
            for (const label of itemLabels) {
              label.addEventListener('click', () => this.enableSubmit())
            }
          }
        }

        return this.scrollToBottom()
      }
    }
  }

  scrollToBottom() {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
  }

  enableSubmit() {
    this.submitButton.classList.remove(CLASS_UTILITY_IS_INVISIBLE)

    return this.scrollToBottom()
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

  disableButton(element) {
    element.setAttribute('disabled', '')
  }

  submitForm() {
    this.form.submit()
  }
}

const getUpperParent = element => element.parentNode.parentNode
const getInputFromParent = element => element.querySelector('input')
const getInputsFromParent = element => [...element.querySelectorAll('input')]

export default FormSettings
