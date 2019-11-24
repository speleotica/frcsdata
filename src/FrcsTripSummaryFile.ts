import { FrcsTripSummary } from './FrcsTripSummary'
import { SegmentParseError } from 'parse-segment'

export type FrcsTripSummaryFile = {
  errors?: Array<SegmentParseError> | null
  tripSummaries: Array<FrcsTripSummary | undefined>
}
