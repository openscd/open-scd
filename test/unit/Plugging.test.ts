import { expect, fixture, html } from '@open-wc/testing';

import './mock-plugger.js';
import { MockPlugger } from './mock-plugger.js';

import { TextField } from '@material/mwc-textfield';

describe('PluggingElement', () => {
  let element: MockPlugger;
  let doc: XMLDocument;

  afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 50)); // await animation
    localStorage.clear();
  });
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <MockPlugger>(
      await fixture(
        html`<mock-plugger .doc=${doc} docName="testDoc"></mock-plugger>`
      )
    );
    await element.updateComplete;
  });

  it('stores default plugins on load', () =>
    expect(element).property('editors').to.have.lengthOf(9));

  describe('plugin manager dialog', () => {
    let firstEditorPlugin: HTMLElement;
    let resetAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      element.pluginUI.show();
      await element.pluginUI.updateComplete;
      firstEditorPlugin = <HTMLElement>(
        element.pluginList.querySelector(
          'mwc-check-list-item:not([noninteractive])'
        )
      );

      resetAction = <HTMLElement>(
        element.pluginUI.querySelector('mwc-button[slot="secondaryAction"]')
      );
      primaryAction = <HTMLElement>(
        element.pluginUI.querySelector('mwc-button[slot="primaryAction"]')
      );
    });

    it('disables deselected plugins', async () => {
      firstEditorPlugin.click();
      await element.updateComplete;
      expect(element).property('editors').to.have.lengthOf(8);
    });

    it('enables selected plugins', async () => {
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      expect(element).property('editors').to.have.lengthOf(9);
    });

    it('resets plugins to default on reset button click', async () => {
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      resetAction.click();
      await element.updateComplete;
      expect(element).property('editors').to.have.lengthOf(9);
    });

    it('opens the custom plugin dialog on add button click', async () => {
      primaryAction.click();
      await element.updateComplete;
      expect(element)
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
        element.pluginDownloadUI.querySelector('#pluginSrcInput')
      );
      name = <TextField>(
        element.pluginDownloadUI.querySelector('#pluginNameInput')
      );
      primaryAction = <HTMLElement>(
        element.pluginDownloadUI.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      element.pluginDownloadUI.show();
      await element.pluginDownloadUI.updateComplete;
      menuKindOption = <HTMLElement>(
        element.pluginDownloadUI.querySelector(
          '#pluginKindList > mwc-radio-list-item[id="menu"]'
        )
      );
      validatorKindOption = <HTMLElement>(
        element.pluginDownloadUI.querySelector(
          '#pluginKindList > mwc-radio-list-item[id="validator"]'
        )
      );
    });

    it('requires a name and a valid URL to add a plugin', async () => {
      primaryAction.click();
      expect(element.pluginDownloadUI).to.have.property('open', true);

      src.value = 'http://example.com/plugin.js';
      await src.updateComplete;
      primaryAction.click();
      expect(element.pluginDownloadUI).to.have.property('open', true);

      src.value = 'notaURL';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      expect(element.pluginDownloadUI).to.have.property('open', true);

      src.value = 'http://example.com/plugin.js';
      await src.updateComplete;
      primaryAction.click();
      expect(element.pluginDownloadUI).to.have.property('open', false);
    });

    it('adds a new editor kind plugin on add button click', async () => {
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.editors).to.have.lengthOf(10);
    });
    it('adds a new menu kind plugin on add button click', async () => {
      const lengthMenuKindPlugins = element.menuEntries.length;
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      menuKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.menuEntries).to.have.lengthOf(lengthMenuKindPlugins + 1);
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
        element.menuEntries[element.menuEntries.length - 1]
      ).to.have.property('requireDoc');
      expect(
        element.menuEntries[element.menuEntries.length - 1]
      ).to.have.property('position');
    });
    it('adds a new validator kind plugin on add button click', async () => {
      expect(element.validators).to.have.lengthOf(2);
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      validatorKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.validators).to.have.lengthOf(3);
    });
  });
});
