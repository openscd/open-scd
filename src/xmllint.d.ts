declare module 'xmllint.js';

export interface XMLError {
  errors: null | Array<string>;
}

export function validateXML(
  xml: string,
  schema: string | Iterable<string>
): XMLError;
