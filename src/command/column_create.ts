import { GroongaCommand } from './groonga_command'
import { array_value, flags_value } from '../utils'

export class ColumnCreate extends GroongaCommand {
  static readonly command_name = 'column_create'
  static readonly parameter_names = [
    'table', //
    'name',
    'flags',
    'type',
    'source',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }

  get name(): string | undefined {
    return this.arguments['name']
  }

  get flags() {
    return flags_value(this.arguments, 'flags')
  }

  get type(): string | undefined {
    return this.arguments['type']
  }

  get COLUMN_SCALAR() {
    return this.flags.includes('COLUMN_SCALAR')
  }

  get COLUMN_VECTOR() {
    return this.flags.includes('COLUMN_VECTOR')
  }

  get COLUMN_INDEX() {
    return this.flags.includes('COLUMN_INDEX')
  }

  get WITH_SECTION() {
    return this.flags.includes('WITH_SECTION')
  }

  get WITH_WEIGHT() {
    return this.flags.includes('WITH_WEIGHT')
  }

  get WITH_POSITION() {
    return this.flags.includes('WITH_POSITION')
  }

  get sources() {
    return array_value(this.arguments, 'source')
  }
}

export function isColumnCreate(cmd: GroongaCommand): cmd is ColumnCreate {
  return cmd.command_name === ColumnCreate.command_name
}

GroongaCommand.CommandList[ColumnCreate.command_name] = ColumnCreate
