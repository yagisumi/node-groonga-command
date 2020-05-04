import { GroongaCommand } from './groonga_command'

export class LogPut extends GroongaCommand {
  static readonly command_name = 'log_put'
  static readonly parameter_names = [
    'level', //
    'message',
  ]

  get message(): string | undefined {
    return this.arguments['message']
  }

  get level(): string | undefined {
    return this.arguments['level']
  }
}

export function isLogPut(cmd: GroongaCommand): cmd is LogPut {
  return cmd.command_name === LogPut.command_name
}

GroongaCommand.CommandList[LogPut.command_name] = LogPut
