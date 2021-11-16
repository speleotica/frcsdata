import { describe, it } from 'mocha'
import { parseFrcsSurveyFile } from './index'
import { Length, Angle, Unitize } from '@speleotica/unitized'
import { expect } from 'chai'
import { FrcsShotKind } from '../FrcsShot'
import { SegmentParseError, Segment } from 'parse-segment'

const data = `      Fisher Ridge Cave System, Hart Co., KY
ENTRANCE DROPS, JOE'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE
PETER QUICK, KEITH ORTIZ   -  2-15-81
This File has Crumps test connected.  11/20/12
 *
FT C  DD    A
      AE20     0                          1  3  0  2
*      %FS
*     AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12
 AE19 AE20   9.3    60.0  60.0-36.0       2 12  0 20
 AE18 AE19  24.5     0.0   0.0-90.0       6 10 25  0
 AE17 AE18   8.0   350.5 350.5 17.0       3  5  0  0
 AE16 AE17   6.7     0.0   0.0-90.0       3  5  6  1
 AE15 AE16  12.6    70.5  71.0-18.0       4  0  2  1
 AE14 AE15  10.0    21.5  20.0  6.0       5  5  0  3
 AE13 AE14  26.8   288.0 286.0-50.0       0  7 20  5
*
*SHORT CANYON AT THE BASE OF THE SECOND DROP
 AE12 AE13  20.7   236.0 236.0 34.0       3  5  4  4
 *
TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY
DAN CROWL, KEITH ORTIZ, CHIP HOPPER, PETER QUICK, LARRY BEAN    14 FEB 1981
 *
FI B  DD
   A2   A1  48 10  292.0 110.0-42.0       5 10 35  5    A1 2 7 3 4.5
   A3   A2  12  5  333.5 153.5 35.0       3  1 15  5
   A4   A3   4  2    0.0   0.0 90.0       3  1 10 10
 *
DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP
PETER QUICK, CHRIS GERACE, PHIL ODEN, CHIP HOPPER - 3-6-81
 *
FT C  DD
  B31  B30  13.7   360.0 360.0 40.0       2  4  6  
B30sp  B30  13.7 s 360.0 360.0 40.0       2  4  6  
`

