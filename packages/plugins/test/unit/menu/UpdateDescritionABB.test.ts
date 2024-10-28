import { expect, fixture, html } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import {
  ComplexAction,
  isSimple,
  isReplace,
} from '@openscd/core/foundation/deprecated/editor.js';
import UpdateDescriptionAbb from '../../../src/menu/UpdateDescriptionABB.js';

describe('Update method for desc attributes in ABB IEDs', () => {
  if (customElements.get('update-description-abb') === undefined)
    customElements.define('update-description-abb', UpdateDescriptionAbb);

  let parent: MockOpenSCD;
  let element: UpdateDescriptionAbb;

  let editorAction: SinonSpy;

  beforeEach(async () => {
    parent = await fixture(html`
      <mock-open-scd
        ><update-description-abb></update-description-abb
      ></mock-open-scd>
    `);

    element = parent.getActivePlugin();

    editorAction = sinon.spy();
    window.addEventListener('editor-action', editorAction);
  });

  describe('working on SCL files without manufacturer ABB', () => {
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.doc = doc;
      element.run();
      await parent.requestUpdate();
    });

    it('creates an empty wizard indicating not found desc updates', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
  });

  describe('working on SCL files containing manufacturer ABB', () => {
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/updatedesc/updatedescABB.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.doc = doc;
      element.run();
      await parent.requestUpdate();
    });

    it('creates a wizard with all valid desc update possibilities', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('creates wizard that on save triggers a complex action containing selected desc updates', async () => {
      parent.wizardUI?.dialog
        ?.querySelector<HTMLElement>('mwc-button[slot="primaryAction"]')!
        .click();
      await parent.updateComplete;
      expect(editorAction).to.have.been.calledOnce;
      expect(editorAction.args[0][0].detail.action).to.not.satisfy(isSimple);
      const complexAction = <ComplexAction>(
        editorAction.args[0][0].detail.action
      );
      expect(complexAction.actions.length).to.equal(2);
      for (const action of complexAction.actions)
        expect(action).to.satisfy(isReplace);
    });
  });
});
