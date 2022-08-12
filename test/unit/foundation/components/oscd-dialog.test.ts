import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/foundation/components/oscd-dialog.js';
import { OscdDialog } from '../../../../src/foundation/components/oscd-dialog.js';

describe('user definable dialog web component', () => {
  let element: OscdDialog;
  let xmlElement: Element;

  beforeEach(async () => {
    element = await fixture(html`<oscd-dialog
      ><wizard-textfield label="someLabel" value="someValue"></wizard-textfield
    ></oscd-dialog>`);

    xmlElement = new DOMParser().parseFromString(
      '<testelement><testchild></testchild><testelement>',
      'application/xml'
    ).documentElement;
  });

  describe('without primary action defined', () => {
    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.equalSnapshot());

    it('has no primary action button', () =>
      expect(
        element.shadowRoot?.querySelector('mwc-button[slot="primaryAction"]')
      ).to.not.exist);
  });

  describe('with primary action defined', () => {
    let primaryActionSpy: SinonSpy;
    let primaryAction: () => void;

    beforeEach(async () => {
      primaryAction = () => {
        return;
      };
      primaryActionSpy = spy(primaryAction);

      element.primaryAction = primaryActionSpy;
      element.primaryLabel = 'label';
      element.primaryIcon = 'save';
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.equalSnapshot());

    describe('on primary action button click', () => {
      beforeEach(() => {
        (
          element.shadowRoot?.querySelector(
            'mwc-button[slot="primaryAction"]'
          ) as HTMLElement
        ).click();
      });

      it('triggers the primary action', () =>
        expect(primaryActionSpy).to.have.been.calledOnce);
    });
  });

  describe('with element property set', () => {
    beforeEach(async () => {
      element.element = xmlElement;
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.equalSnapshot());
  });

  describe('with code action set', () => {
    let codeActionSpy: SinonSpy;
    let codeAction: () => void;

    beforeEach(async () => {
      codeAction = () => {
        return;
      };
      codeActionSpy = spy(codeAction);
      element.codeAction = codeActionSpy;

      await element.requestUpdate();
    });

    describe('and element property set', () => {
      beforeEach(async () => {
        element.element = xmlElement;
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element).shadowDom.equalSnapshot());

      describe('on code action button click', () => {
        beforeEach(() => {
          (
            element.shadowRoot?.querySelector(
              'mwc-button[slot="primaryAction"]'
            ) as HTMLElement
          ).click();
        });

        it('triggers the primary action', () =>
          expect(codeActionSpy).to.have.been.calledOnce);
      });
    });

    describe('with element property NOT set', () => {
      it('does not render code action button', () =>
        expect(
          element.shadowRoot.querySelector('mwc-button[id="codeActionButton"]')
        ).to.not.exist);
    });
  });
});
