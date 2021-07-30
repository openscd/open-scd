const nameStartChar =
  '[:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
  '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
  '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[\u{10000}\\-\u{EFFFF}]';
const nameChar =
  nameStartChar + '|[.0-9-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040]';
const name = nameStartChar + '(' + nameChar + ')*';
const nmToken = '(' + nameChar + ')+';

export const patterns = {
  string:
    '([\u0009-\u000A]|[\u000D]|[\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]' +
    '|[\uE000-\uFFFD]|[\u{10000}\\-\u{10FFFF}])*',
  normalizedString:
    '([\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]|[\uE000-\uFFFD]' +
    '|[\u{10000}\\-\u{10FFFF}])*',
  name,
  nmToken,
  names: name + '( ' + name + ')*',
  nmTokens: nmToken + '( ' + nmToken + ')*',
  decimal: '((-|\\+)?([0-9]+(\\.[0-9]*)?|\\.[0-9]+))',
  unsigned: '\\+?([0-9]+(\\.[0-9]*)?|\\.[0-9]+)',
  alphanumericFirstUpperCase: '[A-Z][0-9,A-Z,a-z]*',
  alphanumericFirstLowerCase: '[a-z][0-9,A-Z,a-z]*',
  lnClass: '[A-Z]{4,4}',
};
