function applyInstersectionObserver(element: HTMLElement, callback: Function, intermidiate = false) {
  if (typeof callback !== 'function') return

  const observerOptions: {threshold: number} = {}

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

export function onElementShow(element: HTMLElement, callback: Function, intermidiate = false) {
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
