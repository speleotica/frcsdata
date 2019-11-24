import { describe, it } from 'mocha'
import { parseFrcsSurveyFile } from './index'
import { Length, Angle } from '@speleotica/unitized'
import { expect } from 'chai'
import { FrcsShotKind } from '../FrcsShot'

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
   A2   A1  48 10  292.0 110.0-42.0       5 10 35  5
   A3   A2  12  5  333.5 153.5 35.0       3  1 15  5
   A4   A3   4  2    0.0   0.0 90.0       3  1 10 10
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
            comment:
              'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE\nPETER QUICK, KEITH ORTIZ   -  2-15-81\nThis File has Crumps test connected.  11/20/12',
            section: undefined,
            date: undefined,
            surveyors: undefined,
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
              distance: Length.feet(0),
              down: Length.feet(2),
              excludeLength: true,
              from: 'AE20',
              frontsightAzimuth: null,
              frontsightInclination: null,
              kind: FrcsShotKind.Normal,
              left: Length.feet(1),
              right: Length.feet(3),
              to: null,
              up: Length.feet(0),
            },
            {
              from: 'AE20',
              to: 'AE19',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(9.3),
              frontsightAzimuth: Angle.degrees(60),
              backsightAzimuth: Angle.degrees(60),
              frontsightInclination: Angle.degrees(-36),
              backsightInclination: null,
              left: Length.feet(2),
              right: Length.feet(12),
              up: Length.feet(0),
              down: Length.feet(20),
              excludeLength: false,
              comment:
                "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",
            },
            {
              from: 'AE19',
              to: 'AE18',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(24.5),
              frontsightAzimuth: Angle.degrees(0),
              backsightAzimuth: Angle.degrees(0),
              frontsightInclination: Angle.degrees(-90),
              backsightInclination: null,
              left: Length.feet(6),
              right: Length.feet(10),
              up: Length.feet(25),
              down: Length.feet(0),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'AE18',
              to: 'AE17',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(8),
              frontsightAzimuth: Angle.degrees(350.5),
              backsightAzimuth: Angle.degrees(350.5),
              frontsightInclination: Angle.degrees(17),
              backsightInclination: null,
              left: Length.feet(3),
              right: Length.feet(5),
              up: Length.feet(0),
              down: Length.feet(0),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'AE17',
              to: 'AE16',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(6.7),
              frontsightAzimuth: Angle.degrees(0),
              backsightAzimuth: Angle.degrees(0),
              frontsightInclination: Angle.degrees(-90),
              backsightInclination: null,
              left: Length.feet(3),
              right: Length.feet(5),
              up: Length.feet(6),
              down: Length.feet(1),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'AE16',
              to: 'AE15',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(12.6),
              frontsightAzimuth: Angle.degrees(70.5),
              backsightAzimuth: Angle.degrees(71),
              frontsightInclination: Angle.degrees(-18),
              backsightInclination: null,
              left: Length.feet(4),
              right: Length.feet(0),
              up: Length.feet(2),
              down: Length.feet(1),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'AE15',
              to: 'AE14',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(10),
              frontsightAzimuth: Angle.degrees(21.5),
              backsightAzimuth: Angle.degrees(20),
              frontsightInclination: Angle.degrees(6),
              backsightInclination: null,
              left: Length.feet(5),
              right: Length.feet(5),
              up: Length.feet(0),
              down: Length.feet(3),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'AE14',
              to: 'AE13',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(26.8),
              frontsightAzimuth: Angle.degrees(288),
              backsightAzimuth: Angle.degrees(286),
              frontsightInclination: Angle.degrees(-50),
              backsightInclination: null,
              left: Length.feet(0),
              right: Length.feet(7),
              up: Length.feet(20),
              down: Length.feet(5),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'AE13',
              to: 'AE12',
              kind: FrcsShotKind.Normal,
              distance: Length.feet(20.7),
              frontsightAzimuth: Angle.degrees(236),
              backsightAzimuth: Angle.degrees(236),
              frontsightInclination: Angle.degrees(34),
              backsightInclination: null,
              left: Length.feet(3),
              right: Length.feet(5),
              up: Length.feet(4),
              down: Length.feet(4),
              excludeLength: false,
              comment: 'SHORT CANYON AT THE BASE OF THE SECOND DROP',
            },
          ],
        },
        {
          header: {
            name: 'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
            comment:
              'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY\nDAN CROWL, KEITH ORTIZ, CHIP HOPPER, PETER QUICK, LARRY BEAN    14 FEB 1981',
            section: undefined,
            date: undefined,
            surveyors: undefined,
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
              distance: Length.inches(48 * 12 + 10),
              frontsightAzimuth: Angle.degrees(292),
              backsightAzimuth: Angle.degrees(110),
              frontsightInclination: Angle.degrees(-42),
              backsightInclination: null,
              left: Length.feet(5),
              right: Length.feet(10),
              up: Length.feet(35),
              down: Length.feet(5),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'A2',
              to: 'A3',
              kind: FrcsShotKind.Normal,
              distance: Length.inches(12 * 12 + 5),
              frontsightAzimuth: Angle.degrees(333.5),
              backsightAzimuth: Angle.degrees(153.5),
              frontsightInclination: Angle.degrees(35),
              backsightInclination: null,
              left: Length.feet(3),
              right: Length.feet(1),
              up: Length.feet(15),
              down: Length.feet(5),
              excludeLength: false,
              comment: null,
            },
            {
              from: 'A3',
              to: 'A4',
              kind: FrcsShotKind.Normal,
              distance: Length.inches(4 * 12 + 2),
              frontsightAzimuth: Angle.degrees(0),
              backsightAzimuth: Angle.degrees(0),
              frontsightInclination: Angle.degrees(90),
              backsightInclination: null,
              left: Length.feet(3),
              right: Length.feet(1),
              up: Length.feet(10),
              down: Length.feet(10),
              excludeLength: false,
              comment: null,
            },
          ],
        },
      ],
    })
  })
})