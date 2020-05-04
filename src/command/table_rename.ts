import { GroongaCommand } from './groonga_command'

export class TableRename extends GroongaCommand {
  static readonly command_name = 'table_rename'
  static readonly parameter_names = [
    'name', //
    'new_name',
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }

  get new_name(): string | undefined {
    return this.arguments['new_name']
  }
}

export function isTableRename(cmd: GroongaCommand): cmd is TableRename {
  return cmd.command_name === TableRename.command_name
}

GroongaCommand.CommandList[TableRename.command_name] = TableRename
