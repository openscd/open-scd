import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import fc, { integer } from 'fast-check';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import {
  ComplexAction,
  Create,
  Delete,
  isCreate,
  isDelete,
  isSimple,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  reportControlParentSelector,
  createReportControlWizard,
  editReportControlWizard,
  removeReportControlAction,
  selectReportControlWizard,
  reportControlCopyToIedSelector,
} from '../../../src/wizards/reportcontrol.js';
import { inverseRegExp, regExp, regexString } from '../../foundation.js';
import { FinderList } from '../../../src/finder-list.js';
import { FilteredList } from '../../../src/filtered-list.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('Wizards for SCL ReportControl element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('test/testfiles/wizards/reportcontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    describe('for complete ReportControl element', () => {
      beforeEach(async () => {
        const wizard = editReportControlWizard(
          doc.querySelector('ReportControl')!
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

      it('edits bufTime attribute only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            integer({ min: 0 }).map(num => `${num}`),
            async bufTime => {
              inputs[6].value = bufTime;
              await (<WizardTextField>inputs[6]).requestUpdate();
              expect(inputs[6].checkValidity()).to.be.true;
            }
          )
        );
      });

      it('rejects bufTime attribute starting with not being a unsigned int', async () => {
        await fc.assert(
          fc.asyncProperty(
            regexString(inverseRegExp.uint, 1),
            async bufTime => {
              inputs[6].value = bufTime;
              await (<WizardTextField>inputs[6]).requestUpdate();
              expect(inputs[6].checkValidity()).to.be.false;
            }
          )
        );
      });

      it('edits intgPd attribute only for valid inputs', async () => {
        const input = <WizardTextField>inputs[7];
        input.nullSwitch?.click();
        await input.requestUpdate();

        await fc.assert(
          fc.asyncProperty(
            integer({ min: 0 }).map(num => `${num}`),
            async intgPd => {
              input.value = intgPd;
              await input.requestUpdate();
              expect(input.checkValidity()).to.be.true;
            }
          )
        );
      });

      it('rejects intgPd attribute starting with not being a unsigned int', async () => {
        const input = <WizardTextField>inputs[7];
        input.nullSwitch?.click();
        await input.requestUpdate();

        await fc.assert(
          fc.asyncProperty(regexString(inverseRegExp.uint, 1), async intgPd => {
            input.value = intgPd;
            await input.requestUpdate();
            expect(input.checkValidity()).to.be.false;
          })
        );
      });

      it('does not update the ReportControl element when no attribute nor Val has changed', async () => {
        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent.notCalled).to.be.true;
      });

      it('update a ReportControl element when only name attribute changed', async () => {
        const input = <WizardTextField>inputs[0];
        input.value = 'myNewCbName';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.old.element).to.have.attribute('name', 'ReportCb');
        expect(updateAction.new.element).to.have.attribute(
          'name',
          'myNewCbName'
        );
      });

      it('update a ReportControl element when only desc attribute changed', async () => {
        const input = <WizardTextField>inputs[1];
        input.nullSwitch?.click();
        input.value = 'myDesc';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.old.element).to.not.have.attribute('desc');
        expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
      });

      it('update a ReportControl element when rptID attribute changed', async () => {
        const input = <WizardTextField>inputs[3];
        input.value = 'myNewType/ID';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.old.element).to.have.attribute(
          'rptID',
          'reportCb1'
        );
        expect(updateAction.new.element).to.have.attribute(
          'rptID',
          'myNewType/ID'
        );
      });

      it('update a ReportControl element when indexed attribute changed', async () => {
        const input = <WizardTextField>inputs[4];
        input.maybeValue = 'false';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.old.element).to.have.attribute('indexed', 'true');
        expect(updateAction.new.element).to.have.attribute('indexed', 'false');
      });

      it('update a ReportControl element when bufTime attribute changed', async () => {
        const input = <WizardTextField>inputs[6];
        input.value = '54';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.old.element).to.have.attribute('bufTime', '100');
        expect(updateAction.new.element).to.have.attribute('bufTime', '54');
      });

      it('update a ReportControl element when intgPd attribute changed', async () => {
        const input = <WizardTextField>inputs[7];
        input.nullSwitch?.click();
        input.value = '1000';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.old.element).to.not.have.attribute('intgPd');
        expect(updateAction.new.element).to.have.attribute('intgPd', '1000');
      });

      it('updates the RptEnable element with changed max attribute', async () => {
        const input = <WizardTextField>inputs[5];
        input.value = '6';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);

        const updateAction = <Replace>(<ComplexAction>action).actions[0];
        expect(updateAction.new.element.tagName).to.equal('RptEnabled');
        expect(updateAction.old.element.tagName).to.equal('RptEnabled');
        expect(updateAction.old.element).to.have.attribute('max', '5');
        expect(updateAction.new.element).to.have.attribute('max', '6');
      });

      describe('with missing RptEnabled child', () => {
        beforeEach(async () => {
          const wizard = editReportControlWizard(
            doc.querySelector('ReportControl[name="ReportCb2"]')!
          );
          element.workflow.length = 0;
          await element.requestUpdate();

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

        it('nulles max Client input', () => {
          const input = <WizardTextField>inputs[5];
          expect(input.maybeValue).to.be.null;
        });

        it('creates a RptEnable element when max Client activated', async () => {
          doc.querySelector('ReportControl>RptEnabled')!.remove();

          const input = <WizardTextField>inputs[5];
          input.nullSwitch?.click();
          input.value = '6';
          await input.requestUpdate();

          primaryAction.click();
          await element.requestUpdate();
          expect(actionEvent).to.be.calledOnce;

          const action = actionEvent.args[0][0].detail.action;
          expect(action).to.not.satisfy(isSimple);
          expect((<ComplexAction>action).actions[0]).to.satisfy(isCreate);

          const updateAction = <Create>(<ComplexAction>action).actions[0];
          expect((<Element>updateAction.new.element).tagName).to.equal(
            'RptEnabled'
          );
          expect(updateAction.new.element).to.have.attribute('max', '6');
        });
      });

      describe('contains a remove button that', () => {
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

        const missingparent = <Element>(
          new DOMParser().parseFromString(
            `<ReportControl name="myName" datSet="myDataSet"/>`,
            'application/xml'
          ).documentElement
        );

        it('removes ReportControl and its referenced DataSet if no other ReportControl are assigned', () => {
          const reportControl = ln01gse.querySelector('ReportControl')!;
          const actions = <Delete[]>(
            removeReportControlAction(reportControl)!.actions
          );
          expect(actions.length).to.equal(2);
          expect(actions[0]).to.satisfy(isDelete);
          expect(actions[0].old.element).to.equal(reportControl);
          expect(actions[1]).to.satisfy(isDelete);
          expect(actions[1].old.element).to.equal(
            ln01gse.querySelector('DataSet')
          );
        });

        it('does not remove if another ReportControl is assigned to the same DataSet', () => {
          const reportControl = ln02gse.querySelector('ReportControl')!;
          const actions = <Delete[]>(
            removeReportControlAction(reportControl)!.actions
          );
          expect(actions.length).to.equal(1);
          expect(actions[0]).to.satisfy(isDelete);
          expect(actions[0].old.element).to.equal(reportControl);
        });

        it('does not remove if another GSEControl is assigned to the same DataSet', () => {
          const reportControl = ln02rp.querySelector('ReportControl')!;
          const actions = <Delete[]>(
            removeReportControlAction(reportControl)!.actions
          );
          expect(actions.length).to.equal(1);
          expect(actions[0]).to.satisfy(isDelete);
          expect(actions[0].old.element).to.equal(reportControl);
        });

        it('does not remove if another SMV is assigned to the same DataSet', () => {
          const reportControl = ln02smv.querySelector('ReportControl')!;
          const actions = <Delete[]>(
            removeReportControlAction(reportControl)!.actions
          );
          expect(actions.length).to.equal(1);
          expect(actions[0]).to.satisfy(isDelete);
          expect(actions[0].old.element).to.equal(reportControl);
        });

        it('does not remove with missing parent element', () => {
          const action = removeReportControlAction(missingparent);
          expect(action).to.be.null;
        });
      });
    });

    describe('for ReportControl with missing child elements and referenced DataSet', () => {
      beforeEach(async () => {
        const ln0 = new DOMParser().parseFromString(
          '<LN0 lnClass="LNN0"><ReportControl name="testName"/><LN0>',
          'application/xml'
        );

        const reportControl = ln0.querySelector('ReportControl')!;

        const wizard = editReportControlWizard(reportControl);
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      }).timeout(5000);
    });
  });

  describe('define a select wizard that', () => {
    describe('with existing ReportControl element', () => {
      beforeEach(async () => {
        const wizard = selectReportControlWizard(doc.documentElement);
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        await element.wizardUI.requestUpdate(); // make sure wizard is rendered
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot()).timeout(
        5000
      );
    });

    describe('with invalid parent', () => {
      beforeEach(async () => {
        const wizard = selectReportControlWizard(doc.querySelector('DO')!);
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        await element.wizardUI.requestUpdate(); // make sure wizard is rendered
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot()).timeout(
        5000
      );
    });
  });

  describe('define an create wizard that', () => {
    let dataPicker: FinderList;

    beforeEach(async () => {
      const wizard = createReportControlWizard(doc.querySelector('LN0')!);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

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

    it('has four pages', () =>
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

    it('the forth page looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialogs[3]).dom.to.equalSnapshot();
    }).timeout(5000);

    it('triggers complex action on primary action click', async () => {
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.not.satisfy(isSimple);
    });

    it('complex action carries ReportControl element', async () => {
      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[0];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect((<Element>createAction.new.element).tagName).to.equal(
        'ReportControl'
      );
    });

    it('add default confRev to the ReportControlElement', async () => {
      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[0];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect(createAction.new.element).has.attribute('confRev', '1');
    });

    it('complex action carries referenced DataSet element', async () => {
      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[1];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect((<Element>createAction.new.element).tagName).to.equal('DataSet');
    });

    it('referenced DataSet element not having any FCDA per default', async () => {
      await primaryAction.click();

      const createAction = <Create>(
        (<ComplexAction>actionEvent.args[0][0].detail.action).actions[1]
      );
      expect((<Element>createAction.new.element).children).to.be.empty;
    });

    it('referenced DataSet element saving selected FCDA', async () => {
      const path = [
        'Server: IED2>P1',
        'LDevice: IED2>>CircuitBreaker_CB1',
        'LN0: IED2>>CircuitBreaker_CB1',
        'DO: #Dummy.LLN0>Beh',
        'DA: #Dummy.LLN0.Beh>stVal',
      ];

      dataPicker.paths = [path];
      await element.requestUpdate();

      await primaryAction.click();

      const createAction = <Create>(
        (<ComplexAction>actionEvent.args[0][0].detail.action).actions[1]
      );
      expect((<Element>createAction.new.element).children).to.not.be.empty;
      expect((<Element>createAction.new.element).children).to.have.lengthOf(1);
    });

    it('complex action adding OptField element as child element', async () => {
      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[0];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      const optFields = (<Element>createAction.new.element).querySelector(
        'OptFields'
      );
      expect(optFields).to.exist;
      expect(optFields).to.have.attribute('seqNum', 'true');
    });

    it('complex action adding TrgOps element as child element', async () => {
      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[0];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      const trgOps = (<Element>createAction.new.element).querySelector(
        'TrgOps'
      );
      expect(trgOps).to.exist;
      expect(trgOps).to.have.attribute('dchg', 'true');
      expect(trgOps).to.have.attribute('gi', 'false');
    });

    it('complex action adding RptEnabled element as child element with non nulled max Client', async () => {
      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[0];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      const rptEnabled = (<Element>createAction.new.element).querySelector(
        'RptEnabled'
      );
      expect(rptEnabled).to.exist;
      expect(rptEnabled).to.have.attribute('max', '5');
    });

    it('complex action adding RptEnabled element as child element with nulled max Client', async () => {
      const max = <WizardTextField>(
        element.wizardUI.dialogs[0].querySelector(
          'wizard-textfield[label="max Clients"]'
        )
      );
      max.nullSwitch?.click();
      await max.requestUpdate();

      await primaryAction.click();

      const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
        .actions;
      expect(actions.length).to.equal(2);
      const action = actions[0];
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      const rptEnabled = (<Element>createAction.new.element).querySelector(
        'RptEnabled'
      );
      expect(rptEnabled).to.not.exist;
    });
  });

  describe('define a wizard to select the control block reference', () => {
    beforeEach(async () => {
      const wizard = reportControlParentSelector(doc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);
  });

  describe('define copy to other IED selector', () => {
    let iedsPicker: FilteredList;
    let listItem: ListItemBase;

    beforeEach(async () => {
      const sourceReportControl = doc.querySelector(
        'IED[name="IED2"] ReportControl[name="ReportCb"]'
      )!;
      const wizard = reportControlCopyToIedSelector(sourceReportControl);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      iedsPicker = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);

    it('allows to copy to multiple IED at once', () =>
      expect(iedsPicker.multi).to.be.true);

    describe('with a sink IED not meeting partially the data references', () => {
      beforeEach(async () => {
        listItem = iedsPicker.items.find(item => item.value.includes('IED5'))!;
        await element.requestUpdate();
      });

      it('disabled the list item', () =>
        expect(listItem.disabled).to.not.be.true);

      it('does copy the control block ', () => {
        listItem.click();
        primaryAction.click();
        expect(actionEvent).to.have.been.called;
      });
    });
  });
});
