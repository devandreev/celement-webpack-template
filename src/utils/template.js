import { truthyValues } from '@/utils/object.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'

export function inlineClasses(rawClasses = {}) {
  const activeClasses = truthyValues(rawClasses)
  const classes = Object.keys(activeClasses)

  return classes.join(' ')
}

export function interpolate(template, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${template}\`;`)(...vals);
}

export function renderTemplate(template, data) {
  const templateContent = unsafeHTML(interpolate(template.innerHTML, data))
  return templateContent
}
