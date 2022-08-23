import { expect, fixture, html } from '@open-wc/testing';

import ExportIEDParamsPlugin, {
  Configuration,
} from '../../../src/menu/ExportIEDParams.js';

describe('Export IED Params Plugin -', () => {
  if (customElements.get('export-ied-params') === undefined)
    customElements.define('export-ied-params', ExportIEDParamsPlugin);

  let plugin: ExportIEDParamsPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    plugin = await fixture(html` <export-ied-params></export-ied-params>`);

    doc = await fetch('/test/testfiles/menu/export-ied-params.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    plugin.doc = doc;
  });

  describe('determine selector (getSelector) -', () => {
    it('when no variable in string then same string returned', () => {
      const selector = 'LN[lnClass="TCTR"]';
      expect(plugin['getSelector'](selector, 'IED1')).to.be.equal(selector);
    });

    it('when variable in string then variable is replaced', () => {
      const iedName = 'IED1';
      const expectedSelector = `ConnectedAP[iedName="${iedName}"]`;

      const selectorVariant1 = 'ConnectedAP[iedName="{{ iedName }}"]';
      expect(plugin['getSelector'](selectorVariant1, 'IED1')).to.be.equal(
        expectedSelector
      );

      const selectorVariant2 = 'ConnectedAP[iedName="{{iedName}}"]';
      expect(plugin['getSelector'](selectorVariant2, 'IED1')).to.be.equal(
        expectedSelector
      );

      const selectorVariant3 = 'ConnectedAP[iedName="{{   iedName   }}"]';
      expect(plugin['getSelector'](selectorVariant3, 'IED1')).to.be.equal(
        expectedSelector
      );
    });
  });

  describe('retrieve the data template element from a type element (getDataTypeChildElement) -', () => {
    it('when called with a LNodeType element and a known name is passed then correct DO Element returned', () => {
      const typeElement = doc.querySelector('LNodeType[id="Dummy.TVTR"]');

      const dataElement = plugin['getDataTypeChildElement'](
        typeElement!,
        'Beh'
      );
      expect(dataElement).to.be.not.null;
      expect(dataElement?.tagName).to.be.equal('DO');
      expect(dataElement).to.have.attribute('type', 'OpenSCD_ENS_Beh');
    });

    it('when called with a LNodeType element and a unknown name is passed then null returned', () => {
      const typeElement = doc.querySelector('LNodeType[id="Dummy.TVTR"]');

      const dataElement = plugin['getDataTypeChildElement'](
        typeElement!,
        'Unknown'
      );
      expect(dataElement).to.be.null;
    });

    it('when called with a DOType element and a known name is passed then correct DO Element returned', () => {
      const typeElement = doc.querySelector('DOType[id="Dummy.ASG"]');

      const dataElement = plugin['getDataTypeChildElement'](typeElement!, 'q');
      expect(dataElement).to.be.not.null;
      expect(dataElement?.tagName).to.be.equal('DA');
      expect(dataElement).to.have.attribute('bType', 'Quality');
    });

    it('when called with a DOType element and a unknown name is passed then null returned', () => {
      const typeElement = doc.querySelector('DOType[id="Dummy.ASG"]');

      const dataElement = plugin['getDataTypeChildElement'](
        typeElement!,
        'Unknown'
      );
      expect(dataElement).to.be.null;
    });

    it('when called with a DAType element and a known name is passed then correct BDA Element returned', () => {
      const typeElement = doc.querySelector(
        'DAType[id="OpenSCD_Cancel_BehaviourModeKind"]'
      );

      const dataElement = plugin['getDataTypeChildElement'](
        typeElement!,
        'ctlNum'
      );
      expect(dataElement).to.be.not.null;
      expect(dataElement?.tagName).to.be.equal('BDA');
      expect(dataElement).to.have.attribute('bType', 'INT8U');
    });

    it('when called with a DAType element and a unknown name is passed then null returned', () => {
      const typeElement = doc.querySelector(
        'DAType[id="OpenSCD_Cancel_BehaviourModeKind"]'
      );

      const dataElement = plugin['getDataTypeChildElement'](
        typeElement!,
        'Unknown'
      );
      expect(dataElement).to.be.null;
    });
  });

  describe('retrieve the type element from a data element (getDataTypeTemplateElement) -', () => {
    it('when passing a DO Element then the DOType Element is returned', () => {
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.TCTR"] > DO[name="Rat"]'
      );

      const typeElement = plugin['getDataTypeTemplateElement'](doElement);
      expect(typeElement).to.be.not.null;
      expect(typeElement?.tagName).to.be.equal('DOType');
      expect(typeElement).to.have.attribute('cdc', 'ASG');
    });

    it('when passing a DA Element then the DAType Element is returned', () => {
      const daElement = doc.querySelector(
        'DOType[id="OpenSCD_ENC_Mod"] > DA[name="Oper"]'
      );

      const typeElement = plugin['getDataTypeTemplateElement'](daElement);
      expect(typeElement).to.be.not.null;
      expect(typeElement?.tagName).to.be.equal('DAType');
      expect(typeElement).to.have.attribute(
        'id',
        'OpenSCD_OperSBOw_BehaviourModeKind'
      );
    });
  });

  describe('retrieving the value of a attribute of text content (getValue) -', () => {
    it('when called with known attribute then the value of attribute is returned', () => {
      const iedElement = doc.querySelector('IED[name="IED1"]');

      const value = plugin['getValue'](iedElement!, 'manufacturer');
      expect(value).to.be.equal('DummyManu');
    });

    it('when called with unknown attribute then the empty value is returned', () => {
      const iedElement = doc.querySelector('IED[name="IED1"]');

      const value = plugin['getValue'](iedElement!, 'unknown');
      expect(value).to.be.empty;
    });

    it('when called to retrieve text content then text content is returned', () => {
      const daiElement = doc.querySelector(
        'IED[name="IED1"] LN[lnClass="TCTR"][inst="1"][lnType="Dummy.TCTR"] > ' +
          'DOI[name="HzRtg"] > SDI[name="setMag"] > DAI[name="i"] > Val'
      );

      const value = plugin['getValue'](daiElement!, undefined);
      expect(value).to.be.equal('60');
    });

    it('when called to retrieve text content, but there is no then the empty value is returned', () => {
      const daElement = doc.querySelector(
        'DAType[id="OpenSCD_Cancel_BehaviourModeKind"] > BDA[name="ctlVal"]'
      );

      const value = plugin['getValue'](daElement!, undefined);
      expect(value).to.be.empty;
    });
  });

  describe('retrieve the template value linked to a LN(0) element (getDataAttributeTemplateValue) -', () => {
    let iedElement: Element;
    let lnElement: Element;

    beforeEach(() => {
      iedElement = doc.querySelector('IED[name="IED1"]')!;
      lnElement = iedElement.querySelector(
        'LN[prefix="RES"][lnClass="TCTR"][inst="1"]'
      )!;
    });

    it('when a known path is passed then the value of the template is returned', () => {
      const value = plugin['getDataAttributeTemplateValue'](lnElement, [
        'Mod',
        'ctlModel',
      ]);

      expect(value).to.be.equal('sbo-with-enhanced-security');
    });

    it('when no (complete) attribute path is passed then null is returned', () => {
      const value = plugin['getDataAttributeTemplateValue'](lnElement, []);

      expect(value).to.be.null;
    });

    it('when something else as a LN element is passed then null is returned', () => {
      const value = plugin['getDataAttributeTemplateValue'](iedElement, [
        'ARtgSec',
        'setVal',
      ]);

      expect(value).to.be.null;
    });
  });

  describe('retrieve the instance value below a LN(0) element (getDataAttributeInstanceValue) -', () => {
    let iedElement: Element;
    let lnElement: Element;

    beforeEach(() => {
      iedElement = doc.querySelector('IED[name="IED1"]')!;
      lnElement = iedElement.querySelector(
        'LN[prefix="RES"][lnClass="TCTR"][inst="1"]'
      )!;
    });

    it('when a instance value is defined then that value is returned', () => {
      const value = plugin['getDataAttributeInstanceValue'](lnElement, [
        'ARtgSec',
        'setVal',
      ]);

      expect(value).to.be.equal('5');
    });

    it('when no instance value is defined then null will be returned', () => {
      const value = plugin['getDataAttributeInstanceValue'](lnElement, [
        'Mod',
        'ctlModel',
      ]);

      expect(value).to.be.null;
    });

    it('when no (complete) attribute path is passed then null is returned', () => {
      const value = plugin['getDataAttributeInstanceValue'](lnElement, []);

      expect(value).to.be.null;
    });

    it('when something else as a LN element is passed then null is returned', () => {
      const value = plugin['getDataAttributeInstanceValue'](iedElement, [
        'ARtgSec',
        'setVal',
      ]);

      expect(value).to.be.null;
    });
  });

  describe('retrieve the value below a LN(0) element (getDataAttributeValue) -', () => {
    let lnElement: Element;

    beforeEach(() => {
      lnElement = doc.querySelector(
        'IED[name="IED1"] LN[prefix="RES"][lnClass="TCTR"][inst="1"]'
      )!;
    });

    it('when a instance value is defined then that value is returned', () => {
      const value = plugin['getDataAttributeValue'](lnElement, [
        'ARtgSec',
        'setVal',
      ]);

      expect(value).to.be.equal('5');
    });

    it('when a template value is defined then that value is returned', () => {
      const value = plugin['getDataAttributeValue'](lnElement, [
        'Mod',
        'ctlModel',
      ]);

      expect(value).to.be.equal('sbo-with-enhanced-security');
    });
  });

  describe('retrieve the elements to search retrieve the value from (getElements) -', () => {
    let iedElement: Element;

    beforeEach(() => {
      iedElement = doc.querySelector('IED[name="IED1"]')!;
    });

    it('when no selector is passed then the IED element is returned', () => {
      const elements = plugin['getElements'](iedElement, undefined, false);

      expect(elements).to.have.length(1);
      expect(elements[0]).to.be.equal(iedElement);
    });

    it('when selector to search below the IED is passed then the expected elements are returned', () => {
      const elements = plugin['getElements'](
        iedElement,
        'LN[prefix="RES"][lnClass="TCTR"][inst="1"]',
        false
      );

      expect(elements).to.have.length(1);
      const lnElement = elements[0];
      expect(lnElement.tagName).to.be.equal('LN');
      expect(lnElement).to.have.attribute('lnType', 'Dummy.TCTR');
    });

    it('when selector to search in the document is passed then the expected elements are returned', () => {
      const elements = plugin['getElements'](
        iedElement,
        'Communication ConnectedAP[iedName="{{ iedName }}"]',
        true
      );

      expect(elements).to.have.length(1);
      const lnElement = elements[0];
      expect(lnElement.tagName).to.be.equal('ConnectedAP');
      expect(lnElement).to.have.attribute('apName', 'A1');
    });
  });

  describe('create a line of data for a single IED (cvsLine) -', () => {
    let configuration: Configuration;

    beforeEach(async () => {
      const jsonContent = await fetch(
        '../../../public/conf/export-ied-params.json'
      ).then(response => response.text());
      configuration = JSON.parse(jsonContent);
    });

    it('when passing IED1 then the expected String Array is returned', () => {
      const iedElement = doc.querySelector('IED[name="IED1"]');

      const values = plugin['cvsLine'](configuration, iedElement!);
      expect(values).to.have.length(18);
      expect(values[0]).to.be.equal('IED1');
      expect(values[1]).to.be.equal('192.168.210.134');
      expect(values[2]).to.be.equal('255.255.255.0');
      expect(values[3]).to.be.equal('The first IED');
      expect(values[4]).to.be.equal('1000');
      expect(values[5]).to.be.equal('1000');
      expect(values[6]).to.be.equal('5');
      expect(values[7]).to.be.equal('100');
      expect(values[8]).to.be.equal('100');
      expect(values[9]).to.be.equal('5');
      expect(values[10]).to.be.equal('10000');
      expect(values[11]).to.be.equal('200');
      expect(values[12]).to.be.equal('500');
      expect(values[13]).to.be.equal('5000');
      expect(values[14]).to.be.equal('200');
      expect(values[15]).to.be.equal('25');
      expect(values[16]).to.be.equal('Some Vendor');
      expect(values[17]).to.be.equal('Some Model');
    });

    it('when passing IED2 then the expected String Array is returned', () => {
      const iedElement = doc.querySelector('IED[name="IED2"]');

      const values = plugin['cvsLine'](configuration, iedElement!);
      expect(values).to.have.length(18);
      expect(values[0]).to.be.equal('IED2');
      expect(values[1]).to.be.empty;
      expect(values[2]).to.be.empty;
      expect(values[3]).to.be.equal('The second IED');
      expect(values[4]).to.be.equal('1500');
      expect(values[5]).to.be.equal('1500');
      expect(values[6]).to.be.equal('10');
      expect(values[7]).to.be.equal('100');
      expect(values[8]).to.be.equal('100');
      expect(values[9]).to.be.equal('5');
      expect(values[10]).to.be.equal('15000');
      expect(values[11]).to.be.equal('250');
      expect(values[12]).to.be.equal('550');
      expect(values[13]).to.be.equal('5000');
      expect(values[14]).to.be.equal('200');
      expect(values[15]).to.be.equal('25');
      expect(values[16]).to.be.equal('Other Vendor');
      expect(values[17]).to.be.equal('Other Model');
    });
  });

  describe('create the header line using the configuration file (columnHeaders) -', () => {
    let configuration: Configuration;

    beforeEach(async () => {
      const jsonContent = await fetch(
        '../../../public/conf/export-ied-params.json'
      ).then(response => response.text());
      configuration = JSON.parse(jsonContent);
    });

    it('when called then the expected headers are returned from the configuration file', () => {
      const headers = plugin['columnHeaders'](configuration);
      expect(headers).to.have.length(18);
    });
  });

  describe('create a line for each IED in the document (cvsLines) -', () => {
    let configuration: Configuration;

    beforeEach(async () => {
      const jsonContent = await fetch(
        '../../../public/conf/export-ied-params.json'
      ).then(response => response.text());
      configuration = JSON.parse(jsonContent);
    });

    it('when passing a document with IEDs then the expected number of lines are returned', () => {
      const content = plugin['cvsLines'](configuration);

      expect(content).to.have.length(2);
    });

    it('when passing a document without IEDs then one lines is returned with a single column', async () => {
      doc = await fetch('/test/testfiles/menu/export-ied-params-no-ied.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      plugin.doc = doc;

      const content = plugin['cvsLines'](configuration);

      // One line returned
      expect(content).to.have.length(1);
      // And that line only contains 1 column.
      expect(content[0]).to.have.length(1);
    });
  });
});
