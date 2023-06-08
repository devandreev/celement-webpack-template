function applyInstersectionObserver(element, callback, intermidiate = false) {
  if (typeof callback !== 'function') return

  const observerOptions = {}

  if (!intermidiate) {
    observerOptions.threshold = 0.6
  }

  const observerCallback = (entries) => {
    const entry = entries[0]

    if (entry.isIntersecting) {
      callback()
    } 
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  observer.observe(element)

  return observer
}

export function onElementShow(element, callback, intermidiate = false) {
  if (typeof callback !== 'function') return

  const observer = applyInstersectionObserver(
    element,
    () => {
      observer.unobserve(element)

      requestAnimationFrame(() => {
        callback(element)
      })
    },
    intermidiate
  )
}
