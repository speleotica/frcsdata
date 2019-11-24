import { UnitizedNumber, Length } from '@speleotica/unitized'

export type FrcsPlotShot = {
  toName: string
  isSurface?: boolean | null
  fromNumber: number
  toNumber: number
  easting: UnitizedNumber<Length>
  northing: UnitizedNumber<Length>
  elevation: UnitizedNumber<Length>
  leftEasting: UnitizedNumber<Length>
  leftNorthing: UnitizedNumber<Length>
  rightEasting: UnitizedNumber<Length>
  rightNorthing: UnitizedNumber<Length>
  up: UnitizedNumber<Length>
  down: UnitizedNumber<Length>
  tripNumber?: number | null
}
