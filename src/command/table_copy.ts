import { GroongaCommand } from './groonga_command'

export class TableCopy extends GroongaCommand {
  static readonly command_name = 'table_copy'
  static readonly parameter_names = [
    'from_name', //
    'to_name',
  ]

  get from_name(): string | undefined {
    return this.arguments['from_name']
  }

  get to_name(): string | undefined {
    return this.arguments['to_name']
  }
}

export function isTableCopy(cmd: GroongaCommand): cmd is TableCopy {
  return cmd.command_name === TableCopy.command_name
}

GroongaCommand.CommandList[TableCopy.command_name] = TableCopy
