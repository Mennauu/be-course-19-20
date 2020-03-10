export const setText = (element, message) => (element.textContent = message)

export const emptyText = element => (element.textContent = '')

export const addClass = (element, errorClass) => element.classList.add(errorClass)

export const removeClass = (element, errorClass) => element.classList.remove(errorClass)
