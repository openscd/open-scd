import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from '../../mock-wizard.js';

import {
  createEqFunctionAction,
  createEqFunctionWizard,
  createEqSubFunctionAction,
  createEqSubFunctionWizard,
  createFunctionAction,
  createFunctionWizard,
  createSubFunctionAction,
  createSubFunctionWizard,
  editXxxFunctionWizard,
  render,
  updateXxxFunctionAction,
} from '../../../src/wizards/xxxfunction.js';
import {
  Create,
  isCreate,
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('function type wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });
  describe('share a render function', () => {
    beforeEach(async () => {
      const wizard = [
        {
          title: 'title',
          content: render('myFunction', null, null),
        },
      ];
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('allows to updates Function element', () => {
    const func = <Element>(
      new DOMParser().parseFromString(
        `<Function name="myFunc"></Function>`,
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
      wizard = editXxxFunctionWizard(doc.querySelector('Function')!);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a Function element when no attribute has changed', () => {
      const editorAction = updateXxxFunctionAction(func);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });

    it('update a Function element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewFunc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(func);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'myFunc');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewFunc');
    });

    it('update a Function element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(func);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });

    it('update a Function element when only type attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.nullSwitch?.click();
      input.value = 'myType';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(func);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('type');
      expect(updateAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to updates SubFunction element', () => {
    const subFunc = <Element>(
      new DOMParser().parseFromString(
        `<SubFunction name="mySubFunc"></SubFunction>`,
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
      wizard = editXxxFunctionWizard(doc.querySelector('SubFunction')!);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a Function element when no attribute has changed', () => {
      const editorAction = updateXxxFunctionAction(subFunc);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });

    it('update a Function element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewFunc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'mySubFunc');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewFunc');
    });

    it('update a Function element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });

    it('update a Function element when only type attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.nullSwitch?.click();
      input.value = 'myType';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('type');
      expect(updateAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to updates EqFunction element', () => {
    const subFunc = <Element>(
      new DOMParser().parseFromString(
        `<EqFunction name="myEqFunc"></EqFunction>`,
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
      wizard = editXxxFunctionWizard(doc.querySelector('EqFunction')!);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a Function element when no attribute has changed', () => {
      const editorAction = updateXxxFunctionAction(subFunc);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });

    it('update a Function element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewFunc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'myEqFunc');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewFunc');
    });

    it('update a Function element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });

    it('update a Function element when only type attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.nullSwitch?.click();
      input.value = 'myType';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('type');
      expect(updateAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to updates EqFunction element', () => {
    const subFunc = <Element>(
      new DOMParser().parseFromString(
        `<EqSubFunction name="myEqSubFunc"></EqSubFunction>`,
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
      wizard = editXxxFunctionWizard(doc.querySelector('EqSubFunction')!);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a Function element when no attribute has changed', () => {
      const editorAction = updateXxxFunctionAction(subFunc);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });

    it('update a Function element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewFunc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'myEqSubFunc');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewFunc');
    });

    it('update a Function element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });

    it('update a Function element when only type attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.nullSwitch?.click();
      input.value = 'myType';
      await input.requestUpdate();
      const editorAction = updateXxxFunctionAction(subFunc);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('type');
      expect(updateAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to create Function element', () => {
    let inputs: WizardInput[];
    let wizard: Wizard;
    const parent = <Element>(
      new DOMParser().parseFromString(
        `<Substation id="mySubstation"></Substation>`,
        'application/xml'
      ).documentElement
    );

    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/wizards/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      wizard = createFunctionWizard(doc.querySelector('Substation')!);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('with field entries', () => {
      inputs[0].value = 'myNewFunc';

      const editorAction = createFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element.tagName).to.equal('Function');
      expect(createAction.new.element).to.have.attribute('name', 'myNewFunc');
      expect(createAction.new.element).to.not.have.attribute('desc');
      expect(createAction.new.element).to.not.have.attribute('type');
    });
    it('with other field entries', async () => {
      const name = <WizardTextField>inputs[0];
      const desc = <WizardTextField>inputs[1];
      const type = <WizardTextField>inputs[2];

      name.value = 'myOtherName';
      desc.nullSwitch?.click();
      desc.value = 'myDesc';
      type.nullSwitch?.click();
      type.value = 'myType';
      await desc.requestUpdate();

      const editorAction = createFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element).to.have.attribute('name', 'myOtherName');
      expect(createAction.new.element).to.have.attribute('desc', 'myDesc');
      expect(createAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to create SubFunction element', () => {
    let inputs: WizardInput[];
    let wizard: Wizard;
    const parent = <Element>(
      new DOMParser().parseFromString(
        `<Function id="myFunction"></Function>`,
        'application/xml'
      ).documentElement
    );

    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/wizards/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      wizard = createSubFunctionWizard(doc.querySelector('Function')!);

      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('with field entries', () => {
      inputs[0].value = 'myNewFunc';

      const editorAction = createSubFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element.tagName).to.equal('SubFunction');
      expect(createAction.new.element).to.have.attribute('name', 'myNewFunc');
      expect(createAction.new.element).to.not.have.attribute('desc');
      expect(createAction.new.element).to.not.have.attribute('type');
    });
    it('with other field entries', async () => {
      const name = <WizardTextField>inputs[0];
      const desc = <WizardTextField>inputs[1];
      const type = <WizardTextField>inputs[2];

      name.value = 'myOtherName';
      desc.nullSwitch?.click();
      desc.value = 'myDesc';
      type.nullSwitch?.click();
      type.value = 'myType';
      await desc.requestUpdate();

      const editorAction = createSubFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element).to.have.attribute('name', 'myOtherName');
      expect(createAction.new.element).to.have.attribute('desc', 'myDesc');
      expect(createAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to create EqFunction element', () => {
    let inputs: WizardInput[];
    let wizard: Wizard;
    const parent = <Element>(
      new DOMParser().parseFromString(
        `<ConductingEquipment id="myCondEq"></ConductingEquipment>`,
        'application/xml'
      ).documentElement
    );

    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/wizards/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      wizard = createEqFunctionWizard(
        doc.querySelector('ConductingEquipment')!
      );

      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('with field entries', () => {
      inputs[0].value = 'myNewFunc';

      const editorAction = createEqFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element.tagName).to.equal('EqFunction');
      expect(createAction.new.element).to.have.attribute('name', 'myNewFunc');
      expect(createAction.new.element).to.not.have.attribute('desc');
      expect(createAction.new.element).to.not.have.attribute('type');
    });
    it('with other field entries', async () => {
      const name = <WizardTextField>inputs[0];
      const desc = <WizardTextField>inputs[1];
      const type = <WizardTextField>inputs[2];

      name.value = 'myOtherName';
      desc.nullSwitch?.click();
      desc.value = 'myDesc';
      type.nullSwitch?.click();
      type.value = 'myType';
      await desc.requestUpdate();

      const editorAction = createEqFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element).to.have.attribute('name', 'myOtherName');
      expect(createAction.new.element).to.have.attribute('desc', 'myDesc');
      expect(createAction.new.element).to.have.attribute('type', 'myType');
    });
  });

  describe('allows to create EqSubFunction element', () => {
    let inputs: WizardInput[];
    let wizard: Wizard;
    const parent = <Element>(
      new DOMParser().parseFromString(
        `<EqFunction id="myEqFunc"></EqFunction>`,
        'application/xml'
      ).documentElement
    );

    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/wizards/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      wizard = createEqSubFunctionWizard(doc.querySelector('EqFunction')!);

      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('with field entries', () => {
      inputs[0].value = 'myNewFunc';

      const editorAction = createEqSubFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element.tagName).to.equal('EqSubFunction');
      expect(createAction.new.element).to.have.attribute('name', 'myNewFunc');
      expect(createAction.new.element).to.not.have.attribute('desc');
      expect(createAction.new.element).to.not.have.attribute('type');
    });
    it('with other field entries', async () => {
      const name = <WizardTextField>inputs[0];
      const desc = <WizardTextField>inputs[1];
      const type = <WizardTextField>inputs[2];

      name.value = 'myOtherName';
      desc.nullSwitch?.click();
      desc.value = 'myDesc';
      type.nullSwitch?.click();
      type.value = 'myType';
      await desc.requestUpdate();

      const editorAction = createEqSubFunctionAction(parent);
      expect(editorAction(inputs, newWizard()).length).to.equal(1);
      expect(editorAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      const createAction = <Create>editorAction(inputs, newWizard())[0];
      expect(createAction.new.element).to.have.attribute('name', 'myOtherName');
      expect(createAction.new.element).to.have.attribute('desc', 'myDesc');
      expect(createAction.new.element).to.have.attribute('type', 'myType');
    });
  });
});
