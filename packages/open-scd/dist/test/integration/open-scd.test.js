import { expect, fixture, html } from '@open-wc/testing';
import '../../src/open-scd.js';
import { newEmptySCD } from '../../src/schemas.js';
describe('open-scd', () => {
    let element;
    beforeEach(async () => {
        localStorage.clear();
        element = await fixture(html `
      <open-scd></open-scd>

      <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
      <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
      <link
        href="public/google/icons/material-icons-outlined.css"
        rel="stylesheet"
      />
    `);
        await element.updateComplete;
    });
    it('looks like its snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
    });
    it('opens the menu on navigation icon click', async () => {
        const menu = element.shadowRoot.querySelector('mwc-drawer');
        expect(menu).property('open').to.be.false;
        const menuButton = (element.shadowRoot.querySelector('mwc-icon-button[slot="navigationIcon"]'));
        await menuButton.click();
        expect(menu).property('open').to.be.true;
    });
    it('opens the log on log icon click', async () => {
        expect(element.logUI).to.have.property('open', false);
        await (element.shadowRoot.querySelector('mwc-icon-button[icon="list"]')).click();
        expect(element.logUI).to.have.property('open', true);
    });
    it('opens the history on history icon click', async () => {
        expect(element.historyUI).to.have.property('open', false);
        await (element.shadowRoot.querySelector('mwc-icon-button[icon="history"]')).click();
        expect(element.historyUI).to.have.property('open', true);
    });
    it('opens the log on snackbar button click', async () => {
        expect(element.logUI).to.have.property('open', false);
        await element.errorUI.querySelector('mwc-button').click();
        expect(element.logUI).to.have.property('open', true);
    });
    it('opens the diagnostics on snackbar button click', async () => {
        expect(element.diagnosticUI).to.have.property('open', false);
        await element.issueUI.querySelector('mwc-button').click();
        expect(element.diagnosticUI).to.have.property('open', true);
    });
    /**
     * @deprecated
     * Remove this integration test. It's no longer an integration test but an E2E test.
     */
    it('renders a progress indicator on `waiting`', async () => {
        const waiter = element.shadowRoot.querySelector('oscd-waiter');
        const progressBar = waiter.shadowRoot.querySelector('mwc-linear-progress[indeterminate]');
        expect(progressBar).property('closed').to.be.true;
        waiter.waiting = true;
        await waiter.updateComplete;
        expect(progressBar).property('closed').to.be.false;
        waiter.waiting = false;
        await waiter.updateComplete;
        expect(progressBar).property('closed').to.be.true;
    });
    it('revokes `src="blob:..."` URLs after parsing', async () => {
        const emptyBlobURL = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(newEmptySCD('id', '2007B'))], {
            type: 'application/xml',
        }));
        expect(await fetch(emptyBlobURL)).to.be.ok;
        element.setAttribute('src', emptyBlobURL);
        await element.updateComplete;
        expect(element.src).to.be.a('string').and.equal(emptyBlobURL);
        expect(async () => await fetch(emptyBlobURL)).to.throw;
    });
}).timeout(4000);
//# sourceMappingURL=open-scd.test.js.map