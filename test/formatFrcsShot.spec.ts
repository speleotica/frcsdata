import { describe, it } from 'mocha'
import { expect } from 'chai'

import { FrcsTripHeader } from '../src/FrcsTrip'
import formatFrcsShot from '../src/formatFrcsShot'
import { Angle, Length, Unitize } from '@speleotica/unitized'
import { FrcsShot, FrcsShotKind } from '../src/FrcsShot'

describe(`formatFrcsShot`, function () {
  const defaultHeader: FrcsTripHeader = {
    name: 'Foo',
    distanceUnit: Length.feet,
    azimuthUnit: Angle.degrees,
    inclinationUnit: Angle.degrees,
    backsightAzimuthCorrected: true,
    backsightInclinationCorrected: true,
  }

  function testCase(
    desc: string,
    shot: FrcsShot,
    expected: string,
    header: FrcsTripHeader = defaultHeader
  ): void {
    it(desc, function () {
      expect(formatFrcsShot(shot, header)).to.equal(expected)
    })
  }

  testCase(
    'normal shot',
    {
      kind: FrcsShotKind.Normal,
      to: 'PDF28',
      from: 'PDF27',
      distance: Unitize.feet(31.7),
      frontsightAzimuth: Unitize.degrees(174.3),
      backsightAzimuth: Unitize.degrees(174.1),
      frontsightInclination: Unitize.degrees(-1.2),
      backsightInclination: Unitize.degrees(-1.6),

      toLruds: {
        left: Unitize.feet(2),
        right: Unitize.feet(3),
        up: Unitize.feet(0.5),
        down: Unitize.feet(1.5),
      },
    },
    'PDF28PDF27  31.7   174.3 174.1 -1.2 -1.6  2  30.51.5'
  )
  testCase(
    'shot with excess precision',
    {
      kind: FrcsShotKind.Normal,
      to: 'PDF28',
      from: 'PDF27',
      distance: Unitize.feet(31.7),
      frontsightAzimuth: Unitize.degrees(174.3673),
      backsightAzimuth: Unitize.degrees(174.1),
      frontsightInclination: Unitize.degrees(-1.2),
      backsightInclination: Unitize.degrees(-18.654),

      toLruds: {
        left: Unitize.feet(2),
        right: Unitize.feet(3.24),
        up: Unitize.feet(0.5),
        down: Unitize.feet(12.5),
      },
    },
    'PDF28PDF27  31.7  174.37 174.1 -1.2-18.7  23.20.5 13'
  )
  testCase(
    'excluded shot',
    {
      kind: FrcsShotKind.Normal,
      to: 'PDF28',
      from: 'PDF27',
      distance: Unitize.feet(31.7),
      excludeDistance: true,
      frontsightAzimuth: Unitize.degrees(174.3),
      backsightAzimuth: Unitize.degrees(174.1),
      frontsightInclination: Unitize.degrees(-1.2),
      backsightInclination: Unitize.degrees(-1.6),

      toLruds: {
        left: Unitize.feet(2),
        right: Unitize.feet(3),
        up: Unitize.feet(0.5),
        down: Unitize.feet(1.5),
      },
    },
    'PDF28PDF27  31.7 * 174.3 174.1 -1.2 -1.6  2  30.51.5'
  )

  testCase(
    'excluded horizontal shot',
    {
      kind: FrcsShotKind.Horizontal,
      to: 'PDF28',
      from: 'PDF27',
      distance: Unitize.feet(0),
      horizontalDistance: Unitize.feet(31.7),
      verticalDistance: Unitize.feet(5),
      excludeDistance: true,
      frontsightAzimuth: Unitize.degrees(174.3),
      backsightAzimuth: Unitize.degrees(174.1),

      toLruds: {
        left: Unitize.feet(2),
        right: Unitize.feet(3),
        up: Unitize.feet(0.5),
        down: Unitize.feet(1.5),
      },
    },
    'PDF28PDF27  31.7H* 174.3 174.1    5       2  30.51.5'
  )

  testCase(
    'excluded diagonal shot',
    {
      kind: FrcsShotKind.Diagonal,
      to: 'PDF28',
      from: 'PDF27',
      distance: Unitize.feet(31.7),
      verticalDistance: Unitize.feet(5),
      excludeDistance: true,
      frontsightAzimuth: Unitize.degrees(174.3),
      backsightAzimuth: Unitize.degrees(174.1),

      toLruds: {
        left: Unitize.feet(2),
        right: Unitize.feet(3),
        up: Unitize.feet(0.5),
        down: Unitize.feet(1.5),
      },
    },
    'PDF28PDF27  31.7D* 174.3 174.1    5       2  30.51.5'
  )

  testCase(
    'horizontal feet and inches shot',
    {
      to: 'A27',
      from: 'A26',
      kind: FrcsShotKind.Horizontal,
      distance: Unitize.feet(0),
      horizontalDistance: Unitize.inches(16 * 12 + 9.6),
      frontsightAzimuth: Unitize.degrees(345),
      backsightAzimuth: Unitize.degrees(163),
      verticalDistance: Unitize.feet(-1),

      toLruds: {
        left: Unitize.feet(0),
        right: Unitize.feet(3),
        up: Unitize.feet(5),
        down: Unitize.feet(4),
      },
    },
    '  A27  A26  16 10H   345   163   -1       0  3  5  4',
    {
      ...defaultHeader,
      distanceUnit: Length.inches,
    }
  )

  testCase(
    'diagonal feet and inches shot',
    {
      to: 'A27',
      from: 'A26',
      kind: FrcsShotKind.Diagonal,
      distance: Unitize.inches(16 * 12 + 9.6),
      frontsightAzimuth: Unitize.degrees(345),
      backsightAzimuth: Unitize.degrees(163),
      verticalDistance: Unitize.feet(-1),

      toLruds: {
        left: Unitize.feet(0),
        right: Unitize.feet(3),
        up: Unitize.feet(5),
        down: Unitize.feet(4),
      },
    },
    '  A27  A26  16 10D   345   163   -1       0  3  5  4',
    {
      ...defaultHeader,
      distanceUnit: Length.inches,
    }
  )

  testCase(
    'lrud-only shot',
    {
      kind: FrcsShotKind.Normal,
      from: 'A27',
      distance: Unitize.feet(0),
      fromLruds: {
        left: Unitize.feet(0),
        right: Unitize.feet(3),
        up: Unitize.feet(5),
        down: Unitize.feet(4),
      },
    },
    '       A27                                0  3  5  4'
  )
})
