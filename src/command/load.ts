import { GroongaCommand } from './groonga_command'

export class Load extends GroongaCommand {
  static readonly command_name = 'load'
  static readonly parameter_names = [
    'values', //
    'table',
    'columns',
    'ifexists',
    'input_type',
    'each',
    'output_ids',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }

  set table(name: string | undefined) {
    if (name) {
      this.arguments['table'] = name
    } else {
      delete this.arguments['table']
    }
  }

  private parse_values(values?: string): any {
    if (values === undefined) {
      return undefined
    } else {
      return JSON.parse(values)
    }
  }

  get values() {
    return this.parse_values(this.arguments['values'])
  }

  set values(values: any) {
    if (Array.isArray(values)) {
      this.arguments['values'] = JSON.stringify(values)
    }
  }

  private parse_columns(columns: string) {
    if (columns === undefined) {
      return []
    } else {
      return columns.split(/\s*,\s*/).filter((str) => str.length > 0)
    }
  }

  get columns(): string[] {
    return this.parse_columns(this.arguments['columns'])
  }

  set columns(columns: string[]) {
    if (columns.length === 0) {
      delete this.arguments['columns']
    } else {
      this.arguments['columns'] = columns.join(',')
    }
  }

  is_output_ids() {
    return this.boolean_value('output_ids', false, false)
  }
}

export function isLoad(cmd: GroongaCommand): cmd is Load {
  return cmd.command_name === Load.command_name
}

GroongaCommand.CommandList[Load.command_name] = Load
