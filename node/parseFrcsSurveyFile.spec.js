'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _mocha = require('mocha')

var _index = require('./index')

var _unitized = require('@speleotica/unitized')

var _chai = require('chai')

var _FrcsShot = require('../FrcsShot')

/* eslint-env node */
;(0, _mocha.describe)('parseFrcsSurveyFile', function() {
  ;(0, _mocha.it)(
    'basic test',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee() {
        var parsed
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return (0, _index.parseFrcsSurveyFile)(
                  require.resolve('./cdata.fr')
                )

              case 2:
                parsed = _context.sent
                ;(0, _chai.expect)(parsed).to.deep.equal({
                  cave: 'Fisher Ridge Cave System',
                  errors: [],
                  location: 'Hart Co., KY',
                  trips: [
                    {
                      header: {
                        name:
                          'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
                        comment:
                          'This File has Crumps test connected.  11/20/12',
                        section: undefined,
                        date: undefined,
                        team: undefined,
                        distanceUnit: _unitized.Length.feet,
                        azimuthUnit: _unitized.Angle.degrees,
                        inclinationUnit: _unitized.Angle.degrees,
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
                          distance: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(2),
                          excludeDistance: true,
                          from: 'AE20',
                          frontsightAzimuth: null,
                          frontsightInclination: null,
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          left: _unitized.Unitize.feet(1),
                          right: _unitized.Unitize.feet(3),
                          to: null,
                          up: _unitized.Unitize.feet(0),
                        },
                        {
                          from: 'AE20',
                          to: 'AE19',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(9.3),
                          frontsightAzimuth: _unitized.Unitize.degrees(60),
                          backsightAzimuth: _unitized.Unitize.degrees(60),
                          frontsightInclination: _unitized.Unitize.degrees(-36),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(2),
                          right: _unitized.Unitize.feet(12),
                          up: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(20),
                          excludeDistance: false,
                          comment:
                            "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",
                        },
                        {
                          from: 'AE19',
                          to: 'AE18',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(24.5),
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(-90),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(6),
                          right: _unitized.Unitize.feet(10),
                          up: _unitized.Unitize.feet(25),
                          down: _unitized.Unitize.feet(0),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE18',
                          to: 'AE17',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(8),
                          frontsightAzimuth: _unitized.Unitize.degrees(350.5),
                          backsightAzimuth: _unitized.Unitize.degrees(350.5),
                          frontsightInclination: _unitized.Unitize.degrees(17),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(0),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE17',
                          to: 'AE16',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(6.7),
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(-90),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(6),
                          down: _unitized.Unitize.feet(1),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE16',
                          to: 'AE15',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(12.6),
                          frontsightAzimuth: _unitized.Unitize.degrees(70.5),
                          backsightAzimuth: _unitized.Unitize.degrees(71),
                          frontsightInclination: _unitized.Unitize.degrees(-18),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(4),
                          right: _unitized.Unitize.feet(0),
                          up: _unitized.Unitize.feet(2),
                          down: _unitized.Unitize.feet(1),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE15',
                          to: 'AE14',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(10),
                          frontsightAzimuth: _unitized.Unitize.degrees(21.5),
                          backsightAzimuth: _unitized.Unitize.degrees(20),
                          frontsightInclination: _unitized.Unitize.degrees(6),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(5),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(3),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE14',
                          to: 'AE13',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(26.8),
                          frontsightAzimuth: _unitized.Unitize.degrees(288),
                          backsightAzimuth: _unitized.Unitize.degrees(286),
                          frontsightInclination: _unitized.Unitize.degrees(-50),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(0),
                          right: _unitized.Unitize.feet(7),
                          up: _unitized.Unitize.feet(20),
                          down: _unitized.Unitize.feet(5),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE13',
                          to: 'AE12',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(20.7),
                          frontsightAzimuth: _unitized.Unitize.degrees(236),
                          backsightAzimuth: _unitized.Unitize.degrees(236),
                          frontsightInclination: _unitized.Unitize.degrees(34),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(4),
                          down: _unitized.Unitize.feet(4),
                          excludeDistance: false,
                          comment:
                            'SHORT CANYON AT THE BASE OF THE SECOND DROP',
                        },
                      ],
                    },
                    {
                      header: {
                        name:
                          'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
                        comment: null,
                        section: undefined,
                        date: undefined,
                        team: undefined,
                        distanceUnit: _unitized.Length.inches,
                        azimuthUnit: _unitized.Angle.degrees,
                        inclinationUnit: _unitized.Angle.degrees,
                        backsightAzimuthCorrected: false,
                        backsightInclinationCorrected: false,
                        hasBacksightAzimuth: true,
                        hasBacksightInclination: false,
                      },
                      shots: [
                        {
                          from: 'A1',
                          to: 'A2',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.inches(48 * 12 + 10),
                          frontsightAzimuth: _unitized.Unitize.degrees(292),
                          backsightAzimuth: _unitized.Unitize.degrees(110),
                          frontsightInclination: _unitized.Unitize.degrees(-42),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(5),
                          right: _unitized.Unitize.feet(10),
                          up: _unitized.Unitize.feet(35),
                          down: _unitized.Unitize.feet(5),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'A2',
                          to: 'A3',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.inches(12 * 12 + 5),
                          frontsightAzimuth: _unitized.Unitize.degrees(333.5),
                          backsightAzimuth: _unitized.Unitize.degrees(153.5),
                          frontsightInclination: _unitized.Unitize.degrees(35),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(1),
                          up: _unitized.Unitize.feet(15),
                          down: _unitized.Unitize.feet(5),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'A3',
                          to: 'A4',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.inches(4 * 12 + 2),
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(90),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(1),
                          up: _unitized.Unitize.feet(10),
                          down: _unitized.Unitize.feet(10),
                          excludeDistance: false,
                          comment: null,
                        },
                      ],
                    },
                    {
                      header: {
                        azimuthUnit: _unitized.Angle.degrees,
                        backsightAzimuthCorrected: true,
                        backsightInclinationCorrected: false,
                        comment: null,
                        date: undefined,
                        distanceUnit: _unitized.Length.feet,
                        hasBacksightAzimuth: true,
                        hasBacksightInclination: false,
                        inclinationUnit: _unitized.Angle.degrees,
                        name:
                          "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
                        section: undefined,
                        team: undefined,
                      },
                      shots: [
                        {
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightInclination: null,
                          comment: null,
                          distance: _unitized.Unitize.feet(13.7),
                          down: null,
                          excludeDistance: false,
                          from: 'B30',
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(40),
                          kind: ' ',
                          left: _unitized.Unitize.feet(2),
                          right: _unitized.Unitize.feet(4),
                          to: 'B31',
                          up: _unitized.Unitize.feet(6),
                        },
                      ],
                    },
                  ],
                })

              case 4:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })
    )
  )
})
