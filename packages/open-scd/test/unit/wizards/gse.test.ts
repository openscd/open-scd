import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  ComplexAction,
  Create,
  Delete,
  isCreate,
  isDelete,
  isSimple,
  isReplace,
  Replace,
  Wizard,
  WizardInputElement,
} from '../../../src/foundation.js';
import {
  editGseWizard,
  getMTimeAction,
  updateGSEAction,
} from '../../../src/wizards/gse.js';

describe('gse wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editGseWizard', () => {
    beforeEach(async () => {
      const wizard = editGseWizard(
        doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateGSEAction', () => {
    let gse: Element;
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
      gse = doc.querySelector(
        'GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'
      )!;
      wizard = editGseWizard(
        doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a GSE element when no attribute has changed', () => {
      const editorAction = updateGSEAction(gse);
      const actions = (<ComplexAction>editorAction(inputs, element.wizardUI)[0])
        .actions;
      expect(actions).to.be.empty;
    });
    it('update a GSE element when only MAC-Address attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = '01-0C-CD-01-00-11';
      await input.requestUpdate();
      const editorAction = updateGSEAction(gse);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = <Element>(<Delete>actions[0]).old.element;
      const newElement = <Element>(<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="MAC-Address"]')?.textContent?.trim()
      ).to.equal('01-0C-CD-01-00-10');
      expect(
        newElement.querySelector('P[type="MAC-Address"]')?.textContent?.trim()
      ).to.equal('01-0C-CD-01-00-11');
    });
    it('update a GSE element when only APPID attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.value = '014';
      await input.requestUpdate();
      const editorAction = updateGSEAction(gse);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = <Element>(<Delete>actions[0]).old.element;
      const newElement = <Element>(<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="APPID"]')?.textContent?.trim()
      ).to.equal('0010');
      expect(
        newElement.querySelector('P[type="APPID"]')?.textContent?.trim()
      ).to.equal('014');
    });
    it('update a GSE element when only VLAN-ID attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.value = '0F1';
      await input.requestUpdate();
      const editorAction = updateGSEAction(gse);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = <Element>(<Delete>actions[0]).old.element;
      const newElement = <Element>(<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="VLAN-ID"]')?.textContent?.trim()
      ).to.equal('005');
      expect(
        newElement.querySelector('P[type="VLAN-ID"]')?.textContent?.trim()
      ).to.equal('0F1');
    });
    it('update a GSE element when only VLAN-PRIORITY attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.value = '7';
      await input.requestUpdate();
      const editorAction = updateGSEAction(gse);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[1]).to.satisfy(isCreate);
      const oldElement = <Element>(<Delete>actions[0]).old.element;
      const newElement = <Element>(<Create>actions[1]).new.element;
      expect(
        oldElement.querySelector('P[type="VLAN-PRIORITY"]')?.textContent?.trim()
      ).to.equal('4');
      expect(
        newElement.querySelector('P[type="VLAN-PRIORITY"]')?.textContent?.trim()
      ).to.equal('7');
    });
    it('update a GSE element when only MinTime attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.value = '15';
      await input.requestUpdate();
      const editorAction = updateGSEAction(gse);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>actions[0];
      expect(updateAction.old.element.textContent?.trim()).to.equal('10');
      expect(updateAction.new.element.textContent?.trim()).to.equal('15');
    });
    it('update a GSE element when only MaxTime attribute changed', async () => {
      const input = <WizardTextField>inputs[5];
      input.value = '65';
      await input.requestUpdate();
      const editorAction = updateGSEAction(gse);
      const complexAction = editorAction(inputs, newWizard());
      expect(complexAction[0]).to.not.satisfy(isSimple);
      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>actions[0];
      expect(updateAction.old.element.textContent?.trim()).to.equal('10000');
      expect(updateAction.new.element.textContent?.trim()).to.equal('65');
    });
  });

  describe('getMTimeAction', () => {
    const gse = new DOMParser().parseFromString(
      `<GSE ldInst="myLdInst" cbName="cbName"></GSE>`,
      'application/xml'
    ).documentElement;
    const oldMinTime = new DOMParser().parseFromString(
      `<MinTime unit="s" multiplier="m">10</MinTime>`,
      'application/xml'
    ).documentElement;
    const oldMaxTime = new DOMParser().parseFromString(
      `<MaxTime unit="s" multiplier="m">10000</MaxTime>`,
      'application/xml'
    ).documentElement;

    it('updates a MinTime child element when chenged', () => {
      const editorAction = getMTimeAction('MinTime', oldMinTime, '654', gse);
      expect(editorAction).to.satisfy(isReplace);
      expect((<Replace>editorAction).new.element.textContent?.trim()).to.equal(
        '654'
      );
    });
    it('creates a MimTime child element when missing', () => {
      const editorAction = getMTimeAction('MinTime', null, '654', gse);
      expect(editorAction).to.satisfy(isCreate);
      expect((<Create>editorAction).new.element.textContent?.trim()).to.equal(
        '654'
      );
    });
    it('remove a Val child element if present', () => {
      const editorAction = getMTimeAction('MinTime', oldMinTime, null, gse);
      expect(editorAction).to.satisfy(isDelete);
    });

    it('updates a MaxTime child element when chenged', () => {
      const editorAction = getMTimeAction(
        'MaxTime',
        oldMaxTime,
        '1234123',
        gse
      );
      expect(editorAction).to.satisfy(isReplace);
      expect((<Replace>editorAction).new.element.textContent?.trim()).to.equal(
        '1234123'
      );
    });
    it('creates a MaxTime child element when missing', () => {
      const editorAction = getMTimeAction('MaxTime', null, '1234123', gse);
      expect(editorAction).to.satisfy(isCreate);
      expect((<Create>editorAction).new.element.textContent?.trim()).to.equal(
        '1234123'
      );
    });
    it('remove a MaxTime child element if present', () => {
      const editorAction = getMTimeAction('MaxTime', oldMaxTime, null, gse);
      expect(editorAction).to.satisfy(isDelete);
    });
  });
});
