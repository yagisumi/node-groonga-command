import { GroongaCommand } from './groonga_command'

export class TableList extends GroongaCommand {
  static readonly command_name = 'table_list'
  static readonly parameter_names = [
    'prefix', //
  ]

  get prefix(): string | undefined {
    return this.arguments['prefix']
  }
}

export function isTableList(cmd: GroongaCommand): cmd is TableList {
  return cmd.command_name === TableList.command_name
}

GroongaCommand.CommandList[TableList.command_name] = TableList
