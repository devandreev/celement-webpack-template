export interface truthyObject {
  [key: string]: any
}

export function truthyValues(obj: truthyObject) {
  const falsyValues = [undefined, null, false, 0]

  return Object.entries(obj).reduce((a: truthyObject,[k,v]) => (falsyValues.includes(v) ? a : (a[k]=v, a)), {})
}

export function getCustomPropertyValue(el: HTMLElement, name: string) {
  return getComputedStyle(el).getPropertyValue(name).trim()
}
