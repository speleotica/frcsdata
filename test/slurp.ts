export async function slurp<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = []
  for await (const elem of iterable) result.push(elem)
  return result
}
