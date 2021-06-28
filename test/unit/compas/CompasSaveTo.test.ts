import { fixture, html, expect } from '@open-wc/testing';

import "../../../src/compas/CompasChangeSet.js";
import {CompasSaveTo} from "../../../src/compas/CompasSaveTo.js";
import {getTypeFromDocName, stripExtensionFromName} from "../../../src/compas/foundation.js";

describe('compas-save-to-common', () => {
  it('when retrieve type from name, but name has no extension a exception is thrown', () => {
    const name = 'just-some-station';
    expect(() => getTypeFromDocName(name)).to.throw('Unable to determine type from document name!');
  })

  it('when retrieve type from nameand name has a extension, the extension will be the type', () => {
    const name = 'just-some-station';
    const extension = 'scd';
    expect(getTypeFromDocName(name + '.' + extension)).to.be.equal(extension);
  });

  it('when name is passed without extenions the same name is returned', () => {
    const name = 'just-some-station';
    expect(stripExtensionFromName(name)).to.be.equal(name);
  });

  it('when name is passed with extenions the same name is returned', () => {
    const name = 'just-some-station';
    const extension = 'scd';
    expect(stripExtensionFromName(name + '.' + extension)).to.be.equal(name);
  });
});

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
