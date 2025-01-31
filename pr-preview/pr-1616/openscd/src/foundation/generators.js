const maxGseMacAddress = 1154490630655;
const minGseMacAddress = 1154490630144;
const maxSmvMacAddress = 1154490827263;
const minSmvMacAddress = 1154490826752;
function convertToMac(mac) {
  const str = 0 + mac.toString(16).toUpperCase();
  const arr = str.match(/.{1,2}/g);
  return arr?.join("-");
}
const gseMacRange = Array(maxGseMacAddress - minGseMacAddress).fill(1).map((_, i) => convertToMac(minGseMacAddress + i));
const smvMacRange = Array(maxSmvMacAddress - minSmvMacAddress).fill(1).map((_, i) => convertToMac(minSmvMacAddress + i));
export function mACAddressGenerator(doc, serviceType) {
  const macs = new Set(Array.from(doc.querySelectorAll(`${serviceType} > Address > P[type="MAC-Address"]`)).map((macs2) => macs2.textContent));
  const range = serviceType === "SMV" ? smvMacRange : gseMacRange;
  return () => {
    const uniqueMAC = range.find((mac) => !macs.has(mac));
    if (uniqueMAC)
      macs.add(uniqueMAC);
    return uniqueMAC ?? "";
  };
}
const maxGseAppId = 16383;
const minGseAppId = 0;
const maxGseTripAppId = 49151;
const minGseTripAppId = 32768;
const maxSmvAppId = 32767;
const minSmvAppId = 16384;
const gseAppIdRange = Array(maxGseAppId - minGseAppId).fill(1).map((_, i) => (minGseAppId + i).toString(16).toUpperCase().padStart(4, "0"));
const gseTripAppIdRange = Array(maxGseTripAppId - minGseTripAppId).fill(1).map((_, i) => (minGseTripAppId + i).toString(16).toUpperCase().padStart(4, "0"));
const smvAppIdRange = Array(maxSmvAppId - minSmvAppId).fill(1).map((_, i) => (minSmvAppId + i).toString(16).toUpperCase().padStart(4, "0"));
export function appIdGenerator(doc, serviceType, type1A = false) {
  const appIds = new Set(Array.from(doc.querySelectorAll(`${serviceType} > Address > P[type="APPID"]`)).map((appId) => appId.textContent));
  const range = serviceType === "SMV" ? smvAppIdRange : type1A ? gseTripAppIdRange : gseAppIdRange;
  return () => {
    const uniqueAppId = range.find((appId) => !appIds.has(appId));
    if (uniqueAppId)
      appIds.add(uniqueAppId);
    return uniqueAppId ?? "";
  };
}
