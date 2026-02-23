/* eslint-disable no-console */
import { readFileSync } from 'fs'
import { globSync } from 'glob'
import path from 'path'
import * as YAML from 'yaml'
import { YamlTestcasesSchema } from './YamlTestcasesSchema'
import { describe, it } from 'mocha'
import { parseFrcsSurveyFile } from '../src/string/index'
import { expect } from 'chai'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../src/ZodFrcsSurveyFileToJson'
import { formatYamlOutput } from './formatYamlOutput'

const testcases = globSync(path.join(__dirname, 'yaml/**/*.{yml,yaml}'), {
  absolute: true,
}).flatMap((file) =>
  YamlTestcasesSchema.parse(YAML.parse(readFileSync(file, 'utf8')))
)

function convert(testcase: (typeof testcases)[number]) {
  if ('describe' in testcase) {
    describe(testcase.describe, function () {
      for (const spec of testcase.specs) convert(spec)
    })
  } else {
    it(testcase.it, async function () {
      if (testcase.procedure === 'parseFrcsSurveyFile') {
        const { input, output } = testcase
        const actual = JSON.parse(
          JSON.stringify(
            ZodValidOrInvalidFrcsSurveyFileToJson.parse(
              await parseFrcsSurveyFile('cdata.fr', input)
            )
          )
        )
        try {
          expect(actual).to.deep.equal(output)
        } catch (error) {
          console.error('      ACTUAL')
          console.error('      ===============================')
          console.error(formatYamlOutput(actual).replace(/^/gm, '        '))
          throw error
        }
      }
    })
  }
}

describe('YAML testcases', function () {
  for (const testcase of testcases) convert(testcase)
})
