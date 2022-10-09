import { expect } from '@open-wc/testing';

import {
  instantiateSubscriptionSupervision,
  // removeSubscriptionSupervision,
} from '../../../../src/editors/subscription/foundation.js';

import { Create } from '../../../../src/foundation.js';

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

    it('produces the correct structure where supervision is allowed', () => {
      controlElement = doc.querySelector(
        'IED[name="SMV_Publisher4"] SampledValueControl[name="voltageOnly"]'
      )!;
      subscriberIED = doc.querySelector('IED[name="SMV_Subscriber2"]')!;
      const createActions: Create[] = instantiateSubscriptionSupervision(
        controlElement,
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
});
