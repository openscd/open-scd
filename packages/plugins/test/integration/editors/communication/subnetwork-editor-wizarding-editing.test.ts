import { fixture, html, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/communication/subnetwork-editor.js';
import { SubNetworkEditor } from '../../../../src/editors/communication/subnetwork-editor.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';

describe('subnetwork-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubNetworkEditor | null;
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeField: WizardTextField;
    let bitRateField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .doc=${doc}
              .element=${doc.querySelector('SubNetwork')}
            ></subnetwork-editor>
          </mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;
      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      typeField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="type"]')
      );
      bitRateField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="BitRate"]'
        )
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('closes on secondary action', async () => {
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialog).to.not.exist;
    });

    it('changes name attribute on primary action', async () => {
      nameField.value = 'newSubNetwork';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.getAttribute('name')).to.equal(
        'newSubNetwork'
      );
    });

    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.getAttribute('desc')).to.equal(
        'newDesc'
      );
    });

    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.getAttribute('desc')).to.be.null;
    });

    it('changes type attribute on primary action', async () => {
      typeField.value = 'newType';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.getAttribute('type')).to.equal(
        'newType'
      );
    });

    it('deletes type attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      typeField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.getAttribute('type')).to.be.null;
    });

    it('changes BitRate value on primary action', async () => {
      bitRateField.value = '20.0';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('BitRate')?.innerHTML).to.equal('20.0');
    });

    it('changes BitRate multiplier on primary action', async () => {
      bitRateField.multiplier = 'M';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('BitRate')?.getAttribute('multiplier')).to.equal(
        'M'
      );
      expect(doc.querySelector('BitRate')?.getAttribute('unit')).to.equal(
        'b/s'
      );
    });

    it('deletes BitRate element if voltage wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      bitRateField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.querySelector('BitRate')).to.be
        .null;
    });
  });

  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubNetworkEditor | null;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .doc=${doc}
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');
      await parent.updateComplete;

      deleteButton = <HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      );
    });

    it('removes SubNetwork on clicking delete button', async () => {
      expect(doc.querySelector('SubNetwork[name="StationBus"]')).to.exist;
      deleteButton.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork[name="StationBus"]')).to.not.exist;
    });
  });

  describe('add ConnectedAP action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubNetworkEditor | null;
    let newConnectedAPItem: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .doc=${doc}
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');
    });

    it('adds ConnectedAP on primary action', async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.requestUpdate();

      await parent.updateComplete;
      await element?.updateComplete;

      newConnectedAPItem = <ListItemBase>(
        parent.wizardUI.dialog!.querySelector(
          'mwc-check-list-item:nth-child(1)'
        )
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P2"]'
        )
      ).to.not.exist;

      newConnectedAPItem.click();
      primaryAction.click();
      await parent.requestUpdate();

      await parent.updateComplete;

      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P2"]'
        )
      ).to.exist;
    });

    it('add ConnectedAP with GSE and generates correct addresses', async () => {
      doc = await fetch('/test/testfiles/editors/MessageBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .doc=${doc}
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');
      await parent.updateComplete;
      await element?.updateComplete;

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.requestUpdate();
      await parent.updateComplete;
      await element?.updateComplete;

      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]'
        )
      ).to.not.exist;

      newConnectedAPItem = <ListItemBase>(
        parent.wizardUI.dialog!.querySelector(
          'mwc-check-list-item:nth-child(2)'
        )
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      newConnectedAPItem.click();
      primaryAction.click();

      await new Promise(resolve => setTimeout(resolve, 200)); // await animation
      await parent.requestUpdate();
      await parent.updateComplete;

      const connectedAp = doc.querySelector(
        ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]'
      );

      expect(connectedAp).to.exist;
      const gse1 = connectedAp!.querySelector('GSE[cbName="GCB2"]');
      const gse2 = connectedAp!.querySelector('GSE[cbName="GCB2"]');
      expect(gse1).to.exist;
      expect(gse2).to.exist;

      expect(gse1?.getAttribute('ldInst')).to.equal('CircuitBreaker_CB1');

      const address1 = gse1?.querySelector('Address');
      expect(address1).to.exist;

      const vlanPriority = address1?.querySelector('P[type="VLAN-PRIORITY"]');
      expect(vlanPriority).to.exist;
      expect(vlanPriority?.textContent).to.equal('4');

      const vlanId = address1?.querySelector('P[type="VLAN-ID"]');
      expect(vlanId).to.exist;
      expect(vlanId?.textContent).to.equal('000');

      const appId = address1?.querySelector('P[type="APPID"]');
      expect(appId).to.exist;
      expect(appId?.textContent).to.equal('0001');

      const mac = address1?.querySelector('P[type="MAC-Address"]');
      expect(mac).to.exist;
      expect(mac?.textContent).to.equal('01-0C-CD-01-00-01');

      const minTime = gse1?.querySelector('MinTime');
      expect(minTime).to.exist;
      expect(minTime?.getAttribute('unit')).to.equal('s');
      expect(minTime?.getAttribute('multiplier')).to.equal('m');
      expect(minTime?.textContent).to.equal('10');

      const maxTime = gse1?.querySelector('MaxTime');
      expect(maxTime).to.exist;
      expect(maxTime?.getAttribute('unit')).to.equal('s');
      expect(maxTime?.getAttribute('multiplier')).to.equal('m');
      expect(maxTime?.textContent).to.equal('10000');
    });

    it('add ConnectedAP with SMV and generates correct addresses', async () => {
      doc = await fetch('/test/testfiles/editors/MessageBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .doc=${doc}
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');
      await parent.updateComplete;
      await element?.updateComplete;

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      await parent.updateComplete;
      await element?.updateComplete;

      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]'
        )
      ).to.not.exist;

      newConnectedAPItem = <ListItemBase>(
        parent.wizardUI.dialog!.querySelector(
          'mwc-check-list-item:nth-child(2)'
        )
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      newConnectedAPItem.click();
      primaryAction.click();
      await new Promise(resolve => setTimeout(resolve, 400)); // await animation

      await parent.requestUpdate();
      await parent.updateComplete;

      const connectedAp = doc.querySelector(
        ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]'
      );

      expect(connectedAp).to.exist;
      const smv1 = connectedAp!.querySelector('SMV[cbName="MSVCB02"]');
      expect(smv1).to.exist;

      expect(smv1?.getAttribute('ldInst')).to.equal('CircuitBreaker_CB1');

      const address1 = smv1?.querySelector('Address');
      expect(address1).to.exist;

      const vlanPriority = address1?.querySelector('P[type="VLAN-PRIORITY"]');
      expect(vlanPriority).to.exist;
      expect(vlanPriority?.textContent).to.equal('4');

      const vlanId = address1?.querySelector('P[type="VLAN-ID"]');
      expect(vlanId).to.exist;
      expect(vlanId?.textContent).to.equal('000');

      const appId = address1?.querySelector('P[type="APPID"]');
      expect(appId).to.exist;
      expect(appId?.textContent).to.equal('4000');

      const mac = address1?.querySelector('P[type="MAC-Address"]');
      expect(mac).to.exist;
      expect(mac?.textContent).to.equal('01-0C-CD-04-00-00');
    });
  });
});
