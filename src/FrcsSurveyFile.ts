import { FrcsTrip } from './FrcsTrip'
import FrcsParseError from './FrcsParseError'

export type FrcsSurveyFile = {
  cave?: string | null
  location?: string | null
  comment?: string | null
  trips: Array<FrcsTrip>
  errors: Array<FrcsParseError>
}
