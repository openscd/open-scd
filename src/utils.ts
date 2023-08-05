
/** Throws an error bearing `message`, never returning. */
export function unreachable(message: string): never {
  throw new Error(message);
}

/** @returns the cartesian product of `arrays` */
export function crossProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (a, b) => <T[][]>a.flatMap(d => b.map(e => [d, e].flat())),
    [[]]
  );
}

/** @returns the depth of `t` if it is an object or array, zero otherwise. */
export function depth(t: Record<string, unknown>, mem = new WeakSet()): number {
  if (mem.has(t)) return Infinity;
  else
    switch (t?.constructor) {
      case Object:
      case Array:
        mem.add(t);
        return (
          1 +
          Math.max(
            -1,
            ...Object.values(t).map(_ => depth(<Record<string, unknown>>_, mem))
          )
        );
      default:
        return 0;
    }
}
