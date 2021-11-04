import { fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/communication/subnetwork-editor.js';
import { SubNetworkEditor } from '../../../../src/editors/communication/subnetwork-editor.js';
import { html } from '../../../../src/foundation.js';

describe('subnetwork-editor', () => {
  let element: SubNetworkEditor;
  let validSCL: XMLDocument;
  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <SubNetworkEditor>(
      await fixture(
        html`<subnetwork-editor
          .element=${validSCL.querySelector('SubNetwork')}
        ></subnetwork-editor>`
      )
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'StationBus'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'desc'));

  it('has a type property', () =>
    expect(element).to.have.property('type', '8-MMS'));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
