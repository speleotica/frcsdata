import { describe, it } from 'mocha'
import { expect } from 'chai'
import { formatFrcsSurveyFile } from '../src/formatFrcsSurveyFile'
import { parseFrcsSurveyFile } from '../src/node'
import { slurp } from './slurp'

describe(`formatFrcsSurveyFile`, function () {
  it(`works`, async function () {
    expect(
      (
        await slurp(
          formatFrcsSurveyFile(
            await parseFrcsSurveyFile(require.resolve('./cdata.fr'))
          )
        )
      ).join('')
    ).to.equal(`      Fisher Ridge Cave System, Hart Co., KY
ENTRANCE DROPS, JOE'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE
PETER QUICK, KEITH ORTIZ. 2/15/81
This File has Crumps test connected.  11/20/12
 *
FT C  DD
      AE20                                1  3  0  2
*
* AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12
 AE19 AE20   9.3      60    60  -36       2 12  0 20
 AE18 AE19  24.5       0     0  -90       6 10 25  0
 AE17 AE18     8   350.5 350.5   17       3  5  0  0
 AE16 AE17   6.7       0     0  -90       3  5  6  1
 AE15 AE16  12.6    70.5    71  -18       4  0  2  1
 AE14 AE15    10    21.5    20    6       5  5  0  3
 AE13 AE14  26.8     288   286  -50       0  7 20  5
*
* SHORT CANYON AT THE BASE OF THE SECOND DROP
 AE12 AE13  20.7     236   236   34       3  5  4  4
 *
TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY
DAN CROWL, KEITH ORTIZ, CHIP HOPPER, PETER QUICK, LARRY BEAN    14 FEB 1981
 *
FI B  DD
   A2   A1  48 10    292   110  -42       5 10 35  5
   A3   A2  12  5  333.5 153.5   35       3  1 15  5
   A4   A3   4  2      0     0   90       3  1 10 10
 *
DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP
PETER QUICK, CHRIS GERACE, PHIL ODEN, CHIP HOPPER. 3/6/81
 *
FT C  DD
  B31  B30  13.7       0     0   40       2  4  6   
B30sp  B30  13.7 *     0     0   40       2  4  6   
 *
"Skill Issue Complex" and other Nebulous Borehole leads
 *
FT BB DD
 AJA2 AJA1  15.4   146.4 326.8-61.7 61.7  4  4 36  2
*      %NC
FT CC DD
 WEG1AJF16  12.9   337.7 338.5   29   29  7 14 30  8
 WEG2 WEG1  27.1   349.4 349.4 11.1 10.8 50 15  4 10
`)
  })
})
