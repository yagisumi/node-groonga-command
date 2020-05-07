import { GroongaCommand } from './groonga_command'
import { Searchable } from './searchable'
import { integer_value, array_value } from '../utils'

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
    return integer_value(this.arguments, 'offset')
  }

  get limit() {
    return integer_value(this.arguments, 'limit')
  }

  get filter(): string | undefined {
    return this.arguments['filter']
  }

  get output_columns() {
    return array_value(this.arguments, 'output_columns')
  }

  get use_range_index() {
    if ('use_range_index' in this.arguments) {
      const value = this.arguments['use_range_index']
      if (value.length === 0) {
        return undefined
      }

      if (value === 'yes') {
        return true
      } else if (value === 'no') {
        return false
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  get post_filter(): string | undefined {
    return this.arguments['post_filter']
  }

  get sort_keys() {
    return array_value(this.arguments, 'sort_keys')
  }
}

export function isLogicalRangeFilter(cmd: GroongaCommand): cmd is LogicalRangeFilter {
  return cmd.command_name === LogicalRangeFilter.command_name
}

GroongaCommand.CommandList[LogicalRangeFilter.command_name] = LogicalRangeFilter
