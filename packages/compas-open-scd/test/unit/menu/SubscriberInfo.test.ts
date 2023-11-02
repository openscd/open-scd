import { expect } from '@open-wc/testing';

import { createMissingIEDNameSubscriberInfo } from '../../../src/menu/SubscriberInfo.js';
import { Create, isCreate, SimpleAction } from '../../../src/foundation.js';

describe('menu plugin adding subscriber info', () => {
  describe('for Edition2 and higher files', () => {
    let doc: Document;
    let actions: SimpleAction[];

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/subscriberinfo2007.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      actions = createMissingIEDNameSubscriberInfo(doc);
    });

    it('does create one action per necessary IEDName creation', () => {
      expect(actions.length).to.equal(4);
    });

    it('creates correct IEDName element referencing LN0 element', () => {
      expect(actions[0]).to.satisfy(isCreate);
      expect(
        (<Element>(<Create>actions[0]).new.element).getAttribute('apRef')
      ).to.equal('P1');
      expect(
        (<Element>(<Create>actions[0]).new.element).getAttribute('ldInst')
      ).to.equal('CBSW');
      expect(
        (<Element>(<Create>actions[0]).new.element).getAttribute('prefix')
      ).to.equal('');
      expect(
        (<Element>(<Create>actions[0]).new.element).getAttribute('lnClass')
      ).to.equal('LLN0');
      expect(
        (<Element>(<Create>actions[0]).new.element).getAttribute('lnInst')
      ).to.equal(null);
      expect((<Create>actions[0]).new.element.textContent).to.equal('IED2');
    });

    it('creates correct IEDName element referencing LN element', () => {
      expect(actions[1]).to.satisfy(isCreate);
      expect(
        (<Element>(<Create>actions[1]).new.element).getAttribute('apRef')
      ).to.equal('P1');
      expect(
        (<Element>(<Create>actions[1]).new.element).getAttribute('ldInst')
      ).to.equal('CBSW');
      expect(
        (<Element>(<Create>actions[1]).new.element).getAttribute('prefix')
      ).to.equal('');
      expect(
        (<Element>(<Create>actions[1]).new.element).getAttribute('lnClass')
      ).to.equal('XSWI');
      expect(
        (<Element>(<Create>actions[1]).new.element).getAttribute('lnInst')
      ).to.equal('1');
      expect((<Create>actions[1]).new.element.textContent).to.equal('IED2');
    });

    it('creates correct IEDName element referencing LN element', () => {
      expect(actions[2]).to.satisfy(isCreate);
      expect(
        (<Element>(<Create>actions[2]).new.element).getAttribute('apRef')
      ).to.equal('P1');
      expect(
        (<Element>(<Create>actions[2]).new.element).getAttribute('ldInst')
      ).to.equal('Disconnectors');
      expect(
        (<Element>(<Create>actions[2]).new.element).getAttribute('prefix')
      ).to.equal('DC');
      expect(
        (<Element>(<Create>actions[2]).new.element).getAttribute('lnClass')
      ).to.equal('CSWI');
      expect(
        (<Element>(<Create>actions[2]).new.element).getAttribute('lnInst')
      ).to.equal('1');
      expect((<Create>actions[2]).new.element.textContent).to.equal('IED1');
    });

    it('creates correct IEDName element referencing LN element', () => {
      expect(actions[3]).to.satisfy(isCreate);
      expect(
        (<Element>(<Create>actions[3]).new.element).getAttribute('apRef')
      ).to.equal('P1');
      expect(
        (<Element>(<Create>actions[3]).new.element).getAttribute('ldInst')
      ).to.equal('Disconnectors');
      expect(
        (<Element>(<Create>actions[3]).new.element).getAttribute('prefix')
      ).to.equal('');
      expect(
        (<Element>(<Create>actions[3]).new.element).getAttribute('lnClass')
      ).to.equal('CSWI');
      expect(
        (<Element>(<Create>actions[3]).new.element).getAttribute('lnInst')
      ).to.equal('2');
      expect((<Create>actions[3]).new.element.textContent).to.equal('IED1');
    });
  });

  describe('for Edition1 files', () => {
    let doc: Document;
    let actions: SimpleAction[];

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/subscriberinfo2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      actions = createMissingIEDNameSubscriberInfo(doc);
    });

    it('does create one action per necessary IEDName creation', () => {
      expect(actions.length).to.equal(2);
    });

    it('creates correct IEDName element', () => {
      expect(actions[0]).to.satisfy(isCreate);
      expect((<Create>actions[0]).new.element.textContent).to.equal('IED1');
    });

    it('creates correct IEDName element', () => {
      expect(actions[1]).to.satisfy(isCreate);
      expect((<Create>actions[1]).new.element.textContent).to.equal('IED1');
    });

    it('does not add Edition2 attributes into the IEDName element', () => {
      actions.forEach(action => {
        expect((<Element>(<Create>action).new.element).getAttribute('apRef')).to
          .be.null;
        expect((<Element>(<Create>action).new.element).getAttribute('ldInst'))
          .to.be.null;
        expect((<Element>(<Create>action).new.element).getAttribute('prefix'))
          .to.be.null;
        expect((<Element>(<Create>action).new.element).getAttribute('lnClass'))
          .to.be.null;
        expect((<Element>(<Create>action).new.element).getAttribute('lnInst'))
          .to.be.null;
      });
    });
  });
});
