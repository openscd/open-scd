import { expect } from '@open-wc/testing';
import {
  uniqueAppId,
  uniqueMacAddress,
} from '../../../../src/wizards/foundation/scl.js';

function incrementMac(oldMac: string): string {
  const mac = oldMac.split('-').join('');
  //destination MAC in IEC61850 always starts with 01:0C:CD:...
  const newMac = '0' + (parseInt(mac, 16) + 1).toString(16).toUpperCase();
  return newMac.match(/.{1,2}/g)!.join('-');
}

function createMacs(serviceType: 'SMV' | 'GOOSE'): string[] {
  const maxMac =
    serviceType === 'GOOSE' ? '01-0C-CD-01-01-FF' : '01-0C-CD-04-01-FF';
  const startMac =
    serviceType === 'GOOSE' ? '01-0C-CD-01-00-00' : '01-0C-CD-04-00-00';

  const macs: string[] = [];

  let mac = startMac;
  while (mac !== maxMac) {
    macs.push(mac);
    mac = incrementMac(mac);
  }

  macs.push(maxMac);

  return macs;
}

function incrementAppId(oldAppId: string): string {
  return (parseInt(oldAppId, 16) + 1)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0');
}

function createAppIds(): string[] {
  const maxAppId = 'FFFF';
  const startAppId = '0001';

  const appIds: string[] = [];

  let appId = startAppId;
  while (appId !== maxAppId) {
    appIds.push(appId);
    appId = incrementAppId(appId);
  }

  appIds.push(maxAppId);

  return appIds;
}

describe('SCL specific functions', () => {
  describe('define a function to get unique GSE MAC addres', () => {
    describe('with all MAC address in use', () => {
      const gseElementString = `<SubNetwork>${createMacs('GOOSE').map(
        mac =>
          `<ConnectedAP><Address><P type="MAC-Address">${mac}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        gseElementString,
        'application/xml'
      );

      it('return null with no unique MAC', () =>
        expect(uniqueMacAddress(doc, 'GOOSE')).to.be.null);
    });

    describe('with available MAC address', () => {
      const macs = createMacs('GOOSE');
      macs.splice(4, 5);
      const gseElementString = `<SubNetwork>${macs.map(
        mac =>
          `<ConnectedAP><Address><P type="MAC-Address">${mac}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        gseElementString,
        'application/xml'
      );

      it('return the first available first unique MAC', () =>
        expect(uniqueMacAddress(doc, 'GOOSE')).to.equal('01-0C-CD-01-00-04'));
    });

    describe('with one available MAC address', () => {
      const macs = createMacs('GOOSE');
      macs.pop();
      const gseElementString = `<SubNetwork>${macs.map(
        mac =>
          `<ConnectedAP><Address><P type="MAC-Address">${mac}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        gseElementString,
        'application/xml'
      );

      it('return the first availablefirst unique MAC', () =>
        expect(uniqueMacAddress(doc, 'GOOSE')).to.equal('01-0C-CD-01-01-FF'));
    });
  });

  describe('define a function to get unique SMV MAC addres', () => {
    describe('with all MAC address in use', () => {
      const smvElementString = `<SubNetwork>${createMacs('SMV').map(
        mac =>
          `<ConnectedAP><Address><P type="MAC-Address">${mac}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        smvElementString,
        'application/xml'
      );

      it('return null with no unique MAC', () =>
        expect(uniqueMacAddress(doc, 'SMV')).to.be.null);
    });

    describe('with available MAC address', () => {
      const macs = createMacs('SMV');
      macs.splice(10, 5);
      const gseElementString = `<SubNetwork>${macs.map(
        mac =>
          `<ConnectedAP><Address><P type="MAC-Address">${mac}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        gseElementString,
        'application/xml'
      );

      it('return the first available unique MAC', () =>
        expect(uniqueMacAddress(doc, 'SMV')).to.equal('01-0C-CD-04-00-0A'));
    });

    describe('with one available MAC address', () => {
      const macs = createMacs('SMV');
      macs.pop();
      const gseElementString = `<SubNetwork>${macs.map(
        mac =>
          `<ConnectedAP><Address><P type="MAC-Address">${mac}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        gseElementString,
        'application/xml'
      );

      it('return the first available unique MAC', () =>
        expect(uniqueMacAddress(doc, 'SMV')).to.equal('01-0C-CD-04-01-FF'));
    });
  });

  describe('define a function to get unique APPID', () => {
    describe('with available APPID', () => {
      const appIds = createAppIds();
      appIds.splice(10, 5);
      const gseElementString = `<SubNetwork>${appIds.map(
        appId =>
          `<ConnectedAP><Address><P type="APPID">${appId}</P></Address></ConnectedAP>`
      )}</SubNetwork>`;
      const doc = new DOMParser().parseFromString(
        gseElementString,
        'application/xml'
      );

      it('return the first available unique APPID', () => {
        expect(uniqueAppId(doc)).to.equal('000B');
      });
    });
  });
});
