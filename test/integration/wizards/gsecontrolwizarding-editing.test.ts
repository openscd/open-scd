import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { expect, fixture, html } from '@open-wc/testing';
import { FilteredList } from '../../../src/filtered-list.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  editGseControlWizard,
  selectGseControlWizard,
} from '../../../src/wizards/gsecontrol.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('gsecontrol wizarding', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/base/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('selectGseControlWizard', () => {
    let gseControlList: FilteredList;

    beforeEach(async () => {
      const wizard = selectGseControlWizard(doc.documentElement);
      element.workflow.push(wizard);
      await element.requestUpdate();
      gseControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await gseControlList.updateComplete;
    });
    it('shows all GSEControl within an IED or SCL', () => {
      expect(gseControlList.items.length).to.equal(
        doc.querySelectorAll('GSEControl').length
      );
    });
    it('opens editGseControlWizard on filtered-list item click', async () => {
      const gse2 = <ListItemBase>gseControlList.items[1];
      await gse2.updateComplete;
      gse2.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.wizardUI.dialog?.updateComplete;
      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.updateComplete;
      expect(nameField.value).to.equal(
        doc.querySelectorAll('GSEControl')[1].getAttribute('name')
      );
    });
  });

  describe('editGseControlWizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;
    let gseControl: Element;

    describe('loading a GSEControl with connected DataSet and GSE element', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector('GSEControl[name="GCB"]')!;
        const wizard = editGseControlWizard(gseControl);
        element.workflow.push(wizard);
        await element.requestUpdate();
        nameField = element.wizardUI.dialog!.querySelector(
          'wizard-textfield[label="name"]'
        )!;
        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
        await nameField.updateComplete;
      });

      it('rejects name attribute starting with decimals', async () => {
        nameField.value = '4adsasd';
        primaryAction.click();
        expect(gseControl.getAttribute('name')).to.not.equal('4adsasd');
      });

      it('edits name attribute on primary action', async () => {
        nameField.value = 'myNewName';
        primaryAction.click();
        expect(gseControl.getAttribute('name')).to.not.equal('myNewName');
      });

      it('opens editDataSetWizard on edit dataset button click', async () => {
        const editDataSetButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editdataset"]'
          )!
        );
        await editDataSetButton.updateComplete;
        editDataSetButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.updateComplete;
        expect(nameField.value).to.equal(
          doc.querySelectorAll('DataSet')[1].getAttribute('name')
        );
      });

      it('opens a editGseWizard on edit GSE button click', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editgse"]')!
        );
        expect(editGseButton).to.exist;

        await editGseButton.updateComplete;
        editGseButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const macField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="MAC-Address"]'
          )
        );
        await macField.updateComplete;
        expect(macField.value).to.equal(
          doc
            .querySelector('GSE > Address > P[type="MAC-Address"]')
            ?.textContent?.trim()
        );
      });
    });

    describe('loading a GSEControl with no connected DataSet', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector('GSEControl[name="GCB2"]')!;
        const wizard = editGseControlWizard(gseControl);
        element.workflow.push(wizard);
        await element.requestUpdate();
      });

      it('does not show edit DataSet button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editdataset"]'
          )!
        );
        expect(editGseButton).to.not.exist;
      });
    });

    describe('loading a GSEControl with no connected GSE', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector(
          'IED[name="IED2"] GSEControl[name="GCB"]'
        )!;
        const wizard = editGseControlWizard(gseControl);
        element.workflow.push(wizard);
        await element.requestUpdate();
      });

      it('does not show edit DataSet button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editgse"]')!
        );
        expect(editGseButton).to.not.exist;
      });
    });
  });

  /* describe('editGseControlWizard', () => {
    beforeEach(async () => {
      const wizard = editGseControlWizard(doc.querySelector('GSEControl')!);
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  }); */

  /* describe('removeGseControl', () => {
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

    it('removes GSEControl and its refereced DataSet if no other GSEControl are aasinged', () => {
      const gseControl = ln01gse.querySelector('GSEControl')!;
      const actions = removeGseControl(gseControl);
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
      expect(actions[1]).to.satisfy(isDelete);
      expect(actions[1].old.element).to.equal(ln01gse.querySelector('DataSet'));
    });
    it('removes GSEControl only if other GSEControl is assinged to the same DataSet', () => {
      const gseControl = ln02gse.querySelector('GSEControl')!;
      const actions = removeGseControl(gseControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
    });
    it('removes GSEControl only if other ReportControlBlock is assinged to the same DataSet', () => {
      const gseControl = ln02rp.querySelector('GSEControl')!;
      const actions = removeGseControl(gseControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
    });
    it('removes GSEControl only if other SMV is assinged to the same DataSet', () => {
      const gseControl = ln02smv.querySelector('GSEControl')!;
      const actions = removeGseControl(gseControl);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isDelete);
      expect(actions[0].old.element).to.equal(gseControl);
    });
    it('removes GSE element if present in the Communication section', () => {
      const gseControl = doc.querySelector('IED[name="IED1"] GSEControl')!;
      const actions = removeGseControl(gseControl);
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
 */
  /* describe('updateGseControlAction', () => {
    const gseControl = <Element>(
      new DOMParser().parseFromString(
        `<GSEControl name="myCbName" type="GOOSE" datSet="myDataSet" appID="myAPP/ID"></GSEControl>`,
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
          content: renderGseAttributes(
            'myCbName',
            null,
            'GOOSE',
            'myAPP/ID',
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
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
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
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });
    it('update a GSEControl element when only bType attribute changed', async () => {
      const input = <WizardTextField>inputs[2];
      input.value = 'GSSE';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('type', 'GOOSE');
      expect(updateAction.new.element).to.have.attribute('type', 'GSSE');
    });
    it('update a GSEControl element when appID attribute changed', async () => {
      const input = <WizardTextField>inputs[3];
      input.nullSwitch?.click();
      input.value = 'myNewType/ID';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute('appID', 'myAPP/ID');
      expect(updateAction.new.element).to.have.attribute(
        'appID',
        'myNewType/ID'
      );
    });
    it('update a GSEControl element when fixedOffs attribute changed', async () => {
      const input = <WizardTextField>inputs[4];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateGseControlAction(gseControl);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
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
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('securityEnabled');
      expect(updateAction.new.element).to.have.attribute(
        'securityEnabled',
        'SignatureAndEncryption'
      );
    });
  });  */
});
