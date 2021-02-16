import { expect } from '@open-wc/testing';
import { Create, isCreate, SimpleAction } from '../../../src/foundation.js';

import { createMissingIEDNameSubscriberInfo } from '../../../src/transform/SubscriberInfo.js';
import { getDocument } from '../../data.js';

describe('Transformation function SubscriberInfo', () => {
  const doc = getDocument();
  const actions: SimpleAction[] = createMissingIEDNameSubscriberInfo(doc);

  it('creates two SimpleActions', () => {
    expect(actions.length).to.equal(2);
  });

  it('the first writes the correct IEDName element', () => {
    expect(actions[0]).to.satisfy(isCreate);
    expect((<Create>actions[0]).new.element.getAttribute('apRef')).to.equal(
      'P1'
    );
    expect((<Create>actions[0]).new.element.getAttribute('ldInst')).to.equal(
      'CBSW'
    );
    expect((<Create>actions[0]).new.element.getAttribute('lnClass')).to.equal(
      'XSWI'
    );
    expect((<Create>actions[0]).new.element.innerHTML).to.equal('IED2');
  });

  it('the second writes the correct IEDName element', () => {
    expect(actions[1]).to.satisfy(isCreate);
    expect((<Create>actions[1]).new.element.getAttribute('apRef')).to.equal(
      'P1'
    );
    expect((<Create>actions[1]).new.element.getAttribute('ldInst')).to.equal(
      'Disconnectors'
    );
    expect((<Create>actions[1]).new.element.getAttribute('lnClass')).to.equal(
      'CSWI'
    );
    expect((<Create>actions[1]).new.element.innerHTML).to.equal('IED1');
  });
});
