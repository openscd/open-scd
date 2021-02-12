/* eslint-disable no-control-regex */

import fc, {
  Arbitrary,
  array,
  hexaString,
  integer,
  ipV4,
  nat,
  oneof,
  tuple,
} from 'fast-check';
import { typePattern } from '../src/editors/communication/p-types.js';
import { restrictions } from '../src/foundation.js';

export function regexString(
  re: RegExp,
  minLength = 0,
  maxLength?: number
): Arbitrary<string> {
  return fc
    .string({ minLength, maxLength: maxLength ?? 2 * minLength + 10 })
    .filter(char => re.test(char));
}

export function ipV6(): Arbitrary<string> {
  const h16Arb = hexaString({ minLength: 1, maxLength: 4 });
  const ls32Arb = tuple(h16Arb, h16Arb).map(([a, b]) => `${a}:${b}`);
  return tuple(array(h16Arb, { minLength: 6, maxLength: 6 }), ls32Arb).map(
    ([eh, l]) => `${eh.join(':')}:${l}`
  );
}

export function ipV6SubNet(): Arbitrary<string> {
  return integer({ min: 1, max: 127 }).map(num => `/${num}`);
}

export const regExp = {
  tIEDName: /^[A-Za-z][0-9A-Za-z_]*$/,
  tLDInst: /^[A-Za-z][0-9A-Za-z_]*$/,
  tPrefix: /^[A-Za-z][0-9A-Za-z_]*$/,
  tLNClass: /^[A-Z]{1,4}$/,
  tLNInst: /^[0-9]{0,12}$/,
  decimal: new RegExp(`^${restrictions.decimal}$`),
  unsigned: new RegExp(`^${restrictions.unsigned}$`),
  tName: new RegExp(`^${restrictions.normalizedString}$`),
  desc: new RegExp(`^${restrictions.normalizedString}$`),
  IPv4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
  OSI: /^[0-9A-F]+$/,
  OSIAPi: /^[0-9\u002C]+$/,
  OSIid: /^[0-9]+$/,
};

export const inverseRegExp = {
  unsigned: /[^0-9.+]|.[^0-9.]/,
  decimal: /[^0-9.+-]|.[^0-9.]/,
  integer: /[^0-9+-]/,
};
