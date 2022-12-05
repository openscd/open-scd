import { expect } from '@open-wc/testing';

import {
  buildDocName,
  compareVersions,
  getTypeFromDocName,
  stripExtensionFromName,
} from '../../../src/compas/foundation.js';

describe('compas-foundation', () => {
  describe('getTypeFromDocName', () => {
    it('when retrieve type from name, but name has no extension a exception is thrown', () => {
      const name = 'just-some-station';
      expect(() => getTypeFromDocName(name)).to.throw('[compas.error.type]');
    });

    it('when retrieve type from name and name has a extension, the extension will be the type', () => {
      const name = 'just-some-station';
      const extension = 'scd';
      expect(getTypeFromDocName(name + '.' + extension)).to.be.equal(
        extension.toUpperCase()
      );
    });
  });

  describe('stripExtensionFromName', () => {
    it('when name is passed without extenions the same name is returned', () => {
      const name = 'just-some-station';
      expect(stripExtensionFromName(name)).to.be.equal(name);
    });

    it('when name is passed with extenions the stripped name is returned', () => {
      const name = 'just-some-station';
      const extension = 'scd';
      expect(stripExtensionFromName(name + '.' + extension)).to.be.equal(name);
    });

    it('when name is passed with length 3 the same name is returned', () => {
      const name = 'sml';
      expect(stripExtensionFromName(name)).to.be.equal(name);
    });
  });

  describe('buildDocName', () => {
    it('when there are no CoMPAS Private Elements', async () => {
      const doc = await fetch(
        '/test/testfiles/compas/compas-scl-private-missing-private.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      expect(buildDocName(doc.documentElement)).to.be.equal(
        'id-value-3.0.0.scd'
      );
    });

    it('when there are CoMPAS Private Elements', async () => {
      const doc = await fetch(
        '/test/testfiles/compas/compas-scl-private-update-existing.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      expect(buildDocName(doc.documentElement)).to.be.equal(
        'existing-3.0.0.cid'
      );
    });
  });

  describe('compareVersions', () => {
    it('when comparing non version strings, nothing is changed', () => {
      expect(compareVersions('bbb', 'aaa')).to.be.equal(0);
      expect(compareVersions('aaa', 'bbb')).to.be.equal(0);
      expect(compareVersions('a.a.a', 'b.b.b')).to.be.equal(0);
    });

    it('when comparing same versions then 0 returned', () => {
      expect(compareVersions('1.2.3', '1.2.3')).to.be.equal(0);
      expect(compareVersions('10.2.3', '10.2.3')).to.be.equal(0);
    });

    it('when comparing two versions with different major digits then the major versions are leading', () => {
      expect(compareVersions('1.3.0', '2.0.0')).to.be.equal(-1);
      expect(compareVersions('1.3.0', '10.0.0')).to.be.equal(-1);

      expect(compareVersions('2.0.0', '1.3.0')).to.be.equal(1);
      expect(compareVersions('10.0.0', '1.3.0')).to.be.equal(1);
    });

    it('when comparing two versions with different minor digits then the minor versions are leading', () => {
      expect(compareVersions('1.3.0', '1.4.0')).to.be.equal(-1);
      expect(compareVersions('1.3.0', '1.10.0')).to.be.equal(-1);

      expect(compareVersions('1.4.0', '1.3.0')).to.be.equal(1);
      expect(compareVersions('1.10.0', '1.3.0')).to.be.equal(1);
    });

    it('when comparing two versions with different patch digits then the patch versions are leading', () => {
      expect(compareVersions('1.1.3', '1.1.4')).to.be.equal(-1);
      expect(compareVersions('1.1.3', '1.1.10')).to.be.equal(-1);

      expect(compareVersions('1.1.4', '1.1.3')).to.be.equal(1);
      expect(compareVersions('1.1.10', '1.1.3')).to.be.equal(1);
    });
  });
});
