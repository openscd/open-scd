import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import fc from 'fast-check';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  ComplexAction,
  Create,
  Delete,
  isCreate,
  isDelete,
  isReplace,
  isSimple,
  Replace,
  Wizard,
  WizardInputElement,
} from '../../../src/foundation.js';
import {
  contentGseControlWizard,
  createGseControlWizard,
  editGseControlWizard,
  gseControlParentSelector,
  removeGseControlAction,
  selectGseControlWizard,
  updateGseControlAction,
} from '../../../src/wizards/gsecontrol.js';
import { regExp, regexString } from '../../foundation.js';
import { FinderList } from '../../../src/finder-list.js';

describe('gsecontrol wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('selectGseControlWizard', () => {
    beforeEach(async () => {
      const wizard = selectGseControlWizard(doc.documentElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('renderGseAttribute', () => {
    let nameTextField: WizardTextField;

    beforeEach(async () => {
      const wizard = [
        {
          title: 'title',
          content: contentGseControlWizard({
            name: 'GSEcontrol',
            desc: null,
            type: 'GOOSE',
            appID: 'myIED/myAP/myLD/myLN0/myGSE',
            fixedOffs: null,
            securityEnabled: null,
          }),
        },
      ];
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      nameTextField = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="name"]'
      )!;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
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
  });

  describe('editGseControlWizard', () => {
    beforeEach(async () => {
      const wizard = editGseControlWizard(doc.querySelector('GSEControl')!);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('removeGseControl', () => {
    const ln01gse = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
            <DataSet name="myDataSet"/>
            <DataSet name="myDataSet2"/>
            <GSEControl name="myName" datSet="myDataSet"/>
            <GSEControl name="myName2" datSet="myDataSet2"/>
        </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02gse = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
              <DataSet name="myDataSet"/>
              <GSEControl name="myName" datSet="myDataSet"/>
              <GSEControl name="myName2" datSet="myDataSet"/>
          </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02rp = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
                <DataSet name="myDataSet"/>
                <GSEControl name="myName" datSet="myDataSet"/>
                <ReportControl name="myName2" datSet="myDataSet"/>
            </LN0>`,
      'application/xml'
    ).documentElement;

    const ln02smv = <Element>new DOMParser().parseFromString(
      `<LN0 lnClass="LLN0" lnType="myType">
            <DataSet name="myDataSet"/>
            <GSEControl name="myName" datSet="myDataSet"/>
            <SampledValueControl name="myName2" datSet="myDataSet"/>
        </LN0>`,
      'application/xml'
    ).documentElement;

    const missingparent = <Element>(
      new DOMParser().parseFromString(
        `<GSEControl name="myName" datSet="myDataSet"/>`,
        'application/xml'
      ).documentElement
    );

    it('removes GSEControl and its refereced DataSet if no other GSEControl are aasinged', () => {
      const gseControl = ln01gse.querySelector('GSEControl')!;
      const actions = <Delete[]>removeGseControlAction(gseControl)!.actions;
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
      expect(actions[1]).to.satisfy(isDelete);
      expect(actions[1].old.element).to.equal(ln01gse.querySelector('DataSet'));
    });

    it('removes GSEControl only if other GSEControl is assinged to the same DataSet', () => {
      const gseControl = ln02gse.querySelector('GSEControl')!;
      const actions = <Delete[]>removeGseControlAction(gseControl)!.actions;
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
    });

    it('removes GSEControl only if other ReportControlBlock is assinged to the same DataSet', () => {
      const gseControl = ln02rp.querySelector('GSEControl')!;
      const actions = <Delete[]>removeGseControlAction(gseControl)!.actions;
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
    });

    it('removes GSEControl only if other SMV is assinged to the same DataSet', () => {
      const gseControl = ln02smv.querySelector('GSEControl')!;
      const actions = <Delete[]>removeGseControlAction(gseControl)!.actions;
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
    });

    it('does not remove with missing parent element', () => {
      const action = removeGseControlAction(missingparent);
      expect(action).to.be.null;
    });

    it('removes GSE element if present in the Communication section', () => {
      const gseControl = doc.querySelector('IED[name="IED1"] GSEControl')!;
      const actions = <Delete[]>removeGseControlAction(gseControl)!.actions;
      expect(actions.length).to.equal(3);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
      expect(actions[1]).to.satisfy(isDelete);
      expect(actions[2]).to.satisfy(isDelete);
      expect(actions[2].old.element).to.equal(
        doc.querySelector(
          'Communication GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'
        )
      );
    });
  });

  describe('updateGseControlAction', () => {
    const gseControl = <Element>(
      new DOMParser().parseFromString(
        `<GSEControl name="myCbName" type="GOOSE" datSet="myDataSet" appID="myAPP/ID"></GSEControl>`,
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
      wizard = [
        {
          title: 'title',
          content: contentGseControlWizard({
            name: 'myCbName',
            desc: null,
            type: 'GOOSE',
            appID: 'myAPP/ID',
            fixedOffs: null,
            securityEnabled: null,
          }),
        },
      ];
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a GSEControl element when no attribute nor Val has changed', () => {
      const editorAction = updateGseControlAction(gseControl);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });
    it('update a GSEControl element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewCbName';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('name', 'myCbName');
      expect(updateAction.new.element).to.have.attribute('name', 'myNewCbName');
    });
    it('update a GSEControl element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });
    it('update a GSEControl element when only type attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.value = 'GSSE';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('type', 'GOOSE');
      expect(updateAction.new.element).to.have.attribute('type', 'GSSE');
    });
    it('update a GSEControl element when type is changed to null', async () => {
      const input = <WizardTextField>inputs[2];
      input.nullSwitch?.click();
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('type', 'GOOSE');
      expect(updateAction.new.element).to.not.have.attribute('type');
    });
    it('update a GSEControl element when appID attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.nullSwitch?.click();
      input.value = 'myNewType/ID';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('appID', 'myAPP/ID');
      expect(updateAction.new.element).to.have.attribute(
        'appID',
        'myNewType/ID'
      );
    });
    it('update a GSEControl element when fixedOffs attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.nullSwitch?.click();
      input.maybeValue = 'true';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('fixedOffs');
      expect(updateAction.new.element).to.have.attribute('fixedOffs', 'true');
    });
    it('update a GSEControl element when securityEnabled attribute changed', async () => {
      const input = <WizardTextField>inputs[5];
      input.nullSwitch?.click();
      input.value = 'SignatureAndEncryption';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isReplace);
      const updateAction = <Replace>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('securityEnabled');
      expect(updateAction.new.element).to.have.attribute(
        'securityEnabled',
        'SignatureAndEncryption'
      );
    });
  });

  describe('define an create wizard that', () => {
    let dataPicker: FinderList;

    describe('with existing ConnectedAP element in the Communication section', () => {
      beforeEach(async () => {
        const wizard = createGseControlWizard(doc.querySelector('LN0')!);
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        (<WizardTextField>(
          element.wizardUI.dialogs[0].querySelector(
            'wizard-textfield[label="appID"]'
          )
        )).maybeValue = 'wer';

        primaryAction = <HTMLElement>(
          element.wizardUI.dialogs[2]?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        dataPicker = <FinderList>(
          element.wizardUI.dialogs[2]?.querySelector('finder-list')
        );

        await element.wizardUI.requestUpdate(); // make sure wizard is rendered
      });

      it('has three pages', () =>
        expect(element.wizardUI.dialogs.length).to.equal(3));

      it('the first page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[0]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('the second page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[1]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('the third page looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialogs[2]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('triggers complex action on primary action click', async () => {
        await primaryAction.click();

        expect(actionEvent).to.be.calledOnce;
        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);
      });

      it('complex action carries GSEControl element', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(6);
        const action = actions[0];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal(
          'GSEControl'
        );
      });

      it('add default confRev to the GSEControl element', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(6);
        const action = actions[0];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect(createAction.new.element).has.attribute('confRev', '1');
      });

      it('complex action carries referenced DataSet element', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(6);
        const action = actions[5];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('DataSet');
      });

      it('referenced DataSet element not having any FCDA per default', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(6);

        actions.forEach(action => {
          expect(action).to.satisfy(isCreate);
          const createAction = <Create>action;
          expect((<Element>createAction.new.element).tagName).to.not.equal(
            'FCDA'
          );
        });
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

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(7);
        const action = actions[6];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('FCDA');
      });

      it('complex action adding GSE element in the Communication section', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(6);
        const action = actions[1];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('GSE');
      });
    });

    describe('with missing ConnectedAP element in the Communication section', () => {
      beforeEach(async () => {
        const wizard = createGseControlWizard(
          doc.querySelector('IED[name="IED4"] LN0')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        (<WizardTextField>(
          element.wizardUI.dialogs[0].querySelector(
            'wizard-textfield[label="appID"]'
          )
        )).maybeValue = 'wer';

        primaryAction = <HTMLElement>(
          element.wizardUI.dialogs[2]?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        dataPicker = <FinderList>(
          element.wizardUI.dialogs[2]?.querySelector('finder-list')
        );

        await element.wizardUI.requestUpdate(); // make sure wizard is rendered
      });

      it('has three pages', () =>
        expect(element.wizardUI.dialogs.length).to.equal(3));

      it('the second page having a warning message ', async () => {
        await expect(element.wizardUI.dialogs[1]).dom.to.equalSnapshot();
      }).timeout(5000);

      it('triggers complex action on primary action click', async () => {
        await primaryAction.click();

        expect(actionEvent).to.be.calledOnce;
        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);
      });

      it('referenced DataSet element not having any FCDA per default', async () => {
        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(2);

        actions.forEach(action => {
          expect(action).to.satisfy(isCreate);
          const createAction = <Create>action;
          expect((<Element>createAction.new.element).tagName).to.not.equal(
            'FCDA'
          );
        });
      });

      it('referenced DataSet element saving selected FCDA', async () => {
        const path = [
          'Server: IED4>P1',
          'LDevice: IED4>>MU01',
          'LN0: IED4>>MU01',
          'DO: #Dummy.LLN0.two>Beh',
          'DA: #Dummy.LLN0.Beh>stVal',
        ];

        dataPicker.paths = [path];
        await element.requestUpdate();

        await primaryAction.click();

        const actions = (<ComplexAction>actionEvent.args[0][0].detail.action)
          .actions;
        expect(actions.length).to.equal(3);
        const action = actions[2];
        expect(action).to.satisfy(isCreate);
        const createAction = <Create>action;
        expect((<Element>createAction.new.element).tagName).to.equal('FCDA');
      });

      it('complex action NOT adding GSE element in the Communication section', async () => {
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

  describe('define a wizard to select the control block reference', () => {
    beforeEach(async () => {
      const wizard = gseControlParentSelector(doc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);
  });
});
