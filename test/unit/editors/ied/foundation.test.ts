import { expect } from '@open-wc/testing';
import {
  getLnReference,
  getReportConnection,
} from '../../../../src/editors/ied/foundation.js';
import { getDocument } from '../../../data.js';

describe('ied foundation', () => {
  const doc: Document = getDocument();
  describe('has a getLnReference function that', () => {
    it('returns null for Private tag or is childs', () => {
      const element = doc.querySelector(
        ':root > IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="Disconnectors"] > LN[prefix="DC"][lnClass="CSWI"][inst="1"]>Private'
      )!;
      expect(getLnReference(element)).to.be.null;
      expect(getLnReference(element.firstElementChild!)).to.be.null;
    });

    it('returns null for tags outside a logical node reference', () => {
      expect(getLnReference(doc.querySelector(':root > IED')!)).to.be.null;
      expect(getLnReference(doc.querySelector('AccessPoint')!)).to.be.null;
      expect(getLnReference(doc.querySelector('LDevice')!)).to.be.null;
    });

    it('retruns a LnReference object for ExRef elements', () => {
      const element = doc.querySelector(
        ':root > IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="Disconnectors"] > LN[prefix="DC"][lnClass="CSWI"][inst="1"]>Inputs>ExtRef'
      )!;

      expect(getLnReference(element)).to.deep.equal({
        iedName: 'IED1',
        apRef: 'P1',
        ldInst: 'Disconnectors',
        prefix: 'DC',
        lnClass: 'CSWI',
        inst: '1',
      });
    });

    it('retruns a LnReference object for LN  element', () => {
      const element = doc.querySelector(
        ':root > IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="Disconnectors"] > LN[prefix="DC"][lnClass="CSWI"][inst="1"]'
      )!;

      expect(getLnReference(element)).to.deep.equal({
        iedName: 'IED1',
        apRef: 'P1',
        ldInst: 'Disconnectors',
        prefix: 'DC',
        lnClass: 'CSWI',
        inst: '1',
      });
    });

    it('retruns a LnReference object for LN0 element', () => {
      const element = doc.querySelector(
        ':root > IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="Disconnectors"] > LN0[lnClass="LLN0"]'
      )!;

      expect(getLnReference(element)).to.deep.equal({
        iedName: 'IED1',
        apRef: 'P1',
        ldInst: 'Disconnectors',
        prefix: '',
        lnClass: 'LLN0',
        inst: '',
      });
    });

    it('retruns a LnReference object for GSEControl element', () => {
      const element = doc.querySelector(
        ':root > IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl'
      )!;

      expect(getLnReference(element)).to.deep.equal({
        iedName: 'IED1',
        apRef: 'P1',
        ldInst: 'CircuitBreaker_CB1',
        prefix: '',
        lnClass: 'LLN0',
        inst: '',
      });
    });
  });

  describe('has a getReportconnection function that', () => {
    const doc = getDocument();
    it('returns an array of Connection describing Report connection in the SCL', () => {
      expect(getReportConnection(doc)).to.have.lengthOf(1);
      expect(getReportConnection(doc)[0]).to.deep.equal({
        source: {
          cbName: 'ReportCb',
          reference: {
            iedName: 'IED2',
            apRef: 'P1',
            ldInst: 'CBSW',
            prefix: '',
            lnClass: 'XSWI',
            inst: '2',
          },
        },
        sink: {
          element: doc.querySelector('ClientLN')!,
          reference: {
            iedName: 'IED1',
            apRef: 'P1',
            ldInst: 'CircuitBreaker_CB1',
            prefix: '',
            lnClass: 'XCBR',
            inst: '1',
          },
        },
        serviceType: 'RP',
      });
    });
  });
});
