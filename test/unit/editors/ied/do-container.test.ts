import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/do-container.js';
import { DOContainer } from '../../../../src/editors/ied/do-container.js';

describe('do-container', () => {
  let element: DOContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a DO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')}
    ></do-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a SDO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someSdo"]')}
    ></do-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  describe('has a getDOType function ', () => {
    it('which return the correct DOType for a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')}
      ></do-container>`);
  
      const doType = element['getDOType']();
      expect(doType).to.not.be.null;
      expect(doType!.tagName).to.eql('DOType');
      expect(doType!.getAttribute('id')).to.eql('Dummy.LLN0.Mod');
    });
  
    it('which returns null if DOType cannot be found for a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="SomeMod"]')}
      ></do-container>`);
  
      expect(element['getDOType']()).to.be.null;
    });
  });

  describe('has a getNestedSdoElements function ', () => {
    it('which return the (S)DO containers underneath a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]')}
      ></do-container>`);
  
      const nestedDOs = element['getNestedDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(2);
      expect(nestedDOs![1].getAttribute('name')).to.eql('someOtherSdo');
    });

    it('which return the (S)DO containers underneath a given SDO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someOtherSdo"]')}
      ></do-container>`);
  
      const nestedDOs = element['getNestedDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(1);
      expect(nestedDOs![0].getAttribute('name')).to.eql('anotherSdo');
    });
    
    it('which return an empty array if a DO doesn\t have (S)DO\'s underneath.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="someSdoType"] > SDO[name="anotherSdo"]')}
      ></do-container>`);
  
      const nestedDOs = element['getNestedDOElements']();
      expect(nestedDOs).to.be.empty;
    });
  });
});
