import { expect } from '@open-wc/testing';
import {
  createTemplateStructure,
  determineUninitializedStructure,
  initializeElements,
} from '../../../src/foundation/dai.js';

describe('Global DAI related functions including', () => {
  let doc: Document;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('determineUninitializedStructure', () => {
    it('Full path needs to be initiated', () => {
      const lnElement = doc.querySelector(
        'LDevice[inst="CircuitBreaker_CB1"] > LN0[lnType="Dummy.LLN0"]'
      );
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      );
      const daElement = doc.querySelector(
        'DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]'
      );

      const [parentElement, templateStructure] =
        determineUninitializedStructure(lnElement!, [doElement!, daElement!]);

      expect(parentElement?.tagName).to.be.equals('LN0');
      expect(templateStructure.length).to.be.equals(2);
      expect(templateStructure[0].tagName).to.be.equals('DO');
      expect(templateStructure[1].tagName).to.be.equals('DA');
    });

    it('Full path needs to be initiated, including a structure', () => {
      const lnElement = doc.querySelector(
        'LDevice[inst="CircuitBreaker_CB1"] > LN0[lnType="Dummy.LLN0"]'
      );
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]'
      );
      const daElement = doc.querySelector(
        'DOType[id="Dummy.LLN0.ExtendedMod"] > DA[name="SBOw"]'
      );
      const bdaElement = doc.querySelector(
        'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
      );

      const [parentElement, templateStructure] =
        determineUninitializedStructure(lnElement!, [
          doElement!,
          daElement!,
          bdaElement!,
        ]);

      expect(parentElement?.tagName).to.be.equals('LN0');
      expect(templateStructure.length).to.be.equals(3);
      expect(templateStructure[0].tagName).to.be.equals('DO');
      expect(templateStructure[1].tagName).to.be.equals('DA');
      expect(templateStructure[2].tagName).to.be.equals('BDA');
    });

    it('Partial path needs to be initiated', () => {
      const lnElement = doc.querySelector(
        'LDevice[inst="CircuitBreaker_CB1"] > LN[lnType="Dummy.XCBR1"]'
      );
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.XCBR1"] > DO[name="Pos"]'
      );
      const daElement = doc.querySelector(
        'DOType[id="Dummy.XCBR1.Pos"] > DA[name="stVal"]'
      );

      const [parentElement, templateStructure] =
        determineUninitializedStructure(lnElement!, [doElement!, daElement!]);

      expect(parentElement?.tagName).to.be.equals('DOI');
      expect(templateStructure.length).to.be.equals(1);
      expect(templateStructure[0].tagName).to.be.equals('DA');
    });
  });

  describe('createTemplateStructure', async () => {
    it('creates DO/DA structure for LSVS supervision', async () => {
      const lsvsScl: XMLDocument = await fetch(
        '/test/testfiles/editors/LaterBindingSMV-LSVS.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      const lnElement = lsvsScl.querySelector(
        'IED[name="SMV_Subscriber2"] LN[lnClass="LSVS"][inst="2"]'
      )!;
      const structureOfElements = createTemplateStructure(lnElement, [
        'SvCBRef',
        'setSrcRef',
      ]);

      expect(structureOfElements?.length).to.be.equals(2);
      expect(structureOfElements?.at(0)?.tagName).to.be.equals('DO');
      expect(structureOfElements?.at(1)?.tagName).to.be.equals('DA');
    });
    it('creates DO/DA structure for LGOS supervision', async () => {
      const lsvsScl: XMLDocument = await fetch(
        '/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      const lnElement = lsvsScl.querySelector(
        'IED[name="GOOSE_Subscriber2"] LN[lnClass="LGOS"][inst="1"]'
      )!;

      const structureOfElements = createTemplateStructure(lnElement, [
        'GoCBRef',
        'setSrcRef',
      ]);

      expect(structureOfElements?.length).to.be.equals(2);
      expect(structureOfElements?.at(0)?.tagName).to.be.equals('DO');
      expect(structureOfElements?.at(1)?.tagName).to.be.equals('DA');
    });
  });

  describe('initializeElements', () => {
    it('Simple creation (DOI/DAI)', () => {
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      );
      const daElement = doc.querySelector(
        'DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]'
      );

      const newElement = initializeElements([doElement!, daElement!]);

      expect(newElement?.tagName).to.be.equals('DOI');
      expect(newElement?.childNodes.length).to.be.equals(1);
      expect((<Element>newElement?.firstChild).tagName).to.be.equals('DAI');
      expect(newElement?.firstChild?.childNodes.length).to.be.equals(1);
      expect(
        (<Element>newElement?.firstChild?.firstChild).tagName
      ).to.be.equals('Val');
    });

    it('Creation of structure (DOI/SDI/DAI)', () => {
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]'
      );
      const daElement = doc.querySelector(
        'DOType[id="Dummy.LLN0.ExtendedMod"] > DA[name="SBOw"]'
      );
      const bdaElement = doc.querySelector(
        'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
      );

      const newElement = initializeElements([
        doElement!,
        daElement!,
        bdaElement!,
      ]);

      expect(newElement?.tagName).to.be.equals('DOI');
      expect(newElement?.childNodes.length).to.be.equals(1);
      expect((<Element>newElement?.firstChild).tagName).to.be.equals('SDI');
      expect(newElement?.firstChild?.childNodes.length).to.be.equals(1);
      expect(
        (<Element>newElement?.firstChild?.firstChild).tagName
      ).to.be.equals('DAI');
      expect(
        newElement?.firstChild?.firstChild?.childNodes.length
      ).to.be.equals(1);
      expect(
        (<Element>newElement?.firstChild?.firstChild?.firstChild).tagName
      ).to.be.equals('Val');
    });

    it('Only create DAI', () => {
      const daElement = doc.querySelector(
        'DOType[id="Dummy.XCBR1.Pos"] > DA[name="stVal"]'
      );

      const newElement = initializeElements([daElement!]);

      expect(newElement?.tagName).to.be.equals('DAI');
      expect(newElement?.childNodes.length).to.be.equals(1);
      expect((<Element>newElement?.firstChild).tagName).to.be.equals('Val');
    });
  });
});
