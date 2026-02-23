import z from 'zod'

export const SourcePos = z.object({
  line: z.number().int().nonnegative(),
  column: z.number().int().nonnegative(),
  index: z.number().int().nonnegative(),
})

export type SourcePos = z.output<typeof SourcePos>

export const SourceLoc = z.object({ start: SourcePos, end: SourcePos })

export type SourceLoc = z.output<typeof SourceLoc>
