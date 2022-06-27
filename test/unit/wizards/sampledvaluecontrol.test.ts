import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import {
  ComplexAction,
  Create,
  Delete,
  isCreate,
  isDelete,
  isReplace,
  isSimple,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import {
  createSampledValueControlWizard,
  editSampledValueControlWizard,
  removeSampledValueControlAction,
  selectSampledValueControlWizard,
} from '../../../src/wizards/sampledvaluecontrol.js';
import fc, { integer } from 'fast-check';
import { inverseRegExp, regExp, regexString } from '../../foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';
import { FinderList } from '../../../src/finder-list.js';

describe('Wizards for SCL element SampledValueControl', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

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
    describe('with muticast attribute set to false - deprecated', () => {
      beforeEach(async () => {
        const wizard = editSampledValueControlWizard(
          doc.querySelector('SampledValueControl[multicast="false"]')!
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

      it('update a SampledValueControl element when only multicast attribute changed', async () => {
        (<WizardCheckbox>(<unknown>inputs[2])).checked = true;

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.have.attribute(
          'multicast',
          'false'
        );
        expect(updateAction.new.element).to.have.attribute('multicast', 'true');
      });
    });

    describe(' with multicast set to treu', () => {
      beforeEach(async () => {
        const wizard = editSampledValueControlWizard(
          doc.querySelector('SampledValueControl[multicast="true"]')!
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
              inputs[4].value = smpRate;
              await (<WizardTextField>inputs[4]).requestUpdate();
              expect(inputs[4].checkValidity()).to.be.true;
            }
          )
        );
      });

      it('rejects smpRate attribute in case input is not unsigned int', async () => {
        await fc.assert(
          fc.asyncProperty(
            regexString(inverseRegExp.uint, 1),
            async smpRate => {
              inputs[4].value = smpRate;
              await (<WizardTextField>inputs[4]).requestUpdate();
              expect(inputs[4].checkValidity()).to.be.false;
            }
          )
        );
      });

      it('edits nofASDU attribute only for valid inputs', async () => {
        const input = <WizardTextField>inputs[5];
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
        const input = <WizardTextField>inputs[5];
        input.nullSwitch?.click();
        await input.requestUpdate();

        await fc.assert(
          fc.asyncProperty(
            regexString(inverseRegExp.uint, 1),
            async nofASDU => {
              input.value = nofASDU;
              await input.requestUpdate();
              expect(input.checkValidity()).to.be.false;
            }
          )
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
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.have.attribute('name', 'MSVCB01');
        expect(updateAction.new.element).to.have.attribute(
          'name',
          'myNewCbName'
        );
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
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.not.have.attribute('desc');
        expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
      });

      it('update a SampledValueControl element when smvID attribute changed', async () => {
        const input = <WizardTextField>inputs[2];
        input.value = 'myNewType/ID';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
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
        const input = <WizardTextField>inputs[3];
        input.nullSwitch?.click();
        input.value = 'SmpPerSec';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.not.have.attribute('smpMod');
        expect(updateAction.new.element).to.have.attribute(
          'smpMod',
          'SmpPerSec'
        );
      });

      it('update a SampledValueControl element when smpRate attribute changed', async () => {
        const input = <WizardTextField>inputs[4];
        input.value = '4000';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.have.attribute('smpRate', '80');
        expect(updateAction.new.element).to.have.attribute('smpRate', '4000');
      });

      it('update a SampledValueControl element when nofASDU attribute changed', async () => {
        const input = <WizardTextField>inputs[5];
        input.value = '2';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.have.attribute('nofASDU', '1');
        expect(updateAction.new.element).to.have.attribute('nofASDU', '2');
      });

      it('updates the SampledValueEnable element when securityEnabled changed', async () => {
        const input = <WizardTextField>inputs[6];
        input.nullSwitch?.click();
        input.value = 'Signature';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isReplace);

        const updateAction = <Replace>action;
        expect(updateAction.old.element).to.not.have.attribute(
          'securityEnabled'
        );
        expect(updateAction.new.element).to.have.attribute(
          'securityEnabled',
          'Signature'
        );
      });
    });

    describe('contains a remove button that', () => {
      const ln01smv = <Element>new DOMParser().parseFromString(
        `<LN0 lnClass="LLN0" lnType="myType">
              <DataSet name="myDataSet"/>
              <DataSet name="myDataSet2"/>
              <SampledValueControl name="myName" datSet="myDataSet"/>
              <ReportControl name="myName2" datSet="myDataSet2"/>
          </LN0>`,
        'application/xml'
      ).documentElement;

      const ln02smv2 = <Element>new DOMParser().parseFromString(
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
              <ReportControl name="myName" datSet="myDataSet"/>
              <SampledValueControl name="myName2" datSet="myDataSet"/>
          </LN0>`,
        'application/xml'
      ).documentElement;

      const missingparent = <Element>(
        new DOMParser().parseFromString(
          `<SampledValueControl name="myName" datSet="myDataSet"/>`,
          'application/xml'
        ).documentElement
      );

      it('removes SampledValueControl and its referenced DataSet if no other SampledValueControl is assigned', () => {
        const sampledValueControl = ln01smv.querySelector(
          'SampledValueControl'
        )!;
        const actions = <Delete[]>(
          removeSampledValueControlAction(sampledValueControl)?.actions
        );
        expect(actions.length).to.equal(2);
        expect(actions[0]).to.satisfy(isDelete);
        expect(actions[0].old.element).to.equal(sampledValueControl);
        expect(actions[1]).to.satisfy(isDelete);
        expect(actions[1].old.element).to.equal(
          ln01smv.querySelector('DataSet')
        );
      });

      it('does not remove DataSet with another SampledValueControl referenced', () => {
        const sampledValueControl = ln02smv2.querySelector(
          'SampledValueControl'
        )!;
        const actions = <Delete[]>(
          removeSampledValueControlAction(sampledValueControl)?.actions
        );
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfy(isDelete);
        expect(actions[0].old.element).to.equal(sampledValueControl);
      });

      it('does not remove DataSet with another GSEControl referenced', () => {
        const sampledValueControl = ln02gse.querySelector(
          'SampledValueControl'
        )!;
        const actions = <Delete[]>(
          removeSampledValueControlAction(sampledValueControl)?.actions
        );
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfy(isDelete);
        expect(actions[0].old.element).to.equal(sampledValueControl);
      });

      it('does not remove DataSet with another ReportControl referenced', () => {
        const sampledValueControl = ln02rp.querySelector(
          'SampledValueControl'
        )!;
        const actions = <Delete[]>(
          removeSampledValueControlAction(sampledValueControl)?.actions
        );
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfy(isDelete);
        expect(actions[0].old.element).to.equal(sampledValueControl);
      });

      it('does not remove with missing parent element', () => {
        const action = removeSampledValueControlAction(missingparent);
        expect(action).to.be.null;
      });

      it('removes referenced SMV element in the Communication section', () => {
        const sampledValueControl = doc.querySelector(
          'IED[name="IED3"] SampledValueControl'
        )!;
        const actions = <Delete[]>(
          removeSampledValueControlAction(sampledValueControl)?.actions
        );
        expect(actions.length).to.equal(3);
        expect(actions[0]).to.satisfy(isDelete);
        expect(actions[0].old.element).to.equal(sampledValueControl);
        expect(actions[1]).to.satisfy(isDelete);
        expect(actions[2]).to.satisfy(isDelete);
        expect(actions[2].old.element).to.equal(
          doc.querySelector(
            'Communication SMV[ldInst="MU01"][cbName="MSVCB01"]'
          )
        );
      });
    });
  });

  describe('define an create wizard that', () => {
    let dataPicker: FinderList;

    describe('with existing ConnectedAP element in the Communication section', () => {
      beforeEach(async () => {
        const wizard = createSampledValueControlWizard(
          doc.querySelector('IED[name="IED3"] LN0')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        (<WizardTextField>(
          element.wizardUI.dialogs[0].querySelector(
            'wizard-textfield[label="smvID"]'
          )
        )).maybeValue = 'wer';

        primaryAction = <HTMLElement>(
          element.wizardUI.dialogs[3]?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        dataPicker = <FinderList>(
          element.wizardUI.dialogs[3]?.querySelector('finder-list')
        );

        await element.wizardUI.requestUpdate(); // make sure wizard is rendered
      });

      it('has fourth pages', () =>
        expect(element.wizardUI.dialogs.length).to.equal(4));

      it('the first page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[0]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('the second page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[1]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('the third page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[2]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('the fourth page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[3]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('triggers complex action on primary action click', async () => {
        await primaryAction.click();

        expect(actionEvent).to.be.calledOnce;
        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);
      });

      it('complex action carries SampledValueControl element', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(3);
        const action = actions[0];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal(
          'SampledValueControl'
        );
      });

      it('add default confRev to the SampledValueControl element', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(3);
        const action = actions[0];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect(createAction.new.element).has.attribute('confRev', '1');
      });

      it('complex action carries referenced DataSet element', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(3);
        const action = actions[2];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('DataSet');
      });

      it('referenced DataSet element not having any FCDA per default', async () => {
        await primaryAction.click();

        const createAction = <Create>(
          (<ComplexAction>actionEvent.args[0][0].detail.action).actions[2]
        );
        expect((<Element>createAction.new.element).children).to.be.empty;
      });

      it('referenced DataSet element saving selected FCDA', async () => {
        const path = [
          'Server: IED3>P1',
          'LDevice: IED3>>MU01',
          'LN0: IED3>>MU01',
          'DO: #DummyTCTR>Amp',
          'DA: #DummySAV>instMag',
          'BDA: #AnalogueValue_i>i',
        ];

        dataPicker.paths = [path];
        await element.requestUpdate();

        await primaryAction.click();

        const createAction = <Create>(
          (<ComplexAction>actionEvent.args[0][0].detail.action).actions[2]
        );
        expect((<Element>createAction.new.element).children).to.not.be.empty;
        expect((<Element>createAction.new.element).children).to.have.lengthOf(
          1
        );
      });

      it('complex action adding SMV element in the Communication section', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(3);
        const action = actions[1];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('SMV');
      });
    });

    describe('with missing ConnectedAP element in the Communication section', () => {
      beforeEach(async () => {
        const wizard = createSampledValueControlWizard(
          doc.querySelector('IED[name="IED4"] LN0')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        (<WizardTextField>(
          element.wizardUI.dialogs[0].querySelector(
            'wizard-textfield[label="smvID"]'
          )
        )).maybeValue = 'wer';

        primaryAction = <HTMLElement>(
          element.wizardUI.dialogs[3]?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        dataPicker = <FinderList>(
          element.wizardUI.dialogs[3]?.querySelector('finder-list')
        );

        await element.wizardUI.requestUpdate(); // make sure wizard is rendered
      });

      it('has fourth pages', () =>
        expect(element.wizardUI.dialogs.length).to.equal(4));

      it('the third page having a warning message ', async () => {
        await expect(element.wizardUI.dialogs[2]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('triggers complex action on primary action click', async () => {
        await primaryAction.click();

        expect(actionEvent).to.be.calledOnce;
        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);
      });

      it('complex action NOT adding SMV element in the Communication section', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(2);
        const action = actions[1];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('DataSet');
      });
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
