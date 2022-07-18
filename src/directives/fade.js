// Плавное скрытие
export function fadeOut(element, callback) {
  const onTransitionEnd = () => {
    // remove this event listener so it only gets triggered once
    element.removeEventListener('transitionend', onTransitionEnd)
    
    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.display = 'none'

    if (callback && typeof callback === 'function') callback()
  }

  element.style.opacity = 0
  element.addEventListener('transitionend', onTransitionEnd)
}



// Плавное появление
export function fadeIn(element, callback) {
    const onTransitionEnd = () => {
      // remove this event listener so it only gets triggered once
      element.removeEventListener('transitionend', onTransitionEnd)

      if (callback && typeof callback === 'function') callback()
    }

    element.style.removeProperty('display')

    setTimeout(() => {
      element.style.opacity = 1;
      element.addEventListener('transitionend', onTransitionEnd)
    }, 100)
}
