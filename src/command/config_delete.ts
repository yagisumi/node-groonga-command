import { GroongaCommand } from './groonga_command'

export class ConfigDelete extends GroongaCommand {
  static readonly command_name = 'config_delete'
  static readonly parameter_names = [
    'key', //
  ]

  get key(): string | undefined {
    return this.arguments['key']
  }
}

export function isConfigDelete(cmd: GroongaCommand): cmd is ConfigDelete {
  return cmd.command_name === ConfigDelete.command_name
}

GroongaCommand.CommandList[ConfigDelete.command_name] = ConfigDelete
