import { expect } from '@open-wc/testing';
import { identitySort } from '../../../../src/editors/cleanup/foundation.js';

describe('Sorting items by their identity', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/cleanup.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('returns the correct name for an element.', () => {
    const dataSets = doc.querySelectorAll('DataSet');
    const orderedDataSets = identitySort(Array.from(dataSets)).map(dataSet =>
      dataSet.getAttribute('name')
    );
    // verified through inspection of the identity of each element
    // e.g. const ids = identitySort(Array.from(datasets)).map(ds => identity(ds));
    expect(orderedDataSets).to.eql([
      'GooseDataSet1',
      'GooseDataSet2',
      'LogDataSet1',
      'dataSet',
      'dataSet',
      'GooseDataSet1',
      'PhsMeas1',
      'PhsMeas2',
    ]);
    
  });
});
