export const pTypes104: string[] = [
  'IP',
  'IP-SUBNET',
  'W-FACTOR',
  'K-FACTOR',
  'TIMEOUT-0',
  'TIMEOUT-1',
  'TIMEOUT-2',
  'TIMEOUT-3'
];

const typeBase = {
  IP: '([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])',
  factor: '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-3][0-2][0-7][0-6][0-7]',
  timeout: '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
};

/** Patterns from IEC 61850-80-1 for all `P` elements */
export const typePattern: Partial<Record<string, string>> = {
  IP: typeBase.IP,
  'IP-SUBNET': typeBase.IP,
  'W-FACTOR': typeBase.factor,
  'K-FACTOR': typeBase.factor,
  'TIMEOUT-0': typeBase.timeout,
  'TIMEOUT-1': typeBase.timeout,
  'TIMEOUT-2': typeBase.timeout,
  'TIMEOUT-3': typeBase.timeout
};

export const stationTypeOptions: string[] = [
  'controlling-station',
  'controlled-station'
]

/** Max length definition for all `P` element */
export const typeDescriptiveNameKeys: Record<string, string> = {
  'StationType': 'protocol104.network.connectedap.stationType',
  'IP': 'protocol104.network.connectedap.ip',
  'IP-SUBNET': 'protocol104.network.connectedap.ipSubnet',
  'W-FACTOR': 'protocol104.network.connectedap.wFactor',
  'K-FACTOR': 'protocol104.network.connectedap.kFactor',
  'TIMEOUT-0': 'protocol104.network.connectedap.timeout0',
  'TIMEOUT-1': 'protocol104.network.connectedap.timeout1',
  'TIMEOUT-2': 'protocol104.network.connectedap.timeout2',
  'TIMEOUT-3': 'protocol104.network.connectedap.timeout3',
};