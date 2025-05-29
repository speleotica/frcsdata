import { FrcsUnits } from './FrcsTrip'
import { FrcsShot, FrcsShotKind } from './FrcsShot'
import { Length, Unit, UnitType, UnitizedNumber } from '@speleotica/unitized'
import {
  FrcsShotColumnConfig,
  defaultFrcsShotColumnConfig,
} from './FrcsSurveyFile'

export function makeFormatFrcsShot({
  columns = defaultFrcsShotColumnConfig,
}: { columns?: FrcsShotColumnConfig } = {}) {
  const EMPTY_TO_STATION = ' '.repeat(columns.toStation)

  function formatFromStation(station: string): string {
    if (station.length > columns.fromStation) {
      throw new Error(`station is too long: ${station}`)
    }
    return station.padStart(columns.fromStation, ' ')
  }
  function formatToStation(station: string): string {
    if (station.length > columns.toStation) {
      throw new Error(`station is too long: ${station}`)
    }
    return station.padStart(columns.toStation, ' ')
  }

  function trimZeroes(str: string): string {
    const match = /(-?\d+)(\.[1-9]*)0+$/.exec(str)
    if (!match) return str
    return match[2].length > 1 ? match[1] + match[2] : match[1]
  }

  const formatNumber = (width: number) => {
    function formatNum(num: number | null | undefined): string
    function formatNum<T extends UnitType<T>>(
      num: UnitizedNumber<T> | null | undefined,
      unit: Unit<T>,
      verbatim?: boolean
    ): string
    function formatNum<T extends UnitType<T>>(
      num: number | UnitizedNumber<T> | null | undefined,
      unit?: Unit<T>,
      verbatim?: boolean
    ): string {
      if (num instanceof UnitizedNumber) {
        return formatNum(num.get(verbatim ? num.unit : unit || num.unit))
      }
      if (num == null || !Number.isFinite(num)) return ' '.repeat(width)
      const precision = Math.max(0, width - String(Math.trunc(num)).length - 1)
      const formatted = trimZeroes(num.toFixed(precision))
      return formatted.length <= width
        ? formatted.padStart(width, ' ')
        : formatted.substring(0, width)
    }
    return formatNum
  }

  const formatLeft = formatNumber(columns.left)
  const formatRight = formatNumber(columns.right)
  const formatUp = formatNumber(columns.up)
  const formatDown = formatNumber(columns.down)

  const EMPTY_DISTANCE = ' '.repeat(columns.distance)
  const formatDistance = formatNumber(columns.distance)

  const EMPTY_FS_AZIMUTH = ' '.repeat(columns.frontsightAzimuth)
  const formatFsAzimuth = formatNumber(columns.frontsightAzimuth)
  const EMPTY_BS_AZIMUTH = ' '.repeat(columns.backsightAzimuth)
  const formatBsAzimuth = formatNumber(columns.backsightAzimuth)

  const EMPTY_FS_INCLINATION = ' '.repeat(columns.frontsightInclination)
  const formatFsInclination = formatNumber(columns.frontsightInclination)
  const EMPTY_BS_INCLINATION = ' '.repeat(columns.backsightInclination)
  const formatBsInclination = formatNumber(columns.backsightInclination)

  const formatVerticalDistance = formatNumber(columns.frontsightInclination)

  const EMPTY_FEET = ' '.repeat(columns.distanceFeet)

  function formatFeet(distance: UnitizedNumber<Length> | null | void): string {
    if (!distance) return EMPTY_FEET
    return formatNumber(columns.distanceFeet)(
      Math.trunc(distance.get(Length.feet))
    )
  }

  const EMPTY_INCHES = ' '.repeat(columns.distanceInches)

  function formatInches(
    distance: UnitizedNumber<Length> | null | void
  ): string {
    if (!distance) return EMPTY_INCHES
    return formatNumber(columns.distanceInches)(
      Math.round(distance.get(Length.inches) % 12)
    )
  }

  return function formatFrcsShot(shot: FrcsShot, header: FrcsUnits): string {
    const { azimuthUnit, inclinationUnit } = header
    let { distanceUnit } = header

    const inches = distanceUnit === Length.inches
    if (inches) distanceUnit = Length.feet

    const isRecorded = shot.recorded !== null

    if (!shot.to) {
      const { left, right, up, down } =
        shot.recorded?.fromLruds || shot.fromLruds || {}
      return [
        EMPTY_TO_STATION,
        formatFromStation(shot.from),
        EMPTY_DISTANCE,
        ' ', // kind
        ' ', // exclude
        EMPTY_FS_AZIMUTH,
        EMPTY_BS_AZIMUTH,
        EMPTY_FS_INCLINATION,
        EMPTY_BS_INCLINATION,
        formatLeft(left, distanceUnit, isRecorded),
        formatRight(right, distanceUnit, isRecorded),
        formatUp(up, distanceUnit, isRecorded),
        formatDown(down, distanceUnit, isRecorded),
      ].join('')
    }

    const distColumnValue =
      shot.kind === FrcsShotKind.Horizontal
        ? shot.horizontalDistance
        : shot.distance

    return [
      formatToStation(shot.to),
      formatFromStation(shot.from),
      inches
        ? formatFeet(distColumnValue)
        : formatDistance(distColumnValue, distanceUnit, isRecorded),
      inches ? formatInches(distColumnValue) : shot.kind,
      inches ? shot.kind : shot.excludeDistance ? '*' : ' ',
      formatFsAzimuth(shot.frontsightAzimuth, azimuthUnit, isRecorded),
      formatBsAzimuth(shot.backsightAzimuth, azimuthUnit, isRecorded),
      shot.kind === FrcsShotKind.Normal
        ? formatFsInclination(
            shot.frontsightInclination,
            inclinationUnit,
            isRecorded
          )
        : formatVerticalDistance(
            shot.verticalDistance,
            distanceUnit,
            isRecorded
          ),
      shot.kind === FrcsShotKind.Normal
        ? formatBsInclination(
            shot.backsightInclination,
            inclinationUnit,
            isRecorded
          )
        : EMPTY_BS_INCLINATION,
      formatLeft(shot.toLruds?.left, distanceUnit, isRecorded),
      formatRight(shot.toLruds?.right, distanceUnit, isRecorded),
      formatUp(shot.toLruds?.up, distanceUnit, isRecorded),
      formatDown(shot.toLruds?.down, distanceUnit, isRecorded),
    ].join('')
  }
}

export default makeFormatFrcsShot()
