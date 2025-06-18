import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/ied/do-container.js';
import { DOContainer } from '../../../../src/editors/ied/do-container.js';
import { initializeNsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';

describe('do-container', async () => {
  let element: DOContainer;
  let validSCL: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a DO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )}
      .nsdoc=${nsdoc}
    ></do-container>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a DO element and child elements are toggled.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )}
      .nsdoc=${nsdoc}
    ></do-container>`);

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    await expect(element).shadowDom.to.equalSnapshot();

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(
      0
    );
  });

  it('looks like the latest snapshot with a SDO element.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someSdo"]'
      )}
      .nsdoc=${nsdoc}
    ></do-container>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a SDO element and child elements are toggled.', async () => {
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someSdo"]'
      )}
      .nsdoc=${nsdoc}
    ></do-container>`);

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    await expect(element).shadowDom.to.equalSnapshot();

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(
      0
    );
  });

  describe('has a getDOElements function ', () => {
    it('which return the (S)DO containers underneath a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(2);
      expect(nestedDOs![1].getAttribute('name')).to.eql('someOtherSdo');
    });

    it('which return the (S)DO containers underneath a given SDO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.ExtendedMod"] > SDO[name="someOtherSdo"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(1);
      expect(nestedDOs![0].getAttribute('name')).to.eql('anotherSdo');
    });

    it('which return an empty array if the DoType cannot be found', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.Mod"] > SDO[name="sdoName2"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });

    it("which return an empty array if a DO doesn\t have child (S)DO's.", async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="someSdoType"] > SDO[name="anotherSdo"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });
  });

  describe('has a getDAElements function ', () => {
    it('which return the DA containers underneath a given DO.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="ExtendedMod"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDAElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(14);
      expect(nestedDOs![2].getAttribute('name')).to.eql('t');
    });

    it('which return an empty array if the DoType cannot be found', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.Mod"] > SDO[name="sdoName2"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDAElements']();
      expect(nestedDOs).to.be.empty;
    });

    it("which return an empty array if a DO doesn\t have child DA's.", async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LLN0.Mod"] > SDO[name="sdoName3"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });
  });

  describe('has a getInstanceDOElement function ', () => {
    it('which return a DOI when a DO has a valid instance element.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.CSWIwithoutCtlModel"] > DO[name="Pos"]'
        )}
        .instanceElement=${validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="CSWI"] > DOI[name="Pos"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const sdo = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.CSWI.Pos2"] > SDO[name="anotherPosDo"]'
      );

      const doi = element['getInstanceDOElement'](sdo!);
      expect(doi).to.not.be.null;
      expect(doi?.tagName).to.eql('SDI');
      expect(doi?.getAttribute('name')).to.eql('anotherPosDo');
    });

    it("which returns null if there's no SDI available within a DOI.", async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.CSWIwithoutCtlModel"] > DO[name="Pos"]'
        )}
        .instanceElement=${validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="CSWI"] > DOI[name="Pos"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const sdo = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.CSWI.Pos2"] > SDO[name="someQualityThing"]'
      );

      const doi = element['getInstanceDOElement'](sdo!);
      expect(doi).to.be.null;
    });

    it('which returns null if no root DOI is available.', async () => {
      element = await fixture(html`<do-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > LNodeType[id="Dummy.CSWIwithoutCtlModel"] > DO[name="Pos"]'
        )}
        .nsdoc=${nsdoc}
      ></do-container>`);

      const sdo = validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.CSWI.Pos2"] > SDO[name="someQualityThing"]'
      );

      const doi = element['getInstanceDOElement'](sdo!);
      expect(doi).to.be.null;
    });
  });
});
