export function normalizeTeamMemberName(name: string) {
  name = name.replace(/(\S)(\S*)/g, (match, head, tail) =>
    match.toUpperCase() === match ? `${head}${tail.toLowerCase()}` : match
  )
  name = name.replace(/_/g, ' ')
  return name
}
