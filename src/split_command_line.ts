export class CommandLineScanner {
  readonly string: string
  private _pos = 0
  private re_spaces = /\s+/y
  private re_nonspaces = /\S+/y
  private re_quote = /['"]/y

  constructor(str: string) {
    this.string = str
  }

  is_end() {
    return this._pos >= this.string.length
  }

  get pos() {
    return this._pos
  }

  skip_spaces() {
    return this.scan(this.re_spaces)
  }

  scan_nonspaces() {
    return this.scan(this.re_nonspaces)
  }

  scan_quote() {
    return this.scan(this.re_quote)
  }

  private scan(pattern: RegExp) {
    pattern.lastIndex = this._pos
    const m = this.string.match(pattern)
    if (m) {
      this._pos = pattern.lastIndex
      return m[0]
    }
    return undefined
  }

  rest() {
    return this.string.slice(this._pos)
  }

  terminate() {
    this._pos = this.string.length
  }

  scan_until(str: string) {
    const idx = this.string.indexOf(str, this._pos)
    if (idx < 0) {
      return undefined
    } else {
      const start = this._pos
      this._pos = idx + str.length
      return this.string.slice(start, this._pos)
    }
  }
}

function unescape(token: string) {
  return token.replace(/\\(.)/g, (_, character) => {
    switch (character) {
      case 'b':
        return '\b'
      case 'f':
        return '\f'
      case 'n':
        return '\n'
      case 'r':
        return '\r'
      case 't':
        return '\t'
      default:
        return character
    }
  })
}

export function splitCommandLine(line: string) {
  const tokens: string[] = []
  const scanner = new CommandLineScanner(line)
  let start_quote: string | undefined = undefined

  scanner.skip_spaces()
  while (!scanner.is_end()) {
    if (start_quote === undefined) {
      start_quote = scanner.scan_quote()
      if (start_quote === undefined) {
        const token = scanner.scan_nonspaces()
        if (token !== undefined) {
          tokens.push(token)
        }
        scanner.skip_spaces()
      }
    } else {
      let token = ''
      while (true) {
        const chunk = scanner.scan_until(start_quote)
        if (chunk === undefined) {
          token = start_quote + token + scanner.rest()
          scanner.terminate()
          break
        }

        if (chunk.slice(-2, -1) === '\\') {
          token += chunk
        } else {
          token += chunk.slice(0, -1)
          break
        }
      }

      tokens.push(unescape(token))
      start_quote = undefined
      scanner.skip_spaces()
    }
  }

  return tokens
}
