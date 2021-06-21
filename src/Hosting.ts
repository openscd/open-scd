import { Drawer } from '@material/mwc-drawer';
import { ActionDetail, List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { html, property, query, TemplateResult } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { translate } from 'lit-translate';
import { Mixin, newPendingStateEvent, ValidateEvent } from './foundation.js';
import { LoggingElement } from './Logging.js';
import { InstalledPlugin, PluggingElement, pluginIcons } from './Plugging.js';
import { SettingElement } from './Setting.js';

interface MenuItem {
  icon: string;
  name: string;
  hint?: string;
  actionItem?: boolean;
  action?: (event: CustomEvent<ActionDetail>) => void;
  disabled?: () => boolean;
  content?: () => Promise<TemplateResult>;
  kind: string;
}

interface Triggered {
  trigger: () => Promise<void>;
}

interface Loader {
  load: () => Promise<void>;
}

interface Saver {
  save: () => Promise<void>;
}

interface Validator {
  validate: (identity: string) => Promise<void>;
}

/** Mixin that hosts the UI for Plugins, Settings and Logging */
export type HostingElement = Mixin<typeof Hosting>;

export function Hosting<
  TBase extends new (...args: any[]) => PluggingElement &
    LoggingElement &
    SettingElement
>(Base: TBase) {
  class HostingElement extends Base {
    /** The currently active editor tab. */
    @property({ type: Number })
    activeTab = 0;

    @property({ attribute: false })
    validated: Promise<unknown> = Promise.resolve();

    @query('#menu') menuUI!: Drawer;

    get menu(): (MenuItem | 'divider')[] {
      const triggered: (MenuItem | 'divider')[] = [];
      const loaders: (MenuItem | 'divider')[] = [];
      const savers: (MenuItem | 'divider')[] = [];
      const validators: (MenuItem | 'divider')[] = [];

      this.triggered.forEach(plugin =>
        triggered.push({
          icon: plugin.icon || pluginIcons['triggered'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<Triggered>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].lastElementChild
                  ))
                )).trigger()
              )
            );
          },
          disabled: (): boolean => this.doc === null,
          content: plugin.content,
          kind: 'triggered',
        })
      );

      this.loaders.forEach(plugin =>
        loaders.push({
          icon: plugin.icon || pluginIcons['loader'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<Loader>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].lastElementChild
                  ))
                )).load()
              )
            );
          },
          disabled: (): boolean => false,
          content: plugin.content,
          kind: 'loader',
        })
      );

      this.savers.forEach(plugin =>
        savers.push({
          icon: plugin.icon || pluginIcons['saver'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<Saver>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].lastElementChild
                  ))
                )).save()
              )
            );
          },
          disabled: (): boolean => this.doc === null,
          content: plugin.content,
          kind: 'saver',
        })
      );

      this.validators.forEach(plugin =>
        validators.push({
          icon: plugin.icon || pluginIcons['validator'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<Validator>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].lastElementChild
                  ))
                )).validate('')
              )
            );
          },
          disabled: (): boolean => this.doc === null,
          content: plugin.content,
          kind: 'validator',
        })
      );

      if (triggered.length > 0) triggered.push('divider');

      return [
        'divider',
        ...loaders,
        ...savers,
        'divider',
        {
          icon: 'undo',
          name: 'undo',
          actionItem: true,
          action: this.undo,
          disabled: (): boolean => !this.canUndo,
          kind: 'static',
        },
        {
          icon: 'redo',
          name: 'redo',
          actionItem: true,
          action: this.redo,
          disabled: (): boolean => !this.canRedo,
          kind: 'static',
        },
        ...validators,
        {
          icon: 'rule',
          name: 'menu.viewLog',
          actionItem: true,
          action: (): void => this.logUI.show(),
          kind: 'static',
        },
        'divider',
        ...triggered,
        {
          icon: 'settings',
          name: 'settings.name',
          action: (): void => this.settingsUI.show(),
          kind: 'static',
        },
        {
          icon: 'extension',
          name: 'plugins.heading',
          action: (): void => this.pluginUI.show(),
          kind: 'static',
        },
      ];
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('validate', async (e: ValidateEvent) => {
        this.validated = Promise.allSettled(
          this.menuUI
            .querySelector('mwc-list')!
            .items.filter(item => item.className === 'validator')
            .map(item => {
              const promise = (<Validator>(
                (<unknown>item.lastElementChild)
              )).validate(e.detail.identity);
              return promise;
            })
        );
      });
    }

    renderMenuItem(me: MenuItem | 'divider'): TemplateResult {
      if (me === 'divider')
        return html`<li divider padded role="separator"></li>`;
      return html`
        <mwc-list-item
          class="${me.kind}"
          iconid="${me.icon}"
          graphic="icon"
          .disabled=${me.disabled?.() || !me.action}
          ><mwc-icon slot="graphic">${me.icon}</mwc-icon>
          <span>${translate(me.name)}</span>
          ${me.hint
            ? html`<span slot="secondary"><tt>${me.hint}</tt></span>`
            : ''}
          ${me.content
            ? until(
                me.content(),
                html`<mwc-linear-progress indeterminate></mwc-linear-progress>`
              )
            : ''}
        </mwc-list-item>
      `;
    }

    renderActionItem(me: MenuItem | 'divider'): TemplateResult {
      if (me !== 'divider' && me.actionItem)
        return html`<mwc-icon-button
          slot="actionItems"
          icon="${me.icon}"
          label="${me.name}"
          ?disabled=${me.disabled?.() || !me.action}
          @click=${me.action}
        ></mwc-icon-button>`;
      else return html``;
    }

    renderEditorTab({ name, icon }: InstalledPlugin): TemplateResult {
      return html`<mwc-tab label=${translate(name)} icon=${icon || 'edit'}>
      </mwc-tab>`;
    }

    render(): TemplateResult {
      return html` <mwc-drawer
          class="mdc-theme--surface"
          hasheader
          type="modal"
          id="menu"
        >
          <span slot="title">${translate('menu.name')}</span>
          ${this.docName
            ? html`<span slot="subtitle">${this.docName}</span>`
            : ''}
          <mwc-list
            wrapFocus
            @action=${(ae: CustomEvent<ActionDetail>) =>
              (<MenuItem>(
                this.menu.filter(item => item !== 'divider')[ae.detail.index]
              ))?.action?.(ae)}
          >
            ${this.menu.map(this.renderMenuItem)}
          </mwc-list>

          <mwc-top-app-bar-fixed slot="appContent">
            <mwc-icon-button
              icon="menu"
              label="Menu"
              slot="navigationIcon"
              @click=${() => (this.menuUI.open = true)}
            ></mwc-icon-button>
            <div slot="title" id="title">${this.docName}</div>
            ${this.menu.map(this.renderActionItem)}
            ${this.doc
              ? html`<mwc-tab-bar
                  @MDCTabBar:activated=${(e: CustomEvent) =>
                    (this.activeTab = e.detail.index)}
                >
                  ${this.editors.map(this.renderEditorTab)}
                </mwc-tab-bar>`
              : ``}
          </mwc-top-app-bar-fixed>
        </mwc-drawer>

        ${this.doc
          ? until(
              this.editors[this.activeTab] &&
                this.editors[this.activeTab].content(),
              html`<mwc-linear-progress indeterminate></mwc-linear-progress>`
            )
          : html`<div class="landing">
              ${(<MenuItem[]>this.menu.filter(mi => mi !== 'divider')).map(
                (mi: MenuItem, index) =>
                  mi.kind === 'loader'
                    ? html`
                        <mwc-icon-button
                          class="landing_icon"
                          icon="${mi.icon}"
                          @click="${() =>
                            (<ListItem>(
                              this.menuUI.querySelector('mwc-list')!.items[
                                index
                              ]
                            )).click()}"
                        >
                          <div class="landing_label">${mi.name}</div>
                        </mwc-icon-button>
                      `
                    : html``
              )}
            </div>`}
        ${super.render()}`;
    }
  }
  return HostingElement;
}
