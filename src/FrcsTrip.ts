import { Unit, Length, Angle } from '@speleotica/unitized'
import { FrcsShot } from './FrcsShot'

export type FrcsUnits = {
  distanceUnit: Unit<Length>
  azimuthUnit: Unit<Angle>
  inclinationUnit: Unit<Angle>
  backsightAzimuthCorrected?: boolean | null
  backsightInclinationCorrected?: boolean | null
  hasBacksightAzimuth?: boolean | null
  hasBacksightInclination?: boolean | null
}

export type FrcsTripHeader = FrcsUnits & {
  name: string
  comment?: string | null
  section?: string | null
  date?: Date | null
  team?: Array<string> | null
}

export type FrcsTrip = {
  header: FrcsTripHeader
  shots: Array<FrcsShot>
}
