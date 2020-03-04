export const setText = (element, message) => (element.textContent = message)

export const emptyText = element => (element.textContent = '')

export const addActiveClasses = (element, errorClass) => element.classList.add(errorClass)

export const removeActiveClasses = (element, errorClass) => element.classList.remove(errorClass)
