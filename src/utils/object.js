export function truthyValues(obj) {
  const falsyValues = [undefined, null, false, 0]

  return Object.entries(obj).reduce((a,[k,v]) => (falsyValues.includes(v) ? a : (a[k]=v, a)), {})
}

export function getCustomPropertyValue(el, name) {
  return getComputedStyle(el).getPropertyValue(name).trim()
}
