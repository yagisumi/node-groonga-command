import { GroongaCommand } from './groonga_command'
import { flags_value } from '../utils'

export class QueryLogFlagsAdd extends GroongaCommand {
  static readonly command_name = 'query_log_flags_add'
  static readonly parameter_names = [
    'flags', //
  ]

  get flags() {
    return flags_value(this.arguments, 'flags')
  }
}

export function isQueryLogFlagsAdd(cmd: GroongaCommand): cmd is QueryLogFlagsAdd {
  return cmd.command_name === QueryLogFlagsAdd.command_name
}

GroongaCommand.CommandList[QueryLogFlagsAdd.command_name] = QueryLogFlagsAdd
