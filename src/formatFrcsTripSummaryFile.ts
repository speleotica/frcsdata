import { Length } from '@speleotica/unitized'
import { FrcsTripSummaryFile } from './FrcsTripSummaryFile.js'

const nameLength = 78

export function* formatFrcsTripSummaryFile(
  file: FrcsTripSummaryFile
): Iterable<string> {
  for (const summary of file.tripSummaries) {
    if (!summary) continue
    const {
      tripNumber,
      date,
      totalLength,
      numShots,
      name,
      excludedLength,
      numExcludedShots,
      team,
      shots,
    } = summary
    const month = (date.getMonth() + 1).toFixed()
    const day = date.getDate().toFixed()
    const year = date.getFullYear().toFixed()
    yield `${tripNumber.toFixed().padStart(3)}  ${month.padStart(
      2
    )}/${day.padStart(2)}/${year.padStart(4)}${totalLength
      .get(Length.feet)
      .toFixed(2)
      .padStart(10)}${numShots.toFixed().padStart(5)}   ${name
      .slice(0, nameLength)
      .padEnd(nameLength)}  EXCLUDED:${excludedLength
      .get(Length.feet)
      .toFixed(2)
      .padStart(7)}${numExcludedShots.toFixed().padStart(3)}`
    yield ' '.repeat(tripNumber >= 1000 ? 34 : 33) + team.join('  ')
    for (let i = 0; i < shots.length; i += 4) {
      yield ' '.repeat(tripNumber >= 1000 ? 36 : 35) +
        shots
          .slice(i, i + 4)
          .map((s) => s.padEnd(14))
          .join('')
    }
  }
}
