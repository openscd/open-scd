import { fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import '../../../../src/editors/communication/connectedap-editor.js';

import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';
import { ConnectedAPEditor } from '../../../../src/editors/communication/connectedap-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { html } from '../../../../src/foundation.js';

describe('connectedap-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: WizardingElement & EditingElement;
    let element: ConnectedAPEditor | null;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;
    let ipField: WizardTextField;

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/valid2007B4.scd')
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
      ipField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-text-field[label="IP"]')
      );
      secondaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });
    it('closes on secondary action', async () => {
      expect(parent.wizardUI.dialog).to.exist;
      secondaryAction.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialog).to.not.exist;
    });
    it('changes name attribute on primary action', async () => {
      expect(
        doc.querySelector('ConnectedAP > Address > P[type="IP"]')?.textContent
      ).to.equal('192.168.210.111');
      ipField.value = '192.168.210.116';
      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector('ConnectedAP > Address > P[type="IP"]')?.textContent
      ).to.equal('192.168.210.116');
    });
    it('does not change Address if no changes have been made', async () => {
      const reference = doc.querySelector('ConnectedAP');
      primaryAction.click();
      expect(doc.querySelector('ConnectedAP')?.isEqualNode(reference)).to.be
        .true;
    });
  });
  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: WizardingElement & EditingElement;
    let element: ConnectedAPEditor | null;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/valid2007B4.scd')
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
      await parent.updateComplete;
      deleteButton = <HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
      );
    });
    it('removes ConnectedAP on delete button click', async () => {
      expect(doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP'))
        .to.exist;
      deleteButton.click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP'))
        .to.not.exist;
    });
  });
});
