/* eslint-disable no-console */
import fs from 'fs/promises'
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import { underlineSource } from '../underlineSource.js'
import chalk from 'chalk'

export async function checkSurvey(file: string) {
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
  const trips = 'INVALID' in parsed ? parsed.INVALID.trips : parsed.trips
  const tripCount = trips.length
  const shotCount = trips.reduce(
    (count, trip) =>
      count +
      ('INVALID' in trip ? trip.INVALID.shots.length : trip.shots.length),
    0
  )

  const fmtErrorCount = `✘ ${errorCount}`
  const fmtWarningCount = `⚠ ${warningCount}`
  const fmtTripCount = `${tripCount}`
  const fmtShotCount = `${shotCount}`

  const countWidth = Math.max(
    fmtErrorCount.length,
    fmtWarningCount.length,
    fmtTripCount.length,
    fmtShotCount.length
  )

  if (errorCount) {
    console.log(
      chalk.red(
        `${fmtErrorCount.padStart(countWidth)} error${
          errorCount === 1 ? '' : 's'
        }`
      )
    )
  }
  if (warningCount) {
    console.log(
      chalk.yellow(
        `${fmtWarningCount.padStart(countWidth)} warning${
          warningCount === 1 ? '' : 's'
        }`
      )
    )
  }
  console.log(
    `${fmtTripCount.padStart(countWidth)} trip${tripCount === 1 ? '' : 's'}`
  )
  console.log(
    `${fmtShotCount.padStart(countWidth)} shot${shotCount === 1 ? '' : 's'}`
  )

  process.exit(issues.some((i) => i.type === 'error') ? 1 : 0)
}
