import {expect, fixture, html} from '@open-wc/testing';

import "../../../src/compas/CompasSaveTo.js";
import {CompasSaveTo} from "../../../src/compas/CompasSaveTo.js";

describe('compas-save-to-create', () => {
  let element: CompasSaveTo;
  const docName = 'station123.scd';
  beforeEach(async () => {
    element = <CompasSaveTo>(
      await fixture(
        html`<compas-save-to .docName="${docName}"></compas-save-to>`
      )
    );
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});

describe('compas-save-to-update', () => {
  let element: CompasSaveTo;
  const docName = 'station123.scd';
  const docId = '6a45ae97-5605-44f8-b4e6-25305bc6c036';
  beforeEach(async () => {
    element = <CompasSaveTo>(
      await fixture(
        html`<compas-save-to .docName="${docName}" .docId="${docId}"></compas-save-to>`
      )
    );
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
