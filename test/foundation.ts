/* eslint-disable no-control-regex */

import fc, { Arbitrary } from 'fast-check';
import { restrictions } from '../src/foundation.js';

export function regexString(
  re: RegExp,
  minLength = 0,
  maxLength?: number
): Arbitrary<string> {
  return fc
    .string(minLength, maxLength ?? 2 * minLength + 10)
    .filter(char => re.test(char));
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
};

export const inverseRegExp = {
  unsigned: /[^0-9.+]|.[^0-9.]/,
  decimal: /[^0-9.+-]|.[^0-9.]/,
  integer: /[^0-9+-]/,
};
