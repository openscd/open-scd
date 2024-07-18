import { expect, fixture, html } from '@open-wc/testing';

import '../mock-open-scd.js';
import { MockOpenSCD } from '../mock-open-scd.js';

import { TextField } from '@material/mwc-textfield';

describe('OpenSCD-Plugin', () => {
  let element: MockOpenSCD;
  let doc: XMLDocument;
  const docName = 'testDoc';

  afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 50)); // await animation
    localStorage.clear();
  });
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <MockOpenSCD>(
      await fixture(
        html`<mock-open-scd .doc=${doc} .docName=${docName}></mock-open-scd>`
      )
    );
    await element.updateComplete;
  });

  it('stores default plugins on load', () =>
    expect(element.layout).property('editors').to.have.lengthOf(6));

  it('has Locale property', async () => {
    expect(element).to.have.property('locale');
  });

  it('has docs property', () => {
    expect(element).to.have.property(`docs`).that.is.a('Object');
    expect(element.docs[docName]).to.equal(doc);
  });

  describe('plugin manager dialog', () => {
    let firstEditorPlugin: HTMLElement;
    let resetAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      element.layout.pluginUI.show();
      await element.layout.pluginUI.updateComplete;
      firstEditorPlugin = <HTMLElement>(
        element.layout.pluginList.querySelector(
          'mwc-check-list-item:not([noninteractive])'
        )
      );

      resetAction = <HTMLElement>(
        element.layout.pluginUI.querySelector('mwc-button[slot="secondaryAction"]')
      );
      primaryAction = <HTMLElement>(
        element.layout.pluginUI.querySelector('mwc-button[slot="primaryAction"]')
      );
    });

    it('disables deselected plugins', async () => {
      firstEditorPlugin.click();
      await element.updateComplete;
      expect(element.layout).property('editors').to.have.lengthOf(5);
    });

    it('enables selected plugins', async () => {
      (<HTMLElement>element.layout.pluginList.firstElementChild).click();
      await element.updateComplete;
      (<HTMLElement>element.layout.pluginList.firstElementChild).click();
      await element.updateComplete;
      expect(element.layout).property('editors').to.have.lengthOf(6);
    });

    it('resets plugins to default on reset button click', async () => {
      (<HTMLElement>element.layout.pluginList.firstElementChild).click();
      await element.updateComplete;
      resetAction.click();
      await element.updateComplete;
      expect(element.layout).property('editors').to.have.lengthOf(6);
    });

    it('opens the custom plugin dialog on add button click', async () => {
      primaryAction.click();
      await element.updateComplete;
      expect(element.layout)
        .property('pluginDownloadUI')
        .to.have.property('open', true);
    });
  });

  describe('add custom plugin dialog', () => {
    let src: TextField;
    let name: TextField;
    let primaryAction: HTMLElement;
    let menuKindOption: HTMLElement;
    let validatorKindOption: HTMLElement;

    beforeEach(async () => {
      src = <TextField>(
        element.layout.pluginDownloadUI.querySelector('#pluginSrcInput')
      );
      name = <TextField>(
        element.layout.pluginDownloadUI.querySelector('#pluginNameInput')
      );
      primaryAction = <HTMLElement>(
        element.layout.pluginDownloadUI.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      element.layout.pluginDownloadUI.show();
      await element.layout.pluginDownloadUI.updateComplete;
      await element.updateComplete;
      menuKindOption = <HTMLElement>(
        element.layout.pluginDownloadUI.querySelector(
          '#pluginKindList > mwc-radio-list-item[value="menu"]'
        )
      );
      validatorKindOption = <HTMLElement>(
        element.layout.pluginDownloadUI.querySelector(
          '#pluginKindList > mwc-radio-list-item[id="validator"]'
        )
      );
    });

    it('requires a name and a valid URL to add a plugin', async () => {
      primaryAction.click();
      expect(element.layout.pluginDownloadUI).to.have.property('open', true);

      src.value = 'http://example.com/plugin.js';
      await src.updateComplete;
      primaryAction.click();
      expect(element.layout.pluginDownloadUI).to.have.property('open', true);

      src.value = 'notaURL';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      expect(element.layout.pluginDownloadUI).to.have.property('open', true);

      src.value = 'http://example.com/plugin.js';
      await src.updateComplete;
      primaryAction.click();
      expect(element.layout.pluginDownloadUI).to.have.property('open', false);
    });

    it('adds a new editor kind plugin on add button click', async () => {
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.layout.editors).to.have.lengthOf(7);
    });
    it('adds a new menu kind plugin on add button click', async () => {
      const lengthMenuKindPlugins = element.layout.menuEntries.length;
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      menuKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.layout.menuEntries).to.have.lengthOf(lengthMenuKindPlugins + 1);
    });
    it('sets requireDoc and position for new menu kind plugin', async () => {
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      menuKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;

      expect(
        element.layout.menuEntries[element.layout.menuEntries.length - 1]
      ).to.have.property('requireDoc');
      expect(
        element.layout.menuEntries[element.layout.menuEntries.length - 1]
      ).to.have.property('position');
    });
    it('adds a new validator kind plugin on add button click', async () => {
      expect(element.layout.validators).to.have.lengthOf(2);
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      validatorKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.layout.validators).to.have.lengthOf(3);
    });
  });
});
