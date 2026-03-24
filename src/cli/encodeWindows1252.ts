import { encode } from 'windows-1252'

export function encodeWindows1252(text: string) {
  return new Uint8Array(encode(text))
}
