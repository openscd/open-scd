import { expect } from '@open-wc/testing';
import {
  validateMandatoryDAs,
  validateMandatoryDOs,
  validateMandatorySubDAs,
} from '../../../src/validators/ValidateTemplates.js';

describe('VelidateSchema', () => {
  let doc: XMLDocument;
  beforeEach(async () => {
    doc = await fetch(
      '/base/test/testfiles/validators/datatypetemplateerrors.scd'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });
  describe('used on LNodeType element', () => {
    it('return LogDialog array for missing mandatory DO e.g Beh', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.CILO"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(1);
      expect(errors[0].kind).to.equal('error');
    });
    it('return LogDialog array for missing mandatory DO e.g Pos', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.CSWI"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(1);
      expect(errors[0].kind).to.equal('error');
    });
    it('returns empty array if LNodeType includes all mendatory DOs', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.GGIO1"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(0);
    });
    it('returns empty array if element is not LNodeType', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LLN0.Health"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(0);
    });
  });
  describe('used on DOType element', () => {
    it('return empty array if element is not DOType', async () => {
      const element = doc.querySelector('LNodeType')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('returns empty array if LNodeType includes all mendatory DOs', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LPHD1.Sim"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('return LogDialog array for missing mandatory DA e.g stVal', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LLN0.Health"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(1);
      expect(errors[0].kind).to.equal('error');
    });
    it('return LogDialog array for missing mandatory DA e.g stVal', async () => {
      const element = doc.querySelector('DOType[id="Dummy.XCBR1.Pos"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(1);
      expect(errors[0].kind).to.equal('error');
    });
    it('return LogDialog array for missing mandatory DA e.g ctlModel', async () => {
      const element = doc.querySelector('DOType[id="Dummy.CSWI.Pos1"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(1);
      expect(errors[0].kind).to.equal('error');
    });
  });
  describe('used on DAType element', () => {
    it('return empty array if element is not DAType', async () => {
      const element = doc.querySelector('DOType')!;
      const errors = await validateMandatorySubDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('returns empty array if DAType includes all mendatory BDAs', async () => {
      const element = doc.querySelector('DAType[id="Dummy.RangeConfig"]')!;
      const errors = await validateMandatorySubDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('return LogDialog array for missing mandatory BDA e.g scaledOffset', async () => {
      const element = doc.querySelector(
        'DAType[id="Dummy.ScaledValueConfig"]'
      )!;
      const errors = await validateMandatorySubDAs(element);
      expect(errors.length).to.equal(1);
      expect(errors[0].kind).to.equal('error');
    });
  });
});
