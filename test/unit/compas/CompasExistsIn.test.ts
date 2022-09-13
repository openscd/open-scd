import { expect, fixtureSync, html, waitUntil } from '@open-wc/testing';
import sinon, { SinonStub } from 'sinon';

import { customElement, LitElement } from 'lit-element';

import {
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} from '../../../src/compas-services/foundation.js';

import {
  CompasExistsIn,
  CompasExistsInElement,
} from '../../../src/compas/CompasExistsIn.js';

@customElement('mock-compas-exists-in')
export class MockSetter extends CompasExistsIn(LitElement) {}

describe('CompasExistsInElement', () => {
  let element: CompasExistsInElement;
  let stubCallService: SinonStub;

  describe('when no docId', () => {
    beforeEach(async () => {
      // Overwrite, because this scenario is the only on different.
      element = fixtureSync(
        html`<mock-compas-exists-in></mock-compas-exists-in>`
      );

      stubCallService = sinon.stub(element, 'callService').callsFake(() => {
        return Promise.reject();
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('the document does not exists', () => {
      expect(element.existInCompas).to.be.equal(false);
      sinon.assert.neverCalledWith(stubCallService);
    });
  });

  describe('when service call returns a message', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<mock-compas-exists-in
          docId="some-id"
          docName="some-scl.scd"
        ></mock-compas-exists-in>`
      );

      stubCallService = sinon.stub(element, 'callService').callsFake(() => {
        const doc = <Document>(
          document.implementation.createDocument('', '', null)
        );
        return Promise.resolve(doc);
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('the document exists', () => {
      expect(element.existInCompas).to.be.equal(true);
      sinon.assert.calledTwice(stubCallService);
    });
  });

  describe('when service call returns a not found error', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<mock-compas-exists-in
          docId="some-id"
          docName="some-scl.scd"
        ></mock-compas-exists-in>`
      );

      stubCallService = sinon.stub(element, 'callService').callsFake(() => {
        return Promise.reject({ type: NOT_FOUND_ERROR });
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('the document does not exists', () => {
      expect(element.existInCompas).to.be.equal(false);
      sinon.assert.calledTwice(stubCallService);
    });
  });

  describe('when service call returns a other error', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<mock-compas-exists-in
          docId="some-id"
          docName="some-scl.scd"
        ></mock-compas-exists-in>`
      );

      stubCallService = sinon.stub(element, 'callService').callsFake(() => {
        return Promise.reject({ type: SERVER_ERROR });
      });

      await element;
    });

    it('boolean stays undefined', () => {
      expect(element.existInCompas).to.be.undefined;
      sinon.assert.calledTwice(stubCallService);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
