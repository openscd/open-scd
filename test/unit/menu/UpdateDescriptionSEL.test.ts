import {expect, fixture, html} from '@open-wc/testing';
import {SinonSpy, spy} from 'sinon';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { ComplexAction, isSimple, isReplace } from '../../../src/foundation.js';
import UpdateDescriptionSel from '../../../src/menu/UpdateDescriptionSEL.js';

describe('Update method for desc attributes in SEL IEDs', () => {
  if (customElements.get('update-description-sel') === undefined)
    customElements.define('update-description-sel', UpdateDescriptionSel);

  let parent: MockWizardEditor;
  let element: UpdateDescriptionSel;

  let wizardAction: SinonSpy;
  let editorAction: SinonSpy;

  let signalList: string;

  beforeEach(async () => {
    parent = await fixture(html`
      <mock-wizard-editor
        ><update-description-sel></update-description-sel
      ></mock-wizard-editor>
    `);
    await parent.requestUpdate();
    await parent.updateComplete;

    element = <UpdateDescriptionSel>(
      parent.querySelector('update-description-sel')!
    );
    await element.requestUpdate();
    await element.updateComplete;

    editorAction = spy();
    window.addEventListener('editor-action', editorAction);
    wizardAction = spy();
    window.addEventListener('wizard', wizardAction);
  });

  it('allows to select signal list only as csv file', async () => {
    expect(element.pluginFileUI).to.have.property('accept', '.csv');
    expect(element.pluginFileUI).to.have.property('type', 'file');
  });

  it('allows to select signal list as csv file', async () => {
    await element.run();
  });

  describe('working on SCL files without manufacturer SEL', () => {
    beforeEach(async () => {
      element.doc = await fetch('test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      signalList = await fetch(
        'test/testfiles/updatedesc/testSignalListSemicolon.csv'
      ).then(response => response.text());

      element.processSignalList(signalList);
      await parent.requestUpdate();
      await parent.updateComplete;
    });

    it('cannot find any desc fields to update', async () => {
      expect(wizardAction).to.have.been.calledOnce;
      expect(parent.wizardUI.dialog?.querySelector('mwc-checked-list-item')).to
        .be.null;
    });
  });

  describe('working on SCL files containing manufacturer SEL', () => {
    beforeEach(async () => {
      element.doc = await fetch('test/testfiles/updatedesc/updatedescSEL.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    describe('using a semicolon separated file', () => {
      beforeEach(async () => {
        signalList = await fetch(
          'test/testfiles/updatedesc/testSignalListSemicolon.csv'
        ).then(response => response.text());

        element.processSignalList(signalList);
        await parent.requestUpdate();
        await parent.updateComplete;
      });

      it('creates filtered list with all proposed desc attribute updates', async () => {
        await expect(parent.wizardUI.dialog).dom.to.equalSnapshot();
      });

      it('allows to update selected desc attributes updates', async () => {
        parent.wizardUI?.dialog
          ?.querySelector<HTMLElement>('mwc-button[slot="primaryAction"]')!
          .click();

        await parent.requestUpdate();
        await parent.updateComplete;
        expect(editorAction).to.have.been.calledOnce;
        expect(editorAction.args[0][0].detail.action).to.not.satisfy(isSimple);
        const complexAction = <ComplexAction>(
          editorAction.args[0][0].detail.action
        );
        expect(complexAction.actions.length).to.equal(7);
        for (const action of complexAction.actions)
          expect(action).to.satisfy(isReplace);
      });
    });

    describe('using a comma separated (CSV) file', () => {
      beforeEach(async () => {
        signalList = await fetch(
          'test/testfiles/updatedesc/testSignalListComma.csv'
        ).then(response => response.text());

        element.processSignalList(signalList);
        await parent.requestUpdate();
        await parent.updateComplete;
      });

      it('creates filtered list with all proposed desc attribute updates', async () => {
        await expect(parent.wizardUI.dialog).dom.to.equalSnapshot();
      });

      it('allows to update selected desc attributes updates', async () => {
        parent.wizardUI?.dialog
          ?.querySelector<HTMLElement>('mwc-button[slot="primaryAction"]')!
          .click();

        await parent.requestUpdate();
        await parent.updateComplete;
        expect(editorAction).to.have.been.calledOnce;
        expect(editorAction.args[0][0].detail.action).to.not.satisfy(isSimple);
        const complexAction = <ComplexAction>(
          editorAction.args[0][0].detail.action
        );
        expect(complexAction.actions.length).to.equal(7);
        for (const action of complexAction.actions)
          expect(action).to.satisfy(isReplace);
      });
    });
  });
});
