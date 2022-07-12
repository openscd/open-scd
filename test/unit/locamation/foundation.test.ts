import {expect} from "@open-wc/testing";

import {Create, isCreate, isReplace, Replace} from "../../../src/foundation.js";
import {initializeNsdoc} from "../../../src/foundation/nsdoc.js";

import {
  addPrefixAndNamespaceToDocument,
  createEditorAction, getPrivate, getPrivateTextValue, hasPrivateElement,
  iedHeader,
  lDeviceHeader,
  lnHeader,
  LOCAMATION_PREFIX, LOCAMATION_PRIVATE
} from "../../../src/locamation/foundation.js";

describe('locamation foundation - ', () => {
  describe('lnHeader - ', () => {
    it('create Header for Element with prefix and inst attributes', async () => {
      const logicalNode = <Element>new DOMParser().parseFromString(
        `<LN prefix="I01A" lnClass="TCTR" inst="1" lnType="TCTR_LCMTN"></LN>`,
        'application/xml').documentElement;

      const result = lnHeader(logicalNode, await initializeNsdoc());
      expect(result).to.be.equal('I01A - TCTR - 1');
    });

    it('create Header for Element without prefix', async () => {
      const logicalNode = <Element>new DOMParser().parseFromString(
        `<LN lnClass="TCTR" inst="1" lnType="TCTR_LCMTN"></LN>`,
        'application/xml').documentElement;

      const result = lnHeader(logicalNode, await initializeNsdoc());
      expect(result).to.be.equal('TCTR - 1');
    });

    it('create Header for Element without inst attributes', async () => {
      const logicalNode = <Element>new DOMParser().parseFromString(
        `<LN prefix="I01A" lnClass="TCTR" lnType="TCTR_LCMTN"></LN>`,
        'application/xml').documentElement;

      const result = lnHeader(logicalNode, await initializeNsdoc());
      expect(result).to.be.equal('I01A - TCTR');
    });

    it('create Header for Element without prefix and inst attributes', async () => {
      const logicalNode = <Element>new DOMParser().parseFromString(
        `<LN lnClass="TCTR" lnType="TCTR_LCMTN"></LN>`,
        'application/xml').documentElement;

      const result = lnHeader(logicalNode, await initializeNsdoc());
      expect(result).to.be.equal('TCTR');
    });
  });

  describe('lDeviceHeader - ', () => {
    it('create Header for Element with name attributes', () => {
      const logicalDevice = <Element>new DOMParser().parseFromString(
        `<LDevice name="MU01-Name" inst="MU01-Inst">`,
        'application/xml').documentElement;

      const result = lDeviceHeader(logicalDevice);
      expect(result).to.be.equal('MU01-Name');
    });

    it('create Header for Element with inst attributes', () => {
      const logicalDevice = <Element>new DOMParser().parseFromString(
        `<LDevice inst="MU01-Inst">`,
        'application/xml').documentElement;

      const result = lDeviceHeader(logicalDevice);
      expect(result).to.be.equal('MU01-Inst');
    });

    it('create Header for Element with description attributes', () => {
      const logicalDevice = <Element>new DOMParser().parseFromString(
        `<LDevice desc="Merging Unit" inst="MU01-Inst"></LDevice>`,
        'application/xml').documentElement;

      const result = lDeviceHeader(logicalDevice);
      expect(result).to.be.equal('MU01-Inst - Merging Unit');
    });
  });

  describe('iedHeader - ', () => {
    it('create Header for Element with name attributes', () => {
      const ied = <Element>new DOMParser().parseFromString(
        `<IED name="T_VMU_Alliander"></IED>`,
        'application/xml').documentElement;

      const result = iedHeader(ied);
      expect(result).to.be.equal('T_VMU_Alliander');
    });

    it('create Header for Element with description attributes', () => {
      const ied = <Element>new DOMParser().parseFromString(
        `<IED desc="Merging Unit" name="T_VMU_Alliander"></IED>`,
        'application/xml').documentElement;

      const result = iedHeader(ied);
      expect(result).to.be.equal('T_VMU_Alliander (Merging Unit)');
    });
  });

  describe('addPrefixAndNamespaceToDocument - ', () => {
    it('add namespace declaration when not already there', () => {
      const scl = <Element>new DOMParser().parseFromString(
        `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
            <IED></IED>
         </SCL>`,
        'application/xml').documentElement;
      const ied = scl.querySelector('IED')!;

      addPrefixAndNamespaceToDocument(ied);

      expect(scl.hasAttribute("xmlns:" + LOCAMATION_PREFIX)).to.be.true;
      expect(scl.attributes.length).to.be.equal(5);
    });

    it('do not add namespace declaration when already there', () => {
      const scl = <Element>new DOMParser().parseFromString(
        `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:lcmtn_ext="https://www.locamation.com/61850/VMU/SCL"
              version="2007" revision="B" release="4">
            <IED></IED>
         </SCL>`,
        'application/xml').documentElement;
      const ied = scl.querySelector('IED')!;

      addPrefixAndNamespaceToDocument(ied);

      expect(scl.hasAttribute("xmlns:" + LOCAMATION_PREFIX)).to.be.true;
      expect(scl.attributes.length).to.be.equal(5);
    });
  });

  describe('getPrivate - ', () => {
    it('retrieve private from logica node', () => {
      const logicalNode = <Element>new DOMParser().parseFromString(
        `<LN prefix="I01A" lnClass="TCTR" inst="1" lnType="TCTR_LCMTN">
          <Private type="LCMTN_VMU_SENSOR">
          </Private>
        </LN>`,
        'application/xml').documentElement;

      const result = getPrivate(logicalNode);

      expect(result).to.be.not.null;
      expect(result!.getAttribute('type')).to.be.equal(LOCAMATION_PRIVATE);
    });

    it('retrieve private from logica node, not there', () => {
      const logicalNode = <Element>new DOMParser().parseFromString(
        `<LN prefix="I01A" lnClass="TCTR" inst="1" lnType="TCTR_LCMTN"></LN>`,
        'application/xml').documentElement;

      const result = getPrivate(logicalNode);

      expect(result).to.be.null;
    });
  });

  describe('createEditorAction - ', () => {
    it('create update action to replace value', () => {
      const locamationPrivate = <Element>new DOMParser().parseFromString(
        `<Private type="LCMTN_VMU_SENSOR" xmlns:lcmtn_ext="https://www.locamation.com/61850/VMU/SCL">
           <lcmtn_ext:P type="CHANNEL">0</lcmtn_ext:P>
         </Private>`,
        'application/xml').documentElement;

      const result = createEditorAction(locamationPrivate, 'CHANNEL', '1');

      expect(result.length).to.be.equal(1);
      expect(result[0]).to.satisfy(isReplace);
      expect((<Replace>result[0]).old.element.textContent).to.be.equal('0');
      expect((<Replace>result[0]).new.element.textContent).to.be.equal('1');
    });

    it('create insert action to add value', () => {
      const locamationPrivate = <Element>new DOMParser().parseFromString(
        `<Private type="LCMTN_VMU_SENSOR"></Private>`,
        'application/xml').documentElement;

      const result = createEditorAction(locamationPrivate, 'CHANNEL', '1');

      expect(result.length).to.be.equal(1);
      expect(result[0]).to.satisfy(isCreate);
      expect((<Create>result[0]).new.parent).to.be.equal(locamationPrivate);
      expect((<Create>result[0]).new.element.textContent).to.be.equal('1');
    });

    it('will return empty array when locamation private not passed', () => {
      const result = createEditorAction(null, 'CHANNEL', '1');

      expect(result).to.be.empty;
    });
  });

  describe('hasPrivateElement - ', () => {
    it('will find private', () => {
      const locamationPrivate = <Element>new DOMParser().parseFromString(
        `<Private type="LCMTN_VMU_SENSOR" xmlns:lcmtn_ext="https://www.locamation.com/61850/VMU/SCL">
           <lcmtn_ext:P type="CHANNEL">0</lcmtn_ext:P>
         </Private>`,
        'application/xml').documentElement;

      const result = hasPrivateElement(locamationPrivate, 'CHANNEL');

      expect(result).to.be.true;
    });

    it('will not find private', () => {
      const locamationPrivate = <Element>new DOMParser().parseFromString(
        `<Private type="LCMTN_VMU_SENSOR"></Private>`,
        'application/xml').documentElement;

      const result = hasPrivateElement(locamationPrivate, 'CHANNEL');

      expect(result).to.be.false;
    });

    it('will return false when locamation private not passed', () => {
      const result = hasPrivateElement(null, 'CHANNEL');

      expect(result).to.be.false;
    });
  });

  describe('getPrivateTextValue - ', () => {
    it('will find private value', () => {
      const locamationPrivate = <Element>new DOMParser().parseFromString(
        `<Private type="LCMTN_VMU_SENSOR" xmlns:lcmtn_ext="https://www.locamation.com/61850/VMU/SCL">
           <lcmtn_ext:P type="CHANNEL">0</lcmtn_ext:P>
         </Private>`,
        'application/xml').documentElement;

      const result = getPrivateTextValue(locamationPrivate, 'CHANNEL');

      expect(result).to.be.not.null;
      expect(result).to.be.equal('0');
    });

    it('will return null when private not found', () => {
      const locamationPrivate = <Element>new DOMParser().parseFromString(
        `<Private type="LCMTN_VMU_SENSOR">
         </Private>`,
        'application/xml').documentElement;

      const result = getPrivateTextValue(locamationPrivate, 'CHANNEL');

      expect(result).to.be.null;
    });

    it('will return null when locamation private not passed', () => {
      const result = getPrivateTextValue(null, 'CHANNEL');

      expect(result).to.be.null;
    });
  });
});
