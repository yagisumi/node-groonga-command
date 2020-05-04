export type StringPairs = { [key: string]: string }

export type FormatOptions = {
  pretty_print?: boolean
  exclude?: string[]
}

export type Constructor<T = {}> = new (...args: any[]) => T

export type Drilldown = {
  keys: string[]
  sort_keys: string[]
  output_columns: string[]
  offset?: number
  limit?: number
  calc_types: string[]
  calc_target?: string
  filter?: string
  label: string
}

export type Slice = {
  label: string
  match_columns: string[]
  query?: string
  query_expander?: string
  query_flags: string[]
  filter?: string
  sort_keys: string[]
  output_columns: string[]
  offset?: number
  limit?: number
  labeled_drilldowns: { [name: string]: Drilldown }
}
