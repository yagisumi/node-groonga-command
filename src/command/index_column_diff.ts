import { GroongaCommand } from './groonga_command'

export class IndexColumnDiff extends GroongaCommand {
  static readonly command_name = 'index_column_diff'
  static readonly parameter_names = [
    'table', //
    'name',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }

  get name(): string | undefined {
    return this.arguments['name']
  }
}

export function isIndexColumnDiff(cmd: GroongaCommand): cmd is IndexColumnDiff {
  return cmd.command_name === IndexColumnDiff.command_name
}

GroongaCommand.CommandList[IndexColumnDiff.command_name] = IndexColumnDiff
