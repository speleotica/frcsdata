import { describe, it } from 'mocha'
import * as node from '../src/node'
import * as web from '../src/web'
import * as string from '../src/string'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { Readable } from 'node:stream'
import { Unitize } from '@speleotica/unitized'
import { expect } from 'chai'
import { FrcsPlotFile } from '../src'

describe('parseFrcsPlotFile', () => {
  for (const [desc, parse] of [
    [
      'string',
      async () =>
        string.parseFrcsPlotFile(
          'FOR008.fr',
          await fsPromises.readFile(require.resolve('./FOR008.fr'), 'utf8')
        ),
    ],
    [
      'node',
      async () => node.parseFrcsPlotFile(require.resolve('./FOR008.fr')),
    ],
    [
      'web',
      async () =>
        web.parseFrcsPlotFile(
          'FOR008.fr',
          // @ts-expect-error no chunk type
          Readable.toWeb(fs.createReadStream(require.resolve('./FOR008.fr')))
        ),
    ],
  ] as [string, () => Promise<FrcsPlotFile>][]) {
    it(desc, async function () {
      const parsed = await parse()
      expect(parsed).to.deep.equal({
        totalLength: Unitize.feet(123.182259),
        errors: [],
        shots: [
          {
            toName: 'AE20',
            isSurface: false,
            fromNumber: 1,
            toNumber: 1,
            easting: Unitize.feet(0),
            northing: Unitize.feet(0),
            elevation: Unitize.feet(0),
            leftEasting: Unitize.feet(1.53),
            leftNorthing: Unitize.feet(-2.57),
            rightEasting: Unitize.feet(-0.51),
            rightNorthing: Unitize.feet(0.85),
            up: Unitize.feet(0),
            down: Unitize.feet(2),
            tripNumber: 1,
          },
          {
            toName: 'AE19',
            isSurface: false,
            fromNumber: 1,
            toNumber: 2,
            easting: Unitize.feet(6.53),
            northing: Unitize.feet(4.02),
            elevation: Unitize.feet(-5.48),
            leftEasting: Unitize.feet(10.46),
            leftNorthing: Unitize.feet(-5.87),
            rightEasting: Unitize.feet(-1.74),
            rightNorthing: Unitize.feet(0.97),
            up: Unitize.feet(0),
            down: Unitize.feet(20),
            tripNumber: 1,
          },
          {
            toName: 'AE18',
            isSurface: false,
            fromNumber: 2,
            toNumber: 3,
            easting: Unitize.feet(6.69),
            northing: Unitize.feet(4.49),
            elevation: Unitize.feet(-30.02),
            leftEasting: Unitize.feet(9.95),
            leftNorthing: Unitize.feet(0.94),
            rightEasting: Unitize.feet(-5.97),
            rightNorthing: Unitize.feet(-0.56),
            up: Unitize.feet(25),
            down: Unitize.feet(0),
            tripNumber: 1,
          },
          {
            toName: 'AE17',
            isSurface: false,
            fromNumber: 3,
            toNumber: 4,
            easting: Unitize.feet(5.39),
            northing: Unitize.feet(12.17),
            elevation: Unitize.feet(-27.7),
            leftEasting: Unitize.feet(4.97),
            leftNorthing: Unitize.feet(0.47),
            rightEasting: Unitize.feet(-2.98),
            rightNorthing: Unitize.feet(-0.28),
            up: Unitize.feet(0),
            down: Unitize.feet(0),
            tripNumber: 1,
          },
          {
            toName: 'AE16',
            isSurface: false,
            fromNumber: 4,
            toNumber: 5,
            easting: Unitize.feet(5.44),
            northing: Unitize.feet(12.3),
            elevation: Unitize.feet(-34.41),
            leftEasting: Unitize.feet(4.11),
            leftNorthing: Unitize.feet(-2.84),
            rightEasting: Unitize.feet(-2.46),
            rightNorthing: Unitize.feet(1.7),
            up: Unitize.feet(6),
            down: Unitize.feet(1),
            tripNumber: 1,
          },
          {
            toName: 'AE15',
            isSurface: false,
            fromNumber: 5,
            toNumber: 6,
            easting: Unitize.feet(16.79),
            northing: Unitize.feet(16.63),
            elevation: Unitize.feet(-38.33),
            leftEasting: Unitize.feet(0),
            leftNorthing: Unitize.feet(0),
            rightEasting: Unitize.feet(-2.82),
            rightNorthing: Unitize.feet(2.83),
            up: Unitize.feet(2),
            down: Unitize.feet(1),
            tripNumber: 1,
          },
          {
            toName: 'AE14',
            isSurface: false,
            fromNumber: 6,
            toNumber: 7,
            easting: Unitize.feet(20.26),
            northing: Unitize.feet(26.17),
            elevation: Unitize.feet(-37.3),
            leftEasting: Unitize.feet(4.46),
            leftNorthing: Unitize.feet(2.25),
            rightEasting: Unitize.feet(-4.46),
            rightNorthing: Unitize.feet(-2.25),
            up: Unitize.feet(0),
            down: Unitize.feet(3),
            tripNumber: 1,
          },
          {
            toName: 'AE13',
            isSurface: false,
            fromNumber: 7,
            toNumber: 8,
            easting: Unitize.feet(3.91),
            northing: Unitize.feet(31.52),
            elevation: Unitize.feet(-57.88),
            leftEasting: Unitize.feet(-1.11),
            leftNorthing: Unitize.feet(6.91),
            rightEasting: Unitize.feet(0),
            rightNorthing: Unitize.feet(0),
            up: Unitize.feet(20),
            down: Unitize.feet(5),
            tripNumber: 1,
          },
          {
            toName: 'AE12',
            isSurface: false,
            fromNumber: 8,
            toNumber: 9,
            easting: Unitize.feet(-10.19),
            northing: Unitize.feet(21.75),
            elevation: Unitize.feet(-46.3),
            leftEasting: Unitize.feet(-3.69),
            leftNorthing: Unitize.feet(3.36),
            rightEasting: Unitize.feet(2.21),
            rightNorthing: Unitize.feet(-2.01),
            up: Unitize.feet(4),
            down: Unitize.feet(4),
            tripNumber: 1,
          },
          {
            toName: 'AE11',
            isSurface: false,
            fromNumber: 9,
            toNumber: 10,
            easting: Unitize.feet(-15.16),
            northing: Unitize.feet(12.89),
            elevation: Unitize.feet(-39.19),
            leftEasting: Unitize.feet(-3.48),
            leftNorthing: Unitize.feet(1.95),
            rightEasting: Unitize.feet(6.1),
            rightNorthing: Unitize.feet(-3.42),
            up: Unitize.feet(5),
            down: Unitize.feet(1),
            tripNumber: 1,
          },
        ],
      })
    })
  }
})
