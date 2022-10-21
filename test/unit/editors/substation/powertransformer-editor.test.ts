import { fixture, html, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/substation/powertransformer-editor.js';

import { PowerTransformerEditor } from '../../../../src/editors/substation/powertransformer-editor.js';
import { isDelete } from '../../../../src/foundation.js';

describe('powertransformer-editor', () => {
  let element: PowerTransformerEditor;
  let validSCL: XMLDocument;

  let wizardEvent: SinonSpy;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <PowerTransformerEditor>(
      await fixture(
        html`<powertransformer-editor
          .element=${validSCL.querySelector('PowerTransformer')}
        ></powertransformer-editor>`
      )
    );

    wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);
    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('rendered as action icon', () => {
    beforeEach(async () => {
      element.showfunctions = false;
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('triggers edit wizard for Linking LNode element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-fab[icon="account_tree"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'lnode'
      );
    });

    it('triggers edit wizard for PowerTransformer element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'edit'
      );
    });

    it('triggers remove powertransformer action on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.not.have.been.called;
      expect(actionEvent).to.have.been.calledOnce;
      expect(actionEvent.args[0][0].detail.action).to.satisfy(isDelete);
    });
  });

  describe('rendered as action pane', () => {
    beforeEach(async () => {
      element.showfunctions = true;
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('with EqFunction children', () => {
      beforeEach(async () => {
        const doc = await fetch('/test/testfiles/zeroline/functions.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('PowerTransformer[name="myPtr2"]')!;
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element).shadowDom.to.equalSnapshot());
    });

    describe('with LNode children', () => {
      beforeEach(async () => {
        const doc = await fetch('/test/testfiles/zeroline/functions.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('PowerTransformer[name="myPtr1"]')!;
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element).shadowDom.to.equalSnapshot());
    });

    describe('with SubEquipment children', () => {
      beforeEach(async () => {
        const doc = await fetch('/test/testfiles/SubEquipment.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('PowerTransformer[name="pTrans"]')!;
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    it('triggers edit wizard for Linking LNode element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector(
          'mwc-icon-button[icon="account_tree"]'
        )
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'lnode'
      );
    });

    it('triggers edit wizard for PowerTransformer element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'edit'
      );
    });

    it('triggers remove powertransformer action on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.not.have.been.called;
      expect(actionEvent).to.have.been.calledOnce;
      expect(actionEvent.args[0][0].detail.action).to.satisfy(isDelete);
    });
  });
});
