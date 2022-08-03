import { expect, fixture, html } from '@open-wc/testing';

import ExportIEDParamsPlugin, {
  Settings,
} from '../../../src/menu/ExportIEDParams.js';

describe('Export IED Params Plugin - ', () => {
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

  describe('determine selector - ', () => {
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

  describe('retrieve the data template element from a type element - ', () => {
    it('when called with a LNodeType element and a known name is passed then correct DO Element returned', () => {
      const typeElement = doc.querySelector('LNodeType[id="Dummy.TVTR"]');

      const dataElement = plugin['getDataElement'](typeElement!, 'Beh');
      expect(dataElement).to.be.not.null;
      expect(dataElement?.tagName).to.be.equal('DO');
      expect(dataElement).to.have.attribute('type', 'OpenSCD_ENS_Beh');
    });

    it('when called with a LNodeType element and a unknown name is passed then null returned', () => {
      const typeElement = doc.querySelector('LNodeType[id="Dummy.TVTR"]');

      const dataElement = plugin['getDataElement'](typeElement!, 'Unknown');
      expect(dataElement).to.be.null;
    });

    it('when called with a DOType element and a known name is passed then correct DO Element returned', () => {
      const typeElement = doc.querySelector('DOType[id="Dummy.ASG"]');

      const dataElement = plugin['getDataElement'](typeElement!, 'q');
      expect(dataElement).to.be.not.null;
      expect(dataElement?.tagName).to.be.equal('DA');
      expect(dataElement).to.have.attribute('bType', 'Quality');
    });

    it('when called with a DOType element and a unknown name is passed then null returned', () => {
      const typeElement = doc.querySelector('DOType[id="Dummy.ASG"]');

      const dataElement = plugin['getDataElement'](typeElement!, 'Unknown');
      expect(dataElement).to.be.null;
    });

    it('when called with a DAType element and a known name is passed then correct DO Element returned', () => {
      const typeElement = doc.querySelector(
        'DAType[id="OpenSCD_Cancel_BehaviourModeKind"]'
      );

      const dataElement = plugin['getDataElement'](typeElement!, 'ctlNum');
      expect(dataElement).to.be.not.null;
      expect(dataElement?.tagName).to.be.equal('BDA');
      expect(dataElement).to.have.attribute('bType', 'INT8U');
    });

    it('when called with a DAType element and a unknown name is passed then null returned', () => {
      const typeElement = doc.querySelector(
        'DAType[id="OpenSCD_Cancel_BehaviourModeKind"]'
      );

      const dataElement = plugin['getDataElement'](typeElement!, 'Unknown');
      expect(dataElement).to.be.null;
    });
  });

  describe('retrieve the type element from a data element', () => {
    it('when passing a DO Element then the DOType Element is returned', () => {
      const doElement = doc.querySelector(
        'LNodeType[id="Dummy.TCTR"] > DO[name="Rat"]'
      );

      const typeElement = plugin['getTypeElement'](doElement);
      expect(typeElement).to.be.not.null;
      expect(typeElement?.tagName).to.be.equal('DOType');
      expect(typeElement).to.have.attribute('cdc', 'ASG');
    });

    it('when passing a DA Element then the DOType Element is returned', () => {
      const daElement = doc.querySelector(
        'DOType[id="OpenSCD_ENC_Mod"] > DA[name="Oper"]'
      );

      const typeElement = plugin['getTypeElement'](daElement);
      expect(typeElement).to.be.not.null;
      expect(typeElement?.tagName).to.be.equal('DAType');
      expect(typeElement).to.have.attribute(
        'id',
        'OpenSCD_OperSBOw_BehaviourModeKind'
      );
    });
  });

  describe('retrieving the value of a attribute of text content -', () => {
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

  describe('create a line of data for a single IED', () => {
    let settings: Settings;

    beforeEach(async () => {
      const jsonContent = await fetch(
        '../../../public/conf/export-ied-parameters.json'
      ).then(response => response.text());
      settings = JSON.parse(jsonContent);
    });

    it('when passing IED1 then the expected String Array is returned', () => {
      const iedElement = doc.querySelector('IED[name="IED1"]');

      const values = plugin['contentIED'](settings, iedElement!);
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

      const values = plugin['contentIED'](settings, iedElement!);
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

  describe('create the header line using the settings file', () => {
    let settings: Settings;

    beforeEach(async () => {
      const jsonContent = await fetch(
        '../../../public/conf/export-ied-parameters.json'
      ).then(response => response.text());
      settings = JSON.parse(jsonContent);
    });

    it('when called then the expected headers are returned from the settings file', () => {
      const headers = plugin['columnHeaders'](settings);
      expect(headers).to.have.length(18);
    });
  });

  describe('create a line for each IED in the document', () => {
    let settings: Settings;

    beforeEach(async () => {
      const jsonContent = await fetch(
        '../../../public/conf/export-ied-parameters.json'
      ).then(response => response.text());
      settings = JSON.parse(jsonContent);
    });

    it('when passing a document with IEDs then the expected number of lines are returned', () => {
      const content = plugin['content'](settings);

      expect(content).to.have.length(2);
    });

    it('when passing a document without IEDs then one lines is returned with a single column', async () => {
      doc = await fetch('/test/testfiles/menu/export-ied-params-no-ied.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      plugin.doc = doc;

      const content = plugin['content'](settings);

      // One line returned
      expect(content).to.have.length(1);
      // And that line only contains 1 column.
      expect(content[0]).to.have.length(1);
    });
  });
});
