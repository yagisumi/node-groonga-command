import { StringPairs } from './types'

export function integer_value(args: StringPairs, name: string): number | undefined {
  if (name in args) {
    return parse_integer_value(args[name])
  } else {
    return undefined
  }
}

export function parse_integer_value(value: string) {
  const n = parseInt(value)
  return isNaN(n) ? undefined : n
}

export function array_value(args: StringPairs, name: string) {
  if (name in args) {
    return parse_array_value(args[name])
  } else {
    return []
  }
}

export function parse_array_value(value: string) {
  return value
    .trim()
    .split(/\s*,\s*/)
    .filter((s) => s.length > 0)
}

export function flags_value(args: StringPairs, name: string) {
  if (name in args) {
    return parse_flags_value(args[name])
  } else {
    return []
  }
}

export function parse_flags_value(value: string) {
  return value
    .trim()
    .split(/\s*[| ]\s*/)
    .filter((s) => s.length > 0)
}

export function boolean_value(args: StringPairs, name: string, default_value: boolean, invalid: boolean) {
  if (name in args) {
    return parse_boolean_value(args[name], default_value, invalid)
  } else {
    return default_value
  }
}

export function parse_boolean_value(value: string, default_value: boolean, invalid: boolean) {
  if (value.length === 0) {
    return default_value
  }

  if (value === 'yes') {
    return true
  } else if (value === 'no') {
    return false
  } else {
    return invalid
  }
}

export function escapePattern(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export function escapeValue(value: string) {
  return `"${value.replace(/[\n"\\]/g, (match) => (match === '\n' ? '\\n' : `\\${match}`))}"`
}

export function equalsStringPairs(obj1: StringPairs, obj2: StringPairs) {
  for (let name in obj1) {
    if (!(name in obj2) || obj1[name] !== obj2[name]) {
      return false
    }
  }

  return true
}
