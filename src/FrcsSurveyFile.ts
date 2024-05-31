import { FrcsTrip } from './FrcsTrip'
import { SegmentParseError } from 'parse-segment'

export type FrcsSurveyFile = {
  cave?: string | null
  columns?: FrcsShotColumnConfig
  location?: string | null
  comment?: string | null
  trips: Array<FrcsTrip>
  errors?: Array<SegmentParseError> | null
}

export type FrcsShotColumnConfig = {
  toStation: number
  fromStation: number
  distance: number
  distanceFeet: number
  distanceInches: number
  kind: number
  exclude: number
  frontsightAzimuth: number
  backsightAzimuth: number
  frontsightInclination: number
  backsightInclination: number
  left: number
  right: number
  up: number
  down: number
}

export const defaultFrcsShotColumnConfig: FrcsShotColumnConfig = {
  toStation: 5,
  fromStation: 5,
  distance: 6,
  distanceFeet: 4,
  distanceInches: 3,
  kind: 1,
  exclude: 1,
  frontsightAzimuth: 6,
  backsightAzimuth: 6,
  frontsightInclination: 5,
  backsightInclination: 5,
  left: 3,
  right: 3,
  up: 3,
  down: 3,
}