describe('parseFrcsSurveyFile', () => {
  it('basic test', async function() {
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
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
              excludeDistance: true,
              from: 'AE20',
              frontsightAzimuth: null,
              frontsightInclination: null,
              kind: FrcsShotKind.Normal,
              to: null,

              fromLruds: {
                left: Unitize.feet(1),
                right: Unitize.feet(3),
                up: Unitize.feet(0),
                down: Unitize.feet(2),
              },
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
              excludeDistance: false,
              comment:
                "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",

              toLruds: {
                left: Unitize.feet(2),
                right: Unitize.feet(12),
                up: Unitize.feet(0),
                down: Unitize.feet(20),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(6),
                right: Unitize.feet(10),
                up: Unitize.feet(25),
                down: Unitize.feet(0),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(3),
                right: Unitize.feet(5),
                up: Unitize.feet(0),
                down: Unitize.feet(0),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(3),
                right: Unitize.feet(5),
                up: Unitize.feet(6),
                down: Unitize.feet(1),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(4),
                right: Unitize.feet(0),
                up: Unitize.feet(2),
                down: Unitize.feet(1),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(5),
                right: Unitize.feet(5),
                up: Unitize.feet(0),
                down: Unitize.feet(3),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(0),
                right: Unitize.feet(7),
                up: Unitize.feet(20),
                down: Unitize.feet(5),
              },
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
              excludeDistance: false,
              comment: 'SHORT CANYON AT THE BASE OF THE SECOND DROP',

              toLruds: {
                left: Unitize.feet(3),
                right: Unitize.feet(5),
                up: Unitize.feet(4),
                down: Unitize.feet(4),
              },
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
              excludeDistance: false,
              comment: null,
              fromLruds: {
                left: Unitize.feet(2),
                right: Unitize.feet(7),
                up: Unitize.feet(3),
                down: Unitize.feet(4.5),
              },
              toLruds: {
                left: Unitize.feet(5),
                right: Unitize.feet(10),
                up: Unitize.feet(35),
                down: Unitize.feet(5),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(3),
                right: Unitize.feet(1),
                up: Unitize.feet(15),
                down: Unitize.feet(5),
              },
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
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.feet(3),
                right: Unitize.feet(1),
                up: Unitize.feet(10),
                down: Unitize.feet(10),
              },
            },
          ],
        },
        {
          header: {
            azimuthUnit: Angle.degrees,
            backsightAzimuthCorrected: true,
            backsightInclinationCorrected: false,
            comment: null,
            date: undefined,
            distanceUnit: Length.feet,
            hasBacksightAzimuth: true,
            hasBacksightInclination: false,
            inclinationUnit: Angle.degrees,
            name: "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
            section: undefined,
            team: undefined,
          },
          shots: [
            {
              backsightAzimuth: Unitize.degrees(0),
              backsightInclination: null,
              comment: null,
              distance: Unitize.feet(13.7),
              excludeDistance: false,
              from: 'B30',
              frontsightAzimuth: Unitize.degrees(0),
              frontsightInclination: Unitize.degrees(40),
              kind: ' ',
              to: 'B31',

              toLruds: {
                left: Unitize.feet(2),
                right: Unitize.feet(4),
                up: Unitize.feet(6),
                down: null,
              },
            },
            {
              backsightAzimuth: Unitize.degrees(0),
              backsightInclination: null,
              comment: null,
              distance: Unitize.feet(13.7),
              excludeDistance: true,
              isSplay: true,
              from: 'B30',
              frontsightAzimuth: Unitize.degrees(0),
              frontsightInclination: Unitize.degrees(40),
              kind: ' ',
              to: 'B30sp',
              toLruds: {
                left: Unitize.feet(2),
                right: Unitize.feet(4),
                up: Unitize.feet(6),
                down: null,
              },
            },
          ],
        },
      ],
    })
  })
  it('horizontal shots', async function() {
    const data = `blah
 *
 *
TEST
 *
FT C  DD
  E22  E21  36.2H  338.5 340.0  1.0      12  2 15 15
`
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].shots[0]).to.deep.equal({
      from: 'E21',
      to: 'E22',
      kind: FrcsShotKind.Horizontal,
      distance: Unitize.feet(Math.sqrt(36.2 * 36.2 + 1)),
      horizontalDistance: Unitize.feet(36.2),
      verticalDistance: Unitize.feet(1),
      frontsightAzimuth: Unitize.degrees(338.5),
      backsightAzimuth: Unitize.degrees(340),
      frontsightInclination: Angle.atan2(1, 36.2),
      backsightInclination: null,
      excludeDistance: false,
      comment: null,

      toLruds: {
        left: Unitize.feet(12),
        right: Unitize.feet(2),
        up: Unitize.feet(15),
        down: Unitize.feet(15),
      },
    })
  })
  it('horizontal feet and inches shots', async function() {
    const data = `blah
 *
 *
TEST
 *
FI C  DD
  A27  A26  16  9H 345.0 163.0 -1.0       0  3  5  4
`
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].shots[0]).to.deep.equal({
      from: 'A26',
      to: 'A27',
      kind: FrcsShotKind.Horizontal,
      distance: Unitize.feet(Math.sqrt(16.75 * 16.75 + 1)),
      horizontalDistance: Unitize.inches(16 * 12 + 9),
      verticalDistance: Unitize.feet(-1),
      frontsightAzimuth: Unitize.degrees(345),
      backsightAzimuth: Unitize.degrees(163),
      frontsightInclination: Angle.atan2(-1, 16.75),
      backsightInclination: null,
      excludeDistance: false,
      comment: null,

      toLruds: {
        left: Unitize.feet(0),
        right: Unitize.feet(3),
        up: Unitize.feet(5),
        down: Unitize.feet(4),
      },
    })
  })
  it('diagonal shots', async function() {
    const data = `blah
 *
 *
TEST
 *
FT C  DD
  E37  E36  31.6D  231.0 232.0  2.0       3 10 20 32
`
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].shots[0]).to.deep.equal({
      from: 'E36',
      to: 'E37',
      kind: FrcsShotKind.Diagonal,
      distance: Unitize.feet(31.6),
      verticalDistance: Unitize.feet(2),
      frontsightAzimuth: Unitize.degrees(231),
      backsightAzimuth: Unitize.degrees(232),
      frontsightInclination: Angle.asin(2 / 31.6),
      backsightInclination: null,
      excludeDistance: false,
      comment: null,

      toLruds: {
        left: Unitize.feet(3),
        right: Unitize.feet(10),
        up: Unitize.feet(20),
        down: Unitize.feet(32),
      },
    })
  })
  it('invalid distance unit', async function() {
    const data = `blah
 *
 *
TEST
 * 
FJ C  DD
`
    expect(await parseFrcsSurveyFile('cdata.fr', data)).to.deep.equal({
      cave: 'blah',
      errors: [
        new SegmentParseError(
          'Invalid distance unit',
          new Segment({
            value: 'FJ C  DD',
            source: 'cdata.fr',
            startLine: 5,
            startCol: 0,
          }).substring(0, 2)
        ),
      ],
      location: null,
      trips: [
        {
          header: {
            azimuthUnit: Angle.degrees,
            backsightAzimuthCorrected: true,
            backsightInclinationCorrected: false,
            comment: null,
            date: undefined,
            distanceUnit: Length.feet,
            hasBacksightAzimuth: true,
            hasBacksightInclination: false,
            inclinationUnit: Angle.degrees,
            name: 'TEST',
            section: undefined,
            team: undefined,
          },
          shots: [],
        },
      ],
    })
  })
  it('meters', async function() {
    const data = `blah
 *
 *
TEST
 * 
M  CC DD
  E37  E36  31.6   231.0 232.0  2.0  3.0  3 10 20 32
`
    expect(await parseFrcsSurveyFile('cdata.fr', data)).to.deep.equal({
      cave: 'blah',
      errors: [],
      location: null,
      trips: [
        {
          header: {
            azimuthUnit: Angle.degrees,
            backsightAzimuthCorrected: true,
            backsightInclinationCorrected: true,
            comment: null,
            date: undefined,
            distanceUnit: Length.meters,
            hasBacksightAzimuth: true,
            hasBacksightInclination: true,
            inclinationUnit: Angle.degrees,
            name: 'TEST',
            section: undefined,
            team: undefined,
          },
          shots: [
            {
              from: 'E36',
              to: 'E37',
              kind: FrcsShotKind.Normal,
              distance: Unitize.meters(31.6),
              frontsightAzimuth: Unitize.degrees(231),
              backsightAzimuth: Unitize.degrees(232),
              frontsightInclination: Unitize.degrees(2),
              backsightInclination: Unitize.degrees(3),
              excludeDistance: false,
              comment: null,

              toLruds: {
                left: Unitize.meters(3),
                right: Unitize.meters(10),
                up: Unitize.meters(20),
                down: Unitize.meters(32),
              },
            },
          ],
        },
      ],
    })
  })
  it('exclude length', async function() {
    const data = `blah
 *
 *
TEST
 * 
M  CC DD
  E37  E36  31.6 * 231.0 232.0  2.0  3.0  3 10 20 32
`
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].shots[0]).to.deep.equal({
      from: 'E36',
      to: 'E37',
      kind: FrcsShotKind.Normal,
      distance: Unitize.meters(31.6),
      frontsightAzimuth: Unitize.degrees(231),
      backsightAzimuth: Unitize.degrees(232),
      frontsightInclination: Unitize.degrees(2),
      backsightInclination: Unitize.degrees(3),
      excludeDistance: true,
      comment: null,

      toLruds: {
        left: Unitize.meters(3),
        right: Unitize.meters(10),
        up: Unitize.meters(20),
        down: Unitize.meters(32),
      },
    })
  })
  it('negative LRUD', async function() {
    const data = `blah
 *
 *
TEST
 * 
M  CC DD
  E37  E36  31.6   231.0 232.0  2.0  3.0 -3 10 20 32
`
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].shots[0]).to.deep.equal({
      from: 'E36',
      to: 'E37',
      kind: FrcsShotKind.Normal,
      distance: Unitize.meters(31.6),
      frontsightAzimuth: Unitize.degrees(231),
      backsightAzimuth: Unitize.degrees(232),
      frontsightInclination: Unitize.degrees(2),
      backsightInclination: Unitize.degrees(3),
      excludeDistance: false,
      comment: null,

      toLruds: {
        left: null,
        right: Unitize.meters(10),
        up: Unitize.meters(20),
        down: Unitize.meters(32),
      },
    })
  })
  it('- for no backsight', async function() {
    const data = `blah
 *
 *
TEST
 * 
M  B- DD 
  `
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].header).to.deep.equal({
      name: 'TEST',
      comment: null,
      section: undefined,
      date: undefined,
      team: undefined,
      distanceUnit: Length.meters,
      azimuthUnit: Angle.degrees,
      inclinationUnit: Angle.degrees,
      backsightAzimuthCorrected: false,
      backsightInclinationCorrected: false,
      hasBacksightAzimuth: true,
      hasBacksightInclination: false,
    })
  })
  it('missing both frontsight and backsight inclination', async function() {
    const data = `blah
 *
 *
TEST
 * 
M  B- DD 
  E37  E36  31.6   231.0 232.0           -3 10 20 32
  `
    const parsed = await parseFrcsSurveyFile('cdata.fr', data)
    expect(parsed.trips[0].shots[0]).to.deep.equal({
      from: 'E36',
      to: 'E37',
      kind: FrcsShotKind.Normal,
      distance: Unitize.meters(31.6),
      frontsightAzimuth: Unitize.degrees(231),
      backsightAzimuth: Unitize.degrees(232),
      frontsightInclination: Unitize.degrees(0),
      backsightInclination: null,
      excludeDistance: false,
      comment: null,

      toLruds: {
        left: null,
        right: Unitize.meters(10),
        up: Unitize.meters(20),
        down: Unitize.meters(32),
      },
    })
  })
})
