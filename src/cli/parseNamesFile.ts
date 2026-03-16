export function parseNamesFile(content: string) {
  const names = new Map<string, { replacement?: string }>()
  for (const line of content.split(/\r\n?|\n/gm)) {
    const match = /^\s*(.+)\s*(?:=>\s*(.+)\s*)?$/.exec(line)
    if (match) {
      names.set(match[1].trim(), { replacement: match[2]?.trim() })
    }
  }
  return names
}
