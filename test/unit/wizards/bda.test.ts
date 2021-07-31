import { expect, fixture, html } from '@open-wc/testing';
import { MockWizard } from '../../mock-wizard.js';

import {
  Create,
  isCreate,
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';

import { wizardContent } from '../../../src/wizards/abstractda.js';

import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

import { updateBDaAction } from '../../../src/wizards/bda.js';

describe('bda wizards', () => {
  describe('updateBDaAction', () => {
    let doc: XMLDocument;
    let data: Element;
    let element: MockWizard;

    const bda = <Element>(
      new DOMParser().parseFromString(
        `<BDA name="orCat" bType="Enum" type="Dummy_orCategory"></BDA>`,
        'application/xml'
      ).documentElement
    );

    let inputs: WizardInput[];
    let wizard: Wizard;

    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    beforeEach(async () => {
      element = await fixture(html`<mock-wizard></mock-wizard>`);
      doc = await fetch('/base/test/testfiles/wizards/abstractda.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      data = doc.querySelector('DataTypeTemplates')!;
      const types = Array.from(data.querySelectorAll('DAType,EnumType'));
      wizard = [
        {
          title: 'title',
          content: wizardContent(
            'orCat',
            null,
            'Enum',
            types,
            'Dummy_orCategory',
            null,
            null,
            null,
            null,
            data
          ),
        },
      ];
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a BDA element when no attribute nor Val has changed', () => {
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });
    it('update a BDA element when only name attribute changed', async () => {
      inputs[0].value = 'myOrName';
      await (<WizardTextField>inputs[0]).requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
    });
    it('update a BDA element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
    });
    it('update a BDA element when only bType attribute changed', async () => {
      inputs[2].value = 'BOOLEAN';
      await (<WizardSelect>inputs[2]).requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
    });
    it('update a BDA element when type attribute changed to null', async () => {
      inputs[2].value = 'BOOLEAN';
      await (<WizardSelect>inputs[2]).requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
      const updateAction = <Update>editorAction(inputs, newWizard())[0];
      expect(updateAction.old.element).to.have.attribute('type');
      expect(updateAction.new.element).to.not.have.attribute('type');
    });
    it('update a BDA element when sAddr attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.nullSwitch?.click();
      input.value = 'mysAddr';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('sAddr');
      expect(updateAction.new.element).to.have.attribute('sAddr', 'mysAddr');
    });
    it('update a BDA element when valKind attribute changed', async () => {
      const input = <WizardTextField>inputs[5];
      input.nullSwitch?.click();
      input.value = 'RO';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('valKind');
      expect(updateAction.new.element).to.have.attribute('valKind', 'RO');
    });
    it('update a BDA element when valImport attribute changed', async () => {
      const input = <WizardTextField>inputs[6];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('valImport');
      expect(updateAction.new.element).to.have.attribute('valImport', 'true');
    });
    it('creates a Val child Val attribute changes from null to something', async () => {
      const input = <WizardTextField>inputs[7];
      input.nullSwitch?.click();
      input.value = 'bay-control';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isCreate);
      const updateAction = <Create>updateActions[0];
      expect(
        updateAction.new.element.querySelector('Val')?.textContent?.trim()
      ).to.not.equal('bay-control');
    });
  });
});
