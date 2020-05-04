import { GroongaCommand } from './groonga_command'
import { flags_value } from '../utils'

export class QueryLogFlagsSet extends GroongaCommand {
  static readonly command_name = 'query_log_flags_set'
  static readonly parameter_names = [
    'flags', //
  ]

  get flags() {
    return flags_value(this.arguments, 'flags')
  }
}

export function isQueryLogFlagsSet(cmd: GroongaCommand): cmd is QueryLogFlagsSet {
  return cmd.command_name === QueryLogFlagsSet.command_name
}

GroongaCommand.CommandList[QueryLogFlagsSet.command_name] = QueryLogFlagsSet
