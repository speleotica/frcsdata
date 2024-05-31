import { Angle, Length, Unit } from '@speleotica/unitized'
import { FrcsSurveyFile } from './FrcsSurveyFile'
import { FrcsUnits } from './FrcsTrip'
import { makeFormatFrcsShot } from './formatFrcsShot'

export async function* formatFrcsSurveyFile(
  file: FrcsSurveyFile
): AsyncIterable<string> {
  const formatFrcsShot = makeFormatFrcsShot(file)
  if (file.cave) {
    yield `      ${file.cave}${file.location ? `, ${file.location}` : ''}\n`
  }
  for (let tripIndex = 0; tripIndex < file.trips.length; tripIndex++) {
    const trip = file.trips[tripIndex]
    const { shots, header } = trip
    const { name, team, date, comment } = header
    if (tripIndex > 0) yield ' *\n'
    yield name.replace(/\n?$/, '\n')
    const line2 = [
      ...(team?.length ? [team.join(', ')] : []),
      ...(date ? [formatDate(date)] : []),
    ].join('. ')
    if (line2) yield `${line2}\n`
    if (comment) yield comment.replace(/\n?$/, '\n')
    yield ' *\n'
    yield formatUnits(header)

    let alternateUnits: FrcsUnits | undefined

    for (let i = 0; i < shots.length; i++) {
      const shot = shots[i]
      if (shot.comment) {
        const lines = shot.comment.split(/\n/gm)
        yield '*\n'
        for (let i = 0; i < lines.length - 1; i++) {
          yield lines[i].replace(/\n?$/, '\n')
        }
        yield `* ${lines[lines.length - 1].replace(/\n?$/, '\n')}`
      }
      if (shot.recorded?.units) {
        alternateUnits = shot.recorded.units
        yield `*      %NC\n`
        yield formatUnits(shot.recorded.units)
      }
      yield formatFrcsShot(
        shot.recorded || shot,
        alternateUnits || header
      ).replace(/\n?$/, '\n')
    }
  }
}

function formatUnits(units: FrcsUnits): string {
  const distUnit = formatLengthUnit(units.distanceUnit)
  const azmMode = units.hasBacksightAzimuth
    ? units.backsightAzimuthCorrected
      ? 'C'
      : 'B'
    : ' '
  const incMode = units.hasBacksightInclination
    ? units.backsightInclinationCorrected
      ? 'C'
      : 'B'
    : ' '
  const azmUnit = formatAngleUnit(units.azimuthUnit)
  const incUnit = formatAngleUnit(units.inclinationUnit)

  return `${distUnit} ${azmMode}${incMode} ${azmUnit}${incUnit}\n`
}

function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() % 100}`
}

function formatLengthUnit(unit: Unit<Length>): string {
  switch (unit) {
    case Length.meters:
      return 'M '
    case Length.feet:
      return 'FT'
    case Length.inches:
      return 'FI'
    default:
      throw new Error(`invalid length unit: ${unit}`)
  }
}

function formatAngleUnit(unit: Unit<Angle>): string {
  switch (unit) {
    case Angle.degrees:
      return 'D'
    case Angle.gradians:
      return 'G'
    default:
      throw new Error(`invalid angle unit: ${unit}`)
  }
}
