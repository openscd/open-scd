import { fixture, html, expect } from '@open-wc/testing';

import "../../../src/compas/CompasChangeSet.js";
import {CompasChangeSetRadiogroup} from "../../../src/compas/CompasChangeSet.js";

describe('compas-changeset-radiogroup', () => {
  let element: CompasChangeSetRadiogroup;
  beforeEach(async () => {
    element = <CompasChangeSetRadiogroup>(
      await fixture(
        html`<compas-changeset-radiogroup></compas-changeset-radiogroup>`
      )
    );
  });

  it('has 3 item entries', () => {
    expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-radio-list-item'))
      .to.have.length(3)
  });

  it('has the correct value for MAJOR Item', () => {
    expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-radio-list-item[value = "MAJOR"]'))
      .to.have.text("Major change")
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
