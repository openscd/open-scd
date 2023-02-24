import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/communication/gse-editor.js';
import { GseEditor } from '../../../../src/editors/communication/gse-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('gse-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: GseEditor | null;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;
    let macAddressField: WizardTextField;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><gse-editor
              .element=${doc.querySelector('ConnectedAP[iedName="IED1"] > GSE')}
            ></gse-editor>
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector('gse-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
      )).click();
      await parent.updateComplete;

      macAddressField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="MAC-Address"]'
        )
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

    it('changes MAC address attribute on primary action', async () => {
      expect(
        doc.querySelector(
          'ConnectedAP[iedName="IED1"] > GSE > Address > P[type="MAC-Address"]'
        )?.textContent
      ).to.equal('01-0C-CD-01-00-10');
      macAddressField.value = '01-0C-CD-01-0F-FF';
      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'ConnectedAP[iedName="IED1"] > GSE > Address > P[type="MAC-Address"]'
        )?.textContent
      ).to.equal('01-0C-CD-01-0F-FF');
    });

    it('does not change Address if no changes have been made', async () => {
      const reference = doc.querySelector('ConnectedAP[iedName="IED1"] > GSE');
      primaryAction.click();
      expect(
        doc
          .querySelector('ConnectedAP[iedName="IED1"] > GSE')
          ?.isEqualNode(reference)
      ).to.be.true;
    });
  });

  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: GseEditor | null;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><gse-editor
              .element=${doc.querySelector('ConnectedAP[iedName="IED1"] > GSE')}
            ></gse-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('gse-editor');
      await parent.updateComplete;
      deleteButton = <HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
      );
    });

    it('removes GSE on delete button click', async () => {
      expect(doc.querySelector('ConnectedAP[iedName="IED1"] > GSE')).to.exist;
      deleteButton.click();
      await parent.updateComplete;
      expect(doc.querySelector('ConnectedAP[iedName="IED1"] > GSE')).to.not
        .exist;
    });
  });
});
