import { describe, it } from 'mocha'
import { expect } from 'chai'

import type { FrcsShot, FrcsUnits } from '../src/survey/FrcsSurveyFile'
import formatFrcsShot from '../src/survey/formatFrcsShot'
import { Angle, Length, Unitize } from '@speleotica/unitized'

describe(`formatFrcsShot`, function () {
  const defaultUnits: FrcsUnits = {
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
    units: FrcsUnits = defaultUnits
  ): void {
    it(desc, function () {
      expect(formatFrcsShot(shot, units)).to.equal(expected)
    })
  }

  testCase(
    'normal shot',
    {
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
    'excluded shot',
    {
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
      specialKind: 'horizontal',
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
      specialKind: 'diagonal',
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
      specialKind: 'horizontal',
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
      ...defaultUnits,
      distanceUnit: Length.inches,
    }
  )

  testCase(
    'diagonal feet and inches shot',
    {
      to: 'A27',
      from: 'A26',
      specialKind: 'diagonal',
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
      ...defaultUnits,
      distanceUnit: Length.inches,
    }
  )

  testCase(
    'lrud-only shot',
    {
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
