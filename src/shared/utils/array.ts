/**
 * @param before
 * @param after
 * @returns The elements that were in `before` but no longer in `after`
 */
export function getRemovedItems<T>(before: T[], after: T[]): T[] {
  const set = new Set(after);
  return before.filter((item) => !set.has(item));
}
