import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/compas-editors/sitipe/sitipe-substation.js';
import { SitipeSubstation } from '../../../../src/compas-editors/sitipe/sitipe-substation.js';

describe('sitipe-substation', () => {
  let element: SitipeSubstation;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/Sitipe.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <SitipeSubstation>(
      await fixture(
        html`<sitipe-substation
          .element=${doc.querySelector('Substation')}
          .doc=${doc}
        ></sitipe-substation>`
      )
    );

    await element.updateComplete;
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
