import { fixture, html, expect } from '@open-wc/testing';
import '../../../mock-wizard-editor.js';
import '../../../../src/editors/substation/eq-sub-function-editor.js';
const openAndCancelMenu = (parent, element) => new Promise(async (resolve) => {
    expect(parent.wizardUI.dialog).to.be.undefined;
    element?.shadowRoot
        ?.querySelector("mwc-icon-button[icon='playlist_add']")
        .click();
    const lnodeMenuItem = element?.shadowRoot?.querySelector(`mwc-list-item[value='LNode']`);
    lnodeMenuItem.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialog).to.exist;
    const secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
    secondaryAction.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialog).to.be.undefined;
    return resolve();
});
describe('eq-sub-function-editor wizarding editing integration', () => {
    let doc;
    let parent;
    let element;
    let primaryAction;
    beforeEach(async () => {
        doc = await fetch('/test/testfiles/zeroline/functions.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        parent = (await fixture(html `<mock-wizard-editor
          ><eq-sub-function-editor
            .element=${doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction')}
          ></eq-sub-function-editor
        ></mock-wizard-editor>`));
        element = parent.querySelector('eq-sub-function-editor');
    });
    describe('open create wizard for element EqSubFunction', () => {
        let nameField;
        beforeEach(async () => {
            (element?.shadowRoot?.querySelector('mwc-list-item[value="EqSubFunction"]')).click();
            await parent.requestUpdate();
            await parent.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('does not add EqSubFunction if name attribute is not unique', async () => {
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]')).to.exist;
            nameField.value = 'myEqSubSubFunction';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]').length).to.equal(1);
        });
        it('does add EqFunction if name attribute is unique', async () => {
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="someNewEqSubFunction"]')).to.not.exist;
            nameField.value = 'someNewEqSubFunction';
            await parent.updateComplete;
            primaryAction.click();
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="someNewEqSubFunction"]')).to.exist;
        });
    });
    describe('open edit wizard', () => {
        let nameField;
        let primaryAction;
        beforeEach(async () => {
            element.element = doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]');
            (element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')).click();
            await parent.requestUpdate();
            await parent.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('does not update EqSubFunction if name attribute is not unique', async () => {
            expect(doc.querySelectorAll('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqFunc2"]')).to.lengthOf(1);
            nameField.value = 'myEqFunc2';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqFunc2"]')).to.lengthOf(1);
        });
        it('does update EqSubFunction if name attribute is unique', async () => {
            nameField.value = 'someNewFunction';
            await parent.updateComplete;
            primaryAction.click();
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="someNewFunction"]')).to.exist;
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]')).to.not.exist;
        });
    });
    describe('open create wizard for element LNode', () => {
        let listItems;
        beforeEach(async () => {
            (element?.shadowRoot?.querySelector('mwc-list-item[value="LNode"]')).click();
            await parent.requestUpdate();
            await parent.updateComplete;
            listItems = Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-check-list-item'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('add selected LNode instances to SubFcuntion parent', async () => {
            listItems[3].selected = true;
            listItems[5].selected = true;
            await primaryAction.click();
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction > LNode[iedName="None"][lnClass="CSWI"][lnInst="1"]')).to.exist;
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction > LNode[iedName="None"][lnClass="CSWI"][lnInst="2"]')).to.exist;
        });
    });
    describe('has a delete icon button that', () => {
        let deleteButton;
        beforeEach(async () => {
            deleteButton = (element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]'));
            await parent.updateComplete;
        });
        it('removes the attached Function element from the document', async () => {
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]')).to.exist;
            await deleteButton.click();
            expect(doc.querySelector('ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]')).to.not.exist;
        });
    });
    describe('Open add wizard', () => {
        let doc;
        let parent;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/zeroline/functions.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><eq-sub-function-editor
              .element=${doc.querySelector('ConductingEquipment[name="QA1"] > EqFunction')}
            ></eq-sub-function-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('eq-sub-function-editor');
            await parent.updateComplete;
        });
        it('Should open the same wizard for the second time', async () => {
            await openAndCancelMenu(parent, element);
            await openAndCancelMenu(parent, element);
        });
    });
});
//# sourceMappingURL=eq-sub-function-editor-wizarding-editing.test.js.map