import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/communication/subnetwork-editor.js';
import { SubNetworkEditor } from '../../../../src/editors/communication/subnetwork-editor.js';

describe('subnetwork-editor', () => {
  let doc: XMLDocument;
  let element: SubNetworkEditor;
  let subNetwork: Element;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/communication/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with child GSE elements', () => {
    beforeEach(async () => {
      subNetwork = doc.querySelector('SubNetwork[name="StationBus"]')!;
      element = <SubNetworkEditor>(
        await fixture(
          html`<subnetwork-editor
            .doc=${doc}
            .element=${subNetwork}
          ></subnetwork-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());

    it('has a name property', () =>
      expect(element).to.have.property('name', 'StationBus'));

    it('indicates missing required name as UNDEFINED', async () => {
      subNetwork.removeAttribute('name');
      await element.requestUpdate();

      expect(element).to.have.property('name', 'UNDEFINED');
    });

    it('has a desc property', () =>
      expect(element).to.have.property('desc', 'desc'));

    it('has a type property', () =>
      expect(element).to.have.property('type', '8-MMS'));

    it('return null with missing type attribute', async () => {
      subNetwork.removeAttribute('type');
      await element.requestUpdate();

      expect(element).to.have.property('type', null);
    });

    it('has a BitRate property', () =>
      expect(element).to.have.property('bitrate', '100.0 b/s'));

    it('includes multiplier to bitrate property', async () => {
      const bitrate = subNetwork.querySelector('BitRate');
      bitrate?.setAttribute('multiplier', 'M');
      await element.requestUpdate();

      expect(element).to.have.property('bitrate', '100.0 Mb/s');
    });

    it('returns null with missing BitRate content event though BitRate exist as element', async () => {
      const bitrate = subNetwork.querySelector('BitRate');
      bitrate!.textContent = null;
      bitrate?.setAttribute('multiplier', 'M');
      await element.requestUpdate();

      expect(element).to.have.property('bitrate', null);
    });
  });

  describe('with child SMV elements', () => {
    beforeEach(async () => {
      subNetwork = doc.querySelector('SubNetwork[name="ProcessBus1"]')!;
      element = <SubNetworkEditor>(
        await fixture(
          html`<subnetwork-editor
            .doc=${doc}
            .element=${subNetwork}
          ></subnetwork-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });
});
