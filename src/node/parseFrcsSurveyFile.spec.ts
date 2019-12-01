/* eslint-env node */

import { describe, it } from 'mocha'
import { parseFrcsSurveyFile } from './index'
import { Length, Angle, Unitize } from '@speleotica/unitized'
import { expect } from 'chai'
import { FrcsShotKind } from '../FrcsShot'

describe('parseFrcsSurveyFile', () => {
  it('basic test', async function() {
    const parsed = await parseFrcsSurveyFile(require.resolve('./cdata.fr'))
    expect(parsed).to.deep.equal({
      cave: 'Fisher Ridge Cave System',
      errors: [],
      location: 'Hart Co., KY',
      trips: [
        {
          header: {
            name:
              'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
            comment: 'This File has Crumps test connected.  11/20/12',
            section: undefined,
            date: undefined,
            team: undefined,
            distanceUnit: Length.feet,
            azimuthUnit: Angle.degrees,
            inclinationUnit: Angle.degrees,
            backsightAzimuthCorrected: true,
            backsightInclinationCorrected: false,
            hasBacksightAzimuth: true,
            hasBacksightInclination: false,
          },
          shots: [
            {
              backsightAzimuth: null,
              backsightInclination: null,
              comment: null,
              distance: Unitize.feet(0),
              down: Unitize.feet(2),
              excludeDistance: true,
              from: 'AE20',
              frontsightAzimuth: null,
              frontsightInclination: null,
              kind: FrcsShotKind.Normal,
              left: Unitize.feet(1),
              right: Unitize.feet(3),
              to: null,
              up: Unitize.feet(0),
            },
            {
              from: 'AE20',
              to: 'AE19',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(9.3),
              frontsightAzimuth: Unitize.degrees(60),
              backsightAzimuth: Unitize.degrees(60),
              frontsightInclination: Unitize.degrees(-36),
              backsightInclination: null,
              left: Unitize.feet(2),
              right: Unitize.feet(12),
              up: Unitize.feet(0),
              down: Unitize.feet(20),
              excludeDistance: false,
              comment:
                "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",
            },
            {
              from: 'AE19',
              to: 'AE18',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(24.5),
              frontsightAzimuth: Unitize.degrees(0),
              backsightAzimuth: Unitize.degrees(0),
              frontsightInclination: Unitize.degrees(-90),
              backsightInclination: null,
              left: Unitize.feet(6),
              right: Unitize.feet(10),
              up: Unitize.feet(25),
              down: Unitize.feet(0),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'AE18',
              to: 'AE17',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(8),
              frontsightAzimuth: Unitize.degrees(350.5),
              backsightAzimuth: Unitize.degrees(350.5),
              frontsightInclination: Unitize.degrees(17),
              backsightInclination: null,
              left: Unitize.feet(3),
              right: Unitize.feet(5),
              up: Unitize.feet(0),
              down: Unitize.feet(0),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'AE17',
              to: 'AE16',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(6.7),
              frontsightAzimuth: Unitize.degrees(0),
              backsightAzimuth: Unitize.degrees(0),
              frontsightInclination: Unitize.degrees(-90),
              backsightInclination: null,
              left: Unitize.feet(3),
              right: Unitize.feet(5),
              up: Unitize.feet(6),
              down: Unitize.feet(1),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'AE16',
              to: 'AE15',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(12.6),
              frontsightAzimuth: Unitize.degrees(70.5),
              backsightAzimuth: Unitize.degrees(71),
              frontsightInclination: Unitize.degrees(-18),
              backsightInclination: null,
              left: Unitize.feet(4),
              right: Unitize.feet(0),
              up: Unitize.feet(2),
              down: Unitize.feet(1),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'AE15',
              to: 'AE14',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(10),
              frontsightAzimuth: Unitize.degrees(21.5),
              backsightAzimuth: Unitize.degrees(20),
              frontsightInclination: Unitize.degrees(6),
              backsightInclination: null,
              left: Unitize.feet(5),
              right: Unitize.feet(5),
              up: Unitize.feet(0),
              down: Unitize.feet(3),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'AE14',
              to: 'AE13',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(26.8),
              frontsightAzimuth: Unitize.degrees(288),
              backsightAzimuth: Unitize.degrees(286),
              frontsightInclination: Unitize.degrees(-50),
              backsightInclination: null,
              left: Unitize.feet(0),
              right: Unitize.feet(7),
              up: Unitize.feet(20),
              down: Unitize.feet(5),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'AE13',
              to: 'AE12',
              kind: FrcsShotKind.Normal,
              distance: Unitize.feet(20.7),
              frontsightAzimuth: Unitize.degrees(236),
              backsightAzimuth: Unitize.degrees(236),
              frontsightInclination: Unitize.degrees(34),
              backsightInclination: null,
              left: Unitize.feet(3),
              right: Unitize.feet(5),
              up: Unitize.feet(4),
              down: Unitize.feet(4),
              excludeDistance: false,
              comment: 'SHORT CANYON AT THE BASE OF THE SECOND DROP',
            },
          ],
        },
        {
          header: {
            name: 'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
            comment: null,
            section: undefined,
            date: undefined,
            team: undefined,
            distanceUnit: Length.inches,
            azimuthUnit: Angle.degrees,
            inclinationUnit: Angle.degrees,
            backsightAzimuthCorrected: false,
            backsightInclinationCorrected: false,
            hasBacksightAzimuth: true,
            hasBacksightInclination: false,
          },
          shots: [
            {
              from: 'A1',
              to: 'A2',
              kind: FrcsShotKind.Normal,
              distance: Unitize.inches(48 * 12 + 10),
              frontsightAzimuth: Unitize.degrees(292),
              backsightAzimuth: Unitize.degrees(110),
              frontsightInclination: Unitize.degrees(-42),
              backsightInclination: null,
              left: Unitize.feet(5),
              right: Unitize.feet(10),
              up: Unitize.feet(35),
              down: Unitize.feet(5),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'A2',
              to: 'A3',
              kind: FrcsShotKind.Normal,
              distance: Unitize.inches(12 * 12 + 5),
              frontsightAzimuth: Unitize.degrees(333.5),
              backsightAzimuth: Unitize.degrees(153.5),
              frontsightInclination: Unitize.degrees(35),
              backsightInclination: null,
              left: Unitize.feet(3),
              right: Unitize.feet(1),
              up: Unitize.feet(15),
              down: Unitize.feet(5),
              excludeDistance: false,
              comment: null,
            },
            {
              from: 'A3',
              to: 'A4',
              kind: FrcsShotKind.Normal,
              distance: Unitize.inches(4 * 12 + 2),
              frontsightAzimuth: Unitize.degrees(0),
              backsightAzimuth: Unitize.degrees(0),
              frontsightInclination: Unitize.degrees(90),
              backsightInclination: null,
              left: Unitize.feet(3),
              right: Unitize.feet(1),
              up: Unitize.feet(10),
              down: Unitize.feet(10),
              excludeDistance: false,
              comment: null,
            },
          ],
        },
      ],
    })
  })
})
