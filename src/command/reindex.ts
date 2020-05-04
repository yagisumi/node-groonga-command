import { GroongaCommand } from './groonga_command'

export class Reindex extends GroongaCommand {
  static readonly command_name = 'reindex'
  static readonly parameter_names = [
    'target_name', //
  ]

  get target_name(): string | undefined {
    return this.arguments['target_name']
  }
}

export function isReindex(cmd: GroongaCommand): cmd is Reindex {
  return cmd.command_name === Reindex.command_name
}

GroongaCommand.CommandList[Reindex.command_name] = Reindex
