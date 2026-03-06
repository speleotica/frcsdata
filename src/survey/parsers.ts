import {
  UnitType,
  Unit,
  UnitizedNumber,
  Angle,
  Length,
} from '@speleotica/unitized'
import { Unitize } from '@speleotica/unitized'
import type { FrcsShot } from './FrcsSurveyFile'
import { isValidOptFloat } from './validators'

export function parseMonth(month: string) {
  switch (month.substring(0, 3).toLowerCase()) {
    case 'jan':
      return 1
    case 'feb':
      return 2
    case 'mar':
      return 3
    case 'apr':
      return 4
    case 'may':
      return 5
    case 'jun':
      return 6
    case 'jul':
      return 7
    case 'aug':
      return 8
    case 'sep':
      return 9
    case 'oct':
      return 10
    case 'nov':
      return 11
    case 'dec':
      return 12
    default:
      throw new Error(`invalid month: ${month}`)
  }
}
export function parseNumber<T extends UnitType<T>>(
  s: string,
  unit: Unit<T>
): UnitizedNumber<T> | undefined {
  const value = parseFloat(s)
  if (isNaN(value)) return undefined
  return new UnitizedNumber(value, unit)
}
export function parseAzimuth(
  s: string,
  unit: Unit<Angle>
): UnitizedNumber<Angle> | undefined {
  const parsed = parseNumber(s, unit)
  return parsed?.get(Angle.degrees) === 360 ? Unitize.degrees(0) : parsed
}
export function parseSpecialKind(kind: string): FrcsShot['specialKind'] {
  switch (kind) {
    case 'H':
      return 'horizontal'
    case 'D':
      return 'diagonal'
    default:
      return undefined
  }
}
export function parseLengthUnit(unit: string): Unit<Length> | undefined {
  switch (unit) {
    case 'FI':
      return Length.inches
    case 'FF':
    case 'FT':
      return Length.feet
    case 'MT':
    case 'MM':
    case 'M ':
      return Length.meters
  }
  return undefined
}
export function parseAngleUnit(unit: string): Unit<Angle> | undefined {
  switch (unit) {
    case 'D':
      return Angle.degrees
    case 'G':
      return Angle.gradians
    case 'M':
      return Angle.milsNATO
  }
  return undefined
}
export function parseLrud<T extends UnitType<T>>(
  s: string,
  unit: Unit<Length>
): UnitizedNumber<Length> | undefined {
  const value = parseFloat(s)
  return !Number.isFinite(value) || value < 0
    ? undefined
    : new UnitizedNumber(value, unit)
}
export function parseFromStationLruds(
  line: string,
  distanceUnit: Unit<Length>
): [string, NonNullable<FrcsShot['fromLruds']>] | undefined {
  const fromStr = line.substring(0, 5)
  if (!/^\s*\S+$/.test(fromStr)) return undefined
  const gap = line.substring(5, 40)
  if (gap.trim()) return undefined
  const lrudStr = line.substring(40, 52)
  if (!/\d/.test(lrudStr)) return undefined
  const lStr = line.substring(40, 43)
  const rStr = line.substring(43, 46)
  const uStr = line.substring(46, 49)
  const dStr = line.substring(49, 52)
  if (
    !isValidOptFloat(lStr) ||
    !isValidOptFloat(rStr) ||
    !isValidOptFloat(uStr) ||
    !isValidOptFloat(dStr)
  ) {
    return undefined
  }
  const up = parseLrud(uStr, distanceUnit)
  const down = parseLrud(dStr, distanceUnit)
  const left = parseLrud(lStr, distanceUnit)
  const right = parseLrud(rStr, distanceUnit)
  return [fromStr.trim(), { left, right, up, down }]
}
