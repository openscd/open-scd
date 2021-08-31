import { expect, fixture, html } from '@open-wc/testing';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import { editSmvWizard } from '../../../src/wizards/smv.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('smv wizarding editing integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/base/test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editSmvWizard', () => {
    let primaryAction: HTMLElement;
    let macAddressField: WizardTextField;

    beforeEach(async () => {
      const wizard = editSmvWizard(
        doc.querySelector('SMV[ldInst="MU01"][cbName="MSVCB01"]')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      macAddressField = element.wizardUI.dialog!.querySelector(
        'wizard-textfield[label="MAC-Address"]'
      )!;
      await macAddressField.updateComplete;
    });

    it('allows to edit SMV attributes', async () => {
      expect(
        doc
          .querySelector(
            'SMV[ldInst="MU01"][cbName="MSVCB01"] P[type="MAC-Address"]'
          )
          ?.textContent?.trim()
      ).to.equal('01-0C-CD-04-00-20');
      macAddressField.value = '01-0C-CD-04-00-22';
      primaryAction.click();
      await element.updateComplete;
      expect(
        doc
          .querySelector(
            'SMV[ldInst="MU01"][cbName="MSVCB01"] P[type="MAC-Address"]'
          )
          ?.textContent?.trim()
      ).to.equal('01-0C-CD-04-00-22');
    });
    it('returns to editSampledValueControlWizard after update', async () => {
      macAddressField.value = '01-0C-CD-04-00-22';
      primaryAction.click();
      await element.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        (<WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        )).maybeValue
      ).to.equal('MSVCB01');
    });
    it('returns to editSampledValueControlWizard on secondary action', async () => {
      (<HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await element.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        (<WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        )).maybeValue
      ).to.equal('MSVCB01');
    });
  });
});
