const splitName = (name: string) => {
  return /^(.+)\s+(\S+)$/.exec(name)?.slice(1) || ['', name]
}

export function compareNames(a: string, b: string) {
  const [aFirst, aLast] = splitName(a.toLowerCase())
  const [bFirst, bLast] = splitName(b.toLowerCase())
  return (
    aLast.localeCompare(bLast) ||
    aFirst.localeCompare(bFirst) ||
    a[0].localeCompare(b[0])
  )
}
