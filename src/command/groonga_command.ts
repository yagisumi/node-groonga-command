import deepEqual from 'deep-equal'

type StringPairs = { [key: string]: string }

function isPairArguments(obj: any): obj is StringPairs {
  return typeof obj === 'object'
}

function isOrderedArguments(obj: any): obj is string[] | undefined {
  return obj === undefined || Array.isArray(obj)
}

export type FormatOptions = {
  pretty_print?: boolean
  exclude?: string[]
}

export function createCommand(
  command_name: string,
  pair_arguments: StringPairs,
  ordered_arguments?: string[]
): GroongaCommand {
  if (command_name in GroongaCommand.CommandList) {
    return new GroongaCommand.CommandList[command_name](pair_arguments, ordered_arguments)
  } else {
    return new GroongaCommand(command_name, pair_arguments, ordered_arguments)
  }
}

export class GroongaCommand {
  ['constructor']: typeof GroongaCommand
  static readonly command_name: string = ''
  static readonly parameter_names: string[] = []
  static readonly CommandList: { [name: string]: GroongaCommandClass } = Object.create(null)

  readonly command_name: string
  readonly arguments: StringPairs = Object.create(null)
  original_format?: 'uri' | 'command'
  original_source?: string
  path_prefix = '/d/'

  constructor(pair_arguments: StringPairs, ordered_arguments?: string[])
  constructor(command_name: string, pair_arguments: StringPairs, ordered_arguments?: string[])
  constructor(arg1: StringPairs | string, arg2?: string[] | StringPairs, arg3?: string[]) {
    if (typeof arg1 === 'string' && isPairArguments(arg2) && isOrderedArguments(arg3)) {
      this.command_name = arg1
      if (arg1 in GroongaCommand.CommandList) {
        const CommandClass = GroongaCommand.CommandList[arg1]
        this.construct_arguments(arg2, arg3 || [], CommandClass.parameter_names)
        Object.setPrototypeOf(this, CommandClass.prototype)
      } else {
        this.construct_arguments(arg2, arg3 || [])
      }
    } else if (isPairArguments(arg1) && isOrderedArguments(arg2)) {
      // @ts-ignore 2564
      this.command_name = this.constructor.command_name
      // @ts-ignore 2564
      this.construct_arguments(arg1, arg2 || [], this.constructor.parameter_names)
    } else {
      throw new Error('invalid arguments')
    }
  }

  private construct_arguments(
    pair_arguments: StringPairs,
    ordered_arguments: string[],
    parameter_names: string[] = []
  ) {
    Object.keys(pair_arguments).forEach((key) => {
      this.arguments[key] = pair_arguments[key]
    })

    for (let i = 0; i < ordered_arguments.length; i++) {
      const name = parameter_names[i]
      if (name == null) {
        break
      }
      this.arguments[name] = ordered_arguments[i]
    }
  }

  has_key(name: string) {
    return name in this.arguments
  }

  equals(cmd: any) {
    return (
      cmd === this ||
      (typeof cmd === 'object' &&
        cmd instanceof GroongaCommand &&
        cmd.command_name === this.command_name &&
        deepEqual(cmd.arguments, this.arguments))
    )
  }

  is_uri_format() {
    return this.original_format === 'uri'
  }

  is_command_format() {
    return this.original_format === 'command'
  }

  get output_type() {
    return this.arguments['output_type'] || 'json'
  }

  get request_id(): string | undefined {
    return this.arguments['request_id']
  }

  to_uri_format(options?: FormatOptions) {
    const prefix = this.path_prefix.endsWith('/') ? this.path_prefix.slice(0, -1) : this.path_prefix
    let path = [prefix, this.command_name].join('/')

    const exclude = options?.exclude ?? []

    if (this.has_key('output_type')) {
      path += `.${this.arguments['output_type']}`
    }

    const queries: string[] = []
    Object.keys(this.arguments)
      .sort()
      .forEach((name) => {
        if (name !== 'output_type' && !exclude.includes(name)) {
          queries.push(`${encodeURIComponent(name)}=${encodeURIComponent(this.arguments[name])}`)
        }
      })

    if (queries.length > 0) {
      path += `?${queries.join('&')}`
    }

    return path
  }

  to_command_format(options?: FormatOptions) {
    const pretty_print = options?.pretty_print ?? false
    const exclude = options?.exclude ?? []
    const components = [this.command_name]

    Object.keys(this.arguments)
      .sort()
      .forEach((name) => {
        if (!exclude.includes(name)) {
          components.push(`--${name} ${this.escape_value(this.arguments[name])}`)
        }
      })

    return pretty_print ? components.join(' \\\n  ') : components.join(' ')
  }

  private escape_value(value: string) {
    return `"${value.replace(/[\n"\\]/g, (match) => (match === '\n' ? '\\n' : `\\${match}`))}"`
  }

  toString() {
    if (this.is_uri_format()) {
      return this.to_uri_format()
    } else {
      return this.to_command_format()
    }
  }

  protected integer_value(name: string): number | undefined {
    if (name in this.arguments) {
      return this.parse_integer_value(this.arguments[name])
    } else {
      return undefined
    }
  }

  protected parse_integer_value(value: string) {
    const n = parseInt(value)
    return isNaN(n) ? undefined : n
  }

  protected array_value(name: string) {
    return this.parse_array_value(this.arguments[name] || '')
  }

  protected parse_array_value(value: string) {
    return value
      .trim()
      .split(/\s*,\s*/)
      .filter((s) => s.length > 0)
  }

  protected flags_value(name: string) {
    return this.parse_flags_value(this.arguments[name] || '')
  }

  protected parse_flags_value(value: string) {
    return value
      .trim()
      .split(/\s*[| ]\s*/)
      .filter((s) => s.length > 0)
  }

  protected boolean_value<T = boolean, U = boolean>(name: string, default_value: T, invalid: U): boolean | T | U {
    if (name in this.arguments) {
      return this.parse_boolean_value(this.arguments[name], default_value, invalid)
    } else {
      return default_value
    }
  }

  protected parse_boolean_value<T = boolean, U = boolean>(
    value: string,
    default_value: T,
    invalid: U
  ): boolean | T | U {
    if (value.length === 0) {
      return default_value
    }

    if (value === 'yes') {
      return true
    } else if (value === 'no') {
      return false
    } else {
      return invalid
    }
  }
}

export type GroongaCommandClass = typeof GroongaCommand
