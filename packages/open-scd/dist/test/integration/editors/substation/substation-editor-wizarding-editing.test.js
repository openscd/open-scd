import { fixture, html, expect } from '@open-wc/testing';
import '../../../mock-wizard-editor.js';
import '../../../../src/editors/substation/substation-editor.js';
const openAndCancelMenu = (parent, element) => new Promise(async (resolve) => {
    expect(parent.wizardUI.dialog).to.be.undefined;
    element?.shadowRoot?.querySelector('mwc-menu').click();
    const powerTransformerMenuItem = element?.shadowRoot?.querySelector(`mwc-list-item[value='PowerTransformer']`);
    powerTransformerMenuItem.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialog).to.exist;
    const secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
    secondaryAction.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialog).to.be.undefined;
    return resolve();
});
describe('substation-editor wizarding editing integration', () => {
    describe('edit wizard', () => {
        let doc;
        let parent;
        let element;
        let nameField;
        let descField;
        let secondaryAction;
        let primaryAction;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
            await (element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')).click();
            await parent.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            descField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]'));
            secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('closes on secondary action', async () => {
            secondaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            expect(parent.wizardUI.dialog).to.not.exist;
        });
        it('changes name attribute on primary action', async () => {
            nameField.value = 'newName';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('Substation')?.getAttribute('name')).to.equal('newName');
        });
        it('changes desc attribute on primary action', async () => {
            descField.value = 'newDesc';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('Substation')?.getAttribute('desc')).to.equal('newDesc');
        });
        it('deletes desc attribute if wizard-textfield is deactivated', async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            descField.nullSwitch.click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('Substation')?.getAttribute('desc')).to.be.null;
        });
    });
    describe('Open add wizard', () => {
        let doc;
        let parent;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
            await parent.updateComplete;
        });
        it('Should open the same wizard for the second time', async () => {
            await openAndCancelMenu(parent, element);
            await openAndCancelMenu(parent, element);
        });
    });
    describe('open add voltage level wizard', () => {
        let doc;
        let parent;
        let element;
        let nameField;
        let primaryAction;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
            (element?.shadowRoot?.querySelector('mwc-list-item[value="VoltageLevel"]')).click();
            await parent.updateComplete;
            await parent.wizardUI.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('opens voltage level wizard ', async () => {
            expect(parent.wizardUI).to.exist;
        });
        it('has five wizard inputs', async () => {
            expect(parent.wizardUI.inputs.length).to.equal(5);
        });
        it('does not add voltage level if name attribute is not unique', async () => {
            nameField.value = 'E1';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('VoltageLevel[name="E1"]').length).to.equal(1);
        });
        it('does add voltage level if name attribute is unique', async () => {
            nameField.value = 'J1';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('VoltageLevel[name="J1"]')).to.exist;
        });
    });
    describe('open lnode wizard', () => {
        let doc;
        let parent;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
            (element?.shadowRoot?.querySelector('mwc-icon-button[icon="account_tree"]')).click();
            await parent.updateComplete;
        });
        it('opens lnode wizard ', async () => {
            expect(parent.wizardUI).to.exist;
        });
        it('has two wizard pages', async () => {
            expect(parent.wizardUI.dialogs.length).to.equal(2);
        });
    });
    describe('remove action', () => {
        let doc;
        let parent;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
        });
        it('removes Substation on clicking delete button', async () => {
            expect(doc.querySelector('Substation')).to.exist;
            (element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')).click();
            await parent.updateComplete;
            expect(doc.querySelector('Substation')).to.not.exist;
        });
    });
    describe('open create wizard for element Function', () => {
        let doc;
        let parent;
        let element;
        let nameField;
        let primaryAction;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/zeroline/functions.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
            (element?.shadowRoot?.querySelector('mwc-list-item[value="Function"]')).click();
            await parent.updateComplete;
            await parent.wizardUI.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('does not add Function if name attribute is not unique', async () => {
            expect(doc.querySelector('Substation > Function[name="myFunc"]')).to
                .exist;
            nameField.value = 'myFunc';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('Substation > Function[name="myFunc"]').length).to.equal(1);
        });
        it('does add Function if name attribute is unique', async () => {
            expect(doc.querySelector('Substation > Function[name="someNewFunction"]'))
                .to.not.exist;
            nameField.value = 'someNewFunction';
            await parent.updateComplete;
            primaryAction.click();
            expect(doc.querySelector('Substation > Function[name="someNewFunction"]'))
                .to.exist;
        });
    });
    describe('open add general-equipment wizard', () => {
        let doc;
        let parent;
        let element;
        let nameField;
        let typeField;
        let primaryAction;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/editors/substation/generalequipment.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('substation-editor');
            (element?.shadowRoot?.querySelector('mwc-list-item[value="GeneralEquipment"]')).click();
            await parent.updateComplete;
            await parent.wizardUI.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            typeField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="type"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('opens general-equipment wizard ', async () => {
            expect(parent.wizardUI).to.exist;
        });
        it('has four wizard inputs', async () => {
            expect(parent.wizardUI.inputs.length).to.equal(4);
        });
        it('does not add general-equipment if name andattribute is not unique', async () => {
            nameField.value = 'genSub';
            typeField.value = 'AXN';
            await parent.updateComplete;
            primaryAction.click();
            expect(doc.querySelectorAll('GeneralEquipment[name="genSub"]').length).to.equal(1);
        });
        it('does add general-equipment if name attribute is unique', async () => {
            expect(doc.querySelector('GeneralEquipment[name="newgenSub"]')).to.not
                .exist;
            nameField.value = 'newgenSub';
            typeField.value = 'AXN';
            await parent.updateComplete;
            primaryAction.click();
            expect(doc.querySelector('GeneralEquipment[name = "newgenSub"]')).to
                .exist;
        });
    });
});
//# sourceMappingURL=substation-editor-wizarding-editing.test.js.map