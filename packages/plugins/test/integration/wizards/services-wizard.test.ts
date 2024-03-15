import { expect, fixture, html } from '@open-wc/testing';
import { newWizardEvent, Wizard } from '@openscd/open-scd/src/foundation.js';
import { editServicesWizard } from '../../../src/wizards/services.js';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';
import { WizardDialog } from '@openscd/open-scd/src/wizard-dialog.js';

describe('Wizards for SCL element Services', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;
  let wizard: Wizard;

  ['WithServices', 'WithServices2'].forEach(ied => {
    beforeEach(async () => {
      element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
      doc = await fetch('/test/testfiles/Services.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      wizard = editServicesWizard(
        doc.querySelector('IED[name="WithServices"] Services')!
      );

      element.dispatchEvent(newWizardEvent(wizard));
      await element.requestUpdate();
      await element.updateComplete;
    });

    describe(`IED [${ied}]: define a Services wizards`, () => {
      it('Services wizard to have 6 pages', () => {
        expect(element.wizardUI.wizard.length).to.equal(6);
      });
      it('Services wizard to have 130 inputs', () => {
        expect(element.wizardUI.wizard.flatMap(p => p.content).length).to.equal(
          134
        );
      });

      [17, 22, 22, 23, 28, 22].forEach((inputs, idx) => {
        it(`Services wizard ${idx + 1} to have ${inputs} inputs`, () => {
          expect(element.wizardUI.wizard[idx].content!.length).to.equal(inputs);
        });
      });

      [0, 1, 2, 3, 4, 5].forEach(idx => {
        it(`Wizard ${idx + 1} should look like snapshot`, async () => {
          await expect(element.wizardUI.dialogs[idx]).to.equalSnapshot();
        });
      });
    });
    describe('> when pro mode is enabled', () => {
      let elm: WizardDialog;
      beforeEach(async () => {
        elm =
          element.wizards.shadowRoot!.querySelector<WizardDialog>(
            'wizard-dialog'
          )!;
        localStorage.setItem('mode', 'pro');
        elm.requestUpdate();
        await elm.updateComplete;
      });
      [0, 1, 2, 3, 4, 5].forEach(idx => {
        it(`Wizard ${idx + 1} should contain the code icon button`, () => {
          expect(
            element.wizardUI.dialogs[idx].querySelector(
              'mwc-icon-button-toggle'
            )
          ).to.have.attribute('onicon', 'code');
        });
      });
    });
    after(() => localStorage.removeItem('mode'));

    ['AP2', 'AP3', 'AP4', 'AP5', 'AP6'].forEach(accessPointName => {
      describe(`IED [${ied}]: AccessPoint wizards for Scl element Services`, () => {
        beforeEach(async () => {
          element = await fixture(
            html`<mock-wizard-editor></mock-wizard-editor>`
          );
          doc = await fetch('/test/testfiles/Services.scd')
            .then(response => response.text())
            .then(str =>
              new DOMParser().parseFromString(str, 'application/xml')
            );

          wizard = editServicesWizard(
            doc.querySelector(
              `AccessPoint[name="${accessPointName}"] Services`
            )!
          );

          element.dispatchEvent(newWizardEvent(() => wizard));
          await element.requestUpdate();
        });

        it('should look like snapshot', async () => {
          await expect(element.wizardUI.dialog).to.equalSnapshot();
        });
      });
    });
  });
});
