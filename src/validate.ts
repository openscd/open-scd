import { validateXML } from './xmllint.js';

export async function check(doc: XMLDocument): Promise<boolean> {
  validateXML(new XMLSerializer().serializeToString(doc), schemas);
  return false;
}

const schemas: Array<string> = [];
