import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  Create,
  isCreate,
  isReplace,
  Replace,
  Wizard,
  WizardInputElement,
} from '../../../src/foundation.js';
import { wizardContent } from '../../../src/wizards/abstractda.js';
import { createBDaAction, updateBDaAction } from '../../../src/wizards/bda.js';

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

    let inputs: WizardInputElement[];
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
      doc = await fetch('/test/testfiles/wizards/abstractda.scd')
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
      element.workflow.push(() => wizard);
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
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isReplace);
    });
    it('update a BDA element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isReplace);
    });
    it('update a BDA element when only bType attribute changed', async () => {
      inputs[2].value = 'BOOLEAN';
      await (<WizardSelect>inputs[2]).requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isReplace);
    });
    it('update a BDA element when type attribute changed to null', async () => {
      inputs[2].value = 'BOOLEAN';
      await (<WizardSelect>inputs[2]).requestUpdate();
      const editorAction = updateBDaAction(bda);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isReplace);
      const updateAction = <Replace>editorAction(inputs, newWizard())[0];
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
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
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
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('valKind');
      expect(updateAction.new.element).to.have.attribute('valKind', 'RO');
    });
    it('update a BDA element when valImport attribute changed', async () => {
      const input = <WizardTextField>inputs[6];
      input.nullSwitch?.click();
      input.maybeValue = 'true';
      await input.requestUpdate();
      const editorAction = updateBDaAction(bda);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
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
        (<Element>updateAction.new.element)
          .querySelector('Val')
          ?.textContent?.trim()
      ).to.not.equal('bay-control');
    });
  });

  describe('createBDaAction', () => {
    let doc: XMLDocument;
    let data: Element;
    let element: MockWizard;

    const daType = <Element>(
      new DOMParser().parseFromString(
        `<DAType id="myID"></DAType>`,
        'application/xml'
      ).documentElement
    );

    let inputs: WizardInputElement[];
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
      doc = await fetch('/test/testfiles/wizards/abstractda.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      data = doc.querySelector('DataTypeTemplates')!;
      const types = Array.from(data.querySelectorAll('DAType,EnumType'));
      wizard = [
        {
          title: 'title',
          content: wizardContent(
            'myNewBDA',
            null,
            'INT32',
            types,
            '',
            null,
            null,
            null,
            null,
            data
          ),
        },
      ];
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('creates a BDA element', () => {
      const editorAction = createBDaAction(daType);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element).to.have.attribute('name', 'myNewBDA');
      expect(createAction.new.element).to.not.have.attribute('desc');
      expect(createAction.new.element).to.have.attribute('bType', 'INT32');
      expect(createAction.new.element).to.not.have.attribute('type');
      expect(createAction.new.element).to.not.have.attribute('sAddrs');
      expect(createAction.new.element).to.not.have.attribute('valKind');
      expect(createAction.new.element).to.not.have.attribute('valImport');
    });
    it('creates yet another BDA element with different attribute setting', async () => {
      const desc = <WizardTextField>inputs[1];
      const bType = <WizardSelect>inputs[2];
      const sAddr = <WizardTextField>inputs[4];
      const valKind = <WizardSelect>inputs[5];
      const valImport = <WizardSelect>inputs[6];

      desc.nullSwitch?.click();
      desc.value = 'myDesc';
      await desc.requestUpdate();
      bType.value = 'Struct';
      await bType.requestUpdate();
      sAddr.nullSwitch?.click();
      sAddr.value = 'mysAddr';
      await sAddr.requestUpdate();
      valKind.nullSwitch?.click();
      valKind.value = 'Conf';
      await valKind.requestUpdate();
      valImport.nullSwitch?.click();
      valImport.value = 'false';
      await valImport.requestUpdate();

      const editorAction = createBDaAction(daType);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element).to.have.attribute('name', 'myNewBDA');
      expect(createAction.new.element).to.have.attribute('desc', 'myDesc');
      expect(createAction.new.element).to.have.attribute('bType', 'Struct');
      expect(createAction.new.element).to.have.attribute(
        'type',
        'AnalogueValue_i'
      );
      expect(createAction.new.element).to.have.attribute('sAddr', 'mysAddr');
      expect(createAction.new.element).to.have.attribute('valKind', 'Conf');
      expect(createAction.new.element).to.have.attribute('valImport', 'false');
    });
    it('creates Val childelement when checked', async () => {
      const Val = <WizardTextField>inputs[8];

      Val.nullSwitch?.click();
      Val.value = '8123';
      await Val.requestUpdate();

      const editorAction = createBDaAction(daType);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(
        (<Element>createAction.new.element)
          .querySelector('Val')
          ?.textContent?.trim()
      ).to.equal('8123');
    });
  });
});
