import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/communication/subnetwork-editor.js';
import { SubNetworkEditor } from '../../../../src/editors/communication/subnetwork-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

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
              .element=${doc.querySelector('SubNetwork')}
            ></subnetwork-editor>
            ></mock-wizard-editor
          >`
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
    it('does not change name attribute if not unique within parent element', async () => {
      const oldName = nameField.value;
      nameField.value = 'ProcessBus';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork')?.getAttribute('name')).to.equal(
        oldName
      );
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
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.updateComplete;

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
    });
    it('add ConnectedAP on primary action', async () => {
      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P2"]'
        )
      ).to.not.exist;
      newConnectedAPItem.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P2"]'
        )
      ).to.exist;
    });
  });
});
