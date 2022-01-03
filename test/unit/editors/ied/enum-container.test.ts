import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/enum-container.js';
import { EnumContainer } from '../../../../src/editors/ied/enum-container.js';

describe('enum-container', () => {
  let element: EnumContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with an EnumVal element.', async () => {
    element = await fixture(html`<enum-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > EnumType[id="Dummy_ctlModel"] > EnumVal[ord="2"]')}
    ></enum-container>`);

    expect(element).shadowDom.to.equalSnapshot();
    expect(element.shadowRoot!.querySelector('action-pane')?.shadowRoot?.innerHTML).to.include('sbo-with-normal-security');
  });
});
