const createBootstrapAlert = (message = 'Error', color = 'danger') => {
    const alert = document.createElement('div')
    alert.className = `empty-input-error alert alert-${color} position-absolute start-50 translate-middle-x bottom-1`
    alert.innerHTML = message
    alert.style.zIndex = '1100'
    const container = document.querySelector('.container')
    container.append(alert)
    setTimeout(() => { alert.remove() }, 6000)
  }
  
  export default createBootstrapAlert