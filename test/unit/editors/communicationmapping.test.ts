import { expect } from '@open-wc/testing';
import {
  getConnection,
  getConnectionIndexOf,
  getControlBlockConnection,
  getDataConnection,
} from '../../../src/triggered/CommunicationMapping.js';

describe('CommunicationMappingPlugin', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('public/xml/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('getControlBlockConnection', () => {
    it('retruns an array of Connection`s for valid inputs of type `ReportControl`', () => {
      expect(getControlBlockConnection(doc, 'ReportControl')).to.have.length(1);
      expect(getControlBlockConnection(doc, 'ReportControl')[0]).to.deep.equal({
        source: doc.querySelector('ReportControl'),
        sink: doc.querySelector('ClientLN'),
      });
    });
  });

  describe('getDataConnection', () => {
    it('retruns an array of Connection`s for valid inputs of type `GSEControl`', () => {
      expect(getDataConnection(doc, 'GSEControl')).to.have.length(6);
      expect(getDataConnection(doc, 'GSEControl')[0].source).to.deep.equal(
        doc.querySelector(
          ':root > IED[name="IED1"] LDevice[inst="CircuitBreaker_CB1"] GSEControl[name="GCB"]'
        )
      );
      expect(getDataConnection(doc, 'GSEControl')[0].data).to.deep.equal(
        doc.querySelector(
          ':root > IED[name="IED1"] LDevice[inst="CircuitBreaker_CB1"] DataSet > FCDA[lnClass="XCBR"][lnInst="1"][doName="Pos"]'
        )
      );
      expect(getDataConnection(doc, 'GSEControl')[0].sink).to.deep.equal(
        doc.querySelector(
          ':root > IED[name="IED2"] LDevice[inst="CircuitBreaker_CB1"] Inputs > ExtRef[lnClass="XCBR"][lnInst="1"][doName="Pos"]'
        )
      );
    });

    it('retruns an array of Connection`s for valid inputs of type `SampledValueControl`', () => {
      expect(getDataConnection(doc, 'SampledValueControl')).to.have.length(14);
      expect(
        getDataConnection(doc, 'SampledValueControl')[3].source
      ).to.deep.equal(
        doc.querySelector(
          ':root > IED[name="IED3"] LDevice[inst="MU01"] SampledValueControl[name="MSVCB01"]'
        )
      );
      expect(
        getDataConnection(doc, 'SampledValueControl')[3].data
      ).to.deep.equal(
        doc.querySelector(
          ':root > IED[name="IED3"] LDevice[inst="MU01"] DataSet > FCDA[prefix="I01B"][lnClass="TCTR"][lnInst="2"][doName="Amp"][daName="q"]'
        )
      );
      expect(
        getDataConnection(doc, 'SampledValueControl')[3].sink
      ).to.deep.equal(
        doc.querySelector(
          ':root > IED[name="IED1"] LDevice[inst="Disconnectors"] Inputs > ExtRef[prefix="I01B"][lnClass="TCTR"][lnInst="2"][doName="Amp"][daName="q"]'
        )
      );
    });
  });

  describe('getConnectionIndexOf', () => {
    it('is used to filter an array of Connection`s to a unique set of source ied, sink ied and control block', () => {
      expect(
        getDataConnection(doc, 'GSEControl').filter(
          (v, i, a) => getConnectionIndexOf(a, v!) === i
        ).length
      ).to.equal(2);
    });
  });

  describe('getConnection', () => {
    it('is used to filter an array of Connection`s to match another Connection', () => {
      const connections = getDataConnection(doc, 'GSEControl');
      expect(getConnection(connections, connections[0]).length).to.equal(4);
      expect(getConnection(connections, connections[4]).length).to.equal(2);
    });
  });
});
