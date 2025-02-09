export interface truthyObject {
  [index: string]: boolean
}

export function truthyValues(obj: truthyObject) {
  const falsyValues = [undefined, null, false, 0]

  return Object.entries(obj).reduce((a,[k,v]) => (falsyValues.includes(v) ? a : (a[k]=v, a)), {})
}

export function getCustomPropertyValue(el: HTMLElement, name: string) {
  return getComputedStyle(el).getPropertyValue(name).trim()
}
