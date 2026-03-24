import { parseNamesFile } from './parseNamesFile'
import { formatNamesFile } from './formatNamesFile'
import { readFile } from './readFile'
import { encodeWindows1252 } from './encodeWindows1252'

export async function mergeNamesFiles(...files: string[]) {
  const names = new Map<string, { replacement?: string }>()

  for (const file of files) {
    const parsed = parseNamesFile(await readFile(file))
    for (const [name, { replacement }] of parsed) {
      const existing = names.get(name)
      if (!existing) names.set(name, { replacement })
      else if (!existing.replacement) existing.replacement = replacement
    }
  }

  process.stdout.write(encodeWindows1252(formatNamesFile(names)))
}
