import { expect, fixture, html } from '@open-wc/testing';
import fc from 'fast-check';

import {
  isDelete,
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';
import { inverseRegExp, regExp, regexString } from '../../foundation.js';

import { MockWizard } from '../../mock-wizard.js';
import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

import {
  editSampledValueControlWizard,
  removeSampledValueControl,
  renderSampledValueControlAttributes,
  selectSampledValueControlWizard,
  updateSampledValueControlAction,
} from '../../../src/wizards/sampledvaluecontrol.js';

describe('sampledvaluecontrol wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('selectSampledValueControlWizard', () => {
    beforeEach(async () => {
      const wizard = selectSampledValueControlWizard(doc.documentElement);
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('renderSampledValueControlAttribute', () => {
    let nameTextField: WizardTextField;
    let smpRateTextField: WizardTextField;
    let nofASDUTextField: WizardTextField;

    let multicastSelector: WizardSelect;

    beforeEach(async () => {
      const wizard = [
        {
          title: 'title',
          content: renderSampledValueControlAttributes(
            'SmvControl',
            null,
            'true',
            'myIED/myAP/myLD/myLN0/mySMV',
            'SmpPerPeriod',
            '80',
            '1',
            'None'
          ),
        },
      ];
      element.workflow.push(wizard);
      await element.requestUpdate();
      nameTextField = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="name"]'
      )!;
      smpRateTextField =
        element.wizardUI.dialog!.querySelector<WizardTextField>(
          'wizard-textfield[label="smpRate"]'
        )!;
      nofASDUTextField =
        element.wizardUI.dialog!.querySelector<WizardTextField>(
          'wizard-textfield[label="nofASDU"]'
        )!;

      multicastSelector = element.wizardUI.dialog!.querySelector<WizardSelect>(
        'wizard-select[label="multicast"]'
      )!;
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);

    it('edits name attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.tAsciName, 1, 32), async name => {
          nameTextField.value = name;
          await nameTextField.requestUpdate();
          expect(nameTextField.checkValidity()).to.be.true;
        })
      );
    });
    it('rejects name attribute starting with decimals', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.decimal, 1, 1), async name => {
          nameTextField.value = name;
          await nameTextField.requestUpdate();
          expect(nameTextField.checkValidity()).to.be.false;
        })
      );
    });

    it('does not allow to edit multicast attribute as non multicast messages are deprecated', () => {
      expect(multicastSelector).to.have.attribute('disabled');
    });

    it('edits smpRate attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.unsingedint), async smpRate => {
          smpRateTextField.value = smpRate;
          await smpRateTextField.requestUpdate();
          expect(smpRateTextField.checkValidity()).to.be.true;
        })
      );
    });
    it('rejects smpRate attribute starting with not beeing a unsingedint', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.unsingedint, 1),
          async smpRate => {
            smpRateTextField.value = smpRate;
            await smpRateTextField.requestUpdate();
            expect(smpRateTextField.checkValidity()).to.be.false;
          }
        )
      );
    });
    it('edits nofASDU attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.unsingedint), async nofASDU => {
          nofASDUTextField.value = nofASDU;
          await nofASDUTextField.requestUpdate();
          expect(nofASDUTextField.checkValidity()).to.be.true;
        })
      );
    });
    it('rejects nofASDU attribute starting with not beeing a unsingedint', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.unsingedint, 1),
          async nofASDU => {
            nofASDUTextField.value = nofASDU;
            await nofASDUTextField.requestUpdate();
            expect(nofASDUTextField.checkValidity()).to.be.false;
          }
        )
      );
    });
  });

  describe('editSampledValueControlWizard', () => {
    beforeEach(async () => {
      const wizard = editSampledValueControlWizard(
        doc.querySelector('IED[name="IED3"] SampledValueControl')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('removeSampledValueControl', () => {
    const ln01smv = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
            <DataSet name="myDataSet"/>
            <DataSet name="myDataSet2"/>
            <SampledValueControl name="myName" datSet="myDataSet"/>
            <SampledValueControl name="myName2" datSet="myDataSet2"/>
        </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02smv = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
              <DataSet name="myDataSet"/>
              <SampledValueControl name="myName" datSet="myDataSet"/>
              <SampledValueControl name="myName2" datSet="myDataSet"/>
          </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02gse = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
                <DataSet name="myDataSet"/>
                <SampledValueControl name="myName" datSet="myDataSet"/>
                <GSEControl name="myName2" datSet="myDataSet"/>
            </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02rp = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
            <DataSet name="myDataSet"/>
            <SampledValueControl name="myName" datSet="myDataSet"/>
            <ReportControl name="myName2" datSet="myDataSet"/>
        </LN0>`,
      'application/xml'
    ).documentElement;

    it('removes SampledValueControl and its refereced DataSet if no other SampledValueControl are assinged', () => {
      const sampledValueControl = ln01smv.querySelector('SampledValueControl')!;
      const actions = removeSampledValueControl(sampledValueControl);
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(sampledValueControl);
      expect(actions[1]).to.satisfy(isDelete);
      expect(actions[1].old.element).to.equal(ln01smv.querySelector('DataSet'));
    });
    it('does not remove if another SampledValueControl is assinged to the same DataSet', () => {
      const sampledValueControl = ln02smv.querySelector('SampledValueControl')!;
      const actions = removeSampledValueControl(sampledValueControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(sampledValueControl);
    });
    it('does not remove if another GSEControl is assinged to the same DataSet', () => {
      const sampledValueControl = ln02gse.querySelector('SampledValueControl')!;
      const actions = removeSampledValueControl(sampledValueControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(sampledValueControl);
    });
    it('does not remove if another ReportControl is assinged to the same DataSet', () => {
      const sampledValueControl = ln02rp.querySelector('SampledValueControl')!;
      const actions = removeSampledValueControl(sampledValueControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(sampledValueControl);
    });
    it('removes SMV element if present in the Communication section', () => {
      const sampledValueControl = doc.querySelector(
        'IED[name="IED3"] SampledValueControl'
      )!;
      const actions = removeSampledValueControl(sampledValueControl);
      expect(actions.length).to.equal(3);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(sampledValueControl);
      expect(actions[1]).to.satisfy(isDelete);
      expect(actions[2]).to.satisfy(isDelete);
      expect(actions[2].old.element).to.equal(
        doc.querySelector('Communication SMV[ldInst="MU01"][cbName="MSVCB01"]')
      );
    });
  });

  describe('updateSampledValueControlAction', () => {
    const sampledValueControl = <Element>new DOMParser().parseFromString(
      `<SampledValueControl name="myCbName" multicast="true" 
            datSet="myDataSet" smvID="myAPP/ID" smpMod="SmpPerPeriod" 
            smpRate="80" nofASDU="1">
        </SampledValueControl>`,
      'application/xml'
    ).documentElement;

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
      wizard = [
        {
          title: 'title',
          content: renderSampledValueControlAttributes(
            'myCbName',
            null,
            'true',
            'myAPP/ID',
            'SmpPerPeriod',
            '80',
            '1',
            null
          ),
        },
      ];
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a SampledValueControl element when no attribute has changed', () => {
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });

    it('update a SampledValueControl element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewCbName';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'myCbName');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewCbName');
    });

    it('update a SampledValueControl element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });

    it('update a SampledValueControl element when smvID attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.value = 'myNewType/ID';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('smvID', 'myAPP/ID');
      expect(updateAction.new.element).to.have.attribute(
        'smvID',
        'myNewType/ID'
      );
    });

    it('update a SampledValueControl element when multicast attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.nullSwitch?.click();
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('multicast', 'true');
      expect(updateAction.new.element).to.have.attribute('multicast', 'false');
    });

    it('update a SampledValueControl element when smpMod attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.value = 'SmpPerSec';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute(
        'smpMod',
        'SmpPerPeriod'
      );
      expect(updateAction.new.element).to.have.attribute('smpMod', 'SmpPerSec');
    });

    it('update a SampledValueControl element when smpRate attribute changed', async () => {
      const input = <WizardTextField>inputs[5];
      input.value = '256';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('smpRate', '80');
      expect(updateAction.new.element).to.have.attribute('smpRate', '256');
    });

    it('update a SampledValueControl element when nofASDU attribute changed', async () => {
      const input = <WizardTextField>inputs[6];
      input.value = '8';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('nofASDU', '1');
      expect(updateAction.new.element).to.have.attribute('nofASDU', '8');
    });

    it('update a SampledValueControl element when securityEnable attribute changed', async () => {
      const input = <WizardTextField>inputs[7];
      input.nullSwitch?.click();
      input.value = 'Signature';
      await input.requestUpdate();
      const editorAction = updateSampledValueControlAction(sampledValueControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('securityEnable');
      expect(updateAction.new.element).to.have.attribute(
        'securityEnable',
        'Signature'
      );
    });
  });
});
