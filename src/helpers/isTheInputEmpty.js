const isTheInputEmpty = (input) => {
  

  if (input.value.trim() === '') {
    input.classList.add('is-invalid')
    return true
  }

  input.classList.remove('is-invalid')
  return false
}

export default isTheInputEmpty
