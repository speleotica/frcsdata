import { UnitizedNumber, Length, Angle } from '@speleotica/unitized'

export enum FrcsShotKind {
  Normal = ' ',
  Horizontal = 'H',
  Diagonal = 'D',
}

export type FrcsShot = {
  from: string
  to?: string | null
  kind: FrcsShotKind
  distance: UnitizedNumber<Length>
  horizontalDistance?: UnitizedNumber<Length> | null
  verticalDistance?: UnitizedNumber<Length> | null
  frontsightAzimuth?: UnitizedNumber<Angle> | null
  frontsightInclination?: UnitizedNumber<Angle> | null
  backsightAzimuth?: UnitizedNumber<Angle> | null
  backsightInclination?: UnitizedNumber<Angle> | null
  // In LRUD-only shots, these are the LRUDs at the from station.
  // Otherwise, these are the LRUDs at the to station.
  left?: UnitizedNumber<Length> | null
  right?: UnitizedNumber<Length> | null
  up?: UnitizedNumber<Length> | null
  down?: UnitizedNumber<Length> | null
  excludeDistance?: boolean | null
  comment?: string | null
}
