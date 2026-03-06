import { SourceLoc } from './SourceLoc'
import z from 'zod'

export const ParseIssueSeverity = z.enum(['error', 'warning'])
export type ParseIssueSeverity = z.output<typeof ParseIssueSeverity>

export const ParseIssue = z.strictObject({
  type: ParseIssueSeverity,
  code: z.string().nonempty(),
  message: z.string().optional(),
  loc: SourceLoc.optional(),
})

export type ParseIssue = {
  type: ParseIssueSeverity
  code: string
  message?: string
  loc?: SourceLoc
}
