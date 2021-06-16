import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import '../../../../src/editors/communication/connectedap-editor.js';

import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';
import { ConnectedAPEditor } from '../../../../src/editors/communication/connectedap-editor.js';

describe('connectedap-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: WizardingElement & EditingElement;
    let element: ConnectedAPEditor | null;

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/valid.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><connectedap-editor
              .element=${doc.querySelector(
                'SubNetwork[name="StationBus"] > ConnectedAP'
              )}
            ></connectedap-editor>
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector('connectedap-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
      )).click();
      await parent.updateComplete;
    });
    it('closes on secondary action', async () => {
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI).to.have.property('dialog', undefined);
    });
    describe('edit attributes within SubNetwork', () => {
      it('does not change Address if no changes have been made', async () => {
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        expect(parent.wizardUI).to.exist;
      });
      it('changes name attribute on primary action', async () => {
        /* parent.wizardUI.inputs[0].value = 'newSubNetwork';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('SubNetwork')?.getAttribute('name')).to.equal(
          'newSubNetwork'
        ); */
      });
    });
  });
  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: WizardingElement & EditingElement;
    let element: ConnectedAPEditor | null;

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/valid.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><connectedap-editor
              .element=${doc.querySelector(
                'SubNetwork[name="StationBus"] > ConnectedAP'
              )}
            ></connectedap-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('connectedap-editor');
    });
    it('removes ConnectedAP on clicking delete button', async () => {
      expect(doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP'))
        .to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP'))
        .to.not.exist;
    });
  });
});
