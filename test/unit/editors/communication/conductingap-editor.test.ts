import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/communication/connectedap-editor.js';
import { ConnectedAPEditor } from '../../../../src/editors/communication/connectedap-editor.js';

describe('connectedap-editor', () => {
  let element: ConnectedAPEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <ConnectedAPEditor>(
      await fixture(
        html`<connectedap-editor
          .element=${validSCL.querySelector(
            'SubNetwork[name="StationBus"] > ConnectedAP'
          )}
        ></connectedap-editor>`
      )
    );
  });

  it('has a apName property', () =>
    expect(element).to.have.property(
      'apName',
      validSCL
        .querySelector('SubNetwork[name="StationBus"] > ConnectedAP')
        ?.getAttribute('apName')
    ));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
