export function normalizeTeamMemberName(name: string) {
  name = normalizeNameCapitalization(name)
  name = name.replace(/_/g, ' ')
  return name
}

export function normalizeNameCapitalization(name: string) {
  return name.replace(/([^. _]+)/g, (match) => {
    if (match.toUpperCase() !== match) return match
    if (/^(mc|.')/i.test(match)) {
      return (
        match.substring(0, 2) +
        match[2].toUpperCase() +
        match.substring(3).toLowerCase()
      )
    }
    return match[0] + match.substring(1).toLowerCase()
  })
}
