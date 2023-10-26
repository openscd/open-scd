/**
 * Hashes `str` using the cyrb64 variant of
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 * @returns digest - a rather insecure hash, very quickly
 */
export function cyrb64(str: string): string {
  /* eslint-disable no-bitwise */
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (
    (h2 >>> 0).toString(16).padStart(8, '0') +
    (h1 >>> 0).toString(16).padStart(8, '0')
  );
  /* eslint-enable no-bitwise */
}
