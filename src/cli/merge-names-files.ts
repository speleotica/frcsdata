import { readFile } from 'fs/promises'
import { parseNamesFile } from './parseNamesFile'
import { formatNamesFile } from './formatNamesFile'

export async function mergeNamesFiles(...files: string[]) {
  const names = new Map<string, { replacement?: string }>()

  for (const file of files) {
    const parsed = parseNamesFile(await readFile(file, 'utf8'))
    for (const [name, { replacement }] of parsed) {
      const existing = names.get(name)
      if (!existing) names.set(name, { replacement })
      else if (!existing.replacement) existing.replacement = replacement
    }
  }

  process.stdout.write(formatNamesFile(names))
}
