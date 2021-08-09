import { expect, fixture, html } from '@open-wc/testing';
import fc from 'fast-check';
import {
  Create,
  isCreate,
  isDelete,
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  editGseControlWizard,
  removeGseControl,
  renderGseAttributes,
  updateGseControlAction,
} from '../../../src/wizards/gsecontrol.js';
import { updateOptFieldsAction } from '../../../src/wizards/optfields.js';
import {
  editReportControlWizard,
  getRptEnableAction,
  removeReportAction,
  renderReportControlAttributes,
  selectReportControlWizard,
  updateReportControlAction,
} from '../../../src/wizards/reportcontrol.js';
import { inverseRegExp, regExp, regexString } from '../../foundation.js';
import { MockWizard } from '../../mock-wizard.js';

describe('reportcontrol wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('selectReportControlWizard', () => {
    beforeEach(async () => {
      const wizard = selectReportControlWizard(doc.documentElement);
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('renderReportControlAttribute', () => {
    let nameTextField: WizardTextField;
    let bufTimeTextField: WizardTextField;
    let intgPdTextField: WizardTextField;

    beforeEach(async () => {
      const wizard = [
        {
          title: 'title',
          content: renderReportControlAttributes(
            'GSEcontrol',
            null,
            'true',
            'myIED/myAP/myLD/myLN0/myRP',
            'true',
            '5',
            '100',
            '1000'
          ),
        },
      ];
      element.workflow.push(wizard);
      await element.requestUpdate();
      nameTextField = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="name"]'
      )!;
      bufTimeTextField =
        element.wizardUI.dialog!.querySelector<WizardTextField>(
          'wizard-textfield[label="bufTime"]'
        )!;
      intgPdTextField = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="intgPd"]'
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
    it('edits bufTime attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.unsingedint), async bufTime => {
          bufTimeTextField.value = bufTime;
          await bufTimeTextField.requestUpdate();
          expect(bufTimeTextField.checkValidity()).to.be.true;
        })
      );
    });
    it('rejects bufTime attribute starting with not beeing a unsingedint', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.unsingedint, 1),
          async bufTime => {
            bufTimeTextField.value = bufTime;
            await bufTimeTextField.requestUpdate();
            expect(bufTimeTextField.checkValidity()).to.be.false;
          }
        )
      );
    });
    it('edits intgPd attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.unsingedint), async intgPd => {
          intgPdTextField.value = intgPd;
          await intgPdTextField.requestUpdate();
          expect(intgPdTextField.checkValidity()).to.be.true;
        })
      );
    });
    it('rejects intgPd attribute starting with not beeing a unsingedint', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.unsingedint, 1),
          async intgPd => {
            intgPdTextField.value = intgPd;
            await intgPdTextField.requestUpdate();
            expect(intgPdTextField.checkValidity()).to.be.false;
          }
        )
      );
    });
  });

  describe('editReportControlWizard', () => {
    beforeEach(async () => {
      const wizard = editReportControlWizard(
        doc.querySelector('ReportControl')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('removeReportControl', () => {
    const ln01gse = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
            <DataSet name="myDataSet"/>
            <DataSet name="myDataSet2"/>
            <ReportControl name="myName" datSet="myDataSet"/>
            <ReportControl name="myName2" datSet="myDataSet2"/>
        </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02gse = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
              <DataSet name="myDataSet"/>
              <ReportControl name="myName" datSet="myDataSet"/>
              <ReportControl name="myName2" datSet="myDataSet"/>
          </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02rp = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
                <DataSet name="myDataSet"/>
                <ReportControl name="myName" datSet="myDataSet"/>
                <GSEControl name="myName2" datSet="myDataSet"/>
            </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02smv = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
            <DataSet name="myDataSet"/>
            <ReportControl name="myName" datSet="myDataSet"/>
            <SampledValueControl name="myName2" datSet="myDataSet"/>
        </LN0>`,
      'application/xml'
    ).documentElement;

    it('removes ReportControl and its refereced DataSet if no other ReportControl are assinged', () => {
      const reportControl = ln01gse.querySelector('ReportControl')!;
      const actions = removeReportAction(reportControl);
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(reportControl);
      expect(actions[1]).to.satisfy(isDelete);
      expect(actions[1].old.element).to.equal(ln01gse.querySelector('DataSet'));
    });
    it('does not remove if another ReportControl is assinged to the same DataSet', () => {
      const reportControl = ln02gse.querySelector('ReportControl')!;
      const actions = removeReportAction(reportControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(reportControl);
    });
    it('does not remove if another GSEControl is assinged to the same DataSet', () => {
      const reportControl = ln02rp.querySelector('ReportControl')!;
      const actions = removeReportAction(reportControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(reportControl);
    });
    it('does not remove if another SMV is assinged to the same DataSet', () => {
      const reportControl = ln02smv.querySelector('ReportControl')!;
      const actions = removeReportAction(reportControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(reportControl);
    });
  });

  describe('updateReportControlAction', () => {
    const reportControl = <Element>(
      new DOMParser().parseFromString(
        `<ReportControl name="myCbName" buffered="true" datSet="myDataSet" rptID="myAPP/ID"></ReportControl>`,
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
      wizard = [
        {
          title: 'title',
          content: renderReportControlAttributes(
            'myCbName',
            null,
            'true',
            'myAPP/ID',
            null,
            null,
            null,
            null
          ),
        },
      ];
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a ReportControl element when no attribute nor Val has changed', () => {
      const editorAction = updateReportControlAction(reportControl);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });
    it('update a ReportControl element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewCbName';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'myCbName');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewCbName');
    });
    it('update a ReportControl element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });
    it('update a ReportControl element when rptID attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.value = 'myNewType/ID';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('rptID', 'myAPP/ID');
      expect(updateAction.new.element).to.have.attribute(
        'rptID',
        'myNewType/ID'
      );
    });
    it('update a ReportControl element when indexed attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('indexed');
      expect(updateAction.new.element).to.have.attribute('indexed', 'true');
    });
    it('update a ReportControl element when bufTime attribute changed', async () => {
      const input = <WizardTextField>inputs[6];
      input.nullSwitch?.click();
      input.value = '54';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('bufTime');
      expect(updateAction.new.element).to.have.attribute('bufTime', '54');
    });
    it('update a ReportControl element when intgPd attribute changed', async () => {
      const input = <WizardTextField>inputs[7];
      input.nullSwitch?.click();
      input.value = '1000';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('intgPd');
      expect(updateAction.new.element).to.have.attribute('intgPd', '1000');
    });
    it('creates a RptEnable element when max Client activated', async () => {
      const input = <WizardTextField>inputs[5];
      input.nullSwitch?.click();
      input.value = '6';
      await input.requestUpdate();
      const editorAction = updateReportControlAction(reportControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isCreate);
      const updateAction = <Create>updateActions[0];
      expect(updateAction.new.element.tagName).to.have.equal('RptEnable');
      expect(updateAction.new.element).to.have.attribute('max', '6');
    });
  });

  describe('getRptEnableAction', () => {
    const reportControl = new DOMParser().parseFromString(
      `<ReportControl name="cbName"></ReportControl>`,
      'application/xml'
    ).documentElement;
    const oldRtpEnable = new DOMParser().parseFromString(
      `<RptEnable max="6"></RptEnable>`,
      'application/xml'
    ).documentElement;

    it('updates a RptEnable child element when changed', () => {
      const editorAction = getRptEnableAction(oldRtpEnable, '3', reportControl);
      expect(editorAction).to.satisfy(isUpdate);
      expect((<Update>editorAction).new.element).to.have.attribute('max', '3');
    });
    it('creates a MimTime child element when missing', () => {
      const editorAction = getRptEnableAction(null, '3', reportControl);
      expect(editorAction).to.satisfy(isCreate);
      expect((<Create>editorAction).new.element).to.have.attribute('max', '3');
    });
    it('do not remove RptEnable but only max attribute', () => {
      const editorAction = getRptEnableAction(
        oldRtpEnable,
        null,
        reportControl
      );
      expect(editorAction).to.satisfy(isUpdate);
      expect((<Update>editorAction).new.element).to.not.have.attribute('max');
    });
  });
});
