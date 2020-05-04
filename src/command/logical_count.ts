import { GroongaCommand } from './groonga_command'

export class LogicalCount extends GroongaCommand {
  static readonly command_name = 'logical_count'
  static readonly parameter_names = [
    'logical_table', //
    'shard_key',
    'min',
    'min_border',
    'max',
    'max_border',
    'filter',
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

  get filter(): string | undefined {
    return this.arguments['filter']
  }
}

export function isLogicalCount(cmd: GroongaCommand): cmd is LogicalCount {
  return cmd.command_name === LogicalCount.command_name
}

GroongaCommand.CommandList[LogicalCount.command_name] = LogicalCount
