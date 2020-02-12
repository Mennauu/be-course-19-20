export const formLogin = () => {
  const JS_HOOK_FORM_LOGIN = '[js-hook-form-login]'
  const ELEMENT_FORM_LOGIN = document.querySelector(JS_HOOK_FORM_LOGIN) || null

  if (ELEMENT_FORM_LOGIN !== null) {
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




    new FormLogin(ELEMENT_FORM_LOGIN)
  }
}
