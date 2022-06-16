import { expect } from '@open-wc/testing';
import {
  createAddressElements,
  hasScaleFields,
  hasUnitMultiplierField,
} from '../../../../../src/editors/protocol104/foundation/cdc.js';

describe('createAddressElements', () => {
  it('only single address element created without expected value', async () => {
    const ti = '30';

    const addressElements = createAddressElements(
      document,
      ti,
      false,
      undefined
    );

    expect(addressElements.length).to.be.equal(1);
    expect(addressElements[0].tagName).to.be.equal('Address');
    expect(addressElements[0].getAttribute('ti')).to.be.equal(ti);
  });

  it('only two address element created without expected value', async () => {
    const ti = '30';

    const addressElements = createAddressElements(
      document,
      ti,
      true,
      undefined
    );

    expect(addressElements.length).to.be.equal(2);
    expect(addressElements[0].tagName).to.be.equal('Address');
    expect(addressElements[0].getAttribute('ti')).to.be.equal(ti);
    expect(addressElements[1].tagName).to.be.equal('Address');
    expect(addressElements[1].getAttribute('ti')).to.be.equal(ti);
    expect(addressElements[1].getAttribute('inverted')).to.be.equal('true');
  });

  it('only single address element created with expected value', async () => {
    const ti = '30';
    const expectedValue = 'ev';

    const addressElements = createAddressElements(
      document,
      ti,
      false,
      expectedValue
    );

    expect(addressElements.length).to.be.equal(1);
    expect(addressElements[0].tagName).to.be.equal('Address');
    expect(addressElements[0].getAttribute('ti')).to.be.equal(ti);
    expect(addressElements[0].getAttribute('expectedValue')).to.be.equal(
      expectedValue
    );
  });

  it('only two address element created without expected value', async () => {
    const ti = '30';
    const expectedValue = 'ev';

    const addressElements = createAddressElements(
      document,
      ti,
      true,
      expectedValue
    );

    expect(addressElements.length).to.be.equal(2);
    expect(addressElements[0].tagName).to.be.equal('Address');
    expect(addressElements[0].getAttribute('ti')).to.be.equal(ti);
    expect(addressElements[0].getAttribute('expectedValue')).to.be.equal(
      expectedValue
    );
    expect(addressElements[1].tagName).to.be.equal('Address');
    expect(addressElements[1].getAttribute('ti')).to.be.equal(ti);
    expect(addressElements[1].getAttribute('inverted')).to.be.equal('true');
    expect(addressElements[1].getAttribute('expectedValue')).to.be.equal(
      expectedValue
    );
  });
});

it('hasUnitMultiplierField should return expected boolean', () => {
  expect(hasUnitMultiplierField('INS', '35')).to.be.true;
  expect(hasUnitMultiplierField('MV', '35')).to.be.true;

  expect(hasUnitMultiplierField('INS', '30')).to.be.false;
});

it('hasScaleFields should return expected boolean', () => {
  expect(hasScaleFields('MV', '35')).to.be.true;

  expect(hasScaleFields('INS', '35')).to.be.false;
  expect(hasScaleFields('INS', '30')).to.be.false;
});
