export function parseNamesFile(content: string) {
  const names = new Map<string, { replacement?: string }>()
  for (const line of content.split(/\r\n?|\n/gm)) {
    const [name, replacement] = line.split('=>').map((s) => s.trim())
    if (name) names.set(name, { replacement })
  }
  return names
}
