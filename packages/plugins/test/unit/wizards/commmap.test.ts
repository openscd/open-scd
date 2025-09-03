import { expect } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';

import '../../../src/editors/substation/zeroline-pane.js';
import {
  getSinkReferences,
  getSourceReferences,
} from '../../../src/wizards/commmap-wizards.js';

describe('communication mapping wizard', () => {
  let doc: Document;


  beforeEach(async () => {
    doc = await fetch('/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('getSinkReferences', () => {
    it('returns an array of all ClientLN`s for doc as input', () => {
      const clientlns = getSinkReferences(doc);
      expect(clientlns).to.have.length(6);
      expect(
        clientlns[0].isEqualNode(
          doc.querySelector('ReportControl[name="ReportCb"] ClientLN')
        )
      )?.to.be.true;
    });

    it('returns an array of all ClientLN`s connected to an IED - send and receive', () => {
      const clientlns = getSinkReferences(
        doc.querySelector('IED[name="IED1"]')!
      );
      expect(clientlns).to.have.length(5);
      expect(
        clientlns[0].isEqualNode(
          doc.querySelector('ReportControl[name="ReportCb"] ClientLN')
        )
      )?.to.be.true;
    });
  });

  describe('getSourceReferences', () => {
    it('returns an array of all ExtRef`s with doc as inputs', () => {
      const extRefs = getSourceReferences(doc);
      expect(extRefs).to.have.length(20);
      expect(extRefs[0].isEqualNode(doc.querySelector('ExtRef'))).to.be.true;
    });

    it('returns an array of all ExtRef`s connected to an IED - send and receive', () => {
      const extRefs = getSourceReferences(
        doc.querySelector('IED[name="IED2"]')!
      );
      expect(extRefs).to.have.length(6);
      expect(
        extRefs[2].isEqualNode(doc.querySelector('IED[name="IED2"] ExtRef'))
      ).to.be.true;
    });
  });
});