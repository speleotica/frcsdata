export function normalizeTeamMemberName(name: string) {
  if (name.toUpperCase() === name) {
    name = name.replace(
      /(\S)(\S*)/g,
      (match, head, tail) => `${head}${tail.toLowerCase()}`
    )
  }
  name = name.replace(/_/g, ' ')
  return name
}
