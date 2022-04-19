import { expect } from "@open-wc/testing";

import {
  findDOTypeElement,
  findElement,
  findLogicaNodeElement, getValueElement
} from "../../../../src/editors/ied/foundation.js";
import { getAncestorsFromDA, getAncestorsFromDO } from "./test-foundation.js";

describe('ied-foundation', async () => {
  let validSCL: Document;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('findElement', async () => {
    let daElement: Element;
    let ancestors: Element[];

    beforeEach(async () => {
      daElement = validSCL.querySelector('DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')!;
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

  describe('findLogicaNodeElement', async () => {
    it('will find LN Element in list', async () => {
      const daElement = validSCL.querySelector('DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')!;
      const ancestors = getAncestorsFromDA(daElement, 'Dummy.XCBR1.Pos');

      const lnElement = findLogicaNodeElement(ancestors);
      expect(lnElement).to.be.not.null;
      expect(lnElement?.tagName).to.be.equal('LN');
    });

    it('will find LN0 Element in list', async () => {
      const doElement = validSCL.querySelector('DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')!;
      const ancestors = getAncestorsFromDO(doElement);

      const lnElement = findLogicaNodeElement(ancestors);
      expect(lnElement).to.be.not.null;
      expect(lnElement?.tagName).to.be.equal('LN0');
    });

    it('will not find LN(0) Element in list', async () => {
      const lnElement = findLogicaNodeElement([]);
      expect(lnElement).to.be.null;
    });
  });

  describe('findDOTypeElement', async () => {
    it('will find DOType Element', async () => {
      const doElement = validSCL.querySelector('DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')!;

      const doTypeElement = findDOTypeElement(doElement);
      expect(doTypeElement).to.be.not.null;
      expect(doTypeElement?.tagName).to.be.equal('DOType');
      expect(doTypeElement?.getAttribute('cdc')).to.be.equal('ENC')
    });

    it('will not find DOType Element and return null', async () => {
      const doElement = validSCL.querySelector('DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')!;
      doElement.removeAttribute('type');

      const doTypeElement = findDOTypeElement(doElement);
      expect(doTypeElement).to.be.null;
    });
  });

  describe('getValueElement', async () => {
    let daiElement: Element;

    beforeEach(async () => {
      daiElement = validSCL.querySelector(':root > IED[name="IED2"] > AccessPoint[name="P1"] > Server > ' +
        'LDevice[inst="CircuitBreaker_CB1"] > LN[lnType="Dummy.XCBR1"] > DOI[name="Pos"]> DAI[name="ctlModel"]')!;
    });

    it('will find the val child of the element', async () => {
      const value = getValueElement(daiElement);
      expect(value).to.be.not.null;
      expect(value?.textContent).to.be.equal('status-only');
    });

    it('will not find the val element of the element and return null', async () => {
      daiElement.querySelector('Val')!.remove()

      const iedElement = getValueElement(daiElement);
      expect(iedElement).to.be.null;
    });
  });
});
