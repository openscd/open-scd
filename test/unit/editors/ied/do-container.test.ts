import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/do-container.js';
import { DOContainer } from '../../../../src/editors/ied/do-container.js';

describe('do-container', () => {
  let element: DOContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a DO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > LNodeType[lnClass="LLN0"] > DO[name="Mod"]')}
    ></do-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a SDO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someSdo"]')}
    ></do-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });
});
