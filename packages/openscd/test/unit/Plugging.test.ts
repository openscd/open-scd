import { expect, fixture, html } from '@open-wc/testing';

import '../mock-open-scd.js';
import { MockOpenSCD } from '../mock-open-scd.js';
import { TextField } from '@material/mwc-textfield';
import { Plugin, PluginConfig, PluginConfigMenu, PluginConfigNotMenu } from '../../src/plugin';
import { ConfigurePluginDetail, newConfigurePluginEvent } from '../../src/plugin.events';
import { generatePluginPath } from "../../src/plugins"


async function renderMockOpenSCD(
  doc: XMLDocument,
  docName: string = "testDoc",
  builtInPlugins: Plugin[] = builtinPlugins,
): Promise<MockOpenSCD>{

  const mockHTML = html`<mock-open-scd .mockPlugins=${builtInPlugins} .doc=${doc} .docName=${docName}></mock-open-scd>`
  const openscd = (await fixture(mockHTML)) as MockOpenSCD;
  await openscd.updateComplete;
  return openscd
}

function fetchDoc(path: string = '/test/testfiles/valid2007B4.scd'): Promise<XMLDocument>{
  return fetch(path)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}


describe('OpenSCD-Plugin', () => {
  let doc: XMLDocument;
  const docName = 'testDoc';

  afterEach(async () => {
    localStorage.clear();
  });

  before(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

  });

  it('stores default plugins on load', async () =>{
    const openscd = await renderMockOpenSCD(doc, docName, builtinPlugins.slice(0, 2))

    openscd.requestUpdate()
    await openscd.updateComplete
    expect(openscd.layout).property('editors').to.have.lengthOf(2)
  });

  it('has Locale property', async () => {
    const openscd = await renderMockOpenSCD(doc);
    expect(openscd).to.have.property('locale');
  });

  it('has docs property', async () => {
    const openscd = await renderMockOpenSCD(doc)
    expect(openscd).to.have.property(`docs`).that.is.a('Object');
    expect(openscd.docs[docName]).to.equal(doc);
  });

  describe('plugin manager dialog', async () => {
    let firstEditorPlugin: HTMLElement;
    let resetAction: HTMLElement;
    let primaryAction: HTMLElement;

    const openscd = await renderMockOpenSCD(doc)

    beforeEach(async () => {
      openscd.layout.pluginUI.show();
      await openscd.layout.pluginUI.updateComplete;
      firstEditorPlugin = <HTMLElement>(
        openscd.layout.pluginList.querySelector(
          'mwc-check-list-item:not([noninteractive])'
        )
      );

      resetAction = <HTMLElement>(
        openscd.layout.pluginUI.querySelector('mwc-button[slot="secondaryAction"]')
      );
      primaryAction = <HTMLElement>(
        openscd.layout.pluginUI.querySelector('mwc-button[slot="primaryAction"]')
      );
    });

    it('disables deselected plugins', async () => {
      firstEditorPlugin.click();
      await openscd.updateComplete;
      expect(openscd.layout).property('editors').to.have.lengthOf(13);
    });

    it('enables selected plugins', async () => {

      const openscd = await renderMockOpenSCD(doc);

      (<HTMLElement>openscd.layout.pluginList.firstElementChild).click();
      await openscd.updateComplete;
      (<HTMLElement>openscd.layout.pluginList.firstElementChild).click();
      await openscd.updateComplete;
      expect(openscd.layout).property('editors').to.have.lengthOf(14);
    });

    it('resets plugins to default on reset button click', async () => {
      const openscd = await renderMockOpenSCD(doc);
      (<HTMLElement>openscd.layout.pluginList.firstElementChild).click();
      await openscd.updateComplete;
      resetAction.click();
      await openscd.updateComplete;
      expect(openscd.layout).property('editors').to.have.lengthOf(6);
    });

    it('opens the custom plugin dialog on add button click', async () => {
      const openscd = await renderMockOpenSCD(doc);
      primaryAction.click();
      await openscd.updateComplete;
      expect(openscd.layout)
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
    let openscd: MockOpenSCD

    beforeEach(async () => {
      openscd = await renderMockOpenSCD(doc);
      src = openscd.layout.pluginDownloadUI.pluginSrcInput
      name = openscd.layout.pluginDownloadUI.pluginNameInput
      primaryAction = openscd.layout.pluginDownloadUI.addButton
      openscd.layout.pluginDownloadUI.show();
      await openscd.layout.pluginDownloadUI.updateComplete;
      await openscd.updateComplete;
      menuKindOption = <HTMLElement>(
        openscd.layout.pluginDownloadUI.pluginKindList
          .querySelector('mwc-radio-list-item[value="menu"]')
      )
      validatorKindOption = <HTMLElement>(
        openscd.layout.pluginDownloadUI.pluginKindList
          .querySelector('mwc-radio-list-item[id="validator"]')
      )
    });

    describe('requires a name and a valid URL to add a plugin', async () => {

      it('does not add without user interaction', async () => {
        primaryAction.click();
        expect(openscd.layout.pluginDownloadUI).to.have.property('open', true);
      })

      it('does not add without a name', async () => {
        src.value = 'http://example.com/plugin.js';
        await src.updateComplete;
        primaryAction.click();
        expect(openscd.layout.pluginDownloadUI).to.have.property('open', true);
      })

      it('does not add plugin with incorrect url', async () => {
        src.value = 'notaURL';
        name.value = 'testName';
        await src.updateComplete;
        await name.updateComplete;
        primaryAction.click();
        expect(openscd.layout.pluginDownloadUI).to.have.property('open', true);
      });


      it('adds a plugin with a name and a valid URL', async () => {
        name.value = 'testName';
        await name.updateComplete;

        src.value = 'http://localhost:8080/plugin/plugin.js';
        await src.updateComplete;
        primaryAction.click();

        expect(openscd.layout.pluginDownloadUI).to.have.property('open', false);
      })

    });

    it('adds a new editor kind plugin on add button click', async () => {
      expect(openscd.layout.editors).to.have.lengthOf(3, getPluginNames(openscd.layout.editors).join(", "));

      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await openscd.updateComplete;

      expect(openscd.layout.editors).to.have.lengthOf(4);
    });

    it('adds a new menu kind plugin on add button click', async () => {
      const lengthMenuKindPlugins = openscd.layout.menuEntries.length;
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      menuKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await openscd.updateComplete;
      expect(openscd.layout.menuEntries).to.have.lengthOf(lengthMenuKindPlugins + 1);
    });

    it('sets requireDoc and position for new menu kind plugin', async () => {
      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      menuKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await openscd.updateComplete;

      expect(
        openscd.layout.menuEntries[openscd.layout.menuEntries.length - 1]
      ).to.have.property('requireDoc');
      expect(
        openscd.layout.menuEntries[openscd.layout.menuEntries.length - 1]
      ).to.have.property('position');
    });
    it('adds a new validator kind plugin on add button click', async () => {
      expect(openscd.layout.validators).to.have.lengthOf(2);

      src.value = 'http://example.com/plugin.js';
      name.value = 'testName';
      validatorKindOption.click();
      await src.updateComplete;
      await name.updateComplete;
      primaryAction.click();
      await openscd.updateComplete;

      expect(openscd.layout.validators).to.have.lengthOf(3);
    });
  });

  describe('ConfigurePluginEvent', () => {

      type TestCase = {
          desc: string
          currentPlugins: Plugin[]
          eventDetails: ConfigurePluginDetail
          // expectedPlugins: Plugin[]
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
                  active: false,
                  activeByDefault: true,
                },
              },
              expectedPlugins: [
                {
                  name: "new plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  activeByDefault: true,
                  active: false,
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
                  active: false,
                  activeByDefault: true,
                }
              ],
              eventDetails: {
                name: "an existing plugin",
                kind: "editor",
                config: {
                  name: "an existing plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  active: false,
                  activeByDefault: true,
                },
              },
              expectedPlugins: [
                {
                  name: "an existing plugin",
                  kind: "menu",
                  src: "https://example.com/new-plugin.js",
                  active: false,
                  activeByDefault: true,
                },
                {
                  name: "an existing plugin",
                  kind: "editor",
                  src: "https://example.com/new-plugin.js",
                  active: false,
                  activeByDefault: true,
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
                  active: false,
                  activeByDefault: true,
                }
              ],
              eventDetails: {
                name: "I want to change this plugin",
                kind: "editor",
                config: {
                  name: "I want to change this plugin",
                  kind: "editor",
                  src: "https://example.com/changed-url.js",
                  active: true,
                  activeByDefault: true,
                },
              },
              expectedPlugins: [
                {
                  name: "I want to change this plugin",
                  kind: "editor",
                  src: "https://example.com/changed-url.js",
                  active: true,
                  activeByDefault: true,
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
              active: false,
              activeByDefault: true,
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
              active: false,
                  activeByDefault: true,
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
              active: false,
                  activeByDefault: true,
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
              active: true,
              activeByDefault: true,
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
              active: true,
              activeByDefault: true,
            }]
          },
      ]

      featureTests.forEach(testFeature)

      function testFeature(tc: TestCase) {
          it(tc.desc, async () => {
            // ARRANGE
            const openscd = await renderMockOpenSCD(doc);

            // @ts-ignore: we use the private function to arrange the scenario
            openscd.storePlugins(tc.currentPlugins)
            await openscd.updateComplete

            // ACT
            const event = newConfigurePluginEvent(tc.eventDetails.name, tc.eventDetails.kind, tc.eventDetails.config)
            openscd.layout.dispatchEvent(event)
            await openscd.updateComplete

            // ASSERT

            // I remove all the keys that we don't have because
            // the stored plugins get new keys and
            // I could not figure how to compare the two lists
            // I've tried to use chai's deep.members and deep.include.members
            // and others but non of them worked.
            const keys = ["name", "kind", "src", "active", "activeByDefault"]
            const storedPlugins = openscd.layout.plugins.map((plugin) => {
              Object.keys(plugin).forEach((key) => {
                if(!keys.includes(key)) {
                  delete plugin[key]
                }
              })

              return plugin
            })

            const msg = `expected: ${JSON.stringify(tc.expectedPlugins)} but got: ${JSON.stringify(openscd.layout.plugins)}`
            expect(tc.expectedPlugins).to.have.deep.members(storedPlugins, msg)

          })
      }

  })
});

