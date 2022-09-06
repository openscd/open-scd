import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/ied/ln-container.js';
import { LNContainer } from '../../../../src/editors/ied/ln-container.js';
import { initializeNsdoc } from '../../../../src/foundation/nsdoc.js';

describe('ln-container', async () => {
  let element: LNContainer;
  let validSCL: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a LN0 element.', async () => {
    element = await fixture(html` <ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]'
      )}
      .nsdoc=${nsdoc}
    ></ln-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a LN0 element and child elements are toggled.', async () => {
    element = await fixture(html` <ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]'
      )}
      .nsdoc=${nsdoc}
    ></ln-container>`);

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
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(
      0
    );
  });

  it('looks like the latest snapshot with a LN element.', async () => {
    element = await fixture(html` <ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]'
      )}
      .nsdoc=${nsdoc}
    ></ln-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a LN element and child elements are toggled.', async () => {
    element = await fixture(html` <ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]'
      )}
      .nsdoc=${nsdoc}
    ></ln-container>`);

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
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(
      0
    );
  });

  describe('has a getDOElements function ', () => {
    it('which return the DO containers underneath a given LN.', async () => {
      element = await fixture(html` <ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="Disconnectors"] > LN[lnClass="CILO"]'
        )}
        .nsdoc=${nsdoc}
      ></ln-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(4);
      expect(nestedDOs![1].getAttribute('name')).to.eql('NamPlt');
    });

    it('which return the DO containers underneath a given LN0.', async () => {
      element = await fixture(html` <ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]'
        )}
        .nsdoc=${nsdoc}
      ></ln-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(6);
      expect(nestedDOs![4].getAttribute('name')).to.eql('Health');
    });

    it("which return an empty array if a LN doesn\t have child DO's.", async () => {
      element = await fixture(html` <ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="tHarde"]'
        )}
        .nsdoc=${nsdoc}
      ></ln-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });

    it("which return an empty array if the LNodeType of a LN doesn't exist.", async () => {
      element = await fixture(html` <ln-container
        .element=${validSCL.querySelector('LN[lnType="nonExistingLnType"]')}
        .nsdoc=${nsdoc}
      ></ln-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
    });
  });

  describe('has a getInstanceElement function ', () => {
    beforeEach(async () => {
      element = await fixture(html` <ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CBSW"] > LN[lnClass="XCBR"]'
        )}
        .nsdoc=${nsdoc}
      ></ln-container>`);
    });

    it("which returns a DOI for a LN if it's available.", async () => {
      const dO = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.XCBR1"] > DO[name="Pos"]'
      );
      const instance = element['getInstanceElement'](dO!)!;
      expect(instance).to.not.be.null;
      expect(instance.tagName).to.eql('DOI');
      expect(instance.getAttribute('name')).to.eql('Pos');
    });

    it('which returns null if no DOI is available.', async () => {
      const dO = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.XCBR1"] > DO[name="Loc"]'
      );
      expect(element['getInstanceElement'](dO!)!).to.be.null;
    });
  });
});
