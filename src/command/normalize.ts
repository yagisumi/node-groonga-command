import { GroongaCommand } from './groonga_command'

export class Normalize extends GroongaCommand {
  static readonly command_name = 'normalize'
  static readonly parameter_names = [
    'normalizer', //
    'string',
    'flags',
  ]

  get normalizer(): string | undefined {
    return this.arguments['normalizer']
  }

  get string(): string | undefined {
    return this.arguments['string']
  }

  get flags() {
    return this.flags_value('flags')
  }
}

export function isNormalize(cmd: GroongaCommand): cmd is Normalize {
  return cmd.command_name === Normalize.command_name
}

GroongaCommand.CommandList[Normalize.command_name] = Normalize
