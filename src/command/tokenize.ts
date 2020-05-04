import { GroongaCommand } from './groonga_command'

export class Tokenize extends GroongaCommand {
  static readonly command_name = 'tokenize'
  static readonly parameter_names = [
    'tokenizer', //
    'string',
    'normalizer',
    'flags',
    'mode',
    'token_filters',
  ]

  get tokenizer(): string | undefined {
    return this.arguments['tokenizer']
  }

  get string(): string | undefined {
    return this.arguments['string']
  }

  get normalizer(): string | undefined {
    return this.arguments['normalizer']
  }

  get flags() {
    return this.flags_value('flags')
  }

  get mode(): string | undefined {
    return this.arguments['mode']
  }

  get token_filters() {
    return this.array_value('token_filters')
  }
}

export function isTokenize(cmd: GroongaCommand): cmd is Tokenize {
  return cmd.command_name === Tokenize.command_name
}

GroongaCommand.CommandList[Tokenize.command_name] = Tokenize
