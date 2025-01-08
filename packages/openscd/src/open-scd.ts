import {
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-drawer';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';
import '@material/mwc-textfield';

import { newOpenDocEvent } from '@openscd/core/foundation/deprecated/open-event.js';
import { newPendingStateEvent } from '@openscd/core/foundation/deprecated/waiter.js';

import './addons/Settings.js';
import './addons/Waiter.js';
import './addons/Wizards.js';
import './addons/Editor.js';
import './addons/History.js';
import './addons/Layout.js';

import { ActionDetail } from '@material/mwc-list';

import { officialPlugins as builtinPlugins } from './plugins.js';
import { initializeNsdoc, Nsdoc } from './foundation/nsdoc.js';
import type {
  PluginSet,
  Plugin as CorePlugin,
  EditCompletedEvent,
} from '@openscd/core';

import { HistoryState, historyStateEvent } from './addons/History.js';

import { InstalledOfficialPlugin, MenuPosition, PluginKind, Plugin } from "./plugin.js"
import { ConfigurePluginEvent, ConfigurePluginDetail, newConfigurePluginEvent } from './plugin.events.js';
import { newLogEvent } from '@openscd/core/foundation/deprecated/history';

// HOSTING INTERFACES

export interface MenuItem {
  icon: string;
  name: string;
  hint?: string;
  actionItem?: boolean;
  action?: (event: CustomEvent<ActionDetail>) => void;
  disabled?: () => boolean;
  content?: TemplateResult;
  kind: string;
}

export interface Validator {
  validate: () => Promise<void>;
}

export interface MenuPlugin {
  run: () => Promise<void>;
}

export function newResetPluginsEvent(): CustomEvent {
  return new CustomEvent('reset-plugins', { bubbles: true, composed: true });
}

export interface AddExternalPluginDetail {
  plugin: Omit<Plugin, 'content'>;
}

export type AddExternalPluginEvent = CustomEvent<AddExternalPluginDetail>;

export function newAddExternalPluginEvent(
  plugin: Omit<Plugin, 'content'>
): AddExternalPluginEvent {
  return new CustomEvent<AddExternalPluginDetail>('add-external-plugin', {
    bubbles: true,
    composed: true,
    detail: { plugin },
  });
}

export interface SetPluginsDetail {
  indices: Set<number>;
}

export type SetPluginsEvent = CustomEvent<SetPluginsDetail>;

export function newSetPluginsEvent(indices: Set<number>): SetPluginsEvent {
  return new CustomEvent<SetPluginsDetail>('set-plugins', {
    bubbles: true,
    composed: true,
    detail: { indices },
  });
}

// PLUGGING INTERFACES
const pluginTags = new Map<string, string>();
/**
 * Hashes `uri` using cyrb64 analogous to
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
 * @returns a valid customElement tagName containing the URI hash.
 */
function pluginTag(uri: string): string {
  if (!pluginTags.has(uri)) {
    let h1 = 0xdeadbeef,
      h2 = 0x41c6ce57;
    for (let i = 0, ch; i < uri.length; i++) {
      ch = uri.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
      Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
      Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
      Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
      Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    pluginTags.set(
      uri,
      'oscd-plugin' +
        ((h2 >>> 0).toString(16).padStart(8, '0') +
          (h1 >>> 0).toString(16).padStart(8, '0'))
    );
  }
  return pluginTags.get(uri)!;
}

/**
 * This is a template literal tag function. See:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
 *
 * Passes its arguments to LitElement's `html` tag after combining the first and
 * last expressions with the first two and last two static strings.
 * Throws unless the first and last expressions are identical strings.
 *
 * We need this to get around the expression location limitations documented in
 * https://lit.dev/docs/templates/expressions/#expression-locations
 *
 * After upgrading to Lit 2 we can use their static HTML functions instead:
 * https://lit.dev/docs/api/static-html/
 */
function staticTagHtml(
  oldStrings: ReadonlyArray<string>,
  ...oldArgs: unknown[]
): TemplateResult {
  const args = [...oldArgs];
  const firstArg = args.shift();
  const lastArg = args.pop();

  if (firstArg !== lastArg)
    throw new Error(
      `Opening tag <${firstArg}> does not match closing tag </${lastArg}>.`
    );

  const strings = [...oldStrings] as string[] & { raw: string[] };
  const firstString = strings.shift();
  const secondString = strings.shift();

  const lastString = strings.pop();
  const penultimateString = strings.pop();

  strings.unshift(`${firstString}${firstArg}${secondString}`);
  strings.push(`${penultimateString}${lastArg}${lastString}`);

  return html(<TemplateStringsArray>strings, ...args);
}


function withoutContent<P extends Plugin | InstalledOfficialPlugin>(
  plugin: P
): P {
  return { ...plugin, content: undefined };
}

export const pluginIcons: Record<PluginKind | MenuPosition, string> = {
  editor: 'tab',
  menu: 'play_circle',
  validator: 'rule_folder',
  top: 'play_circle',
  middle: 'play_circle',
  bottom: 'play_circle',
};

const menuOrder: (PluginKind | MenuPosition)[] = [
  'editor',
  'top',
  'validator',
  'middle',
  'bottom',
];

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

  @state()
  historyState: HistoryState = {
    editCount: -1,
    canRedo: false,
    canUndo: false,
  } 

  /** Object containing all *.nsdoc files and a function extracting element's label form them*/
  @property({ attribute: false })
  nsdoc: Nsdoc = initializeNsdoc();

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

  /**
   *
   * @deprecated Use `handleConfigurationPluginEvent` instead
   */
  public handleAddExternalPlugin(e: AddExternalPluginEvent){
    this.addExternalPlugin(e.detail.plugin);
    const {name, kind} = e.detail.plugin

    const event = newConfigurePluginEvent(name,kind, e.detail.plugin)

    this.handleConfigurationPluginEvent(event)
  }


  public handleConfigurationPluginEvent(e: ConfigurePluginEvent){
    const { name, kind, config } = e.detail;

    const hasPlugin = this.hasPlugin(name, kind);
    const hasConfig = config !== null;
    const isChangeEvent = hasPlugin && hasConfig;
    const isRemoveEvent = hasPlugin && !hasConfig;
    const isAddEvent = !hasPlugin && hasConfig;

    // the `&& config`is only because typescript
    // cannot infer that `isChangeEvent` and `isAddEvent` implies `config !== null`
    if(isChangeEvent && config){
      this.changePlugin(config);

    }else if(isRemoveEvent){
      this.removePlugin(name, kind);

    }else if(isAddEvent && config){
      this.addPlugin(config);

    }else{
      const event = newLogEvent({
        kind: "error",
        title: "Invalid plugin configuration event",
        message: JSON.stringify({name, kind, config}),
      });
      this.dispatchEvent(event);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('reset-plugins', this.resetPlugins);
    this.addEventListener('set-plugins', (e: SetPluginsEvent) => {
      this.setPlugins(e.detail.indices);
    });

    this.updatePlugins();
    this.requestUpdate();

    this.addEventListener(historyStateEvent, (e: CustomEvent<HistoryState>) => {
      this.historyState = e.detail;
      this.requestUpdate();
    });
  }

  render(): TemplateResult {
    return html`<oscd-waiter>
      <oscd-settings .host=${this}>
        <oscd-wizards .host=${this}>
          <oscd-history .host=${this} .editCount=${this.historyState.editCount}>
            <oscd-editor
              .doc=${this.doc}
              .docName=${this.docName}
              .docId=${this.docId}
              .host=${this}
              .editCount=${this.historyState.editCount}
            >
              <oscd-layout
                @add-external-plugin=${this.handleAddExternalPlugin}
                @oscd-configure-plugin=${this.handleConfigurationPluginEvent}
                .host=${this}
                .doc=${this.doc}
                .docName=${this.docName}
                .editCount=${this.historyState.editCount}
                .historyState=${this.historyState}
                .plugins=${this.sortedStoredPlugins}
              >
              </oscd-layout>
            </oscd-editor>
          </oscd-history>
        </oscd-wizards>
      </oscd-settings>
    </oscd-waiter>`;
  }

  private storePlugins(plugins: Array<Plugin | InstalledOfficialPlugin>) {
    localStorage.setItem(
      'plugins',
      JSON.stringify(plugins.map(withoutContent))
    );
    this.requestUpdate();
  }

  /**
   *
   * @param name
   * @param kind
   * @returns the index of the plugin in the stored plugin list
   */
  private findPluginIndex(name: string, kind: PluginKind): number {
    return this.storedPlugins.findIndex(p => p.name === name && p.kind === kind);
  }

  private hasPlugin(name: string, kind: PluginKind): boolean {
    return this.findPluginIndex(name, kind) > -1;
  }

  private removePlugin(name: string, kind: PluginKind) {
    const newPlugins = this.storedPlugins.filter(
      p => p.name !== name || p.kind !== kind
    );
    this.storePlugins(newPlugins);
  }

  private addPlugin(plugin: Plugin) {
    const newPlugins = [...this.storedPlugins, plugin];
    this.storePlugins(newPlugins);
  }

  /**
   *
   * @param plugin
   * @throws if the plugin is not found
   */
  private changePlugin(plugin: Plugin) {
    const storedPlugins = this.storedPlugins;
    const {name, kind} = plugin;
    const pluginIndex = this.findPluginIndex(name, kind);

    if(pluginIndex < 0) {
      const event = newLogEvent({
        kind: "error",
        title: "Plugin not found, stopping change process",
        message: JSON.stringify({name, kind}),
      })
      this.dispatchEvent(event);
      return;
    }

    const pluginToChange = storedPlugins[pluginIndex]
    const changedPlugin = {...pluginToChange, ...plugin}
    const newPlugins = [...storedPlugins]
    newPlugins.splice(pluginIndex, 1, changedPlugin)

    this.storePlugins(newPlugins);
  }

  private resetPlugins(): void {
    this.storePlugins(
      (builtinPlugins as Plugin[]).concat(this.parsedPlugins).map(plugin => {
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

    const menuPlugins = this.plugins.menu.map((plugin: CorePlugin) => {
      let newPosition: MenuPosition | undefined = plugin.position as MenuPosition;
      if(typeof plugin.position === 'number') {
        newPosition = undefined
      }

      return {
          ...plugin,
          position: newPosition,
          kind: 'menu' as PluginKind,
          installed: plugin.active ?? false,
        }
      })

    const editorPlugins = this.plugins.editor.map((plugin: CorePlugin) => ({
      ...plugin,
      position: undefined,
      kind: 'editor' as PluginKind,
      installed: plugin.active ?? false,
    }))

    const allPlugnis = [...menuPlugins, ...editorPlugins]
    return allPlugnis
  }

  private get sortedStoredPlugins(): Plugin[] {

    const mergedPlugins = this.storedPlugins.map(plugin => {
      if (!plugin.official){ return plugin };

      const officialPlugin = (builtinPlugins as Plugin[])
        .concat(this.parsedPlugins)
        .find(needle => needle.src === plugin.src);

        return <Plugin>{
          ...officialPlugin,
          ...plugin,
        };
    })


    return mergedPlugins
      .sort(compareNeedsDoc)
      .sort(menuCompare);
  }

  private get storedPlugins(): Plugin[] {
    const pluginsConfigStr = localStorage.getItem('plugins') ?? '[]'
    const storedPlugins = JSON.parse(pluginsConfigStr) as Plugin[]

    const plugins = storedPlugins.map(plugin => {
      const isInstalled = plugin.src && plugin.installed
      if(!isInstalled) { return plugin }

      return this.addContent(plugin)
    })

    return plugins

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
      return {
        ...plugin,
        installed: indices.has(index)
      };
    });
    this.storePlugins(newPlugins);
  }

  private updatePlugins() {

    const stored: Plugin[] = this.storedPlugins;
    const officialStored = stored.filter(p => p.official);
    const newOfficial: Array<Plugin | InstalledOfficialPlugin> = (
      builtinPlugins as Plugin[]
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
        !(builtinPlugins as Plugin[])
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
            .editCount=${this.historyState.editCount}
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

declare global {
  interface ElementEventMap {
    'reset-plugins': CustomEvent;
    'add-external-plugin': CustomEvent<AddExternalPluginDetail>;
    'set-plugins': CustomEvent<SetPluginsDetail>;
  }
}
