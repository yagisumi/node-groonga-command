import { GroongaCommand } from './groonga_command'

export class Status extends GroongaCommand {
  static readonly command_name = 'status'
  static readonly parameter_names = []
}

export function isStatus(cmd: GroongaCommand): cmd is Status {
  return cmd.command_name === Status.command_name
}

GroongaCommand.CommandList[Status.command_name] = Status
