import { html, fixture, expect } from '@open-wc/testing';

import '../../mock-wizard.js';
import '../../../src/editors/IED.js';

import IED from '../../../src/editors/IED.js';
import { Editing } from '../../../src/Editing.js';
import { Wizarding } from '../../../src/Wizarding.js';
import { Select } from '@material/mwc-select';

describe('IED Plugin', () => {
  if (customElements.get('ied-plugin') === undefined)
    customElements.define('ied-plugin', Wizarding(Editing(IED)));
  let element: IED;

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<ied-plugin></ied-plugin>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded', () => {
    let doc: XMLDocument;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<ied-plugin .doc="${doc}"></ied-plugin>`
      );
    });
    
    it('including IED without a name looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('including valid IED sections', () => {
      let selector: Select;

      it('it initially contains 1 rendered IED container', () => {
        expect(element.shadowRoot?.querySelectorAll('ied-container').length).to.eql(1);
        expect(element.shadowRoot?.querySelector('ied-container')!
          .shadowRoot?.querySelector('action-pane')!.shadowRoot?.innerHTML).to.include('IED1');
      });

      it('it selects another IED after using the drop down box', async () => {
        selector = <Select>(
          element.shadowRoot?.querySelector('mwc-select[class="iedSelect"]')
        );
        selector.value = "IED3"
        await element.requestUpdate();
        await element.updateComplete;

        expect(element.shadowRoot?.querySelectorAll('ied-container').length).to.eql(1);
        expect(element.shadowRoot?.querySelector('ied-container')!
          .shadowRoot?.querySelector('action-pane')!.shadowRoot?.innerHTML).to.include('IED3');
      });

      it('renders the path of elements correctly', async () => {
        const iedContainer = element.shadowRoot?.querySelector('ied-container');
        expect(element.shadowRoot?.querySelector('element-path')?.shadowRoot?.querySelector('h3')?.textContent).to.be.empty;

        iedContainer!.dispatchEvent(new Event('focus'));
        await element.updateComplete;

        expect(element.shadowRoot?.querySelector('element-path')?.shadowRoot?.querySelector('h3')?.textContent).to.eql('IED3');

        const serverContainer = iedContainer
          ?.shadowRoot?.querySelector('access-point-container')
          ?.shadowRoot?.querySelector('server-container');

        serverContainer!.dispatchEvent(new Event('focus'));
        await element.updateComplete;

        expect(element.shadowRoot?.querySelector('element-path')?.shadowRoot?.querySelector('h3')?.textContent).to.eql('IED3 / P1 / Server');

        iedContainer!.dispatchEvent(new Event('blur'));
        await element.updateComplete;

        expect(element.shadowRoot?.querySelector('element-path')?.shadowRoot?.querySelector('h3')?.textContent).to.be.empty;
      });
    });
  });
});
