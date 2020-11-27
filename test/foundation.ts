import fc, { Arbitrary } from 'fast-check';

export function regexString(
  re: RegExp,
  minLength = 0,
  maxLength?: number
): Arbitrary<string> {
  return fc
    .string(minLength, maxLength ?? 2 * minLength + 10)
    .filter(char => re.test(char));
}

export const restrictions = {
  tIEDName: /^[A-Za-z][0-9A-Za-z_]*$/,
  tLDInst: /^[A-Za-z][0-9A-Za-z_]*$/,
  tPrefix: /^[A-Za-z][0-9A-Za-z_]*$/,
  tLNClass: /^[A-Z]{1,4}$/,
  tLNInst: /^[0-9]{0,12}$/,
};
