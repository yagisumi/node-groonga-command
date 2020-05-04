import { GroongaCommand } from './groonga_command'

export class LogLevel extends GroongaCommand {
  static readonly command_name = 'log_level'
  static readonly parameter_names = [
    'level', //
  ]

  get level(): string | undefined {
    return this.arguments['level']
  }
}

export function isLogLevel(cmd: GroongaCommand): cmd is LogLevel {
  return cmd.command_name === LogLevel.command_name
}

GroongaCommand.CommandList[LogLevel.command_name] = LogLevel
