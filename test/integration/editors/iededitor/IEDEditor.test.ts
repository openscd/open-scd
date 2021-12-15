import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';

import IEDEditor from '../../../../src/editors/IEDEditor.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';
import { Select } from '@material/mwc-select';

describe('IED Editor Plugin', () => {
  customElements.define(
    'iededitor-plugin',
    Wizarding(Editing(IEDEditor))
  );
  let element: IEDEditor;
  beforeEach(async () => {
    element = await fixture(
      html`<iededitor-plugin></iededitor-plugin>`
    );
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded including IED sections', () => {
    let doc: XMLDocument;
    let element: IEDEditor;
    let selector: Select;
    
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<iededitor-plugin .doc="${doc}"></iededitor-plugin>`
      );
    });
    it('it initially contains 1 rendered IED container', () => {
      expect(element.shadowRoot?.querySelectorAll('ied-container').length).to.eql(1);
      expect(element.shadowRoot?.querySelector('ied-container')!.shadowRoot?.innerHTML).to.include('IED1');
    });
    it('it selects another IED after using the drop down box', async () => {
      selector = <Select>(
        element.shadowRoot?.querySelector('mwc-select')
      );
      selector.value = "IED3"
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelectorAll('ied-container').length).to.eql(1);
      expect(element.shadowRoot?.querySelector('ied-container')!.shadowRoot?.innerHTML).to.include('IED3');
    });
  });
});
