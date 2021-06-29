import {expect} from '@open-wc/testing';

import {getTypeFromDocName, stripExtensionFromName} from "../../../src/compas/foundation.js";

describe('compas-foundation', () => {
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
