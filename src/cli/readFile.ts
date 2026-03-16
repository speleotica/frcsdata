import fs from 'fs'
import { promisify } from 'util'

export async function readFile(file: string) {
  return await promisify<string>((cb) => fs.readFile(file || 0, 'utf8', cb))()
}
