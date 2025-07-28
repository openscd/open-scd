export const pTypes104 = [
    'IP',
    'IP-SUBNET',
    'W-FACTOR',
    'K-FACTOR',
    'TIMEOUT-0',
    'TIMEOUT-1',
    'TIMEOUT-2',
    'TIMEOUT-3',
];
export const pTypesRedundancyGroup104 = [
    'W-FACTOR',
    'K-FACTOR',
    'TIMEOUT-0',
    'TIMEOUT-1',
    'TIMEOUT-2',
    'TIMEOUT-3',
];
export const pTypesLogicLink104 = ['IP', 'IP-SUBNET'];
const typeBase = {
    IP: '([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])',
    factor: '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-3][0-2][0-7][0-6][0-7]',
    timeout: '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]',
};
/** Patterns from IEC 61850-80-1 for all `P` elements */
export const typePattern = {
    IP: typeBase.IP,
    'IP-SUBNET': typeBase.IP,
    'W-FACTOR': typeBase.factor,
    'K-FACTOR': typeBase.factor,
    'TIMEOUT-0': typeBase.timeout,
    'TIMEOUT-1': typeBase.timeout,
    'TIMEOUT-2': typeBase.timeout,
    'TIMEOUT-3': typeBase.timeout,
};
export const stationTypeOptions = [
    'controlling-station',
    'controlled-station',
];
export const typeDescriptiveNameKeys = {
    StationType: 'protocol104.network.connectedAp.wizard.stationTypeHelper',
    IP: 'protocol104.network.connectedAp.wizard.ipHelper',
    'IP-SUBNET': 'protocol104.network.connectedAp.wizard.ipSubnetHelper',
    'W-FACTOR': 'protocol104.network.connectedAp.wizard.wFactorHelper',
    'K-FACTOR': 'protocol104.network.connectedAp.wizard.kFactorHelper',
    'TIMEOUT-0': 'protocol104.network.connectedAp.wizard.timeout0Helper',
    'TIMEOUT-1': 'protocol104.network.connectedAp.wizard.timeout1Helper',
    'TIMEOUT-2': 'protocol104.network.connectedAp.wizard.timeout2Helper',
    'TIMEOUT-3': 'protocol104.network.connectedAp.wizard.timeout3Helper',
};
//# sourceMappingURL=p-types.js.map