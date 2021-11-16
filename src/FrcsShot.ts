import { UnitizedNumber, Length, Angle } from '@speleotica/unitized'

export enum FrcsShotKind {
  Normal = ' ',
  Horizontal = 'H',
  Diagonal = 'D',
}

export type FrcsShot = {
  /**
   * Name of from station
   */
  from: string
  /**
   * Name of to station
   */
  to?: string | null
  kind: FrcsShotKind
  distance: UnitizedNumber<Length>
  horizontalDistance?: UnitizedNumber<Length> | null
  verticalDistance?: UnitizedNumber<Length> | null
  frontsightAzimuth?: UnitizedNumber<Angle> | null
  frontsightInclination?: UnitizedNumber<Angle> | null
  backsightAzimuth?: UnitizedNumber<Angle> | null
  backsightInclination?: UnitizedNumber<Angle> | null
  /**
   * LRUDs at from station
   */
  fromLruds?: {
    left?: UnitizedNumber<Length> | null
    right?: UnitizedNumber<Length> | null
    up?: UnitizedNumber<Length> | null
    down?: UnitizedNumber<Length> | null
  }
  /**
   * LRUDs at to station
   */
  toLruds?: {
    left?: UnitizedNumber<Length> | null
    right?: UnitizedNumber<Length> | null
    up?: UnitizedNumber<Length> | null
    down?: UnitizedNumber<Length> | null
  }
  excludeDistance?: boolean | null
  isSplay?: boolean | null
  comment?: string | null
}
