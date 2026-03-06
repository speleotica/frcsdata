// determines if a cell contains a valid station name.
export function isValidStation(s: string): boolean {
  return /^\s*\S+\s*$/.test(s)
}
// determines if a cell contains a valid unsigned integer.
export function isValidUInt(s: string): boolean {
  return /^\s*[0-9]+\s*$/.test(s)
}
// determines if a cell contains a valid float.
export function isValidFloat(s: string): boolean {
  return /^\s*[-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+)\s*$/.test(s)
}
// determines if a cell contains a valid unsigned float or whitespace.
export function isValidOptFloat(s: string): boolean {
  return /^\s*([-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+))?\s*$/.test(s)
}
// determines if a cell contains a valid unsigned float or whitespace.
export function isValidOptUFloat(s: string): boolean {
  return /^\s*([0-9]+(\.[0-9]*)?|\.[0-9]+)?\s*$/.test(s)
}
// determines if a cell contains a valid unsigned float.
export function isValidUFloat(s: string): boolean {
  return /^\s*([0-9]+(\.[0-9]*)?|\.[0-9]+)\s*$/.test(s)
}
