import { fixture, html, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/substation/conducting-equipment-editor.js';
import { ConductingEquipmentEditor } from '../../../../src/editors/substation/conducting-equipment-editor.js';
import { isDelete } from '../../../../src/foundation.js';

describe('conducting-equipment-editor', () => {
  let element: ConductingEquipmentEditor;
  let validSCL: XMLDocument;

  let wizardEvent: SinonSpy;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <ConductingEquipmentEditor>(
      await fixture(
        html`<conducting-equipment-editor
          .element=${validSCL.querySelector('ConductingEquipment')}
        ></conducting-equipment-editor>`
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

    it('renders empty string in case ConductingEquipment name attribute is missing', async () => {
      const condEq = validSCL.querySelector('ConductingEquipment');
      condEq?.removeAttribute('name');
      await element.requestUpdate();

      expect(element).to.have.property('name', '');
    });

    it('triggers edit wizard for LNode element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-fab[icon="account_tree"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'lnode'
      );
    });

    it('triggers edit wizard for ConductingEquipment element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'edit'
      );
    });

    it('triggers remove action on action button click', async () => {
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

        element.element = doc.querySelector(
          'Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QA1"]'
        )!;
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

        element.element = doc.querySelector(
          'Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QC9"]'
        )!;
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

        element.element = doc.querySelector('ConductingEquipment[name="QA1"]')!;
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    it('renders empty string in case ConductingEquipment name attribute is missing', async () => {
      const condEq = validSCL.querySelector('ConductingEquipment');
      condEq?.removeAttribute('name');
      await element.requestUpdate();

      expect(element).to.have.property('name', '');
    });

    it('triggers edit wizard for LNode element on action button click', async () => {
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

    it('triggers edit wizard for ConductingEquipment element on action button click', async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();

      await element.requestUpdate();

      expect(wizardEvent).to.have.be.calledOnce;
      expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
        'edit'
      );
    });

    it('triggers remove action on action button click', async () => {
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
