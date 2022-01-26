import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { isUpdate, Update, WizardInput } from '../../../src/foundation.js';
import {
  editSampledValueControlWizard,
  selectSampledValueControlWizard,
} from '../../../src/wizards/sampledvaluecontrol.js';
import fc, { integer } from 'fast-check';
import { inverseRegExp, regExp, regexString } from '../../foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('Wizards for SCL element SampledValueControl', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInput[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editSampledValueControlWizard(
        doc.querySelector('SampledValueControl')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);

    it('edits name attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.tAsciName, 1, 32), async name => {
          inputs[0].value = name;
          await (<WizardTextField>inputs[0]).requestUpdate();
          expect(inputs[0].checkValidity()).to.be.true;
        })
      );
    });

    it('rejects name attribute starting with decimals', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.decimal, 1, 1), async name => {
          inputs[0].value = name;
          await (<WizardTextField>inputs[0]).requestUpdate();
          expect(inputs[0].checkValidity()).to.be.false;
        })
      );
    });

    it('edits smpRate attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(
          integer({ min: 0 }).map(num => `${num}`),
          async smpRate => {
            inputs[5].value = smpRate;
            await (<WizardTextField>inputs[5]).requestUpdate();
            expect(inputs[5].checkValidity()).to.be.true;
          }
        )
      );
    });

    it('rejects smpRate attribute in case input is not unsigned int', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(inverseRegExp.uint, 1), async smpRate => {
          inputs[5].value = smpRate;
          await (<WizardTextField>inputs[5]).requestUpdate();
          expect(inputs[5].checkValidity()).to.be.false;
        })
      );
    });

    it('edits nofASDU attribute only for valid inputs', async () => {
      const input = <WizardTextField>inputs[6];
      input.nullSwitch?.click();
      await input.requestUpdate();

      await fc.assert(
        fc.asyncProperty(
          integer({ min: 0 }).map(num => `${num}`),
          async nofASDU => {
            input.value = nofASDU;
            await input.requestUpdate();
            expect(input.checkValidity()).to.be.true;
          }
        )
      );
    });

    it('rejects nofASDU attribute in case input is not unsigned int', async () => {
      const input = <WizardTextField>inputs[6];
      input.nullSwitch?.click();
      await input.requestUpdate();

      await fc.assert(
        fc.asyncProperty(regexString(inverseRegExp.uint, 1), async nofASDU => {
          input.value = nofASDU;
          await input.requestUpdate();
          expect(input.checkValidity()).to.be.false;
        })
      );
    });

    it('does not update the SampledValueControl element when no attribute has changed', async () => {
      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent.notCalled).to.be.true;
    });

    it('update a SampledValueControl element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewCbName';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.have.attribute('name', 'MSVCB01');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewCbName');
    });

    it('update a SampledValueControl element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });

    it('update a SampledValueControl element when smvID attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.value = 'myNewType/ID';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.have.attribute(
        'smvID',
        'some/reference'
      );
      expect(updateAction.new.element).to.have.attribute(
        'smvID',
        'myNewType/ID'
      );
    });

    it('update a SampledValueControl element when smpMod attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.nullSwitch?.click();
      input.value = 'SmpPerSec';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.not.have.attribute('smpMod');
      expect(updateAction.new.element).to.have.attribute('smpMod', 'SmpPerSec');
    });

    it('update a SampledValueControl element when smpRate attribute changed', async () => {
      const input = <WizardTextField>inputs[5];
      input.value = '4000';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.have.attribute('smpRate', '80');
      expect(updateAction.new.element).to.have.attribute('smpRate', '4000');
    });

    it('update a SampledValueControl element when nofASDU attribute changed', async () => {
      const input = <WizardTextField>inputs[6];
      input.value = '2';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.have.attribute('nofASDU', '1');
      expect(updateAction.new.element).to.have.attribute('nofASDU', '2');
    });

    it('updates the SampledValueEnable element when securityEnable changed', async () => {
      const input = <WizardTextField>inputs[7];
      input.nullSwitch?.click();
      input.value = 'Signature';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.not.have.attribute('securityEnable');
      expect(updateAction.new.element).to.have.attribute(
        'securityEnable',
        'Signature'
      );
    });
  });

  describe('define a select wizard that', () => {
    beforeEach(async () => {
      const wizard = selectSampledValueControlWizard(doc.documentElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);
  });
});
