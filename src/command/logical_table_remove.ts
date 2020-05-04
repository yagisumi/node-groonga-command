import { GroongaCommand } from './groonga_command'

export class LogicalTableRemove extends GroongaCommand {
  static readonly command_name = 'logical_table_remove'
  static readonly parameter_names = [
    'logical_table', //
    'shard_key',
    'min',
    'min_border',
    'max',
    'max_border',
  ]

  get logical_table(): string | undefined {
    return this.arguments['logical_table']
  }

  get shard_key(): string | undefined {
    return this.arguments['shard_key']
  }

  get min(): string | undefined {
    return this.arguments['min']
  }

  get min_border(): string | undefined {
    return this.arguments['min_border']
  }

  get max(): string | undefined {
    return this.arguments['max']
  }

  get max_border(): string | undefined {
    return this.arguments['max_border']
  }
}

export function isLogicalTableRemove(cmd: GroongaCommand): cmd is LogicalTableRemove {
  return cmd.command_name === LogicalTableRemove.command_name
}

GroongaCommand.CommandList[LogicalTableRemove.command_name] = LogicalTableRemove
