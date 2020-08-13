/** Encodes all non ASCII symbols in `str` as XML entities. */
export function encodeNonASCII(str: string): string {
  if (!str || !str.length) {
    return '';
  }
  const strLength = str.length;
  let result = '';
  let i = 0;
  while (i < strLength) {
    const c = str.charCodeAt(i);
    if (c <= 127) {
      result += str[i++];
      continue;
    }
    result += '&#' + c + ';';
    i++;
  }
  return result;
}
