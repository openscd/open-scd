import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { isSimple, ComplexAction } from '@openscd/core/foundation/deprecated/editor.js';

import {
  remove104Private,
  showDOIInfoWizard,
} from '../../../../../src/editors/protocol104/wizards/doi.js';

import { fetchDoc } from '../../../wizards/test-support.js';

describe('Wizards for 104 DOI Element', () => {
  let doc: XMLDocument;
  let doiElement: Element;
  let element: OscdWizards;

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses.scd');
    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
  });

  describe('show 104 DOI Basic Info (Known CDC Monitor Only)', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"] DOI[name="Op"]'
      )!;

      const wizard = showDOIInfoWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show 104 DOI Basic Info with ctlModel (Known CDC Monitor and Control)', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="CmdBlk"]'
      )!;

      const wizard = showDOIInfoWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show 104 DOI Basic Info for CDC=ACD', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"] DOI[name="Str"]'
      )!;

      const doElement = doc
        .querySelector('LNodeType[id="SE_GAPC_SET_V001"] > DO[name="Str"]')
        ?.getAttribute('type')!;

      expect(doElement).to.be.equal('SE_ACD_V001');

      const doType = doc.querySelector(`DOType[id="${doElement}"]`)!;
      expect(doType.getAttribute('cdc')).to.be.equal('ACD');

      const wizard = showDOIInfoWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show 104 DOI Basic Info for CDC=DEL', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="PPV"]'
      )!;

      const doElement = doc
        .querySelector('LNodeType[id="SE_MMXU_SET_V001"] > DO[name="PPV"]')
        ?.getAttribute('type')!;

      expect(doElement).to.be.equal('SE_DEL_V001');
      const doType = doc.querySelector(`DOType[id="${doElement}"]`)!;
      expect(doType.getAttribute('cdc')).to.be.equal('DEL');
    });
  });

  describe('remove104Private', () => {
    let wizard: Element;
    let actionEvent: SinonSpy;

    beforeEach(async () => {
      // We just need some element as Wizard for dispatching.
      wizard = document.firstElementChild!;

      actionEvent = spy();
      wizard.addEventListener('editor-action', actionEvent);
    });

    function expectComplexAction(expectedActions: number) {
      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.not.satisfy(isSimple);
      const complexAction = <ComplexAction>action;
      expect(complexAction.actions.length).to.be.equal(expectedActions);
    }

    it('expected one Private Element to be removed', () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="SPCSO1"]'
      )!;

      remove104Private(doiElement)(wizard);

      expectComplexAction(1);
    });

    it('expected multiple Private Elements to be removed', () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"]'
      )!;

      remove104Private(doiElement)(wizard);

      expectComplexAction(6);
    });
  });
});
