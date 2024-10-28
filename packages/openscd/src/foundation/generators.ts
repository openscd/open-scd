const maxGseMacAddress = 0x010ccd0101ff;
const minGseMacAddress = 0x010ccd010000;

const maxSmvMacAddress = 0x010ccd0401ff;
const minSmvMacAddress = 0x010ccd040000;

function convertToMac(mac: number): string {
  const str = 0 + mac.toString(16).toUpperCase();
  const arr = str.match(/.{1,2}/g)!;
  return arr?.join('-');
}

const gseMacRange = Array(maxGseMacAddress - minGseMacAddress)
  .fill(1)
  .map((_, i) => convertToMac(minGseMacAddress + i));

const smvMacRange = Array(maxSmvMacAddress - minSmvMacAddress)
  .fill(1)
  .map((_, i) => convertToMac(minSmvMacAddress + i));

/**
 * @param doc - project xml document
 * @param serviceType - SampledValueControl (SMV) or GSEControl (GSE)
 * @returns a function generating increasing unused `MAC-Address` within `doc` on subsequent invocations
 */
export function mACAddressGenerator(
  doc: XMLDocument,
  serviceType: 'SMV' | 'GSE'
): () => string {
  const macs = new Set(
    Array.from(
      doc.querySelectorAll(`${serviceType} > Address > P[type="MAC-Address"]`)
    ).map(macs => macs.textContent!)
  );

  const range = serviceType === 'SMV' ? smvMacRange : gseMacRange;

  return () => {
    const uniqueMAC = range.find(mac => !macs.has(mac));
    if (uniqueMAC) macs.add(uniqueMAC);
    return uniqueMAC ?? '';
  };
}

const maxGseAppId = 0x3fff;
const minGseAppId = 0x0000;

// APPID range for Type1A(Trip) GOOSE acc. IEC 61850-8-1
const maxGseTripAppId = 0xbfff;
const minGseTripAppId = 0x8000;

const maxSmvAppId = 0x7fff;
const minSmvAppId = 0x4000;

const gseAppIdRange = Array(maxGseAppId - minGseAppId)
  .fill(1)
  .map((_, i) => (minGseAppId + i).toString(16).toUpperCase().padStart(4, '0'));

const gseTripAppIdRange = Array(maxGseTripAppId - minGseTripAppId)
  .fill(1)
  .map((_, i) =>
    (minGseTripAppId + i).toString(16).toUpperCase().padStart(4, '0')
  );

const smvAppIdRange = Array(maxSmvAppId - minSmvAppId)
  .fill(1)
  .map((_, i) => (minSmvAppId + i).toString(16).toUpperCase().padStart(4, '0'));

/**
 * @param doc - project xml document
 * @param serviceType - SampledValueControl (SMV) or GSEControl (GSE)
 * @param type1A - whether the GOOSE is a Trip GOOSE resulting in different APPID range - default false
 * @returns a function generating increasing unused `APPID` within `doc` on subsequent invocations
 */
export function appIdGenerator(
  doc: XMLDocument,
  serviceType: 'SMV' | 'GSE',
  type1A = false
): () => string {
  const appIds = new Set(
    Array.from(
      doc.querySelectorAll(`${serviceType} > Address > P[type="APPID"]`)
    ).map(appId => appId.textContent!)
  );

  const range =
    serviceType === 'SMV'
      ? smvAppIdRange
      : type1A
      ? gseTripAppIdRange
      : gseAppIdRange;

  return () => {
    const uniqueAppId = range.find(appId => !appIds.has(appId));
    if (uniqueAppId) appIds.add(uniqueAppId);
    return uniqueAppId ?? '';
  };
}
