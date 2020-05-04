import { GroongaCommand } from './groonga_command'

export class TableCreate extends GroongaCommand {
  static readonly command_name = 'table_create'
  static readonly parameter_names = [
    'name', //
    'flags',
    'key_type',
    'value_type',
    'default_tokenizer',
    'normalizer',
    'token_filters',
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }

  get key_type(): string | undefined {
    return this.arguments['key_type']
  }

  get value_type(): string | undefined {
    return this.arguments['value_type']
  }

  get flags() {
    return this.flags_value('flags')
  }

  get TABLE_NO_KEY() {
    return this.flags.includes('TABLE_NO_KEY')
  }

  get TABLE_HASH_KEY() {
    return this.flags.includes('TABLE_HASH_KEY')
  }

  get TABLE_PAT_KEY() {
    return this.flags.includes('TABLE_PAT_KEY')
  }

  get TABLE_DAT_KEY() {
    return this.flags.includes('TABLE_DAT_KEY')
  }

  get KEY_WITH_SIS() {
    return this.flags.includes('KEY_WITH_SIS')
  }

  get default_tokenizer(): string | undefined {
    return this.arguments['default_tokenizer']
  }

  get normalizer(): string | undefined {
    return this.arguments['normalizer']
  }

  get token_filters() {
    return this.array_value('token_filters')
  }
}

export function isTableCreate(cmd: GroongaCommand): cmd is TableCreate {
  return cmd.command_name === TableCreate.command_name
}

GroongaCommand.CommandList[TableCreate.command_name] = TableCreate
