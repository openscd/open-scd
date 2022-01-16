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

  it('looks like the latest snapshot with a DO element and child elements are toggled.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')}
    ></do-container>`);

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element).shadowDom.to.equalSnapshot();
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(0);
  });

  it('looks like the latest snapshot with a SDO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someSdo"]')}
    ></do-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a SDO element and child elements are toggled.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someSdo"]')}
    ></do-container>`);

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element).shadowDom.to.equalSnapshot();
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(0);
  });

  describe('has a getDOElements function ', () => {
    it('which return the (S)DO containers underneath a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(2);
      expect(nestedDOs![1].getAttribute('name')).to.eql('someOtherSdo');
    });

    it('which return the (S)DO containers underneath a given SDO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someOtherSdo"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(1);
      expect(nestedDOs![0].getAttribute('name')).to.eql('anotherSdo');
    });

    it('which return an empty array if the DoType cannot be found', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.Mod"] > SDO[name="sdoName2"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });
    
    it('which return an empty array if a DO doesn\t have child (S)DO\'s.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="someSdoType"] > SDO[name="anotherSdo"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });
  });

  describe('has a getDAElements function ', () => {
    it('which return the DA containers underneath a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDAElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(14);
      expect(nestedDOs![2].getAttribute('name')).to.eql('t');
    });

    it('which return an empty array if the DoType cannot be found', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.Mod"] > SDO[name="sdoName2"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDAElements']();
      expect(nestedDOs).to.be.empty;
    });
    
    it('which return an empty array if a DO doesn\t have child DA\'s.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.Mod"] > SDO[name="sdoName3"]')}
      ></do-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });
  });
});
