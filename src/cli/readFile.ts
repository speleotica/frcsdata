import fs from 'fs'
import { promisify } from 'util'

export async function readFile(file: string) {
  return new TextDecoder('windows-1252').decode(
    await promisify<Buffer>((cb) => fs.readFile(file || 0, cb))()
  )
}
