import { expect } from "@open-wc/testing";
import { initializeNsdoc, Nsdoc } from "../../../src/foundation/nsdoc.js";

describe('nsdoc', () => {
  let nsdoc74!: string;
  let nsdoc73!: string;
  let nsdoc81!: string;

  describe('has an initializeNsdoc function', () => {
    beforeEach(async () => {
      localStorage.clear();

      nsdoc74 = await fetch('/test/testfiles/foundation/testFile74.nsdoc')
        .then(response => response.text());
      nsdoc73 = await fetch('/test/testfiles/foundation/testFile73.nsdoc')
        .then(response => response.text());
      nsdoc81 = await fetch('/test/testfiles/foundation/testFile81.nsdoc')
        .then(response => response.text());
    });

    it('that\'s initially loaded correct', async function () {
      const nsdocsObject = await initializeNsdoc();

      expect(nsdocsObject.nsdoc73).to.be.undefined;
      expect(nsdocsObject.nsdoc74).to.be.undefined;
      expect(nsdocsObject.nsdoc81).to.be.undefined;
      expect(nsdocsObject.getDataDescription).to.exist;
    });

    it('that has an nsdoc object after loading a correct .nsdoc file into localStorage', async function () {
      localStorage.setItem('IEC 61850-7-4', nsdoc74!)
      const nsdocsObject = await initializeNsdoc();

      expect(nsdocsObject.nsdoc74).to.not.be.undefined;
      expect(nsdocsObject.nsdoc74?.querySelector('NSDoc')?.getAttribute('id')).to.eql('IEC 61850-7-4');
    });

    describe('has an getDataDescription function', () => {
      let validSCL: XMLDocument;
      let nsdocsObject!: Nsdoc

      beforeEach(async () => {
        localStorage.clear();
        localStorage.setItem('IEC 61850-8-1', nsdoc81!)
        localStorage.setItem('IEC 61850-7-4', nsdoc74!)
        localStorage.setItem('IEC 61850-7-3', nsdoc73!)

        nsdocsObject = await initializeNsdoc();

        validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      });

      it('which returns the title of a valid LN element', async function () {
        const ln = validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]')

          expect(nsdocsObject.getDataDescription([ln!]).label).to.eql('Some LN title')
      });

      it('which returns the lnClass of a valid LN element in case no title can be found in the .nsdoc file', async function () {
        const ln = validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')
    
          expect(nsdocsObject.getDataDescription([ln!]).label).to.eql('XCBR')
      });

      it('which returns the description of a valid DO element', async function () {
        const dataObject = validSCL.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Beh"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('Some DO description')
      });

      it('which returns the description of a valid DO element where the DO is part of a parent class', async function () {
        const dataObject = validSCL.querySelector('LNodeType[id="Dummy.XCBR1"] > DO[name="Beh"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('Some DomainLN Description')
      });

      it('which returns the name of a valid DO element in case no description can be found in the .nsdoc file', async function () {
        const dataObject = validSCL.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Health"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('Health')
      });

      it('which returns the description of a valid DA element which is defined in the IEC 61850-7-3 .nsdoc file', async function () {
        const dataObject = validSCL.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="q"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('Some DA description')
      });

      it('which returns the name of a valid DA element in case no description can be found in the IEC 61850-7-3 .nsdoc file', async function () {
        const dataObject = validSCL.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="t"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('t')
      });

      it('which returns the description of a valid DA element which is defined in the IEC 61850-8-1 .nsdoc file', async function () {
        const dataObject = validSCL.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="SBOw"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('Some SBOw title')
      });

      it('which returns the name of a valid DA element in case no description can be found in the IEC 61850-8-1 .nsdoc file', async function () {
        const dataObject = validSCL.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="SBO"]');

        expect(nsdocsObject.getDataDescription([dataObject!]).label).to.eql('SBO')
      });
    });
  });
});