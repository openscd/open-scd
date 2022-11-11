import { expect } from '@open-wc/testing';

import {
  instantiateSubscriptionSupervision,
  removeSubscriptionSupervision,
} from '../../../../src/editors/subscription/foundation.js';

import { Create, Delete } from '../../../../src/foundation.js';

describe('supervision', () => {
  let doc: XMLDocument;
  let controlElement: Element | null;
  let subscriberIED: Element | null;

  describe('when subscribing to a SampledValueControl', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/VS893-LaterBindingSMV-LSVS.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    describe('produces the correct structure where supervision is allowed', () => {
      beforeEach(() => {
        controlElement = doc.querySelector(
          'IED[name="SMV_Publisher4"] SampledValueControl[name="voltageOnly"]'
        )!;
      });

      it('does not allow supervision because there is no services defined in the IED', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber3"]')!;
        const noSupervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(noSupervisionAllowedActions).to.have.length(0);
      });

      it('does not allow supervision because the DataTypeTemplate>DOType>DA is missing necessary attributes ', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber4"]')!;
        const noSupervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(noSupervisionAllowedActions).to.have.length(0);
      });

      it('allows supervision and an existing LN[class=LSVS] should be used', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber2"]')!;
        const createActions: Create[] = instantiateSubscriptionSupervision(
          controlElement!,
          subscriberIED
        );
        expect(createActions).to.have.length(1);
        const createAction: Create = createActions[0];
        const parentElement: Node = createAction.new.parent;
        const newElement: Node = createAction.new.element;
        expect(parentElement).to.exist;
        expect(newElement).to.exist;
        expect(parentElement.nodeName).to.be.equal('LN');
        expect(newElement.nodeName).to.be.equal('DOI');
      });

      it('allows supervision and an a new LN[class=LSVS] should be created as well', () => {
        controlElement = doc.querySelector(
          'IED[name="SMV_Publisher3"] SampledValueControl[name="fullSmv"]'
        )!;
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber"]')!;
        const createActionsWithNewLn: Create[] =
          instantiateSubscriptionSupervision(controlElement, subscriberIED);
        expect(createActionsWithNewLn).to.have.length(2);
        const newLnAction: Create = createActionsWithNewLn[0];
        const lDeviceParent: Node = newLnAction.new.parent;
        const newLnElement: Node = newLnAction.new.element;
        expect(lDeviceParent).to.exist;
        expect(newLnElement).to.exist;
        expect(lDeviceParent.nodeName).to.be.equal('LDevice');
        expect(newLnElement.nodeName).to.be.equal('LN');

        const newDoiAction: Create = createActionsWithNewLn[1];
        const lnParent: Node = newDoiAction.new.parent;
        const newDoiElement: Node = newDoiAction.new.element;
        expect(lnParent).to.exist;
        expect(newDoiElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LN');
        expect(newDoiElement.nodeName).to.be.equal('DOI');
      });
    });

    describe('removes the correct elements when supervision is removed', () => {
      beforeEach(() => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber"]');
      });
      it('allows removing supervision in a vendor-created LN', () => {
        controlElement = doc.querySelector(
          'IED[name="SMV_Publisher2"] SampledValueControl[name="fullSmv"]'
        )!;
        const removeActions: Delete[] = removeSubscriptionSupervision(
          controlElement,
          subscriberIED!
        );
        expect(removeActions).to.have.length(1);
        const removeAction: Delete = removeActions[0];
        const parentElement: Node = removeAction.old.parent;
        const element: Node = removeAction.old.element;
        expect(parentElement).to.exist;
        expect(element).to.exist;
        expect(parentElement.nodeName).to.be.equal('LN');
        expect(element.nodeName).to.be.equal('DOI');
      });
      it('allows removing supervision in an OpenSCD-created LN', () => {
        controlElement = doc.querySelector(
          'IED[name="SMV_Publisher2"] SampledValueControl[name="voltageOnly"]'
        )!;
        const removeActionsWithRemovedLn: Delete[] =
          removeSubscriptionSupervision(controlElement, subscriberIED!);
        expect(removeActionsWithRemovedLn).to.have.length(1);
        const removeLnAction: Delete = removeActionsWithRemovedLn[0];
        const lnParent: Node = removeLnAction.old.parent;
        const lnElement: Node = removeLnAction.old.element;
        expect(lnParent).to.exist;
        expect(lnElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LDevice');
        expect(lnElement.nodeName).to.be.equal('LN');
      });
    });
  });

  describe('when subscribing to a GSEControl', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/VS893_LaterBindingGOOSE-LGOS.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    describe('produces the correct structure where supervision is allowed', () => {
      beforeEach(() => {
        controlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]'
        )!;
      });
      it('does not allow supervision because there is no services defined in the IED', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber"]')!;
        const noSupervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(noSupervisionAllowedActions).to.have.length(0);
      });
      it('does not allow supervision because the DataTypeTemplate>DOType>DA is missing necessary attributes ', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber4"]')!;
        const noSupervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(noSupervisionAllowedActions).to.have.length(0);
      });
      it('allows supervision and an existing LN[class=LGOS] should be used', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber2"]')!;
        const createActions: Create[] = instantiateSubscriptionSupervision(
          controlElement!,
          subscriberIED
        );
        expect(createActions).to.have.length(1);
        const createAction: Create = createActions[0];
        const parentElement: Node = createAction.new.parent;
        const newElement: Node = createAction.new.element;
        expect(parentElement).to.exist;
        expect(newElement).to.exist;
        expect(parentElement.nodeName).to.be.equal('LN');
        expect(newElement.nodeName).to.be.equal('DOI');
      });
      it('allows supervision and an a new LN[class=LGOS] should be created as well', () => {
        controlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]'
        )!;
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber1"]')!;

        const createActionsWithNewLn: Create[] =
          instantiateSubscriptionSupervision(controlElement, subscriberIED);
        expect(createActionsWithNewLn).to.have.length(2);
        const newLnAction: Create = createActionsWithNewLn[0];
        const lDeviceParent: Node = newLnAction.new.parent;
        const newLnElement: Node = newLnAction.new.element;
        expect(lDeviceParent).to.exist;
        expect(newLnElement).to.exist;
        expect(lDeviceParent.nodeName).to.be.equal('LDevice');
        expect(newLnElement.nodeName).to.be.equal('LN');

        const newDoiAction: Create = createActionsWithNewLn[1];
        const lnParent: Node = newDoiAction.new.parent;
        const newDoiElement: Node = newDoiAction.new.element;
        expect(lnParent).to.exist;
        expect(newDoiElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LN');
        expect(newDoiElement.nodeName).to.be.equal('DOI');
      });
    });

    describe('removes the correct elements when supervision is removed', () => {
      beforeEach(() => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber1"]')!;
      });
      it('allows removing supervision in a vendor-created LN', () => {
        controlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE2"]'
        )!;
        const removeActions: Delete[] = removeSubscriptionSupervision(
          controlElement,
          subscriberIED!
        );
        expect(removeActions).to.have.length(1);
        const removeAction: Delete = removeActions[0];
        const parentElement: Node = removeAction.old.parent;
        const element: Node = removeAction.old.element;
        expect(parentElement).to.exist;
        expect(element).to.exist;
        expect(parentElement.nodeName).to.be.equal('LN');
        expect(element.nodeName).to.be.equal('DOI');
      });
      it('allows removing supervision in an OpenSCD-created LN', () => {
        controlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE1"]'
        )!;
        const removeActionsWithRemovedLn: Delete[] =
          removeSubscriptionSupervision(controlElement, subscriberIED!);
        expect(removeActionsWithRemovedLn).to.have.length(1);
        const removeLnAction: Delete = removeActionsWithRemovedLn[0];
        const lnParent: Node = removeLnAction.old.parent;
        const lnElement: Node = removeLnAction.old.element;
        expect(lnParent).to.exist;
        expect(lnElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LDevice');
        expect(lnElement.nodeName).to.be.equal('LN');
      });
      it('does not allow removing supervision because other data attributes are still using it', () => {
        controlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]'
        )!;
        const removeActions: Delete[] = removeSubscriptionSupervision(
          controlElement,
          subscriberIED!
        );
        expect(removeActions).to.have.length(0);
      });
    });
  });
});
