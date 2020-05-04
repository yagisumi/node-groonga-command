import { GroongaCommand } from './groonga_command'

export class Truncate extends GroongaCommand {
  static readonly command_name = 'truncate'
  static readonly parameter_names = [
    'target_name', //
    'table',
  ]

  get target_name(): string | undefined {
    return this.arguments['target_name'] || this.arguments['table']
  }
}

export function isTruncate(cmd: GroongaCommand): cmd is Truncate {
  return cmd.command_name === Truncate.command_name
}

GroongaCommand.CommandList[Truncate.command_name] = Truncate
