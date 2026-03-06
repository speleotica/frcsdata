/* eslint-disable no-console */
import fs from 'fs/promises'
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import { underlineSource } from '../underlineSource.js'
import chalk from 'chalk'

export async function check(file: string) {
  const source = await fs.readFile(file, 'utf8')
  const parsed = await parseFrcsSurveyFile(file, [source])

  const issues = parsed.issues || []
  for (const issue of issues) {
    const { type, loc, message } = issue
    const style = type === 'error' ? chalk.red : chalk.yellow
    console.log(
      `${style(
        `${
          type === 'error' ? chalk.red('✘') : chalk.yellow('⚠')
        } ${`${type[0].toUpperCase()}${type.substring(1)}:`.padEnd(
          8
        )} ${message?.padEnd(40)}`
      )} (${file}:${loc?.start?.line}:${loc?.start?.column})`
    )
    if (loc) {
      console.log(underlineSource(source, loc, { underlineStyle: style }))
    }
  }

  const errorCount = issues.reduce(
    (count, i) => (i.type === 'error' ? count + 1 : count),
    0
  )
  const warningCount = issues.reduce(
    (count, i) => (i.type === 'warning' ? count + 1 : count),
    0
  )

  if (errorCount)
    console.log(
      chalk.red(`✘ ${errorCount} error${errorCount === 1 ? '' : 's'}`)
    )
  if (warningCount)
    console.log(
      chalk.yellow(`⚠ ${warningCount} warning${warningCount === 1 ? '' : 's'}`)
    )

  process.exit(issues.some((i) => i.type === 'error') ? 1 : 0)
}
