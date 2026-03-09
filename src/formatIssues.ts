import { FrcsSurveyFile, InvalidFrcsSurveyFile } from './survey/FrcsSurveyFile'
import {
  FrcsSurveyFileJson,
  InvalidFrcsSurveyFileJson,
} from './survey/FrcsSurveyFileJson.js'
import { underlineSource } from './underlineSource'
import { unwrapInvalid } from './unwrapInvalid.js'

export function formatIssues({
  parsed,
  source,
  file,
  errorStyle = (s) => s,
  warningStyle = (s) => s,
}: {
  parsed:
    | FrcsSurveyFile
    | InvalidFrcsSurveyFile
    | FrcsSurveyFileJson
    | InvalidFrcsSurveyFileJson
  source: string
  file: string
  errorStyle?: (s: string) => string
  warningStyle?: (s: string) => string
}) {
  const issues = parsed.issues || []
  const lines: string[] = []
  for (const issue of issues) {
    const { type, loc, message } = issue
    const style = type === 'error' ? errorStyle : warningStyle
    lines.push(
      `${style(
        `${
          type === 'error' ? errorStyle('✘') : warningStyle('⚠')
        } ${`${type[0].toUpperCase()}${type.substring(1)}:`.padEnd(
          8
        )} ${message?.padEnd(40)}`
      )} (${file}:${loc?.start?.line}:${loc?.start?.column})`
    )
    if (loc) {
      lines.push(underlineSource(source, loc, { underlineStyle: style }))
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
  const trips = unwrapInvalid(parsed).trips
  const tripCount = trips.length
  const shotCount = trips.reduce(
    (count, trip) => count + unwrapInvalid(trip).shots.length,
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
    lines.push(
      errorStyle(
        `${fmtErrorCount.padStart(countWidth)} error${
          errorCount === 1 ? '' : 's'
        }`
      )
    )
  }
  if (warningCount) {
    lines.push(
      warningStyle(
        `${fmtWarningCount.padStart(countWidth)} warning${
          warningCount === 1 ? '' : 's'
        }`
      )
    )
  }
  lines.push(
    `${fmtTripCount.padStart(countWidth)} trip${tripCount === 1 ? '' : 's'}`
  )
  lines.push(
    `${fmtShotCount.padStart(countWidth)} shot${shotCount === 1 ? '' : 's'}`
  )
  return lines.join('\n')
}
