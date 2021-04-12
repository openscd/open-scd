import { expect } from '@open-wc/testing';
import {
  getSinkReferences,
  getSourceReferences,
} from '../../../src/triggered/CommunicationMapping.js';

describe('CommunicationMappingPlugin', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('getSinkReferences', () => {
    it('retruns an array of ClientLN`s for ReportControl blocks', () => {
      expect(
        getSinkReferences(doc.querySelector('ReportControl[name="ReportCb"]')!)
      ).to.have.length(4);
      expect(
        getSinkReferences(
          doc.querySelector('ReportControl[name="ReportCb"]')!
        )[0].isEqualNode(
          doc.querySelector('ReportControl[name="ReportCb"] ClientLN')
        )
      )?.to.be.true;
    });
    it('retruns an array of IEDNames`s for GSEControl blocks', () => {
      expect(
        getSinkReferences(doc.querySelector('GSEControl')!)
      ).to.have.length(1);
      expect(
        getSinkReferences(doc.querySelector('GSEControl')!)[0].isEqualNode(
          doc.querySelector('GSEControl IEDName')
        )
      )?.to.be.true;
    });
    it('retruns an array of IEDNames`s for SampledValueControl blocks', () => {
      expect(
        getSinkReferences(doc.querySelector('SampledValueControl')!)
      ).to.have.length(1);
      expect(
        getSinkReferences(
          doc.querySelector('SampledValueControl')!
        )[0].isEqualNode(doc.querySelector('SampledValueControl IEDName'))
      )?.to.be.true;
    });
  });

  describe('getSourceReferences', () => {
    it('retruns an array of child ExtRef`s', () => {
      expect(getSourceReferences(doc)).to.have.length(20);
      expect(
        getSourceReferences(doc)[0].isEqualNode(doc.querySelector('ExtRef'))
      ).to.be.true;
    });
  });
});
