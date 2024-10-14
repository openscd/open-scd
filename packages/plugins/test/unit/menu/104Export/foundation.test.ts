import { expect } from '@open-wc/testing';

import { extractAllSignal104Data } from '../../../../src/menu/Export104/foundation.js';

describe('Export104 foundation', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/export104/export104.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('should extract all signal 104 data', () => {
    const { signals, errors } = extractAllSignal104Data(doc);

    const expectedSignals = [
      {
        name: 'S1F2V105Control1',
        signalNumber: '3001',
        isMonitorSignal: false,
        ioa: '1053001',
        ti: '50'
      },
      {
        name: 'S1F2V105Control2',
        signalNumber: '3002',
        isMonitorSignal: false,
        ioa: '1053002',
        ti: '64'
      },
      {
        name: 'S1F1V104Behavior',
        signalNumber: '2001',
        isMonitorSignal: true,
        ioa: '1042001',
        ti: '35'
      },
      {
        name: 'S1F1V104Behavior',
        signalNumber: '2002',
        isMonitorSignal: true,
        ioa: '1042002',
        ti: '35'
      },
      {
        name: 'S1F1V103Behavior',
        signalNumber: '1003',
        isMonitorSignal: true,
        ioa: '1031003',
        ti: '35'
      },
    ];

    const expectedErrors = [
      '[protocol104.export.errors.unknownSignalType]',
      '[protocol104.export.errors.tiOrIoaInvalid]',
    ];

    expect(errors).to.deep.equal(expectedErrors);
    expect(signals).to.deep.equal(expectedSignals);
  });
});
