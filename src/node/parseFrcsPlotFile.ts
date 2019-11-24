import { FrcsPlotFile } from '../FrcsPlotFile'
import parseFrcsPlotFile from '../parseFrcsPlotFile'
import readline from 'readline'
import fs from 'fs'

export default async function nodeParseFrcsPlotFile(
  file: string
): Promise<FrcsPlotFile> {
  return await parseFrcsPlotFile(
    file,
    readline.createInterface(fs.createReadStream(file))
  )
}
