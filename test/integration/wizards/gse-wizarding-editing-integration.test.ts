import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { editGseWizard } from '../../../src/wizards/gse.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('gse wizarding editing integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editGseWizard', () => {
    let primaryAction: HTMLElement;
    let minTimeField: WizardTextField;

    beforeEach(async () => {
      const wizard = editGseWizard(
        doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      minTimeField = element.wizardUI.dialog!.querySelector(
        'wizard-textfield[label="MinTime"]'
      )!;
      await minTimeField.updateComplete;
    });

    it('allows to edit GSE attributes', async () => {
      expect(
        doc
          .querySelector(
            'GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"] > MinTime'
          )
          ?.textContent?.trim()
      ).to.equal('10');
      minTimeField.value = '56';
      primaryAction.click();
      await element.updateComplete;
      expect(
        doc
          .querySelector(
            'GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"] > MinTime'
          )
          ?.textContent?.trim()
      ).to.equal('56');
    });
  });
});
