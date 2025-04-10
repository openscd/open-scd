import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';
import type { Plugin } from '@openscd/open-scd/src/plugin.js';

import ValidateSchema from '../../../src/validators/ValidateSchema.js';
import { IssueDetail, LogEntry } from '@openscd/core/foundation/deprecated/history.js';

describe('ValidateSchema plugin', () => {
  if (customElements.get('') === undefined)
    customElements.define('validate-schema', ValidateSchema);

  let parent: MockOpenSCD;
  let element: ValidateSchema;

  let valid2007B4: XMLDocument;
  let invalid2007B: XMLDocument;

  before(async () => {
    parent = await fixture(html`
      <mock-open-scd .mockPlugins=${builtinPlugins}><validate-schema></validate-schema></mock-open-scd>
    `);

    element = parent.getActivePlugin();
    element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateSchema.js';
    await parent.updateComplete;
  });

  describe('for valid SCL files', () => {
    before(async () => {
      valid2007B4 = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.doc = valid2007B4;
      element.docName = 'valid2007B';
    });

    beforeEach(async () => {
      parent.historyAddon.diagnoses.clear();
      await parent.updateComplete;

      await element.validate();
      await parent.updateComplete;
    });

    it('zeroissues indication looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });

    it('indicates successful schema validation in the diagnoses pane', async () => {
      const lastEntry = <IssueDetail[]>(
        parent.historyAddon.diagnoses.get('http://localhost:8000/plugins/src/validators/ValidateSchema.js')
      );
      expect(lastEntry.length).to.equal(1);
      expect(lastEntry[0].title).to.contain(
        'valid2007B XML schema validation successful'
      );
    });

    it('indicates successful schema validation in the log', async () => {
      const lastEntry = <LogEntry>parent.historyAddon.log.pop();
      expect(lastEntry.kind).to.equal('info');
      expect(lastEntry.title).to.contain(
        'valid2007B XML schema validation successful'
      );
    });

  });

  describe('for invalid SCL files', () => {
    before(async () => {
      invalid2007B = await fetch('/test/testfiles/invalid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.doc = invalid2007B;
      element.docName = 'invalid2007B';

      await element.requestUpdate();
    });

    beforeEach(async () => {
      parent.historyAddon.diagnoses.clear();
      await parent.updateComplete;

      await element.validate();
      await parent.updateComplete;
    });

    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });

    it('create issues in diagnose', async () =>
      expect(parent.historyAddon.diagnoses.get('http://localhost:8000/plugins/src/validators/ValidateSchema.js'))
        .to.not.be.undefined);

    it('generates error messages in the log', async () => {
      const lastLogEntry = <LogEntry>parent.historyAddon.log.pop();
      expect(lastLogEntry.kind).to.equal('warning');
      expect(lastLogEntry.title).to.contain(
        'invalid2007B XML schema validation failed'
      );
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
