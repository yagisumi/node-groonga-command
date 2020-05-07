import { StringPairs } from './types'
import { splitCommandLine } from './split_command_line'
import { createCommand } from './groonga-command'

type CommandInfo = {
  name?: string
  pair_arguments: StringPairs
  ordered_arguments: string[]
  path_prefix?: string
  format: 'command' | 'uri'
}

export function parseCommand(command_line: string, options?: { [key: string]: string | number }) {
  const line = getCommandString(command_line)
  const cargs = line.startsWith('/') ? parseUriPath(line) : parseCommandLine(line)

  if (cargs.name === undefined || cargs.name.length === 0) {
    return undefined
  }

  const command = createCommand(cargs.name, cargs.pair_arguments, cargs.ordered_arguments)
  command.original_format = cargs.format
  command.original_source = line
  if (cargs.path_prefix) {
    command.path_prefix = cargs.path_prefix
  }

  if (options != null) {
    Object.keys(options).forEach((name) => {
      const v = options[name]
      if (v != null) {
        command.arguments[name] = v.toString()
      }
    })
  }

  return command
}

function getCommandString(command_line: string) {
  const lines = command_line.split(/\r?\n/)

  let line = lines[0]

  if (line.startsWith('/')) {
    return line
  }

  let idx = 1
  let next = lines[idx]
  while (line.endsWith('\\') && next !== undefined) {
    line = line.slice(0, -1) + ' ' + next
    idx += 1
    next = lines[idx]
  }

  if (line.endsWith('\\')) {
    line = line.slice(0, -1)
  }

  return line
}

function parseCommandLine(line: string) {
  const [name, ...args] = splitCommandLine(line)
  const cargs: CommandInfo = {
    pair_arguments: Object.create(null),
    ordered_arguments: [],
    format: 'command',
  }

  if (name === undefined || name.length === 0) {
    return cargs
  }
  cargs.name = name

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      i += 1
      const value = args[i]
      if (value !== undefined) {
        cargs.pair_arguments[arg.slice(2)] = value
      }
    } else {
      cargs.ordered_arguments.push(arg)
    }
  }

  return cargs
}

function split(str: string, pattern: string) {
  const pos = str.indexOf(pattern)
  return pos >= 0 ? [str.slice(0, pos), str.slice(pos + 1)] : [str, '']
}

function parseUriPath(line: string) {
  const [path, arguments_string] = split(line, '?')
  const cargs: CommandInfo = {
    format: 'uri',
    pair_arguments: Object.create(null),
    ordered_arguments: [],
  }

  const m = path.match(/\/([^\/]*)$/)
  if (m == null || m[1].length === 0) {
    return cargs
  }

  const [name, type] = split(m[1], '.')
  if (name.length === 0) {
    return cargs
  }

  cargs.name = name
  cargs.path_prefix = path.slice(0, m.index)

  if (type.length !== 0) {
    cargs.pair_arguments['output_type'] = type
  }

  arguments_string.split(/&/).forEach((argument_string) => {
    const [key, value] = split(argument_string, '=')
    if (key !== '' && value !== '') {
      cargs.pair_arguments[decodeURIComponent(key)] = decodeURIComponent(value)
    }
  })

  return cargs
}
