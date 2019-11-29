import { Operation, Range } from '..'

/**
 * `RangeRef` objects keep a specific range in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date range value.
 */

export interface RangeRef {
  current: Range | null
  affinity: 'forward' | 'backward' | 'outward' | 'inward' | null
  unref(): Range | null
}

export const RangeRef = {
  /**
   * Transform the range ref's current value by an operation.
   */

  transform(ref: RangeRef, op: Operation): void {
    const { current, affinity } = ref

    if (current == null) {
      return
    }

    const path = Range.transform(current, op, { affinity })
    ref.current = path

    if (path == null) {
      ref.unref()
    }
  },
}