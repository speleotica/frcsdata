import { Length, UnitizedNumber } from '@speleotica/unitized'
import { FrcsTripSummaryFile } from '../FrcsTripSummaryFile.js'
import { FrcsSurveyFile, InvalidFrcsSurveyFile } from './FrcsSurveyFile.js'
import { unwrapInvalid } from '../unwrapInvalid.js'

export function summarizeSurvey(
  parsed: FrcsSurveyFile | InvalidFrcsSurveyFile,
  options?: { ignoreVerticalOfHShots?: boolean }
) {
  const summary: FrcsTripSummaryFile = {
    tripSummaries: [],
  }
  let tripIndex = 0
  for (const trip of unwrapInvalid(parsed).trips) {
    const { tripNumber, header, units, shots } = unwrapInvalid(trip)
    const { name, date, team } = unwrapInvalid(header)
    const distanceUnit = unwrapInvalid(units).distanceUnit || Length.feet
    let totalLength = new UnitizedNumber(0, distanceUnit)
    let excludedLength = new UnitizedNumber(0, distanceUnit)
    let numExcludedShots = 0

    for (const shot of unwrapInvalid(shots)) {
      const { distance, horizontalDistance, excludeDistance } =
        unwrapInvalid(shot)
      const statDistance =
        options?.ignoreVerticalOfHShots && horizontalDistance
          ? horizontalDistance
          : distance
      if (statDistance) totalLength = totalLength.add(statDistance)
      if (excludeDistance) {
        numExcludedShots++
        if (statDistance) excludedLength = excludedLength.add(statDistance)
      }
    }

    summary.tripSummaries.push({
      tripNumber: tripNumber ?? NaN,
      tripIndex: tripIndex++,
      date: date || new Date(NaN),
      name: name || '',
      team: team || [],
      numShots: shots.length,
      totalLength,
      numExcludedShots,
      excludedLength,
      shots: [],
    })
  }

  return summary
}
