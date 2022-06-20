import { expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import { Create } from '../../../../../src/foundation.js';

import {
  cdcProcessings,
  SupportedCdcType,
} from '../../../../../src/editors/protocol104/foundation/cdc.js';
import {
  createActions,
  createCheckActions,
} from '../../../../../src/editors/protocol104/foundation/actions.js';

describe('foundation', () => {
  let doc: XMLDocument;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/104/valid-empty-addresses.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
  });

  describe('createActions', () => {
    function executeCreateAction(
      queryLnSelector: string,
      doName: string,
      cdc: string,
      ti: string
    ): Create[] {
      const lnElement = doc.querySelector(queryLnSelector)!;
      const lnType = lnElement.getAttribute('lnType')!;
      const doElement = doc.querySelector(
        `LNodeType[id="${lnType}"] > DO[name="${doName}"]`
      )!;
      const lnClonedElement = <Element>lnElement.cloneNode(true);
      // We just need some element as Wizard, so reuse the LN Element.
      const wizard = lnElement;
      wizard!.addEventListener('wizard', actionEvent);

      return createActions(
        lnElement,
        lnClonedElement,
        doElement,
        wizard,
        ti,
        false,
        cdcProcessings[<SupportedCdcType>cdc].monitor[ti]
      );
    }

    it('returns a empty create action array', () => {
      // Use a wrong configuration to create actions. ACT should be SPG, but now no DAI Elements are found.
      const actions = executeCreateAction(
        'LN0[lnType="SE_LLN0_SET_V001"]',
        'MltLev',
        'ACT',
        '30'
      );
      expect(actions).to.be.empty;
      expect(actionEvent).to.have.not.been.called;
    });

    it('returns a single address create action', () => {
      const actions = executeCreateAction(
        'LN0[lnType="SE_LLN0_SET_V001"]',
        'MltLev',
        'SPG',
        '58'
      );
      expect(actions.length).to.be.equal(1);
      expect(actionEvent).to.have.been.calledOnce;
    });

    it('returns a multiple address create action', () => {
      const actions = executeCreateAction(
        'LN[lnType="SE_GGIO_SET_V002"]',
        'ClcRfTyp',
        'ENG',
        '58'
      );
      expect(actions.length).to.be.equal(1);
      expect(actionEvent).to.have.been.callCount(8);
    });
  });

  describe('createCheckActions', () => {
    function executeCreateCheckAction(
      queryLnSelector: string,
      doName: string,
      cdc: string,
      ti: string
    ): Create[] {
      const lnElement = doc.querySelector(queryLnSelector)!;
      const lnType = lnElement.getAttribute('lnType')!;
      const doElement = doc.querySelector(
        `LNodeType[id="${lnType}"] > DO[name="${doName}"]`
      )!;
      const lnClonedElement = <Element>lnElement.cloneNode(true);
      // We just need some element as Wizard, so reuse the LN Element.
      const wizard = lnElement;
      wizard!.addEventListener('wizard', actionEvent);

      return createCheckActions(
        lnElement,
        lnClonedElement,
        doElement,
        wizard,
        ti,
        cdcProcessings[<SupportedCdcType>cdc].control[ti]
      );
    }

    it('returns a multiple address create action', () => {
      const actions = executeCreateCheckAction(
        'LN[lnType="SE_GGIO_SET_V002"]',
        'DPCSO2',
        'DPC',
        '59'
      );
      expect(actions.length).to.be.equal(2);
      expect(actionEvent).to.have.been.calledTwice;
    });
  });
});
