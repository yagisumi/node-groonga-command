import { GroongaCommand } from './groonga_command'
import { boolean_value } from '../utils'

export class Dump extends GroongaCommand {
  static readonly command_name = 'dump'
  static readonly parameter_names = [
    'tables', //
    'dump_plugins',
    'dump_schema',
    'dump_records',
    'dump_indexes',
    'dump_configs',
    'sort_hash_table',
  ]

  get output_type(): string {
    return 'none'
  }

  is_sort_hash_table() {
    return boolean_value(this.arguments, 'sort_hash_table', false, false)
  }
}

export function isDump(cmd: GroongaCommand): cmd is Dump {
  return cmd.command_name === Dump.command_name
}

GroongaCommand.CommandList[Dump.command_name] = Dump
