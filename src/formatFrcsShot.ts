import { FrcsTripHeader } from './FrcsTrip'
import { FrcsShot, FrcsShotKind } from './FrcsShot'
import { Length, UnitizedNumber } from '@speleotica/unitized'

const STATION_WIDTH = 5
const EMPTY_STATION = ' '.repeat(STATION_WIDTH)

function formatStation(station: string): string {
  if (station.length > STATION_WIDTH) {
    throw new Error(`station is too long: ${station}`)
  }
  return station.padStart(STATION_WIDTH, ' ')
}

function trimZeroes(str: string): string {
  const match = /(-?\d+)(\.[1-9]*)0+$/.exec(str)
  if (!match) return str
  return match[2].length > 1 ? match[1] + match[2] : match[1]
}

const formatNumber = (width: number) => (num: number | void): string => {
  if (num == null || !Number.isFinite(num)) return ' '.repeat(width)
  const formatted = trimZeroes(num.toFixed(2))
  if (formatted.length <= width) return formatted.padStart(width, ' ')
  if (formatted.length > width + 2) return formatted.substring(0, width)
  return trimZeroes(num.toFixed(2 - formatted.length + width)).padStart(
    width,
    ' '
  )
}

const LRUD_WIDTH = 3
const formatLrud = formatNumber(LRUD_WIDTH)

const DISTANCE_WIDTH = 6
const EMPTY_DISTANCE = ' '.repeat(DISTANCE_WIDTH)
const formatDistance = formatNumber(DISTANCE_WIDTH)

const AZIMUTH_WIDTH = 6
const EMPTY_AZIMUTH = ' '.repeat(AZIMUTH_WIDTH)
const formatAzimuth = formatNumber(AZIMUTH_WIDTH)

const INCLINATION_WIDTH = 5
const EMPTY_INCLINATION = ' '.repeat(INCLINATION_WIDTH)
const formatInclination = formatNumber(INCLINATION_WIDTH)

const formatVerticalDistance = formatNumber(INCLINATION_WIDTH)

const FEET_WIDTH = 4
const EMPTY_FEET = ' '.repeat(FEET_WIDTH)

function formatFeet(distance: UnitizedNumber<Length> | null | void): string {
  if (!distance) return EMPTY_FEET
  return formatNumber(FEET_WIDTH)(Math.trunc(distance.get(Length.feet)))
}

const INCHES_WIDTH = 3
const EMPTY_INCHES = ' '.repeat(INCHES_WIDTH)

function formatInches(distance: UnitizedNumber<Length> | null | void): string {
  if (!distance) return EMPTY_INCHES
  return formatNumber(INCHES_WIDTH)(
    Math.round(distance.get(Length.inches) % 12)
  )
}

export default function formatFrcsShot(
  shot: FrcsShot,
  header: FrcsTripHeader
): string {
  const { azimuthUnit, inclinationUnit } = header
  let { distanceUnit } = header

  const inches = distanceUnit === Length.inches
  if (inches) distanceUnit = Length.feet

  if (!shot.to) {
    return [
      formatStation(shot.from),
      EMPTY_STATION,
      EMPTY_DISTANCE,
      ' ', // kind
      ' ', // exclude
      EMPTY_AZIMUTH,
      EMPTY_AZIMUTH,
      EMPTY_INCLINATION,
      EMPTY_INCLINATION,
      formatLrud(shot.left?.get(distanceUnit)),
      formatLrud(shot.right?.get(distanceUnit)),
      formatLrud(shot.up?.get(distanceUnit)),
      formatLrud(shot.down?.get(distanceUnit)),
    ].join('')
  }

  const distColumnValue =
    shot.kind === FrcsShotKind.Horizontal
      ? shot.horizontalDistance
      : shot.distance

  return [
    formatStation(shot.to),
    formatStation(shot.from),
    inches
      ? formatFeet(distColumnValue)
      : formatDistance(distColumnValue?.get(distanceUnit)),
    inches ? formatInches(distColumnValue) : shot.kind,
    inches ? shot.kind : shot.excludeDistance ? '*' : ' ',
    formatAzimuth(shot.frontsightAzimuth?.get(azimuthUnit)),
    formatAzimuth(shot.backsightAzimuth?.get(azimuthUnit)),
    shot.kind === FrcsShotKind.Normal
      ? formatInclination(shot.frontsightInclination?.get(inclinationUnit))
      : formatVerticalDistance(shot.verticalDistance?.get(distanceUnit)),
    shot.kind === FrcsShotKind.Normal
      ? formatInclination(shot.backsightInclination?.get(inclinationUnit))
      : EMPTY_INCLINATION,
    formatLrud(shot.left?.get(distanceUnit)),
    formatLrud(shot.right?.get(distanceUnit)),
    formatLrud(shot.up?.get(distanceUnit)),
    formatLrud(shot.down?.get(distanceUnit)),
  ].join('')
}
