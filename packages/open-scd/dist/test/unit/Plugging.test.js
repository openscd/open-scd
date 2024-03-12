import { expect, fixture, html } from '@open-wc/testing';
import '../mock-open-scd.js';
describe('OpenSCD-Plugin', () => {
    let element;
    let doc;
    const docName = 'testDoc';
    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 50)); // await animation
        localStorage.clear();
    });
    beforeEach(async () => {
        doc = await fetch('/test/testfiles/valid2007B4.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        element = (await fixture(html `<mock-open-scd .doc=${doc} .docName=${docName}></mock-open-scd>`));
        await element.updateComplete;
    });
    it('stores default plugins on load', () => expect(element).property('editors').to.have.lengthOf(6));
    it('has Locale property', async () => {
        expect(element).to.have.property('locale');
    });
    it('has docs property', () => {
        expect(element).to.have.property(`docs`).that.is.a('Object');
        expect(element.docs[docName]).to.equal(doc);
    });
    describe('plugin manager dialog', () => {
        let firstEditorPlugin;
        let resetAction;
        let primaryAction;
        beforeEach(async () => {
            element.pluginUI.show();
            await element.pluginUI.updateComplete;
            firstEditorPlugin = (element.pluginList.querySelector('mwc-check-list-item:not([noninteractive])'));
            resetAction = (element.pluginUI.querySelector('mwc-button[slot="secondaryAction"]'));
            primaryAction = (element.pluginUI.querySelector('mwc-button[slot="primaryAction"]'));
            await element.updateComplete;
        });
        it('disables deselected plugins', async () => {
            firstEditorPlugin.click();
            await element.updateComplete;
            expect(element).property('editors').to.have.lengthOf(5);
        });
        it('enables selected plugins', async () => {
            element.pluginList.firstElementChild.click();
            await element.updateComplete;
            element.pluginList.firstElementChild.click();
            await element.updateComplete;
            expect(element).property('editors').to.have.lengthOf(6);
        });
        it('resets plugins to default on reset button click', async () => {
            element.pluginList.firstElementChild.click();
            await element.updateComplete;
            resetAction.click();
            await element.updateComplete;
            expect(element).property('editors').to.have.lengthOf(6);
        });
        it('opens the custom plugin dialog on add button click', async () => {
            primaryAction.click();
            await element.updateComplete;
            expect(element)
                .property('pluginDownloadUI')
                .to.have.property('open', true);
        });
    });
    describe('add custom plugin dialog', () => {
        let src;
        let name;
        let primaryAction;
        let menuKindOption;
        let validatorKindOption;
        beforeEach(async () => {
            src = (element.pluginDownloadUI.querySelector('#pluginSrcInput'));
            name = (element.pluginDownloadUI.querySelector('#pluginNameInput'));
            primaryAction = (element.pluginDownloadUI.querySelector('mwc-button[slot="primaryAction"]'));
            element.pluginDownloadUI.show();
            await element.pluginDownloadUI.updateComplete;
            menuKindOption = (element.pluginDownloadUI.querySelector('#pluginKindList > mwc-radio-list-item[id="menu"]'));
            validatorKindOption = (element.pluginDownloadUI.querySelector('#pluginKindList > mwc-radio-list-item[id="validator"]'));
        });
        it('requires a name and a valid URL to add a plugin', async () => {
            primaryAction.click();
            expect(element.pluginDownloadUI).to.have.property('open', true);
            src.value = 'http://example.com/plugin.js';
            await src.updateComplete;
            primaryAction.click();
            expect(element.pluginDownloadUI).to.have.property('open', true);
            src.value = 'notaURL';
            name.value = 'testName';
            await src.updateComplete;
            await name.updateComplete;
            primaryAction.click();
            expect(element.pluginDownloadUI).to.have.property('open', true);
            src.value = 'http://example.com/plugin.js';
            await src.updateComplete;
            primaryAction.click();
            expect(element.pluginDownloadUI).to.have.property('open', false);
        });
        it('adds a new editor kind plugin on add button click', async () => {
            src.value = 'http://example.com/plugin.js';
            name.value = 'testName';
            await src.updateComplete;
            await name.updateComplete;
            primaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 50)); // await animation
            await element.requestUpdate();
            await element.updateComplete;
            expect(element.editors).to.have.lengthOf(7);
        });
        it('adds a new menu kind plugin on add button click', async () => {
            const lengthMenuKindPlugins = element.menuEntries.length;
            src.value = 'http://example.com/plugin.js';
            name.value = 'testName';
            menuKindOption.click();
            await src.updateComplete;
            await name.updateComplete;
            primaryAction.click();
            await element.updateComplete;
            expect(element.menuEntries).to.have.lengthOf(lengthMenuKindPlugins + 1);
        });
        it('sets requireDoc and position for new menu kind plugin', async () => {
            src.value = 'http://example.com/plugin.js';
            name.value = 'testName';
            menuKindOption.click();
            await src.updateComplete;
            await name.updateComplete;
            primaryAction.click();
            await element.updateComplete;
            expect(element.menuEntries[element.menuEntries.length - 1]).to.have.property('requireDoc');
            expect(element.menuEntries[element.menuEntries.length - 1]).to.have.property('position');
        });
        it('adds a new validator kind plugin on add button click', async () => {
            expect(element.validators).to.have.lengthOf(2);
            src.value = 'http://example.com/plugin.js';
            name.value = 'testName';
            validatorKindOption.click();
            await src.updateComplete;
            await name.updateComplete;
            primaryAction.click();
            await element.updateComplete;
            expect(element.validators).to.have.lengthOf(3);
        });
    });
});
//# sourceMappingURL=Plugging.test.js.map