import { expect } from '@open-wc/testing';
import { LogDetail } from '../../../src/foundation.js';
import {
  validateControlCDC,
  validateDoCDCSetting,
  validateMandatoryDAs,
  validateMandatoryDOs,
  validateMandatorySubDAs,
} from '../../../src/validators/ValidateTemplates.js';

describe('VelidateTemplate', () => {
  let doc: XMLDocument;
  beforeEach(async () => {
    doc = await fetch(
      '/base/test/testfiles/validators/datatypetemplateerrors.scd'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });
  describe('used on LNodeType element', () => {
    it('return LogDetail array for missing mandatory DO e.g Beh', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.CILO"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(1);
    });
    it('return LogDetail array for missing mandatory DO e.g Pos', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.CSWI"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(1);
    });
    it('returns empty array if LNodeType includes all mandatory DOs', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.GGIO1"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(0);
    });
    it('returns empty array if element is not LNodeType', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LLN0.Health"]')!;
      const errors = await validateMandatoryDOs(element);
      expect(errors.length).to.equal(0);
    });
    it('return LogDetail array when LNodeTypes DO do not follow the CDC definition ', async () => {
      const element = doc.querySelector('LNodeType[id="Dummy.GGIO1"]')!;
      const errors = await validateDoCDCSetting(element);
      expect(errors.length).to.equal(1);
    });
  });
  describe('used on DOType element', () => {
    it('return empty array if element is not DOType', async () => {
      const element = doc.querySelector('LNodeType')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('returns empty array if LNodeType includes all mandatory DOs', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LPHD1.Sim"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('return LogDetail array for missing mandatory DA e.g stVal', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LLN0.Health"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(1);
    });
    it('return LogDetail array for missing mandatory DA e.g stVal', async () => {
      const element = doc.querySelector('DOType[id="Dummy.XCBR1.Pos"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(1);
    });
    it('return LogDetail array for missing mandatory DA e.g ctlModel', async () => {
      const element = doc.querySelector('DOType[id="Dummy.CSWI.Pos1"]')!;
      const errors = await validateMandatoryDAs(element);
      expect(errors.length).to.equal(1);
    });
  });
  describe('used on DAType element', () => {
    it('return empty array if element is not DAType', async () => {
      const element = doc.querySelector('DOType')!;
      const errors = await validateMandatorySubDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('returns empty array if DAType includes all mandatory BDAs', async () => {
      const element = doc.querySelector('DAType[id="Dummy.RangeConfig"]')!;
      const errors = await validateMandatorySubDAs(element);
      expect(errors.length).to.equal(0);
    });
    it('return LogDetail array for missing mandatory BDA e.g scaledOffset', async () => {
      const element = doc.querySelector(
        'DAType[id="Dummy.ScaledValueConfig"]'
      )!;
      const errors = await validateMandatorySubDAs(element);
      expect(errors.length).to.equal(1);
    });
  });
  describe('used on controlable data objects', () => {
    it('returns empty array for non-controlable data objects', async () => {
      const element = doc.querySelector('DOType[id="Dummy.LPHD1.PhyNam"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(0);
    });
    it('returns LogDetail array for missing SBOw', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC1"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('returns LogDetail array for missing SBO', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC2"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('returns LogDetail array for missing Oper', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC3"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('returns LogDetail array for missing Cancel', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC3"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('does not indicate false positive for status-only DOs', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC4"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(0);
    });
    it('returns LogDetail array for missing DA within Oper structure', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC5"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('returns LogDetail array for missing DA within SBOw structure', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC6"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('returns LogDetail array for missing DA within Cancel structure', async () => {
      const element = doc.querySelector('DOType[id="Dummy.SPC7"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
    });
    it('returns a warning if ctlModel definition is missing', async () => {
      const element = doc.querySelector('DOType[id="Dummy.CSWI.Pos1"]')!;
      const errors = await validateControlCDC(element);
      expect(errors.length).to.equal(1);
      expect((<LogDetail>errors[0]).kind).to.equal('warning');
    });
  });
});
