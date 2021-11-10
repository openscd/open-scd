import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/SLD/substation-sld.js';
import { SubstationSld } from '../../../../src/editors/SLD/substation-sld.js';

describe('substation-sld', () => {
  let element: SubstationSld;
  let validSCL: XMLDocument;
  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <SubstationSld>(
      await fixture(
        html`<substation-sld
          .element=${validSCL.querySelector('Substation')}
        ></substation-sld>`
      )
    );
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
