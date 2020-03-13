import debounce from 'debounce'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

const JS_HOOK_NEXT_BUTTON = '[js-hook-next-button]'
const JS_HOOK_INPUT_NAME = '[js-hook-input-name]'
const JS_HOOK_INPUT_AGE = '[js-hook-input-age]'
const JS_HOOK_INPUT_AGE_RANGE = '[js-hook-input-age-range]'
const JS_HOOK_SUBMIT_BUTTON = '[js-hook-submit-button]'
const JS_HOOK_LEVEL_FORM = '[js-hook-level-form]'
const JS_HOOK_INPUT_FILE = '[js-hook-input-file]'
const JS_HOOK_RANGE_FROM = '[js-hook-range-from]'
const JS_HOOK_RANGE_TO = '[js-hook-range-to]'

const CLASS_INPUT_IS_VISIBLE = 'form__item--is-visible'
const CLASS_UTILITY_IS_INVISIBLE = 'u--is-hidden'
const CLASS_FORM_ITEM = 'form__item'

class FormSettings {
  constructor(element) {
    this.form = element
    this.inputName = element.querySelector(JS_HOOK_INPUT_NAME)
    this.inputAge = element.querySelector(JS_HOOK_INPUT_AGE)
    this.inputAgeRange = element.querySelector(JS_HOOK_INPUT_AGE_RANGE)
    this.levelForm = element.querySelector(JS_HOOK_LEVEL_FORM)
    this.fileUpload = element.querySelector(JS_HOOK_INPUT_FILE)
    this.inputRangeFrom = element.querySelector(JS_HOOK_RANGE_FROM)
    this.inputRangeTo = element.querySelector(JS_HOOK_RANGE_TO)

    this.inputRanges = [this.inputRangeFrom, this.inputRangeTo]
    this.formItems = [...element.querySelectorAll('.' + CLASS_FORM_ITEM)]

    this.nextButton = element.querySelector(JS_HOOK_NEXT_BUTTON)
    this.submitButton = element.querySelector(JS_HOOK_SUBMIT_BUTTON)

    this.initialLoadEvents()
    this.bindEvents()
  }

  initialLoadEvents() {
    this.submitButton.classList.add(CLASS_UTILITY_IS_INVISIBLE)
    this.nextButton.classList.remove(CLASS_UTILITY_IS_INVISIBLE)

    this.inputRangeFrom.setAttribute('readonly', '')
    this.inputRangeTo.setAttribute('readonly', '')

    if (this.inputName.value.length < 2) {
      this.disableButton(this.nextButton)
    }

    for (const [i, item] of this.formItems.entries()) {
      if (i !== 0) item.classList.remove(CLASS_INPUT_IS_VISIBLE)
    }

    noUiSlider.create(this.inputAgeRange, {
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
    this.inputAge.addEventListener(
      'keydown',
      debounce(element => {
        this.enableButton(element)
      }, 200),
    )
    this.fileUpload.addEventListener('change', () => this.formHandler())

    this.inputAgeRange.noUiSlider.on('update', (values, handle) =>
      this.updateRangeInputValues(values, handle),
    )
  }

  formHandler() {
    for (const [i, item] of this.formItems.entries()) {
      if (!item.classList.contains(CLASS_INPUT_IS_VISIBLE)) {
        const itemInput = getInputFromParent(item)

        item.classList.add(CLASS_INPUT_IS_VISIBLE)

        if (itemInput) itemInput.focus()

        if (i === 1) {
          // Place event at the end of the event loop
          setTimeout(() => {
            if (!this.nextButton.hasAttribute('disabled')) {
              this.nextButton.setAttribute('disabled', '')
            }
          }, 0)
        }

        if (item.classList.contains('c-radio')) {
          const itemLabels = getInputsFromParent(item)

          this.nextButton.setAttribute('disabled', '')

          for (const label of itemLabels) {
            label.addEventListener('click', () => this.formHandler())
          }
        } else if (item.classList.contains('input--file')) {
          this.nextButton.setAttribute('disabled', '')
        } else {
          if (this.nextButton.hasAttribute('disabled')) {
            this.nextButton.removeAttribute('disabled')
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

  updateRangeInputValues(values, handle) {
    this.inputRanges[handle].value = values[handle]
  }

  scrollToBottom() {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
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

  enableSubmit() {
    this.submitButton.classList.remove(CLASS_UTILITY_IS_INVISIBLE)

    return this.scrollToBottom()
  }

  submitForm() {
    this.form.submit()
  }
}

const getInputFromParent = element => element.querySelector('input')
const getInputsFromParent = element => [...element.querySelectorAll('input')]

export default FormSettings
