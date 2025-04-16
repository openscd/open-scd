import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';
import type { Plugin } from '@openscd/open-scd/src/plugin.js';

import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates OpenSCD integration test ', () => {
  if (customElements.get('validate-templates') === undefined)
    customElements.define('validate-templates', ValidateTemplates);

  let parent: MockOpenSCD;
  let element: ValidateTemplates;

  let doc: XMLDocument;

  describe('with a valid DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-open-scd .doc=${doc} .mockPlugins=${builtinPlugins}
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);
      element = parent.getActivePlugin();
      element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.updateComplete;
    });

    it('shows a "No errors" message in the diagnostics pane', async () => {
      await parent.requestUpdate();
      expect(parent.historyAddon.diagnosticUI).to.contain.text('No errors');
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });
  });

  describe('with issues in the DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/validators/datatypetemplateerrors.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-open-scd .doc=${doc} .mockPlugins=${builtinPlugins}
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);
      element = parent.getActivePlugin();
      element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.updateComplete;
    });
    it('generates issues in the diagnistics pane', async () => {
      const issues = parent.historyAddon.diagnoses.get(
        'http://localhost:8000/plugins/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(28);
    }).timeout(1000);
    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });
  });
  describe('with schema version smaller "2007B3"', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-open-scd .doc=${doc} .mockPlugins=${builtinPlugins}
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);
      element = parent.getActivePlugin();
      element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.updateComplete;
    });
    it('shows only one message in the diagnostics pane', async () => {
      const issues = parent.historyAddon.diagnoses.get(
        'http://localhost:8000/plugins/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(1);
    }).timeout(1000);
    it('looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });
  });
});

const builtinPlugins: Plugin[] = [
  {
    name: 'IED',
    src: generatePluginPath('plugins/src/editors/IED.js'),
    icon: 'developer_board',
    default: true,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Substation',
    src: generatePluginPath('plugins/src/editors/Substation.js'),
    icon: 'margin',
    default: true,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Single Line Diagram',
    src: generatePluginPath('plugins/src/editors/SingleLineDiagram.js'),
    icon: 'edit',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Subscriber Message Binding (GOOSE)',
    src: generatePluginPath('plugins/src/editors/GooseSubscriberMessageBinding.js'),
    icon: 'link',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Subscriber Data Binding (GOOSE)',
    src: generatePluginPath('plugins/src/editors/GooseSubscriberDataBinding.js'),
    icon: 'link',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Subscriber Message Binding (SMV)',
    src: generatePluginPath('plugins/src/editors/SMVSubscriberMessageBinding.js'),
    icon: 'link',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Subscriber Data Binding (SMV)',
    src: generatePluginPath('plugins/src/editors/SMVSubscriberDataBinding.js'),
    icon: 'link',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Communication',
    src: generatePluginPath('plugins/src/editors/Communication.js'),
    icon: 'settings_ethernet',
    default: true,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: '104',
    src: generatePluginPath('plugins/src/editors/Protocol104.js'),
    icon: 'settings_ethernet',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Templates',
    src: generatePluginPath('plugins/src/editors/Templates.js'),
    icon: 'copy_all',
    default: true,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Publisher',
    src: generatePluginPath('plugins/src/editors/Publisher.js'),
    icon: 'publish',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Cleanup',
    src: generatePluginPath('plugins/src/editors/Cleanup.js'),
    icon: 'cleaning_services',
    default: false,
    kind: 'editor',
    requireDoc: true,
    installed: true,
  },
  {
    name: 'Open project',
    src: generatePluginPath('plugins/src/menu/OpenProject.js'),
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: false,
    installed: true,
    position: 'top',
  },
  {
    name: 'New project',
    src: generatePluginPath('plugins/src/menu/NewProject.js'),
    icon: 'create_new_folder',
    default: true,
    kind: 'menu',
    requireDoc: false,
    installed: true,
    position: 'top',
  },
  {
    name: 'Save project',
    src: generatePluginPath('plugins/src/menu/SaveProject.js'),
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'top',
  },
  {
    name: 'Validate Schema',
    src: generatePluginPath('plugins/src/validators/ValidateSchema.js'),
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
    installed: true,
  },
  {
    name: 'Validate Templates',
    src: generatePluginPath('plugins/src/validators/ValidateTemplates.js'),
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
    installed: true,
  },
  {
    name: 'Import IEDs',
    src: generatePluginPath('plugins/src/menu/ImportIEDs.js'),
    icon: 'snippet_folder',
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Create Virtual IED',
    src: generatePluginPath('plugins/src/menu/VirtualTemplateIED.js'),
    icon: 'developer_board',
    default: false,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Subscriber Update',
    src: generatePluginPath('plugins/src/menu/SubscriberInfo.js'),
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Update desc (ABB)',
    src: generatePluginPath('plugins/src/menu/UpdateDescriptionABB.js'),
    default: false,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Update desc (SEL)',
    src: generatePluginPath('plugins/src/menu/UpdateDescriptionSEL.js'),
    default: false,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Merge Project',
    src: generatePluginPath('plugins/src/menu/Merge.js'),
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Update Substation',
    src: generatePluginPath('plugins/src/menu/UpdateSubstation.js'),
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Compare IED',
    src: generatePluginPath('plugins/src/menu/CompareIED.js'),
    icon: 'compare_arrows',
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
  {
    name: 'Show SCL History',
    src: generatePluginPath('plugins/src/menu/SclHistory.js'),
    icon: 'history_toggle_off',
    default: true,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'bottom',
  },
  {
    name: 'Help',
    src: generatePluginPath('plugins/src/menu/Help.js'),
    icon: 'help',
    default: true,
    kind: 'menu',
    requireDoc: false,
    installed: true,
    position: 'bottom',
  },
  {
    name: 'Export Communication Section',
    src: generatePluginPath('plugins/src/menu/ExportCommunication.js'),
    icon: 'sim_card_download',
    default: false,
    kind: 'menu',
    requireDoc: true,
    installed: true,
    position: 'middle',
  },
];

export function generatePluginPath(plugin: string): string {
  return location.origin+location.pathname+plugin;
}
