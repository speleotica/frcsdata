/* eslint-disable no-console */
import fs from 'fs/promises'
import path from 'path'
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'

export async function check(file: string) {
  const relfile = path.relative(process.cwd(), file)
  const content = await fs.readFile(file, 'utf8')
  const lines = content.split(/\r\n?|\n/gm)
  const parsed = await parseFrcsSurveyFile(file, [content])

  const issues = parsed.issues || []
  for (const issue of issues) {
    const { type, loc, message } = issue
    console.log(
      `${type} ${message} $(${relfile}:${loc?.start?.line}:${loc?.start?.column})`
    )
    if (loc) {
      const { start, end } = loc
      const contextLines = lines.slice(start.line - 1, end.line)
      let i = 0
      for (const line of contextLines) {
        console.log(line)
        if (i === 0 && contextLines.length === 1) {
          console.log(
            ' '.repeat(start.column) + '^'.repeat(end.column - start.column)
          )
        } else if (i === 0) {
          console.log(
            ' '.repeat(start.column) + '^'.repeat(line.length - start.column)
          )
        } else if (i === contextLines.length - 1) {
          console.log('^'.repeat(end.column))
        } else {
          console.log('^'.repeat(line.length))
        }
        i++
      }
    }
  }
  process.exit(issues.some((i) => i.type === 'error') ? 1 : 0)
}
