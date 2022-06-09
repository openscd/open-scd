import { expect } from '@open-wc/testing';
import {
  hasScaleFields,
  hasUnitMultiplierField,
} from '../../../../../src/editors/protocol104/foundation/cdc.js';

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
