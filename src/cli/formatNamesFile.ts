import { compareNames } from './compareNames'

export function formatNamesFile(names: Map<string, { replacement?: string }>) {
  return (
    [...names.entries()]
      .sort((a, b) => compareNames(a[0], b[0]))
      .map(
        ([name, { replacement }]) =>
          `${name}${replacement ? ` => ${replacement}` : ''}`
      )
      .join('\n') + '\n'
  )
}
