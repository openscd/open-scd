import { expect } from "@open-wc/testing";
import { initializeNsdoc, Nsdoc } from "../../../src/foundation/nsdoc.js";

describe('nsdoc', () => {
  let nsdoc!: string;

  describe('has an initializeNsdoc function', () => {
    beforeEach(async () => {
      localStorage.clear();

      nsdoc = await fetch('/test/testfiles/foundation/testFile74.nsdoc')
        .then(response => response.text());
    });

    it('that\'s initially loaded correct', async function () {
      const nsdocsObject = await initializeNsdoc();

      expect(nsdocsObject.nsdoc72).to.be.undefined;
      expect(nsdocsObject.nsdoc73).to.be.undefined;
      expect(nsdocsObject.nsdoc74).to.be.undefined;
      expect(nsdocsObject.nsdoc81).to.be.undefined;
      expect(nsdocsObject.getDataDescription).to.exist;
    });

    it('that has an nsdoc object after loading a correct .nsdoc file into localStorage', async function () {
      localStorage.setItem('IEC 61850-7-4', nsdoc!)
      const nsdocsObject = await initializeNsdoc();

      expect(nsdocsObject.nsdoc74).to.not.be.undefined;
      expect(nsdocsObject.nsdoc74?.querySelector('NSDoc')?.getAttribute('id')).to.eql('IEC 61850-7-4');
    });

    describe('has an getLNDescription function', () => {
      let validSCL: XMLDocument;
      let nsdocsObject!: Nsdoc

      beforeEach(async () => {
        localStorage.clear();
        localStorage.setItem('IEC 61850-7-4', nsdoc!)

        nsdocsObject = await initializeNsdoc();

        validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      });

      it('which returns the title of a valid LN element', async function () {
        const ln = validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]')

          expect(nsdocsObject.getDataDescription(ln!).label).to.eql('Some LN title')
      });

      it('which returns the lnClass of a valid LN element in case no documentation can be found in the .nsdoc file', async function () {
        const ln = validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')
    
          expect(nsdocsObject.getDataDescription(ln!).label).to.eql('XCBR')
      });
    });
  });
});