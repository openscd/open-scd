export function getConnectedAP(element: Element): Element | null {
  return element.ownerDocument.querySelector(
    `:root > Communication > SubNetwork > ConnectedAP[iedName="${element
      .closest('IED')
      ?.getAttribute('name')}"][apName="${element
      .closest('AccessPoint')
      ?.getAttribute('name')}"]`
  );
}

export function isAccessPointConnected(element: Element): boolean {
  return getConnectedAP(element) ? true : false;
}

function incrementMac(oldMac: string): string {
  const mac = oldMac.split('-').join('');
  //destination MAC in IEC61850 always starts with 01:0C:CD:...
  const newMac = '0' + (parseInt(mac, 16) + 1).toString(16).toUpperCase();
  return newMac.match(/.{1,2}/g)!.join('-');
}

export function uniqueMacAddress(
  doc: XMLDocument,
  serviceType: 'SMV' | 'GOOSE'
): string | null {
  const maxMac =
    serviceType === 'GOOSE' ? '01-0C-CD-01-01-FF' : '01-0C-CD-04-01-FF';
  const startMac =
    serviceType === 'GOOSE' ? '01-0C-CD-01-00-00' : '01-0C-CD-04-00-00';

  const givenMacs = Array.from(doc.querySelectorAll('Address > P'))
    .filter(pElement => pElement.getAttribute('type') === 'MAC-Address')
    .map(mac => mac.innerHTML.trim());

  let mac = startMac;
  while (mac !== maxMac) {
    if (!givenMacs.includes(mac)) return mac;
    mac = incrementMac(mac);
  }

  return givenMacs.includes(mac) ? null : mac;
}

function incrementAppId(oldAppId: string): string {
  return (parseInt(oldAppId, 16) + 1)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0');
}

export function uniqueAppId(doc: XMLDocument): string | null {
  const maxAppId = 'FFFF';
  const startAppId = '0001';

  const givenAppIds = Array.from(doc.querySelectorAll('Address > P'))
    .filter(pElement => pElement.getAttribute('type') === 'APPID')
    .map(mac => mac.innerHTML.trim());

  if (givenAppIds.length === 0) return null;

  let appId = startAppId;
  while (appId !== maxAppId) {
    if (!givenAppIds.includes(appId)) return appId;
    appId = incrementAppId(appId);
  }

  return givenAppIds.includes(appId) ? null : appId;
}
