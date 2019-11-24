'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseFrcsTripSummaryFile = exports.parseFrcsPlotFile = exports.parseFrcsSurveyFile = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _wrapAsyncGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/wrapAsyncGenerator')
)

var _awaitAsyncGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/awaitAsyncGenerator')
)

var _asyncIterator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncIterator')
)

var _asyncGeneratorDelegate2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncGeneratorDelegate')
)

var _parseFrcsSurveyFile2 = _interopRequireDefault(
  require('../parseFrcsSurveyFile')
)

var _parseFrcsPlotFile2 = _interopRequireDefault(
  require('../parseFrcsPlotFile')
)

var _parseFrcsTripSummaryFile2 = _interopRequireDefault(
  require('../parseFrcsTripSummaryFile')
)

function linesOf(_x) {
  return _linesOf.apply(this, arguments)
}

function _linesOf() {
  _linesOf = (0, _wrapAsyncGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(s) {
      return _regenerator.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                return _context.delegateYield(
                  (0, _asyncGeneratorDelegate2.default)(
                    (0, _asyncIterator2.default)(s.split(/\r\n?|\n/gm)),
                    _awaitAsyncGenerator2.default
                  ),
                  't0',
                  1
                )

              case 1:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )
  return _linesOf.apply(this, arguments)
}

var convert = function convert(fn) {
  return function(file, str) {
    return fn(file, linesOf(str))
  }
}

var parseFrcsSurveyFile = convert(_parseFrcsSurveyFile2.default)
exports.parseFrcsSurveyFile = parseFrcsSurveyFile
var parseFrcsPlotFile = convert(_parseFrcsPlotFile2.default)
exports.parseFrcsPlotFile = parseFrcsPlotFile
var parseFrcsTripSummaryFile = convert(_parseFrcsTripSummaryFile2.default)
exports.parseFrcsTripSummaryFile = parseFrcsTripSummaryFile
