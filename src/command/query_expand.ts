import { GroongaCommand } from './groonga_command'

export class QueryExpand extends GroongaCommand {
  static readonly command_name = 'query_expand'
  static readonly parameter_names = [
    'expander', //
    'query',
    'flags',
  ]

  get expander(): string | undefined {
    return this.arguments['expander']
  }

  get query(): string | undefined {
    return this.arguments['query']
  }

  get flags() {
    return this.flags_value('flags')
  }

  get ALLOW_PRAGMA() {
    return this.flags.includes('ALLOW_PRAGMA')
  }

  get ALLOW_COLUMN() {
    return this.flags.includes('ALLOW_COLUMN')
  }

  get ALLOW_UPDATE() {
    return this.flags.includes('ALLOW_UPDATE')
  }

  get ALLOW_LEADING_NOT() {
    return this.flags.includes('ALLOW_LEADING_NOT')
  }

  get NONE() {
    return this.flags.includes('NONE')
  }
}

export function isQueryExpand(cmd: GroongaCommand): cmd is QueryExpand {
  return cmd.command_name === QueryExpand.command_name
}

GroongaCommand.CommandList[QueryExpand.command_name] = QueryExpand
