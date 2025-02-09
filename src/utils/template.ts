import {truthyObject, truthyValues} from '@/utils/object.ts'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'

interface DataToIterpolate {
  [index: string]: string
}

export function inlineClasses(rawClasses: truthyObject = {}) {
  const activeClasses = truthyValues(rawClasses)
  const classes = Object.keys(activeClasses)

  return classes.join(' ')
}

export function interpolate(template: string, data: DataToIterpolate) {
  const names = Object.keys(data);
  const vals = Object.values(data);
  return new Function(...names, `return \`${template}\`;`)(...vals);
}

export function renderTemplate(template: HTMLElement, data: DataToIterpolate) {
  const templateContent = unsafeHTML(interpolate(template.innerHTML, data))
  return templateContent
}
