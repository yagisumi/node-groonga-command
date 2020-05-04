import { GroongaCommand } from './groonga_command'
import { integer_value } from '../utils'

export class ThreadLimit extends GroongaCommand {
  static readonly command_name = 'thread_limit'
  static readonly parameter_names = [
    'max', //
  ]

  get max() {
    return integer_value(this.arguments, 'max')
  }
}

export function isThreadLimit(cmd: GroongaCommand): cmd is ThreadLimit {
  return cmd.command_name === ThreadLimit.command_name
}

GroongaCommand.CommandList[ThreadLimit.command_name] = ThreadLimit
