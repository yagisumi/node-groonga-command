import { GroongaCommand } from './groonga_command'

export class Schema extends GroongaCommand {
  static readonly command_name = 'schema'
  static readonly parameter_names = []
}

export function isSchema(cmd: GroongaCommand): cmd is Schema {
  return cmd.command_name === Schema.command_name
}

GroongaCommand.CommandList[Schema.command_name] = Schema
