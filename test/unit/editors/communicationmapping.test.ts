import { expect } from '@open-wc/testing';
import { getControlBlockConnection } from '../../../src/triggered/CommunicationMapping.js';
import { getDocument } from '../../data.js';

describe('CommunicationMappingPlugin', () => {
  const doc = getDocument();

  describe('getControlBlockConnection', () => {
    it('retruns an array of Connection`s for valid inputs of type `ReportControl`', () => {
      expect(getControlBlockConnection(doc, 'ReportControl')).to.have.length(1);
      expect(getControlBlockConnection(doc, 'ReportControl')[0]).to.deep.equal({
        source: doc.querySelector('ReportControl'),
        sink: doc.querySelector('ClientLN'),
      });
    });
  });
});
