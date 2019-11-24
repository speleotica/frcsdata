import { FrcsTrip } from './FrcsTrip'
import { SegmentParseError } from 'parse-segment'

export type FrcsSurveyFile = {
  cave?: string | null
  location?: string | null
  comment?: string | null
  trips: Array<FrcsTrip>
  errors?: Array<SegmentParseError> | null
}
