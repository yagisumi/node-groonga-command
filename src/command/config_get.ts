import { GroongaCommand } from './groonga_command'

export class ConfigGet extends GroongaCommand {
  static readonly command_name = 'config_get'
  static readonly parameter_names = [
    'key', //
  ]

  get key(): string | undefined {
    return this.arguments['key']
  }
}

export function isConfigGet(cmd: GroongaCommand): cmd is ConfigGet {
  return cmd.command_name === ConfigGet.command_name
}

GroongaCommand.CommandList[ConfigGet.command_name] = ConfigGet
