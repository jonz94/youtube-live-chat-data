import { escape, type Run } from './Text'

export default class TextRun implements Run {
  text: string
  bold: boolean
  italics: boolean
  strikethrough: boolean
  deemphasize: boolean
  attachment

  constructor(data: any) {
    this.text = data.text
    this.bold = Boolean(data.bold)
    this.italics = Boolean(data.italics)
    this.strikethrough = Boolean(data.strikethrough)
    this.deemphasize = Boolean(data.deemphasize)

    this.attachment = data.attachment
  }

  toString(): string {
    return this.text
  }

  toHTML(): string {
    const tags: string[] = []

    if (this.bold) tags.push('b')
    if (this.italics) tags.push('i')
    if (this.strikethrough) tags.push('s')
    if (this.deemphasize) tags.push('small')

    const escaped_text = escape(this.text)
    const styled_text = tags.map((tag) => `<${tag}>`).join('') + escaped_text + tags.map((tag) => `</${tag}>`).join('')
    const wrapped_text = `<span style="white-space: pre-wrap;">${styled_text}</span>`

    return wrapped_text
  }
}
