import {expect, fixture, html} from "@open-wc/testing";

import {MockWizard} from "../../mock-wizard.js";
import {fetchDoc, setWizardTextFieldValue} from "../wizards/test-support.js";
import {initializeNsdoc, Nsdoc} from "../../../src/foundation/nsdoc.js";
import {WizardTextField} from "../../../src/wizard-textfield.js";
import {ComplexAction, isSimple, isReplace, Replace, WizardAction} from "../../../src/foundation.js";

import "../../mock-wizard.js";

import {LocamationVMUEditElement, locamationLNEditWizard} from "../../../src/locamation/LocamationLNEdit.js";

import "../../../src/locamation/LocamationLNList.js";

describe('Wizards for Locamation Plugin to edit the selected Logical Node - ', () => {
  let nsdoc: Nsdoc;
  let doc: XMLDocument;
  let logicalNode: Element;

  beforeEach(async () => {
    nsdoc = await initializeNsdoc();
    doc = await fetchDoc('/test/testfiles/locamation/LCMTN_VMU_MMS.scd');
  });

  describe('starting screen as wizard - ', async () => {
    let element: MockWizard;

    beforeEach(async () => {
      logicalNode = doc.querySelector('LN[prefix="I01A"][lnClass="TCTR"]')!

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = locamationLNEditWizard(logicalNode, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('using screen as web component with locamation LN for common checks - ', async () => {
    let element: LocamationVMUEditElement;

    beforeEach(async () => {
      logicalNode = doc.querySelector('LN[prefix="I01A"][lnClass="TCTR"]')!;

      element = await fixture(html`<locamation-ln-edit .logicalNode="${logicalNode}" .nsdoc="${nsdoc}"></locamation-ln-edit>`);
      await element.requestUpdate();
    });

    it('when saving without changes no actions returned', () => {
      const actions = element.save();
      expect(actions).to.be.empty;
    });

    it('when saving and updating the identifier with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[4], '10.10.8');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('10.12.14');
      expect(replaceAction.new.element).to.have.text('10.10.8');
    });

    it('when saving and updating the identifier with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[4], '10.10.AA');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });

    it('when saving and updating the transform first with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[6], '2000');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('1000');
      expect(replaceAction.new.element).to.have.text('2000');
    });

    it('when saving and updating the transform first with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[6], 'AAAA');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });

    it('when saving and updating the transform second with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[7], '40');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('20');
      expect(replaceAction.new.element).to.have.text('40');
    });

    it('when saving and updating the transform second with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[7], 'AA');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });
  });

  describe('using screen as web component with locamation LN for CIM (Channel) - ', async () => {
    let element: LocamationVMUEditElement;

    beforeEach(async () => {
      logicalNode = doc.querySelector('LN[prefix="I01A"][lnClass="TCTR"]')!;

      element = await fixture(html`<locamation-ln-edit .logicalNode="${logicalNode}" .nsdoc="${nsdoc}"></locamation-ln-edit>`);
      await element.requestUpdate();
    });

    it('when saving and updating the channel with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '3');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('0');
      expect(replaceAction.new.element).to.have.text('3');
    });

    it('when saving and updating the channel with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '6');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('using screen as web component with locamation LN for CIM (Sum) - ', async () => {
    let element: LocamationVMUEditElement;

    beforeEach(async () => {
      logicalNode = doc.querySelector('LN[prefix="I01N"][lnClass="TCTR"]')!;

      element = await fixture(html`<locamation-ln-edit .logicalNode="${logicalNode}" .nsdoc="${nsdoc}"></locamation-ln-edit>`);
      await element.requestUpdate();
    });

    it('when saving and updating the sum with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '3,4,5');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('0,1,2');
      expect(replaceAction.new.element).to.have.text('3,4,5');
    });

    it('when saving and updating the sum with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '6,7,8');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('using screen as web component with locamation LN for VIM (Channel) - ', async () => {
    let element: LocamationVMUEditElement;

    beforeEach(async () => {
      logicalNode = doc.querySelector('LN[prefix="V01A"][lnClass="TVTR"]')!;

      element = await fixture(html`<locamation-ln-edit .logicalNode="${logicalNode}" .nsdoc="${nsdoc}"></locamation-ln-edit>`);
      await element.requestUpdate();
    });

    it('when saving and updating the channel with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '2');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('0');
      expect(replaceAction.new.element).to.have.text('2');
    });

    it('when saving and updating the channel with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '3');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('using screen as web component with locamation LN for VIM (Sum) - ', async () => {
    let element: LocamationVMUEditElement;

    beforeEach(async () => {
      logicalNode = doc.querySelector('LN[prefix="V01N"][lnClass="TVTR"]')!;

      element = await fixture(html`<locamation-ln-edit .logicalNode="${logicalNode}" .nsdoc="${nsdoc}"></locamation-ln-edit>`);
      await element.requestUpdate();
    });

    it('when saving and updating the sum with valid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '2,1,0');

      const replaceAction = validateAndRetrieveReplaceAction(element.save());
      expect(replaceAction.old.element).to.have.text('0,1,2');
      expect(replaceAction.new.element).to.have.text('2,1,0');
    });

    it('when saving and updating the sum with invalid value returns a update action', async () => {
      await setWizardTextFieldValue(<WizardTextField>element.inputs[5], '3,4,5');

      const complexActions = element.save();
      expect(complexActions).to.be.empty;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});

function validateAndRetrieveReplaceAction(complexActions: WizardAction[]): Replace {
  expect(complexActions.length).to.be.equal(1);
  expect(complexActions[0]).to.not.satisfy(isSimple);

  const complexAction = <ComplexAction>complexActions[0];
  expect(complexAction.actions.length).to.be.equal(1);
  expect(complexAction.actions[0]).to.satisfy(isReplace);

  return <Replace>complexAction.actions[0];
}
