const nameStartChar = '[:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
    '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
    '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]';
const nameChar = nameStartChar + '|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040]';
const name = nameStartChar + '(' + nameChar + ')*';
const nmToken = '(' + nameChar + ')+';
export const patterns = {
    string: '([\u0009-\u000A]|[\u000D]|[\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]' +
        '|[\uE000-\uFFFD])*',
    normalizedString: '([\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]|[\uE000-\uFFFD])*',
    name,
    nmToken,
    names: name + '( ' + name + ')*',
    nmTokens: nmToken + '( ' + nmToken + ')*',
    decimal: '[+\\-]?[0-9]+(([.][0-9]*)?|([.][0-9]+))',
    unsigned: '[+]?[0-9]+(([.][0-9]*)?|([.][0-9]+))',
    alphanumericFirstUpperCase: '[A-Z][0-9,A-Z,a-z]*',
    asciName: '[A-Za-z][0-9,A-Z,a-z_]*',
    lnClass: '[A-Z]{4,4}',
    tRestrName1stL: '[a-z][0-9A-Za-z]*',
    abstractDataAttributeName: '((T)|(Test)|(Check)|(SIUnit)|(Oper)|(SBO)|(SBOw)|(Cancel)|[a-z][0-9A-Za-z]*)',
    cdc: '(SPS)|(DPS)|(INS)|(ENS)|(ACT)|(ACD)|(SEC)|(BCR)|(HST)|(VSS)|(MV)|(CMV)|(SAV)|' +
        '(WYE)|(DEL)|(SEQ)|(HMV)|(HWYE)|(HDEL)|(SPC)|(DPC)|(INC)|(ENC)|(BSC)|(ISC)|(APC)|(BAC)|' +
        '(SPG)|(ING)|(ENG)|(ORG)|(TSG)|(CUG)|(VSG)|(ASG)|(CURVE)|(CSG)|(DPL)|(LPL)|(CSD)|(CST)|' +
        '(BTS)|(UTS)|(LTS)|(GTS)|(MTS)|(NTS)|(STS)|(CTS)|(OTS)|(VSD)',
};
export const maxLength = {
    cbName: 32,
    abstracDaName: 60,
};
//# sourceMappingURL=limits.js.map