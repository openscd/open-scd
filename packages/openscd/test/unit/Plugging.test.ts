import { expect, fixture, html } from '@open-wc/testing';

import '../mock-open-scd.js';
import { MockOpenSCD } from '../mock-open-scd.js';

import { TextField } from '@material/mwc-textfield';
import { Plugin } from '../../src/plugin';
import { ConfigurePluginDetail, ConfigurePluginEvent, newConfigurePluginEvent } from '../../src/plugin.events';

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

  it('stores default plugins on load', () =>{
    expect(element.layout).property('editors').to.have.lengthOf(14)
  });

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
      expect(element.layout).property('editors').to.have.lengthOf(13);
    });

    it('enables selected plugins', async () => {
      (<HTMLElement>element.layout.pluginList.firstElementChild).click();
      await element.updateComplete;
      (<HTMLElement>element.layout.pluginList.firstElementChild).click();
      await element.updateComplete;
      expect(element.layout).property('editors').to.have.lengthOf(14);
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

    describe('requires a name and a valid URL to add a plugin', async () => {

      it('does not add without user interaction', async () => {
        primaryAction.click();
        expect(element.layout.pluginDownloadUI).to.have.property('open', true);
      })

      it('does not add without a name', async () => {
        src.value = 'http://example.com/plugin.js';
        await src.updateComplete;
        primaryAction.click();
        expect(element.layout.pluginDownloadUI).to.have.property('open', true);
      })

      it('does not add plugin with incorrect url', async () => {
        src.value = 'notaURL';
        name.value = 'testName';
        await src.updateComplete;
        await name.updateComplete;
        primaryAction.click();
        expect(element.layout.pluginDownloadUI).to.have.property('open', true);
      });


      it('adds a plugin with a name and a valid URL', async () => {
        name.value = 'testName';
        await name.updateComplete;

        src.value = 'http://localhost:8080/plugin/plugin.js';
        await src.updateComplete;

        primaryAction.click();

        expect(element.layout.pluginDownloadUI).to.have.property('open', false);
      })

    });

    it('adds a new editor kind plugin on add button click', async () => {
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await element.updateComplete;
      expect(element.layout.editors).to.have.lengthOf(15);
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

  describe('ConfigurePluginEvent', () => {

      type TestCase = {
          desc: string
          currentPlugins: Plugin[]
          eventDetails: ConfigurePluginDetail
          expectedPlugins: Plugin[]
      }

      const featureTests: TestCase[] = [
          {
              desc: `
                adds plugin,
                if a plugin with same name and kind does not exsits
                and there is a config
              `,
              currentPlugins: [],
              eventDetails: {
                name: "new plugin",
                kind: "editor",
                config: {
                  name: "new plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                },
              },
              expectedPlugins: [
                {
                  name: "new plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                }
              ]
          },
          {
            desc: `
            adds plugin,
            if a plugin with same exists but with different kind
            and there is a config
          `,
              currentPlugins: [
                {
                  name: "an existing plugin",
                  kind: "menu",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                }
              ],
              eventDetails: {
                name: "an existing plugin",
                kind: "editor",
                config: {
                  name: "an existing plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                },
              },
              expectedPlugins: [
                {
                  name: "an existing plugin",
                  kind: "menu",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                },
                {
                  name: "an existing plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                }
              ]
          },
          {
            desc: `
            changes plugin,
            if a plugin exists with same name and kind, and there is a config
          `,
              currentPlugins: [
                {
                  name: "I want to change this plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  installed: false,
                }
              ],
              eventDetails: {
                name: "I want to change this plugin",
                kind: "editor",
                config: {
                  name: "I want to change this plugin",
                  kind: "editor",
                  src: "https://example.com/changed-url.js",
                  installed: true,
                },
              },
              expectedPlugins: [
                {
                  name: "I want to change this plugin",
                  kind: "editor",
                  src: "https://example.com/changed-url.js",
                  installed: true,
                },
              ]
          },
          {
            desc: `
              removes plugin,
              if it finds it by name and kind and the econfig is 'null'
            `,
            currentPlugins: [{
              name: "plugin to remove",
              kind: "editor",
              src: "https://example.com/plugin-to-remove.js",
              installed: false,
            }],
            eventDetails: {
              name: "plugin to remove",
              kind: "editor",
              config: null
            },
            expectedPlugins: []
          },
          {
            desc: `
              does not remove plugin,
              if it does not find it by name
            `,
            currentPlugins: [{
              name: "plugin to remove",
              kind: "editor",
              src: "https://example.com/plugin-to-remove.js",
              installed: false,
            }],
            eventDetails: {
              name: "wrong name",
              kind: "editor",
              config: null
            },
            expectedPlugins: [{
              name: "plugin to remove",
              kind: "editor",
              src: "https://example.com/plugin-to-remove.js",
              installed: false,
            }]
          },
          {
            desc: `
              does not remove plugin,
              if it does not find it by kind
            `,
            currentPlugins: [{
              name: "plugin to remove, but wrong kind",
              kind: "editor",
              src: "https://example.com/plugin-to-remove.js",
              installed: true,
            }],
            eventDetails: {
              name: "plugin to remove, but wrong kind",
              kind: "menu",
              config: null
            },
            expectedPlugins: [{
              name: "plugin to remove, but wrong kind",
              kind: "editor",
              src: "https://example.com/plugin-to-remove.js",
              installed: true,
            }]
          },
      ]

      featureTests.forEach(testFeature)

      function testFeature(tc: TestCase) {
          it(tc.desc, async () => {
            // ARRANGE

            // @ts-ignore: we use the private function to arrange the scenario
            element.storePlugins(tc.currentPlugins)
            await element.updateComplete

            // ACT
            const event = newConfigurePluginEvent(tc.eventDetails.name, tc.eventDetails.kind, tc.eventDetails.config)
            element.layout.dispatchEvent(event)
            await element.updateComplete

            // ASSERT

            // I remove all the keys that we don't have because
            // the stored plugins get new keys and
            // I could not figure how to compare the two lists
            // I've tried to use chai's deep.members and deep.include.members
            // and others but non of them worked.
            const keys = ["name", "kind", "src", "installed"]
            const storedPlugins = element.layout.plugins.map((plugin) => {
              Object.keys(plugin).forEach((key) => {
                if(!keys.includes(key)) {
                  delete plugin[key]
                }
              })

              return plugin
            })

            const msg = `expected: ${JSON.stringify(tc.expectedPlugins)} but got: ${JSON.stringify(element.layout.plugins)}`
            expect(tc.expectedPlugins).to.have.deep.members(storedPlugins, msg)

          })
      }

  })
});

