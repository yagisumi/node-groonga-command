import { GroongaCommand } from './groonga_command'

export class RubyLoad extends GroongaCommand {
  static readonly command_name = 'ruby_load'
  static readonly parameter_names = [
    'path', //
  ]

  get path(): string | undefined {
    return this.arguments['path']
  }
}

export function isRubyLoad(cmd: GroongaCommand): cmd is RubyLoad {
  return cmd.command_name === RubyLoad.command_name
}

GroongaCommand.CommandList[RubyLoad.command_name] = RubyLoad