describe("Bugs ", async () => {

  it('Inconsistent behavior on refresh when using a local plugin #1622',async () => {


    // ARRANGE
    localStorage.clear()
    const plugins = [
      generateEditorPluginConfig({name: "editor-1"}),
      generateMenuPluginConfig({name: "menu-1"}),
      generateMenuPluginConfig({name: "menu-2"}),
    ]
    const doc = await fetchDoc()
    const openscd = await renderMockOpenSCD(doc, "testDoc", plugins)
    // @ts-ignore: we use the private function to arrange the scenario
    openscd.storePlugins(plugins)
    await openscd.requestUpdate()
    await openscd.updateComplete
    expect(openscd.layout.plugins).to.have.lengthOf(3, getPluginNames(openscd.layout.plugins).join(", "))

    openscd.layout.pluginUI.show();
    openscd.layout.pluginDownloadUI.show();
    await openscd.layout.pluginUI.updateComplete;

    // Add a custom plugin
    const src = getCustomPluginSrcField(openscd)
    const name = getCutomPluginNameField(openscd)
    const addCustomPlugin = getCustomPluginAddButton(openscd)

    name.value = "editor-test-1"
    src.value = "http://localhost:8080/plugin-test-1.js"
    await src.updateComplete;
    await name.updateComplete;
    addCustomPlugin.click()
    await openscd.updateComplete;

    expect(openscd.layout.plugins).to.have.lengthOf(4, getPluginNames(openscd.layout.plugins).join(", "))

    openscd.layout.pluginUI.show();

    const firstMenuPluginSrc = plugins[1].src
    const firstMenuPlugin = openscd.layout.pluginUI?.shadowRoot?.querySelector(`mwc-check-list-item[value="${firstMenuPluginSrc}"]`)
    const firstMenuPluginCheckbox = firstMenuPlugin?.shadowRoot?.querySelector('mwc-checkbox')
    expect(firstMenuPluginCheckbox).to.not.be.null
    expect(firstMenuPluginCheckbox).to.have.property('checked', true)

    const secondMenuPluginSrc = plugins[2].src
    const secondMenuPlugin = openscd.layout.pluginUI?.shadowRoot?.querySelector(`mwc-check-list-item[value="${secondMenuPluginSrc}"]`)
    const secondMenuPluginChexkbox = secondMenuPlugin?.shadowRoot?.querySelector('mwc-checkbox')
    expect(secondMenuPluginChexkbox).to.have.property('checked', true)


    // ACT
    firstMenuPluginCheckbox!.click()
    await firstMenuPluginCheckbox!.updateComplete
    await secondMenuPluginChexkbox!.updateComplete
    await openscd.updateComplete;


    // ASSERT
    expect(firstMenuPluginCheckbox).to.have.property('checked', false)
    expect(secondMenuPluginChexkbox).to.have.property('checked', true)


  })
})


