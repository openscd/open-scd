import { expect, fixture, html } from '@open-wc/testing';

import { PluggingElement } from '../../src/Plugging.js';

import './mock-plugger.js';
import { getDocument } from '../data.js';
import { TextField } from '@material/mwc-textfield';

describe('PluggingElement', () => {
  let element: PluggingElement;
  const doc = getDocument();

  afterEach(() => localStorage.clear());
  beforeEach(async () => {
    element = <PluggingElement>(
      await fixture(
        html`<mock-plugger .doc=${doc} docName="testDoc"></mock-plugger>`
      )
    );
  });

  it('stores default plugins on load', () =>
    expect(element).property('editors').to.have.lengthOf(4));

  describe('plugin manager dialog', () => {
    beforeEach(async () => {
      element.pluginUI.show();
      await element.pluginUI.updateComplete;
    });

    it('disables deselected plugins', async () => {
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      expect(element).property('editors').to.have.lengthOf(3);
    });

    it('enables selected plugins', async () => {
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      expect(element).property('editors').to.have.lengthOf(4);
    });

    it('resets plugins to default on reset button click', async () => {
      (<HTMLElement>element.pluginList.firstElementChild).click();
      await element.updateComplete;
      (<HTMLElement>(
        element.pluginUI.querySelector('mwc-button[slot="secondaryAction"]')
      )).click();
      await element.updateComplete;
      expect(element).property('editors').to.have.lengthOf(4);
    });

    it('opens the custom plugin dialog on add button click', async () => {
      (<HTMLElement>(
        element.pluginUI.querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      await element.updateComplete;
      expect(element)
        .property('pluginDownloadUI')
        .to.have.property('open', true);
    });
  });

  describe('add custom plugin dialog', () => {
    let src: TextField;
    let name: TextField;
    let primary: HTMLElement;

    beforeEach(async () => {
      src = <TextField>(
        element.pluginDownloadUI.querySelector('#pluginSrcInput')
      );
      name = <TextField>(
        element.pluginDownloadUI.querySelector('#pluginNameInput')
      );
      primary = <HTMLElement>(
        element.pluginDownloadUI.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      element.pluginDownloadUI.show();
      await element.pluginDownloadUI.updateComplete;
    });

    it('requires a name and a valid URL to add a plugin', async () => {
      primary.click();
      expect(element.pluginDownloadUI).to.have.property('open', true);

      src.value = 'http://example.com/plugin.js';
      await src.updateComplete;
      primary.click();
      expect(element.pluginDownloadUI).to.have.property('open', true);

      src.value = 'notaURL';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primary.click();
      expect(element.pluginDownloadUI).to.have.property('open', true);

      src.value = 'http://example.com/plugin.js';
      await src.updateComplete;
      primary.click();
      expect(element.pluginDownloadUI).to.have.property('open', false);
    });

    it('adds a new plugin on add button click', async () => {
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primary.click();
      await element.updateComplete;
      expect(element.editors).to.have.lengthOf(5);
    });
  });
});
