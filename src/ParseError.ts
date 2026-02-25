import { SourceLoc } from './SourceLoc'
import z from 'zod'

export const ParseErrorSeverity = z.enum(['error', 'warning'])
export type ParseErrorSeverity = z.output<typeof ParseErrorSeverity>

export const ParseError = z.strictObject({
  type: ParseErrorSeverity,
  code: z.string().min(1),
  message: z.string().optional(),
  loc: SourceLoc.optional(),
})

export type ParseError = {
  type: ParseErrorSeverity
  code: string
  message?: string
  loc?: SourceLoc
}
