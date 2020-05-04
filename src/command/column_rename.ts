import { GroongaCommand } from './groonga_command'

export class ColumnRename extends GroongaCommand {
  static readonly command_name = 'column_rename'
  static readonly parameter_names = [
    'table', //
    'name',
    'new_name',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }

  get name(): string | undefined {
    return this.arguments['name']
  }

  get new_name(): string | undefined {
    return this.arguments['new_name']
  }
}

export function isColumnRename(cmd: GroongaCommand): cmd is ColumnRename {
  return cmd.command_name === ColumnRename.command_name
}

GroongaCommand.CommandList[ColumnRename.command_name] = ColumnRename
