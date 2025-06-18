import { expect } from '@open-wc/testing';
import { getAllConnectedAPsOfSameIED, canMoveCommunicationElementToConnectedAP } from '../../../../src/editors/communication/foundation.js';

describe('Communication plugin foundation', () => {
  let doc: XMLDocument;
  
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/communication/move-gse-testfile.scd')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('should determine if gse can be moved to connected AP', () => {
    const gseElement = doc.querySelector('GSE')!;

    const aps = getAllConnectedAPsOfSameIED(gseElement, doc);

    const connectedAP1 = aps.find(ap => ap.getAttribute('apName') === 'AP1')!;
    const connectedAP2 = aps.find(ap => ap.getAttribute('apName') === 'AP2')!;
    const connectedAP3 = aps.find(ap => ap.getAttribute('apName') === 'AP3')!;
    const connectedAP4 = aps.find(ap => ap.getAttribute('apName') === 'AP4')!;

    const canMoveToAP1 = canMoveCommunicationElementToConnectedAP(gseElement, connectedAP1, doc);
    const canMoveToAP2 = canMoveCommunicationElementToConnectedAP(gseElement, connectedAP2, doc);
    const canMoveToAP3 = canMoveCommunicationElementToConnectedAP(gseElement, connectedAP3, doc);
    const canMoveToAP4 = canMoveCommunicationElementToConnectedAP(gseElement, connectedAP4, doc);

    expect(canMoveToAP1).to.be.true;
    expect(canMoveToAP2).to.be.false;
    expect(canMoveToAP3).to.be.false;
    expect(canMoveToAP4).to.be.true;
  });

    it('should determine if smv can be moved to connected AP', () => {
    const smvElement = doc.querySelector('SMV')!;

    const aps = getAllConnectedAPsOfSameIED(smvElement, doc);

    const connectedAP1 = aps.find(ap => ap.getAttribute('apName') === 'AP1')!;
    const connectedAP2 = aps.find(ap => ap.getAttribute('apName') === 'AP2')!;
    const connectedAP3 = aps.find(ap => ap.getAttribute('apName') === 'AP3')!;
    const connectedAP4 = aps.find(ap => ap.getAttribute('apName') === 'AP4')!;

    const canMoveToAP1 = canMoveCommunicationElementToConnectedAP(smvElement, connectedAP1, doc);
    const canMoveToAP2 = canMoveCommunicationElementToConnectedAP(smvElement, connectedAP2, doc);
    const canMoveToAP3 = canMoveCommunicationElementToConnectedAP(smvElement, connectedAP3, doc);
    const canMoveToAP4 = canMoveCommunicationElementToConnectedAP(smvElement, connectedAP4, doc);

    expect(canMoveToAP1).to.be.true;
    expect(canMoveToAP2).to.be.false;
    expect(canMoveToAP3).to.be.false;
    expect(canMoveToAP4).to.be.true;
  });
});
