import { GroongaCommand } from './groonga_command'
import { flags_value } from '../utils'

export class QueryLogFlagsRemove extends GroongaCommand {
  static readonly command_name = 'query_log_flags_remove'
  static readonly parameter_names = [
    'flags', //
  ]

  get flags() {
    return flags_value(this.arguments, 'flags')
  }
}

export function isQueryLogFlagsRemove(cmd: GroongaCommand): cmd is QueryLogFlagsRemove {
  return cmd.command_name === QueryLogFlagsRemove.command_name
}

GroongaCommand.CommandList[QueryLogFlagsRemove.command_name] = QueryLogFlagsRemove
