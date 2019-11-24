import { Unit, Length, Angle } from '@speleotica/unitized'
import { FrcsShot } from './FrcsShot'

export type FrcsTripHeader = {
  name: string
  comment?: string | null
  section?: string | null
  date?: Date | null
  surveyors?: Array<string> | null
  distanceUnit: Unit<Length>
  azimuthUnit: Unit<Angle>
  inclinationUnit: Unit<Angle>
  backsightAzimuthCorrected?: boolean | null
  backsightInclinationCorrected?: boolean | null
  hasBacksightAzimuth?: boolean | null
  hasBacksightInclination?: boolean | null
}

export type FrcsTrip = {
  header: FrcsTripHeader
  shots: Array<FrcsShot>
}
