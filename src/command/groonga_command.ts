import { StringPairs, FormatOptions } from '../types'
import { escapeValue, equalsStringPairs } from '../utils'

function isPairArguments(obj: any): obj is StringPairs {
  return typeof obj === 'object'
}

function isOrderedArguments(obj: any): obj is string[] | undefined {
  return obj === undefined || Array.isArray(obj)
}

function construct_arguments(
  args: StringPairs,
  pair_arguments: StringPairs,
  ordered_arguments: string[],
  parameter_names: string[] = []
) {
  Object.keys(pair_arguments).forEach((key) => {
    args[key] = pair_arguments[key]
  })

  for (let i = 0; i < ordered_arguments.length; i++) {
    const name = parameter_names[i]
    if (name == null) {
      break
    }
    args[name] = ordered_arguments[i]
  }
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
        construct_arguments(this.arguments, arg2, arg3 || [], CommandClass.parameter_names)
        Object.setPrototypeOf(this, CommandClass.prototype)
      } else {
        construct_arguments(this.arguments, arg2, arg3 || [])
      }
    } else if (isPairArguments(arg1) && isOrderedArguments(arg2)) {
      // @ts-ignore 2564
      this.command_name = this.constructor.command_name
      // @ts-ignore 2564
      construct_arguments(this.arguments, arg1, arg2 || [], this.constructor.parameter_names)
    } else {
      throw new Error('invalid arguments')
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
        equalsStringPairs(cmd.arguments, this.arguments))
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
          components.push(`--${name} ${escapeValue(this.arguments[name])}`)
        }
      })

    return pretty_print ? components.join(' \\\n  ') : components.join(' ')
  }

  toString() {
    if (this.is_uri_format()) {
      return this.to_uri_format()
    } else {
      return this.to_command_format()
    }
  }
}

export type GroongaCommandClass = typeof GroongaCommand
