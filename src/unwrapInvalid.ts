export function unwrapInvalid<T>(t: T): T extends { INVALID: infer I } ? I : T {
  return (t instanceof Object && 'INVALID' in t ? t.INVALID : t) as any
}
