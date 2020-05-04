import { GroongaCommand } from './groonga_command'

export class LogicalShardList extends GroongaCommand {
  static readonly command_name = 'logical_shard_list'
  static readonly parameter_names = [
    'logical_table', //
  ]

  get logical_table(): string | undefined {
    return this.arguments['logical_table']
  }
}

export function isLogicalShardList(cmd: GroongaCommand): cmd is LogicalShardList {
  return cmd.command_name === LogicalShardList.command_name
}

GroongaCommand.CommandList[LogicalShardList.command_name] = LogicalShardList
