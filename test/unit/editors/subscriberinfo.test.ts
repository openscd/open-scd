import { expect } from '@open-wc/testing';
import { SimpleAction } from '../../../src/foundation.js';
import { createMissingIEDNameSubscriberInfo } from '../../../src/transform/SubscriberInfo.js';
import { getDocument } from '../../data.js';

describe('Transformation function SubscriberInfo', () => {
  const doc = getDocument();
  const actions: SimpleAction[] = createMissingIEDNameSubscriberInfo(doc);

  it('creates two SimpleActions', () => {
    expect(actions.length).to.equal(2);
  });
});
