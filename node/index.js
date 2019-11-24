'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseFrcsTripSummaryFile = exports.parseFrcsPlotFile = exports.parseFrcsSurveyFile = void 0

var _fs = _interopRequireDefault(require('fs'))

var _readline = _interopRequireDefault(require('readline'))

var _parseFrcsSurveyFile2 = _interopRequireDefault(
  require('../parseFrcsSurveyFile')
)

var _parseFrcsPlotFile2 = _interopRequireDefault(
  require('../parseFrcsPlotFile')
)

var _parseFrcsTripSummaryFile2 = _interopRequireDefault(
  require('../parseFrcsTripSummaryFile')
)

var convert = function convert(fn) {
  return function(file) {
    return fn(
      file,
      _readline.default.createInterface(_fs.default.createReadStream(file))
    )
  }
}

var parseFrcsSurveyFile = convert(_parseFrcsSurveyFile2.default)
exports.parseFrcsSurveyFile = parseFrcsSurveyFile
var parseFrcsPlotFile = convert(_parseFrcsPlotFile2.default)
exports.parseFrcsPlotFile = parseFrcsPlotFile
var parseFrcsTripSummaryFile = convert(_parseFrcsTripSummaryFile2.default)
exports.parseFrcsTripSummaryFile = parseFrcsTripSummaryFile
