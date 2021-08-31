import { expect, fixture, html } from '@open-wc/testing';
import {
  ComplexAction,
  Create,
  Delete,
  isCreate,
  isDelete,
  isSimple,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';

import { MockWizard } from '../../mock-wizard.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

import { editSmvWizard, updateSmvAction } from '../../../src/wizards/smv.js';

describe('smv wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editSmvWizard', () => {
    beforeEach(async () => {
      const wizard = editSmvWizard(
        doc.querySelector('SMV[ldInst="MU01"][cbName="MSVCB01"]')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateSmvAction', () => {
    let smv: Element;
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
      smv = doc.querySelector('SMV[ldInst="MU01"][cbName="MSVCB01"]')!;

      wizard = editSmvWizard(smv);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a SMV element when no attribute has changed', () => {
      const editorAction = updateSmvAction(smv);
      const actions = (<ComplexAction>editorAction(inputs, element.wizardUI)[0])
        .actions;
      expect(actions).to.be.empty;
    });
    it('update a SMV element when only MAC-Address attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = '01-0C-CD-04-00-11';
      await input.requestUpdate();
      const editorAction = updateSmvAction(smv);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = (<Delete>actions[0]).old.element;
      const newElement = (<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="MAC-Address"]')?.textContent?.trim()
      ).to.equal('01-0C-CD-04-00-20');
      expect(
        newElement.querySelector('P[type="MAC-Address"]')?.textContent?.trim()
      ).to.equal('01-0C-CD-04-00-11');
    });
    it('update a SMV element when only APPID attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.value = '014';
      await input.requestUpdate();
      const editorAction = updateSmvAction(smv);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = (<Delete>actions[0]).old.element;
      const newElement = (<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="APPID"]')?.textContent?.trim()
      ).to.equal('4002');
      expect(
        newElement.querySelector('P[type="APPID"]')?.textContent?.trim()
      ).to.equal('014');
    });
    it('update a SMV element when only VLAN-ID attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.value = '0F1';
      await input.requestUpdate();
      const editorAction = updateSmvAction(smv);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = (<Delete>actions[0]).old.element;
      const newElement = (<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="VLAN-ID"]')?.textContent?.trim()
      ).to.equal('007');
      expect(
        newElement.querySelector('P[type="VLAN-ID"]')?.textContent?.trim()
      ).to.equal('0F1');
    });
    it('update a SMV element when only VLAN-PRIORITY attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.value = '7';
      await input.requestUpdate();
      const editorAction = updateSmvAction(smv);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = (<Delete>actions[0]).old.element;
      const newElement = (<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="VLAN-PRIORITY"]')?.textContent?.trim()
      ).to.equal('4');
      expect(
        newElement.querySelector('P[type="VLAN-PRIORITY"]')?.textContent?.trim()
      ).to.equal('7');
    });
    it('does not return back to editSampledValueControlWizard when SMV does not have referenced SampledValueControl element', async () => {
      const smv = <Element>new DOMParser().parseFromString(
        `<SMV ldInst="MU01" cbName="MSVCB01">
          <Address>
              <P type="MAC-Address">01-0C-CD-04-00-20</P>
              <P type="VLAN-ID">004</P>
              <P type="VLAN-PRIORITY">4</P>
              <P type="APPID">4002</P>
          </Address>
        </SMV>`,
        'application/xml'
      ).documentElement;

      const editorAction = updateSmvAction(smv);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);
    });
  });
});
