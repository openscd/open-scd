import { fixture, html, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

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

  describe('move GSE/SMV dialog behavior', () => {
    let actionEvent: SinonSpy;

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
      actionEvent = spy();
      window.addEventListener('editor-action', actionEvent);
    });

    it('opens the move dialog on request-gse-move event', async () => {
      const gseElement = subNetwork.querySelector('GSE')!;
      element.dispatchEvent(
        new CustomEvent('request-gse-move', {
          detail: { element: gseElement },
          bubbles: true,
          composed: true,
        })
      );

      await element.updateComplete;

      const dialog = element.shadowRoot?.querySelector('mwc-dialog#moveDialog');
      expect(dialog).to.exist;
      expect(dialog).to.equalSnapshot();
    });

    it('dispatches editor-action event on confirm', async () => {
      const gseElement = subNetwork.querySelector('GSE')!;
      element.dispatchEvent(
        new CustomEvent('request-gse-move', {
          detail: { element: gseElement },
          bubbles: true,
          composed: true,
        })
      );

      await element.updateComplete;

      const dialog = element.shadowRoot?.querySelector('mwc-dialog#moveDialog');
      expect(dialog).to.exist;

      const connectedAP = subNetwork.querySelector('ConnectedAP')!;
      element.newlySelectedAP = connectedAP;

      (<HTMLElement>(
        dialog?.querySelector('mwc-button[slot="primaryAction"]')
      )).click();

      expect(actionEvent).to.have.been.calledOnce;
      expect(actionEvent.args[0][0].detail.action.title).to.contain(
        'Move GSE to another ConnectedAP'
      );
    });

    it('disables confirm button when no ConnectedAP is selected', async () => {
      const gseElement = subNetwork.querySelector('GSE')!;
      element.dispatchEvent(
        new CustomEvent('request-gse-move', {
          detail: { element: gseElement },
          bubbles: true,
          composed: true,
        })
      );

      await element.updateComplete;

      const confirmButton = element.shadowRoot?.querySelector(
        'mwc-button[slot="primaryAction"]'
      );
      expect(confirmButton).to.exist;
      expect(confirmButton?.hasAttribute('disabled')).to.be.true;
    });
  });
});
