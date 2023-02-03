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
    doc = await fetch('/test/testfiles/services.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    wizard = editServicesWizard(doc.querySelector('Services')!);

    element.workflow.push(() => wizard);
    await element.requestUpdate();
  });

  describe('define a Services wizards ', () => {
    it('Services wizard to have 4 pages', () => {
      expect(element.wizardUI.wizard.length).to.equal(4);
    });
    it('Services wizard to have 85 inputs', () => {
      expect(element.wizardUI.wizard.flatMap(p => p.content).length).to.equal(
        85
      );
    });

    [13, 22, 22, 28].forEach((inputs, idx) => {
      it(`Services wizard ${idx + 1} to have ${inputs} inputs`, () => {
        expect(element.wizardUI.wizard[idx].content!.length).to.equal(inputs);
      });
    });

    [0, 1, 2, 3, 4].forEach(idx => {
      it(`Wizard ${idx + 1} should look like snapshot`, () => {
        expect(element.wizardUI.dialogs[idx]).to.equalSnapshot();
      });
    });
  });
});
