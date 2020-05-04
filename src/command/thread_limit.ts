import { GroongaCommand } from './groonga_command'

export class ThreadLimit extends GroongaCommand {
  static readonly command_name = 'thread_limit'
  static readonly parameter_names = [
    'max', //
  ]

  get max() {
    return this.integer_value('max')
  }
}

export function isThreadLimit(cmd: GroongaCommand): cmd is ThreadLimit {
  return cmd.command_name === ThreadLimit.command_name
}

GroongaCommand.CommandList[ThreadLimit.command_name] = ThreadLimit
