import { GroongaCommand } from './groonga_command'

export class ConfigSet extends GroongaCommand {
  static readonly command_name = 'config_set'
  static readonly parameter_names = [
    'key', //
    'value',
  ]

  get key(): string | undefined {
    return this.arguments['key']
  }

  get value(): string | undefined {
    return this.arguments['value']
  }
}

export function isConfigSet(cmd: GroongaCommand): cmd is ConfigSet {
  return cmd.command_name === ConfigSet.command_name
}

GroongaCommand.CommandList[ConfigSet.command_name] = ConfigSet
