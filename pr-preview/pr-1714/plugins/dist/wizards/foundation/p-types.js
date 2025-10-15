/** Selects edition depending array of `P` element types
 *  Supported Editions are 1 (2003), 2 (2007B) and 2.1 (2007B4)
 */
export function getTypes(element) {
    if (!element.ownerDocument.documentElement)
        return [];
    const scl = element.ownerDocument.documentElement;
    const type = (scl.getAttribute('version') ?? '2003') +
        (scl.getAttribute('revision') ?? '') +
        (scl.getAttribute('release') ?? '');
    if (type === '2003')
        return pTypes2003;
    if (type === '2007B')
        return pTypes2007B;
    return pTypes2007B4;
}
const pTypes2003 = [
    'IP',
    'IP-SUBNET',
    'IP-GATEWAY',
    'OSI-TSEL',
    'OSI-SSEL',
    'OSI-PSEL',
    'OSI-AP-Title',
    'OSI-AP-Invoke',
    'OSI-AE-Qualifier',
    'OSI-AE-Invoke',
    'OSI-NSAP',
    'VLAN-ID',
    'VLAN-PRIORITY',
];
const pTypes2007B = [
    ...pTypes2003,
    'SNTP-Port',
    'MMS-Port',
    'DNSName',
    'UDP-Port',
    'TCP-Port',
    'C37-118-IP-Port',
];
const pTypes2007B4 = [
    ...pTypes2007B,
    'IPv6',
    'IPv6-SUBNET',
    'IPv6-GATEWAY',
    'IPv6FlowLabel',
    'IPv6ClassOfTraffic',
    'IPv6-IGMPv3Src',
    'IP-IGMPv3Sr',
    'IP-ClassOfTraffic',
];
export const pTypesGSESMV = [
    'MAC-Address',
    'APPID',
    'VLAN-ID',
    'VLAN-PRIORITY',
];
const typeBase = {
    IP: '([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])',
    OSI: '[0-9A-F]+',
    OSId: '[0-9]+',
    OSIAPi: '[0-9\u002C]+',
    MAC: '([0-9A-F]{2}-){5}[0-9A-F]{2}',
    APPID: '[0-9A-F]{4}',
    VLANp: '[0-7]',
    VLANid: '[0-9A-F]{3}',
    port: '0|([1-9][0-9]{0,3})|([1-5][0-9]{4,4})|(6[0-4][0-9]{3,3})|(65[0-4][0-9]{2,2})|(655[0-2][0-9])|(6553[0-5])',
    IPv6: '([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}',
    IPv6sub: '/[1-9]|/[1-9][0-9]|/1[0-1][0-9]|/12[0-7]',
};
/** Patterns from IEC 61850-6 for all `P` elements */
export const typePattern = {
    IP: typeBase.IP,
    'IP-SUBNET': typeBase.IP,
    'IP-GATEWAY': typeBase.IP,
    'OSI-TSEL': typeBase.OSI,
    'OSI-SSEL': typeBase.OSI,
    'OSI-PSEL': typeBase.OSI,
    'OSI-AP-Title': typeBase.OSIAPi,
    'OSI-AP-Invoke': typeBase.OSId,
    'OSI-AE-Qualifier': typeBase.OSId,
    'OSI-AE-Invoke': typeBase.OSId,
    'MAC-Address': typeBase.MAC,
    APPID: typeBase.APPID,
    'VLAN-ID': typeBase.VLANid,
    'VLAN-PRIORITY': typeBase.VLANp,
    'OSI-NSAP': typeBase.OSI,
    'SNTP-Port': typeBase.port,
    'MMS-Port': typeBase.port,
    DNSName: '[^ ]*',
    'UDP-Port': typeBase.port,
    'TCP-Port': typeBase.port,
    'C37-118-IP-Port': '102[5-9]|10[3-9][0-9]|1[1-9][0-9][0-9]|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]',
    IPv6: typeBase.IPv6,
    'IPv6-SUBNET': typeBase.IPv6sub,
    'IPv6-GATEWAY': typeBase.IPv6,
    IPv6FlowLabel: '[0-9a-fA-F]{1,5}',
    IPv6ClassOfTraffic: '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]',
    'IPv6-IGMPv3Src': typeBase.IPv6,
    'IP-IGMPv3Sr': typeBase.IP,
    'IP-ClassOfTraffic': typeBase.OSI,
};
/** Whether `P` element is required within `Address` */
export const typeNullable = {
    IP: false,
    'IP-SUBNET': false,
    'IP-GATEWAY': true,
    'OSI-TSEL': true,
    'OSI-SSEL': true,
    'OSI-PSEL': true,
    'OSI-AP-Title': true,
    'OSI-AP-Invoke': true,
    'OSI-AE-Qualifier': true,
    'OSI-AE-Invoke': true,
    'OSI-NSAP': true,
    'MAC-Address': false,
    APPID: false,
    'VLAN-ID': true,
    'VLAN-PRIORITY': true,
    'SNTP-Port': true,
    'MMS-Port': true,
    DNSName: true,
    'UDP-Port': true,
    'TCP-Port': true,
    'C37-118-IP-Port': true,
    IPv6: true,
    'IPv6-SUBNET': true,
    'IPv6-GATEWAY': true,
    IPv6FlowLabel: true,
    IPv6ClassOfTraffic: true,
    'IPv6-IGMPv3Src': true,
    'IP-IGMPv3Sr': true,
    'IP-ClassOfTraffic': true,
};
/** Max length definition for all `P` element */
export const typeMaxLength = {
    'OSI-TSEL': 8,
    'OSI-SSEL': 16,
    'OSI-PSEL': 16,
    'OSI-AP-Invoke': 5,
    'OSI-AE-Qualifier': 5,
    'OSI-AE-Invoke': 5,
    'OSI-NSAP': 40,
    'IP-ClassOfTraffic': 2,
};
//# sourceMappingURL=p-types.js.map