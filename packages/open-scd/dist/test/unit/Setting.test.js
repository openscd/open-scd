import { registerTranslateConfig, use } from 'lit-translate';
import { html, fixture, expect } from '@open-wc/testing';
import '../../src/addons/Settings.js';
import { defaults } from '../../src/addons/Settings.js';
describe('OSCD-Settings', () => {
    let element;
    beforeEach(async () => {
        localStorage.clear();
        element = (await fixture(html `<oscd-settings .host=${this}></oscd-settings>`));
    });
    it('initially has default settings', () => expect(element).to.have.deep.property('settings', defaults));
    it('stores settings to localStorage', () => {
        element.setSetting('theme', 'dark');
        expect(localStorage.getItem('theme')).to.equal('dark');
    });
    it('retrieves settings from localStorage', () => {
        localStorage.setItem('language', 'de');
        expect(element.settings).to.have.property('language', 'de');
    });
    it('saves chosen settings on save button click', async () => {
        element.settingsUI.show();
        element.darkThemeUI.selected = true;
        await element.darkThemeUI.updateComplete;
        await (element.settingsUI.querySelector('mwc-button[dialogAction="save"]')).click();
        expect(element.settings).to.have.property('theme', 'dark');
    });
    it('resets settings to default on reset button click', async () => {
        element.settingsUI.show();
        await element.settingsUI.updateComplete;
        element.setSetting('language', 'de');
        expect(element).to.not.have.deep.property('settings', defaults);
        (element.settingsUI.querySelector('mwc-button[dialogAction="reset"]')).click();
        expect(element).to.have.deep.property('settings', defaults);
    });
    it('saves chosen .nsdoc file and looks like latest snapshot', async () => {
        element.settingsUI.show();
        await element.settingsUI.updateComplete;
        const nsdocFile = await fetch('/test/testfiles/nsdoc/IEC_61850-7-2.nsdoc').then(response => response.text());
        element.setSetting('IEC 61850-7-2', nsdocFile);
        await element.requestUpdate();
        await element.updateComplete;
        expect(localStorage.getItem('IEC 61850-7-2')).to.eql(nsdocFile);
        await expect(element).shadowDom.to.equalSnapshot();
    });
    it('deletes a chosen .nsdoc file and looks like latest snapshot', async () => {
        element.settingsUI.show();
        await element.settingsUI.updateComplete;
        const nsdocFile = await fetch('/test/testfiles/nsdoc/IEC_61850-7-2.nsdoc').then(response => response.text());
        element.setSetting('IEC 61850-7-2', nsdocFile);
        await element.requestUpdate();
        await element.updateComplete;
        (element.settingsUI.querySelector('mwc-icon[id="deleteNsdocItem"]')).click();
        await element.requestUpdate();
        await element.updateComplete;
        expect(localStorage.getItem('IEC 61850-7-2')).to.equal(null);
        await expect(element).shadowDom.to.equalSnapshot();
    });
}).afterAll(() => {
    registerTranslateConfig({ empty: key => `[${key}]` });
    // dirty hack to let other tests pass which rely on untranslated text
    use('test');
});
//# sourceMappingURL=Setting.test.js.map