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
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
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

      it('does not allow supervision because the DataTypeTemplate>DOType>DA is missing necessary attributes', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber4"]')!;
        const noSupervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(noSupervisionAllowedActions).to.have.length(0);
      });

      it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=RO] allows it', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber5"]')!;
        const supervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(supervisionAllowedActions).to.have.length(3);
      });

      it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=Conf] allows it', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber6"]')!;
        const supervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(supervisionAllowedActions).to.have.length(3);
      });

      it('does allow supervision node use when first existing supervision node has empty Val element', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber7"]')!;
        const createActionswithEmptyVal: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(createActionswithEmptyVal).to.have.length(1);

        const newValAction: Create = createActionswithEmptyVal[0];
        const valParent: Node = newValAction.new.parent;
        const newValElement: Node = (<Create>newValAction).new.element;
        expect(valParent).to.exist;
        expect(newValElement).to.exist;
        expect(valParent.nodeName).to.be.equal('DAI');
        expect(newValElement.nodeName).to.be.equal('Val');
        expect(newValElement.textContent).to.not.be.empty;
      });

      it('allows supervision and an existing LN[class=LSVS] should be used', () => {
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber2"]')!;
        const createActions: Create[] = instantiateSubscriptionSupervision(
          controlElement!,
          subscriberIED
        );
        expect(createActions).to.have.length(3);

        const newDoiAction: Create = createActions[0];
        const lnParent: Node = newDoiAction.new.parent;
        const newDoiElement: Node = (<Create>newDoiAction).new.element;
        expect(lnParent).to.exist;
        expect(newDoiElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LN');
        expect(newDoiElement.nodeName).to.be.equal('DOI');

        const newDaiAction: Create = createActions[1];
        const daiParent: Node = newDaiAction.new.parent;
        const newDaiElement: Node = (<Create>newDaiAction).new.element;
        expect(daiParent).to.exist;
        expect(newDaiElement).to.exist;
        expect(daiParent.nodeName).to.be.equal('DOI');
        expect(newDaiElement.nodeName).to.be.equal('DAI');

        const newValAction: Create = createActions[2];
        const valParent: Node = newValAction.new.parent;
        const newValElement: Node = (<Create>newValAction).new.element;
        expect(valParent).to.exist;
        expect(newValElement).to.exist;
        expect(valParent.nodeName).to.be.equal('DAI');
        expect(newValElement.nodeName).to.be.equal('Val');
        expect(newValElement.textContent).to.not.be.empty;
      });

      it('allows supervision and an a new LN[class=LSVS] should be created as well', () => {
        controlElement = doc.querySelector(
          'IED[name="SMV_Publisher3"] SampledValueControl[name="fullSmv"]'
        )!;
        subscriberIED = doc.querySelector('IED[name="SMV_Subscriber"]')!;
        const actionsWithNewLn: Create[] = instantiateSubscriptionSupervision(
          controlElement,
          subscriberIED
        );
        expect(actionsWithNewLn).to.have.length(4);

        const newLnAction: Create = actionsWithNewLn[0];
        const lDeviceParent: Node = newLnAction.new.parent;
        const newLnElement: Node = (<Create>newLnAction).new.element;
        expect(lDeviceParent).to.exist;
        expect(newLnElement).to.exist;
        expect(lDeviceParent.nodeName).to.be.equal('LDevice');
        expect(newLnElement.nodeName).to.be.equal('LN');

        const newDoiAction: Create = actionsWithNewLn[1];
        const lnParent: Node = newDoiAction.new.parent;
        const newDoiElement: Node = (<Create>newDoiAction).new.element;
        expect(lnParent).to.exist;
        expect(newDoiElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LN');
        expect(newDoiElement.nodeName).to.be.equal('DOI');

        const newDaiAction: Create = actionsWithNewLn[2];
        const daiParent: Node = newDaiAction.new.parent;
        const newDaiElement: Node = (<Create>newDaiAction).new.element;
        expect(daiParent).to.exist;
        expect(newDaiElement).to.exist;
        expect(daiParent.nodeName).to.be.equal('DOI');
        expect(newDaiElement.nodeName).to.be.equal('DAI');

        const newValAction: Create = actionsWithNewLn[3];
        const valParent: Node = newValAction.new.parent;
        const newValElement: Node = (<Create>newValAction).new.element;
        expect(valParent).to.exist;
        expect(newValElement).to.exist;
        expect(valParent.nodeName).to.be.equal('DAI');
        expect(newValElement.nodeName).to.be.equal('Val');
        expect(newValElement.textContent).to.not.be.empty;
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
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
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

      it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=RO] allows it', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber5"]')!;
        const supervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(supervisionAllowedActions).to.have.length(3);
      });

      it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=Conf] allows it', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber6"]')!;
        const supervisionAllowedActions: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(supervisionAllowedActions).to.have.length(3);
      });

      it('does allow supervision node use when first existing supervision node has empty Val element', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber7"]')!;
        const createActionswithEmptyVal: Create[] =
          instantiateSubscriptionSupervision(controlElement!, subscriberIED);
        expect(createActionswithEmptyVal).to.have.length(1);

        const newValAction: Create = createActionswithEmptyVal[0];
        const valParent: Node = (<Create>newValAction).new.parent;
        const newValElement: Node = (<Create>newValAction).new.element;
        expect(valParent).to.exist;
        expect(newValElement).to.exist;
        expect(valParent.nodeName).to.be.equal('DAI');
        expect(newValElement.nodeName).to.be.equal('Val');
        expect(newValElement.textContent).to.not.be.empty;
      });

      it('allows supervision and an existing LN[class=LGOS] should be used', () => {
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber2"]')!;
        const createActions: Create[] = instantiateSubscriptionSupervision(
          controlElement!,
          subscriberIED
        );
        expect(createActions).to.have.length(3);

        const newDoiAction: Create = createActions[0];
        const lnParent: Node = newDoiAction.new.parent;
        const newDoiElement: Node = (<Create>newDoiAction).new.element;
        expect(lnParent).to.exist;
        expect(newDoiElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LN');
        expect(newDoiElement.nodeName).to.be.equal('DOI');

        const newDaiAction: Create = createActions[1];
        const daiParent: Node = newDaiAction.new.parent;
        const newDaiElement: Node = (<Create>newDaiAction).new.element;
        expect(daiParent).to.exist;
        expect(newDaiElement).to.exist;
        expect(daiParent.nodeName).to.be.equal('DOI');
        expect(newDaiElement.nodeName).to.be.equal('DAI');

        const newValAction: Create = createActions[2];
        const valParent: Node = newValAction.new.parent;
        const newValElement: Node = (<Create>newValAction).new.element;
        expect(valParent).to.exist;
        expect(newValElement).to.exist;
        expect(valParent.nodeName).to.be.equal('DAI');
        expect(newValElement.nodeName).to.be.equal('Val');
        expect(newValElement.textContent).to.not.be.empty;
      });

      it('allows supervision and an a new LN[class=LGOS] should be created as well', () => {
        controlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]'
        )!;
        subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber1"]')!;

        const actionsWithNewLN: Create[] = instantiateSubscriptionSupervision(
          controlElement,
          subscriberIED
        );
        expect(actionsWithNewLN).to.have.length(4);

        const newLnAction: Create = actionsWithNewLN[0];
        const lDeviceParent: Node = newLnAction.new.parent;
        const newLnElement: Node = (<Create>newLnAction).new.element;
        expect(lDeviceParent).to.exist;
        expect(newLnElement).to.exist;
        expect(lDeviceParent.nodeName).to.be.equal('LDevice');
        expect(newLnElement.nodeName).to.be.equal('LN');

        const newDoiAction: Create = actionsWithNewLN[1];
        const lnParent: Node = newDoiAction.new.parent;
        const newDoiElement: Node = (<Create>newDoiAction).new.element;
        expect(lnParent).to.exist;
        expect(newDoiElement).to.exist;
        expect(lnParent.nodeName).to.be.equal('LN');
        expect(newDoiElement.nodeName).to.be.equal('DOI');

        const newDaiAction: Create = actionsWithNewLN[2];
        const daiParent: Node = newDaiAction.new.parent;
        const newDaiElement: Node = (<Create>newDaiAction).new.element;
        expect(daiParent).to.exist;
        expect(newDaiElement).to.exist;
        expect(daiParent.nodeName).to.be.equal('DOI');
        expect(newDaiElement.nodeName).to.be.equal('DAI');

        const newValAction: Create = actionsWithNewLN[3];
        const valParent: Node = newValAction.new.parent;
        const newValElement: Node = (<Create>newValAction).new.element;
        expect(valParent).to.exist;
        expect(newValElement).to.exist;
        expect(valParent.nodeName).to.be.equal('DAI');
        expect(newValElement.nodeName).to.be.equal('Val');
        expect(newValElement.textContent).to.not.be.empty;
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
