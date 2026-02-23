import z from 'zod'
import { ZodValidOrInvalidFrcsSurveyFile } from '../src/ZodFrcsSurveyFile'

const ParseFrcsSurveyFileIt = z.object({
  it: z.string(),
  procedure: z.literal('parseFrcsSurveyFile'),
  input: z.string(),
  output: ZodValidOrInvalidFrcsSurveyFile,
})

const It = ParseFrcsSurveyFileIt

type DescribeInput = {
  describe: string
  specs: (z.input<typeof It> | DescribeInput)[]
}

type DescribeOutput = {
  describe: string
  specs: (z.output<typeof It> | DescribeOutput)[]
}

const Describe: z.ZodType<DescribeOutput, any, DescribeInput> = z.object({
  describe: z.string(),
  specs: z.array(z.union([z.lazy(() => Describe), It])),
})

export const YamlTestcasesSchema = z.array(z.union([Describe, It]))
