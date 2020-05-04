import { GroongaCommand } from './groonga_command'

export class ColumnList extends GroongaCommand {
  static readonly command_name = 'column_list'
  static readonly parameter_names = [
    'table', //
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }
}

export function isColumnList(cmd: GroongaCommand): cmd is ColumnList {
  return cmd.command_name === ColumnList.command_name
}

GroongaCommand.CommandList[ColumnList.command_name] = ColumnList
