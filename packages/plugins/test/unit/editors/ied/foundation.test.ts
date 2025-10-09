import { expect } from '@open-wc/testing';

import {
  findDOTypeElement,
  findElement,
  findLLN0LNodeType,
  findLogicalNodeElement,
  createIEDStructure,
  getInstanceDAElement,
  getValueElements,
} from '../../../../src/editors/ied/foundation.js';
import { getAncestorsFromDA, getAncestorsFromDO } from './test-support.js';

describe('ied-foundation', async () => {
  let validSCL: Document;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('findElement', async () => {
    let daElement: Element;
    let ancestors: Element[];

    beforeEach(async () => {
      daElement = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]'
      )!;
      ancestors = getAncestorsFromDA(daElement, 'Dummy.XCBR1.Pos');
    });

    it('will find IED Element in list', async () => {
      const iedElement = findElement(ancestors, 'IED');
      expect(iedElement).to.be.not.null;
      expect(iedElement?.tagName).to.be.equal('IED');
    });

    it('unknown element not found in list', async () => {
      const iedElement = findElement(ancestors, 'Unknown');
      expect(iedElement).to.be.null;
    });
  });

  describe('findLogicalNodeElement', async () => {
    it('will find LN Element in list', async () => {
      const daElement = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]'
      )!;
      const ancestors = getAncestorsFromDA(daElement, 'Dummy.XCBR1.Pos');

      const lnElement = findLogicalNodeElement(ancestors);
      expect(lnElement).to.be.not.null;
      expect(lnElement?.tagName).to.be.equal('LN');
    });

    it('will find LN0 Element in list', async () => {
      const doElement = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )!;
      const ancestors = getAncestorsFromDO(doElement);

      const lnElement = findLogicalNodeElement(ancestors);
      expect(lnElement).to.be.not.null;
      expect(lnElement?.tagName).to.be.equal('LN0');
    });

    it('will not find LN(0) Element in list', async () => {
      const lnElement = findLogicalNodeElement([]);
      expect(lnElement).to.be.null;
    });
  });

  describe('findDOTypeElement', async () => {
    it('will find DOType Element', async () => {
      const doElement = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )!;

      const doTypeElement = findDOTypeElement(doElement);
      expect(doTypeElement).to.be.not.null;
      expect(doTypeElement?.tagName).to.be.equal('DOType');
      expect(doTypeElement?.getAttribute('cdc')).to.be.equal('ENC');
    });

    it('will not find DOType Element and return null', async () => {
      const doElement = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )!;
      doElement.removeAttribute('type');

      const doTypeElement = findDOTypeElement(doElement);
      expect(doTypeElement).to.be.null;
    });
  });

  describe('getValueElements', async () => {
    let daiElement1: Element;
    let daiElement2: Element;

    beforeEach(async () => {
      daiElement1 = validSCL.querySelector(
        ':root > IED[name="IED2"] > AccessPoint[name="P1"] > Server > ' +
          'LDevice[inst="CircuitBreaker_CB1"] > LN[lnType="Dummy.XCBR1"] > DOI[name="Pos"]> DAI[name="ctlModel"]'
      )!;

      daiElement2 = validSCL.querySelector(
        ':root > IED[name="IED3"] > AccessPoint[name="P1"] > Server > ' +
          'LDevice[inst="MU01"] > LN[lnType="DummyTCTR"] > DOI[name="Amp"] > SDI[name="sVC"] > DAI[name="scaleFactor"]'
      )!;
    });

    it('returns all instantiated Val elements', async () => {
      const value = getValueElements(daiElement2);
      expect(value.length).to.equal(2);
      expect(value[0].textContent).to.be.equal('0.001');
      expect(value[1].textContent).to.be.equal('0.005');
    });

    it('returns one instantiated Val elements', async () => {
      const value = getValueElements(daiElement1)[0];
      expect(value).to.be.not.null;
      expect(value?.textContent).to.be.equal('status-only');
    });

    it('returns empty array in case no Val i instantiated', async () => {
      daiElement1.querySelector('Val')!.remove();

      const iedElement = getValueElements(daiElement1);
      expect(iedElement.length).to.equal(0);
    });
  });

  describe('getInstanceDAElement', () => {
    it('will return a DAI when a DA has a valid instance element.', async () => {
      const doi = validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > ' +
          'LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="CSWI"] > DOI[name="Pos"]'
      );
      const da = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.CSWI.Pos2"] > DA[name="ctlModel"]'
      );

      const dai = getInstanceDAElement(doi, da!);
      expect(dai).to.not.be.null;
      expect(dai?.tagName).to.eql('DAI');
      expect(dai?.getAttribute('name')).to.eql('ctlModel');
    });

    it("will returns null if there's no DAI available within a DOI.", async () => {
      const doi = validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > ' +
          'LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="CSWI"] > DOI[name="Pos"]'
      );
      const da = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.CSWI.Pos2"] > DA[name="d"]'
      );

      const dai = getInstanceDAElement(doi, da!);
      expect(dai).to.be.null;
    });

    it('will returns null if no root DOI is available.', async () => {
      const da = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.CSWI.Pos2"] > DA[name="d"]'
      );

      const dai = getInstanceDAElement(null, da!);
      expect(dai).to.be.null;
    });
  });

  describe('findLLN0LNodeType', async () => {
    it('will find existing LLN0 LNodeType in document', async () => {
      const lln0Type = findLLN0LNodeType(validSCL);
      expect(lln0Type).to.be.not.null;
      expect(lln0Type?.tagName).to.be.equal('LNodeType');
      expect(lln0Type?.getAttribute('lnClass')).to.be.equal('LLN0');
      expect(lln0Type?.getAttribute('id')).to.be.equal('Dummy.LLN0');
    });

    it('will return null if no LLN0 LNodeType exists', async () => {
      const docWithoutLLN0 = new DOMParser().parseFromString(
        `<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
          <DataTypeTemplates>
            <LNodeType id="SomeOtherType" lnClass="XCBR"/>
          </DataTypeTemplates>
        </SCL>`,
        'application/xml'
      );

      const lln0Type = findLLN0LNodeType(docWithoutLLN0);
      expect(lln0Type).to.be.null;
    });
  });

  describe('createIEDStructure', async () => {
    let testDoc: XMLDocument;

    beforeEach(() => {
      testDoc = new DOMParser().parseFromString(
        `<SCL xmlns="http://www.iec.ch/61850/2003/SCL"></SCL>`,
        'application/xml'
      );
    });

    it('creates a basic IED structure with required elements', async () => {
      const ied = createIEDStructure(testDoc, 'TestIED', 'LLN0_Type');

      expect(ied).to.be.not.null;
      expect(ied.tagName).to.be.equal('IED');
      expect(ied.getAttribute('name')).to.be.equal('TestIED');
      expect(ied.getAttribute('manufacturer')).to.be.equal('OpenSCD');

      const accessPoint = ied.querySelector('AccessPoint');
      expect(accessPoint).to.be.not.null;
      expect(accessPoint?.getAttribute('name')).to.be.equal('AP1');

      const server = accessPoint?.querySelector('Server');
      expect(server).to.be.not.null;

      const authentication = server?.querySelector('Authentication');
      expect(authentication).to.be.not.null;

      const lDevice = server?.querySelector('LDevice');
      expect(lDevice).to.be.not.null;
      expect(lDevice?.getAttribute('inst')).to.be.equal('LD1');

      const ln0 = lDevice?.querySelector('LN0');
      expect(ln0).to.be.not.null;
      expect(ln0?.getAttribute('lnClass')).to.be.equal('LLN0');
      expect(ln0?.getAttribute('inst')).to.be.equal('');
      expect(ln0?.getAttribute('lnType')).to.be.equal('LLN0_Type');
    });
  });
});
