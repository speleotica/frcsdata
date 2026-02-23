/* eslint-disable no-console */
import { FrcsSurveyFile, InvalidFrcsSurveyFile } from '../src/FrcsSurveyFile.js'
import * as YAML from 'yaml'

export function formatYamlOutput(file: FrcsSurveyFile | InvalidFrcsSurveyFile) {
  const doc = YAML.parseDocument(JSON.stringify(file))
  YAML.visit(doc, {
    Collection(key, node) {
      node.flow = false
    },
    Scalar(key, node) {
      node.type = 'PLAIN'
    },
  })
  YAML.visit(doc, {
    Pair(key, node) {
      if (
        YAML.isScalar(node.key) &&
        node.key.value === 'shots' &&
        YAML.isSeq(node.value)
      ) {
        for (const item of node.value.items) {
          if (YAML.isMap(item)) item.flow = true
        }
      }
      if (
        YAML.isScalar(node.key) &&
        (node.key.value === 'start' || node.key.value === 'end') &&
        YAML.isMap(node.value)
      ) {
        node.value.flow = true
      }
    },
  })

  return YAML.stringify(doc)
}
