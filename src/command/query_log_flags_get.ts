import { GroongaCommand } from './groonga_command'

export class QueryLogFlagsGet extends GroongaCommand {
  static readonly command_name = 'query_log_flags_get'
  static readonly parameter_names = []
}

export function isQueryLogFlagsGet(cmd: GroongaCommand): cmd is QueryLogFlagsGet {
  return cmd.command_name === QueryLogFlagsGet.command_name
}

GroongaCommand.CommandList[QueryLogFlagsGet.command_name] = QueryLogFlagsGet
