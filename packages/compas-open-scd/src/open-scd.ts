import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';

import { ListItem } from '@material/mwc-list/mwc-list-item';

import {
  newOpenDocEvent
} from "@openscd/core/foundation/deprecated/open-event.js";
import { newPendingStateEvent } from '@openscd/core/foundation/deprecated/waiter.js';
import { getTheme } from '@openscd/open-scd/src/themes.js';

import './addons/CompasSession.js';
import './addons/CompasHistory.js';
import './addons/CompasLayout.js';
import './addons/CompasSettings.js';


import { Editing } from '@openscd/open-scd/src/Editing.js';
import { Hosting } from './Hosting.js';
import { Plugging } from './Plugging.js';
import { Setting } from './Setting.js';
import '@openscd/open-scd/src/addons/Waiter.js';
import { Wizarding } from '@openscd/open-scd/src/Wizarding.js';
import { initializeNsdoc, Nsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';
import { AddExternalPluginEvent, InstalledOfficialPlugin, SetPluginsEvent, withoutContent, Plugin, MenuPosition, PluginKind, menuOrder, pluginTag, staticTagHtml } from '@openscd/open-scd/src/open-scd.js';
import { officialPlugins } from '../public/js/plugins.js';
import type {
  PluginSet,
  Plugin as CorePlugin,
  EditCompletedEvent,
} from '@openscd/core';
import { classMap } from 'lit-html/directives/class-map.js';

function menuCompare(a: Plugin, b: Plugin): -1 | 0 | 1 {
  if (a.kind === b.kind && a.position === b.position) return 0;
  const earlier = menuOrder.find(kind =>
    [a.kind, b.kind, a.position, b.position].includes(kind)
  );
  return [a.kind, a.position].includes(earlier) ? -1 : 1;
}

function compareNeedsDoc(a: Plugin, b: Plugin): -1 | 0 | 1 {
  if (a.requireDoc === b.requireDoc) return 0;
  return a.requireDoc ? 1 : -1;
}

const loadedPlugins = new Set<string>();

/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
@customElement('open-scd')
export class OpenSCD extends LitElement {
  @property({ attribute: false })
  doc: XMLDocument | null = null;
  /** The name of the current [[`doc`]] */
  @property({ type: String }) docName = '';
  /** The UUID of the current [[`doc`]] */
  @property({ type: String }) docId = '';

  /** Index of the last [[`EditorAction`]] applied. */
  @state()
  editCount = -1;

  /** Object containing all *.nsdoc files and a function extracting element's label form them*/
  @property({ attribute: false })
  nsdoc!: Nsdoc;

  private currentSrc = '';
  /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
  @property({ type: String })
  get src(): string {
    return this.currentSrc;
  }
  set src(value: string) {
    this.currentSrc = value;
    this.dispatchEvent(newPendingStateEvent(this.loadDoc(value)));
  }

  /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
  private async loadDoc(src: string): Promise<void> {
    const response = await fetch(src);
    const text = await response.text();
    if (!text) return;

    const doc = new DOMParser().parseFromString(text, 'application/xml');
    const docName = src;
    this.dispatchEvent(newOpenDocEvent(doc, docName));

    if (src.startsWith('blob:')) URL.revokeObjectURL(src);
  }

  connectedCallback(): void {
    console.log('COMPAS OPEN SCD CONNECTED CALLBACK');
    super.connectedCallback();
    this.addEventListener('reset-plugins', this.resetPlugins);
    this.addEventListener(
      'add-external-plugin',
      (e: AddExternalPluginEvent) => {
        this.addExternalPlugin(e.detail.plugin);
      }
    );
    this.addEventListener('set-plugins', (e: SetPluginsEvent) => {
      this.setPlugins(e.detail.indices);
    });

    this.updatePlugins();
    this.requestUpdate();

    this.addEventListener('oscd-edit-completed', (evt: EditCompletedEvent) => {
      const initiator = evt.detail.initiator;

      if (initiator === 'undo') {
        this.editCount -= 1;
      } else {
        this.editCount += 1;
      }

      this.requestUpdate();
    });
  }

  render(): TemplateResult {
    console.log('COMPAS OPEN SCD RENDER');
    return html`<compas-session>
      <oscd-waiter>
        <compas-settings-addon .host=${this}>
          <oscd-wizards .host=${this}>
            <compas-history .host=${this} .editCount=${this.editCount}>
              <oscd-editor
                .doc=${this.doc}
                .docName=${this.docName}
                .docId=${this.docId}
                .host=${this}
                .editCount=${this.editCount}
              >
                <compas-layout
                  .host=${this}
                  .doc=${this.doc}
                  .docName=${this.docName}
                  .editCount=${this.editCount}
                  .plugins=${this.sortedStoredPlugins}
                >
                </compas-layout>
              </oscd-editor>
            </compas-history>
          </oscd-wizards>
        </compas-settings-addon>
      </oscd-waiter>
    </compas-session>`;
  }

  private storePlugins(plugins: Array<Plugin | InstalledOfficialPlugin>) {
    localStorage.setItem(
      'plugins',
      JSON.stringify(plugins.map(withoutContent))
    );
    this.requestUpdate();
  }
  private resetPlugins(): void {
    this.storePlugins(
      (officialPlugins as Plugin[]).concat(this.parsedPlugins).map(plugin => {
        return {
          src: plugin.src,
          installed: plugin.default ?? false,
          official: true,
        };
      })
    );
  }

  /**
   * @prop {PluginSet} plugins - Set of plugins that are used by OpenSCD
   */
  @property({ type: Object })
  plugins: PluginSet = { menu: [], editor: [] };

  get parsedPlugins(): Plugin[] {
    return this.plugins.menu
      .map((p: CorePlugin) => ({
        ...p,
        position:
          typeof p.position !== 'number'
            ? (p.position as MenuPosition)
            : undefined,
        kind: 'menu' as PluginKind,
        installed: p.active ?? false,
      }))
      .concat(
        this.plugins.editor.map((p: CorePlugin) => ({
          ...p,
          position: undefined,
          kind: 'editor' as PluginKind,
          installed: p.active ?? false,
        }))
      );
  }

  private get sortedStoredPlugins(): Plugin[] {
    console.log('----> sortedStoredPlugins')
    const plugins =  this.storedPlugins
      .map(plugin => {
        if (!plugin.official) return plugin;
        const officialPlugin = (officialPlugins as Plugin[])
          .concat(this.parsedPlugins)
          .find(needle => needle.src === plugin.src);
        return <Plugin>{
          ...officialPlugin,
          ...plugin,
        };
      })
      .sort(compareNeedsDoc)
      .sort(menuCompare);

    console.log(plugins);
    return plugins;
  }

  private get storedPlugins(): Plugin[] {
    return <Plugin[]>(
      JSON.parse(localStorage.getItem('plugins') ?? '[]', (key, value) =>
        value.src && value.installed ? this.addContent(value) : value
      )
    );
  }

  protected get locale(): string {
    return navigator.language || 'en-US';
  }

  get docs(): Record<string, XMLDocument> {
    const docs: Record<string, XMLDocument> = {};

    if (this.doc) {
      docs[this.docName] = this.doc;
    }

    return docs;
  }

  private setPlugins(indices: Set<number>) {
    const newPlugins = this.sortedStoredPlugins.map((plugin, index) => {
      return { ...plugin, installed: indices.has(index) };
    });
    this.storePlugins(newPlugins);
  }

  private updatePlugins() {
    const stored: Plugin[] = this.storedPlugins;
    const officialStored = stored.filter(p => p.official);
    const newOfficial: Array<Plugin | InstalledOfficialPlugin> = (
      officialPlugins as Plugin[]
    )
      .concat(this.parsedPlugins)
      .filter(p => !officialStored.find(o => o.src === p.src))
      .map(plugin => {
        return {
          src: plugin.src,
          installed: plugin.default ?? false,
          official: true as const,
        };
      });
    const oldOfficial = officialStored.filter(
      p =>
        !(officialPlugins as Plugin[])
          .concat(this.parsedPlugins)
          .find(o => p.src === o.src)
    );
    const newPlugins: Array<Plugin | InstalledOfficialPlugin> = stored.filter(
      p => !oldOfficial.find(o => p.src === o.src)
    );
    newOfficial.map(p => newPlugins.push(p));
    this.storePlugins(newPlugins);
  }

  private async addExternalPlugin(
    plugin: Omit<Plugin, 'content'>
  ): Promise<void> {
    if (this.storedPlugins.some(p => p.src === plugin.src)) return;

    const newPlugins: Omit<Plugin, 'content'>[] = this.storedPlugins;
    newPlugins.push(plugin);
    this.storePlugins(newPlugins);
  }

  private addContent(plugin: Omit<Plugin, 'content'>): Plugin {
    const tag = pluginTag(plugin.src);
    if (!loadedPlugins.has(tag)) {
      loadedPlugins.add(tag);
      import(plugin.src).then(mod => customElements.define(tag, mod.default));
    }
    return {
      ...plugin,
      content: staticTagHtml`<${tag}
            .doc=${this.doc}
            .docName=${this.docName}
            .editCount=${this.editCount}
            .docId=${this.docId}
            .pluginId=${plugin.src}
            .nsdoc=${this.nsdoc}
            .docs=${this.docs}
            .locale=${this.locale}
            class="${classMap({
              plugin: true,
              menu: plugin.kind === 'menu',
              validator: plugin.kind === 'validator',
              editor: plugin.kind === 'editor',
            })}"
          ></${tag}>`,
    };
  }
}
