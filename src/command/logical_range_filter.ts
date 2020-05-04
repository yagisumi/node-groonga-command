import { GroongaCommand } from './groonga_command'
import { Searchable } from './searchable'

export class LogicalRangeFilter extends Searchable(GroongaCommand) {
  static readonly command_name = 'logical_range_filter'
  static readonly parameter_names = [
    'logical_table', //
    'shard_key',
    'min',
    'min_border',
    'max',
    'max_border',
    'order',
    'offset',
    'limit',
    'filter',
    'output_columns',
    'use_range_index',
    'post_filter',
    'sort_keys',
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

  get order(): string | undefined {
    return this.arguments['order']
  }

  get offset() {
    return this.integer_value('offset')
  }

  get limit() {
    return this.integer_value('limit')
  }

  get filter(): string | undefined {
    return this.arguments['filter']
  }

  get output_columns() {
    return this.array_value('output_columns')
  }

  get use_range_index(): boolean | undefined {
    return this.boolean_value<undefined, undefined>('use_range_index', undefined, undefined)
  }

  get post_filter(): string | undefined {
    return this.arguments['post_filter']
  }

  get sort_keys() {
    return this.array_value('sort_keys')
  }
}

export function isLogicalRangeFilter(cmd: GroongaCommand): cmd is LogicalRangeFilter {
  return cmd.command_name === LogicalRangeFilter.command_name
}

GroongaCommand.CommandList[LogicalRangeFilter.command_name] = LogicalRangeFilter
