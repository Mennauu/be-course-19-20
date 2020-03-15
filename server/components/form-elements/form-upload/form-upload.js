const JS_HOOK_PREVIEW_IMAGE = '[js-hook-preview-image]'
const JS_HOOK_FILE_LABEL = '[js-hook-file-label]'

class FormUpload {
  constructor(element) {
    this.input = element
    this.preview = document.querySelector(JS_HOOK_PREVIEW_IMAGE)
    this.label = document.querySelector(JS_HOOK_FILE_LABEL)

    this.initLoadEvents()
    this.bindEvents()
  }

  initLoadEvents() {
    this.input.classList.add('u--sr-only')
    this.label.classList.remove('u--sr-only')
  }

  bindEvents() {
    this.input.addEventListener('change', target => this.handleFiles(target))
  }

  handleFiles(target) {
    const files = target.srcElement.files

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        this.renderToHTML(file)
      }
    }
  }

  renderToHTML(file) {
    while (this.preview.firstChild) this.preview.removeChild(this.preview.lastChild)

    // @see: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example.3a.c2.a0Showing_thumbnails_of_user-selected_images
    const reader = new FileReader()
    const img = document.createElement('img')
    img.file = file
    this.preview.appendChild(img)

    reader.onload = (aImg => {
      return e => (aImg.src = e.target.result)
    })(img)

    reader.readAsDataURL(file)

    this.label.classList.add('u--sr-only')
  }
}

export default FormUpload