export function generateEditorPluginConfig( overwrite: Partial<Plugin> = {}): Plugin{

  const randId = crypto.randomUUID().slice(0, 8)
  const defaultConfig: Plugin = {
    kind:  'editor',
    name: `Editor Plugin #${randId}`,
    src: `http://example.com/plugin-${randId}.js`,
    active: true,
    activeByDefault: true,
    official: true,
    icon: 'developer_board',
    requireDoc: true,
  }

  return {
    ...defaultConfig,
    ...overwrite,
  }
}

export function generateMenuPluginConfig( overwrite: Partial<Plugin> = {}): Plugin{

  const randId = crypto.randomUUID().slice(0, 8)
  const defaultConfig: Plugin = {
    kind:  'menu',
    name: `Menu Plugin #${randId}`,
    src: `http://example.com/plugin-${randId}.js`,
    active: true,
    position: 'top',
    activeByDefault: true,
    official: true,
    icon: 'developer_board',
    requireDoc: true,
  }

  return {
    ...defaultConfig,
    ...overwrite,
  }
}

const builtinPlugins: Plugin[] = [
  {
    name: 'IED',
    src: generatePluginPath('plugins/src/editors/IED.js'),
    icon: 'developer_board',
    activeByDefault: true,
    kind: 'editor',
    requireDoc: true,
    active: true,
  },
  {
    name: 'Substation',
    src: generatePluginPath('plugins/src/editors/Substation.js'),
    icon: 'margin',
    activeByDefault: true,
    kind: 'editor',
    requireDoc: true,
    active: true,
  },
  {
    name: 'Single Line Diagram',
    src: generatePluginPath('plugins/src/editors/SingleLineDiagram.js'),
    icon: 'edit',
    activeByDefault: true,
    kind: 'editor',
    requireDoc: true,
    active: true,
  },
  // {
  //   name: 'Subscriber Message Binding (GOOSE)',
  //   src: generatePluginPath('plugins/src/editors/GooseSubscriberMessageBinding.js'),
  //   icon: 'link',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Subscriber Data Binding (GOOSE)',
  //   src: generatePluginPath('plugins/src/editors/GooseSubscriberDataBinding.js'),
  //   icon: 'link',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Subscriber Later Binding (GOOSE)',
  //   src: generatePluginPath('plugins/src/editors/GooseSubscriberLaterBinding.js'),
  //   icon: 'link',
  //   activeByDefault: true,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Subscriber Message Binding (SMV)',
  //   src: generatePluginPath('plugins/src/editors/SMVSubscriberMessageBinding.js'),
  //   icon: 'link',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Subscriber Data Binding (SMV)',
  //   src: generatePluginPath('plugins/src/editors/SMVSubscriberDataBinding.js'),
  //   icon: 'link',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Subscriber Later Binding (SMV)',
  //   src: generatePluginPath('plugins/src/editors/SMVSubscriberLaterBinding.js'),
  //   icon: 'link',
  //   activeByDefault: true,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Communication',
  //   src: generatePluginPath('plugins/src/editors/Communication.js'),
  //   icon: 'settings_ethernet',
  //   activeByDefault: true,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: '104',
  //   src: generatePluginPath('plugins/src/editors/Protocol104.js'),
  //   icon: 'settings_ethernet',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Templates',
  //   src: generatePluginPath('plugins/src/editors/Templates.js'),
  //   icon: 'copy_all',
  //   activeByDefault: true,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Publisher',
  //   src: generatePluginPath('plugins/src/editors/Publisher.js'),
  //   icon: 'publish',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  // {
  //   name: 'Cleanup',
  //   src: generatePluginPath('plugins/src/editors/Cleanup.js'),
  //   icon: 'cleaning_services',
  //   activeByDefault: false,
  //   kind: 'editor',
  //   requireDoc: true,
  //   active: true,
  // },
  {
    name: 'Open project',
    src: generatePluginPath('plugins/src/menu/OpenProject.js'),
    icon: 'folder_open',
    activeByDefault: true,
    kind: 'menu',
    requireDoc: false,
    active: true,
    position: 'top',
  },
  {
    name: 'New project',
    src: generatePluginPath('plugins/src/menu/NewProject.js'),
    icon: 'create_new_folder',
    activeByDefault: true,
    kind: 'menu',
    requireDoc: false,
    active: true,
    position: 'top',
  },
  {
    name: 'Save project',
    src: generatePluginPath('plugins/src/menu/SaveProject.js'),
    icon: 'save',
    activeByDefault: true,
    kind: 'menu',
    requireDoc: true,
    active: true,
    position: 'top',
  },
  {
    name: 'Validate Schema',
    src: generatePluginPath('plugins/src/validators/ValidateSchema.js'),
    icon: 'rule_folder',
    activeByDefault: true,
    kind: 'validator',
    active: true,
  },
  {
    name: 'Validate Templates',
    src: generatePluginPath('plugins/src/validators/ValidateTemplates.js'),
    icon: 'rule_folder',
    activeByDefault: true,
    kind: 'validator',
    active: true,
  },
  {
    name: 'Import IEDs',
    src: generatePluginPath('plugins/src/menu/ImportIEDs.js'),
    icon: 'snippet_folder',
    activeByDefault: true,
    kind: 'menu',
    requireDoc: true,
    active: true,
    position: 'middle',
  },
  {
    name: 'Create Virtual IED',
    src: generatePluginPath('plugins/src/menu/VirtualTemplateIED.js'),
    icon: 'developer_board',
    activeByDefault: false,
    kind: 'menu',
    requireDoc: true,
    active: true,
    position: 'middle',
  },
  {
    name: 'Subscriber Update',
    src: generatePluginPath('plugins/src/menu/SubscriberInfo.js'),
    activeByDefault: true,
    kind: 'menu',
    requireDoc: true,
    active: true,
    position: 'middle',
  },
  // {
  //   name: 'Update desc (ABB)',
  //   src: generatePluginPath('plugins/src/menu/UpdateDescriptionABB.js'),
  //   activeByDefault: false,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'middle',
  // },
  // {
  //   name: 'Update desc (SEL)',
  //   src: generatePluginPath('plugins/src/menu/UpdateDescriptionSEL.js'),
  //   activeByDefault: false,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'middle',
  // },
  // {
  //   name: 'Merge Project',
  //   src: generatePluginPath('plugins/src/menu/Merge.js'),
  //   icon: 'merge_type',
  //   activeByDefault: true,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'middle',
  // },
  // {
  //   name: 'Update Substation',
  //   src: generatePluginPath('plugins/src/menu/UpdateSubstation.js'),
  //   icon: 'merge_type',
  //   activeByDefault: true,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'middle',
  // },
  // {
  //   name: 'Compare IED',
  //   src: generatePluginPath('plugins/src/menu/CompareIED.js'),
  //   icon: 'compare_arrows',
  //   activeByDefault: true,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'middle',
  // },
  // {
  //   name: 'Show SCL History',
  //   src: generatePluginPath('plugins/src/menu/SclHistory.js'),
  //   icon: 'history_toggle_off',
  //   activeByDefault: true,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'bottom',
  // },
  // {
  //   name: 'Help',
  //   src: generatePluginPath('plugins/src/menu/Help.js'),
  //   icon: 'help',
  //   activeByDefault: true,
  //   kind: 'menu',
  //   requireDoc: false,
  //   active: true,
  //   position: 'bottom',
  // },
  // {
  //   name: 'Export Communication Section',
  //   src: generatePluginPath('plugins/src/menu/ExportCommunication.js'),
  //   icon: 'sim_card_download',
  //   activeByDefault: false,
  //   kind: 'menu',
  //   requireDoc: true,
  //   active: true,
  //   position: 'middle',
  // },
];


function getPluginNames(plugins: Plugin[]): string[]{
  return plugins.map(plugin => plugin.name)
}

function getCustomPluginSrcField(openscd: MockOpenSCD): TextField {
  return openscd.layout.pluginDownloadUI.pluginSrcInput
}

function getCutomPluginNameField(openscd: MockOpenSCD): TextField {
  return openscd.layout.pluginDownloadUI.pluginNameInput
}


function getCustomPluginAddButton(openscd: MockOpenSCD): HTMLElement {
  return openscd.layout.pluginDownloadUI.addButton
}

