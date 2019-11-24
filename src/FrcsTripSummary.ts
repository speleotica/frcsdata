import { UnitizedNumber, Length } from '@speleotica/unitized'

export type FrcsTripSummary = {
  tripNumber: number
  tripIndex: number
  date: Date
  totalLength: UnitizedNumber<Length>
  numShots: number
  name: string
  excludedLength: UnitizedNumber<Length>
  numExcludedShots: number
  team: Array<string>
  shots: Array<string>
}
