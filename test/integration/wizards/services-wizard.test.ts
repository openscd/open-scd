import { expect, fixture, html } from '@open-wc/testing';
import { Wizard } from '../../../src/foundation.js';
import { editServicesWizard } from '../../../src/wizards/services.js';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('Wizards for SCL element Services', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;
  let wizard: Wizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/Services.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    wizard = editServicesWizard(
      doc.querySelector('IED[name="WithServices"] Services')!
    );

    element.workflow.push(() => wizard);
    await element.requestUpdate();
  });

  describe('define a Services wizards ', () => {
    it('Services wizard to have 6 pages', () => {
      expect(element.wizardUI.wizard.length).to.equal(6);
    });
    it('Services wizard to have 130 inputs', () => {
      expect(element.wizardUI.wizard.flatMap(p => p.content).length).to.equal(
        130
      );
    });

    [13, 22, 22, 23, 28, 22].forEach((inputs, idx) => {
      it(`Services wizard ${idx + 1} to have ${inputs} inputs`, () => {
        expect(element.wizardUI.wizard[idx].content!.length).to.equal(inputs);
      });
    });

    [0, 1, 2, 3, 4, 5].forEach(idx => {
      it(`Wizard ${idx + 1} should look like snapshot`, () => {
        expect(element.wizardUI.dialogs[idx]).to.equalSnapshot();
      });
    });
  });

  ['AP2', 'AP3', 'AP4', 'AP5', 'AP6'].forEach(accessPointName => {
    describe('AccessPoint wizards for Scl element Services', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<mock-wizard-editor></mock-wizard-editor>`
        );
        doc = await fetch('/test/testfiles/Services.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        wizard = editServicesWizard(
          doc.querySelector(`AccessPoint[name="${accessPointName}"] Services`)!
        );

        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('should look like snapshot', () => {
        expect(element.wizardUI.dialog).to.equalSnapshot();
      });
    });
  });
});
