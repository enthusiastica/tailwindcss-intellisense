import type { TextDocument, Position } from 'vscode-languageserver'
import { State } from './state'
import { htmlLanguages } from './languages'

export function isHtmlDoc(state: State, doc: TextDocument): boolean {
  const userHtmlLanguages = Object.keys(state.editor.userLanguages).filter((lang) =>
    htmlLanguages.includes(state.editor.userLanguages[lang])
  )

  return [...htmlLanguages, ...userHtmlLanguages].indexOf(doc.languageId) !== -1
}

export function isVueDoc(doc: TextDocument): boolean {
  return doc.languageId === 'vue'
}

export function isSvelteDoc(doc: TextDocument): boolean {
  return doc.languageId === 'svelte'
}

export function isHtmlContext(state: State, doc: TextDocument, position: Position): boolean {
  let str = doc.getText({
    start: { line: 0, character: 0 },
    end: position,
  })

  if (isHtmlDoc(state, doc) && !isInsideTag(str, ['script', 'style'])) {
    return true
  }

  if (isVueDoc(doc)) {
    return isInsideTag(str, ['template'])
  }

  if (isSvelteDoc(doc)) {
    return !isInsideTag(str, ['script', 'style'])
  }

  return false
}

export function isInsideTag(str: string, tag: string | string[]): boolean {
  let open = 0
  let close = 0
  let match: RegExpExecArray
  let tags = Array.isArray(tag) ? tag : [tag]
  let regex = new RegExp(`<(?<slash>/?)(?:${tags.join('|')})(?:\\s[^>]*[^\/]>|\\s*>)`, 'ig')
  while ((match = regex.exec(str)) !== null) {
    if (match.groups.slash) {
      close += 1
    } else {
      open += 1
    }
  }
  return open > 0 && open > close
}
