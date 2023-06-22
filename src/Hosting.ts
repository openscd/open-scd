import { html, property, query, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';

import { Drawer } from '@material/mwc-drawer';
import { ActionDetail, List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import { Mixin, newPendingStateEvent, UserInfoEvent } from './foundation.js';
import { LoggingElement } from './Logging.js';
import { PluggingElement, Plugin, pluginIcons } from './Plugging.js';
import { SettingElement } from './Setting.js';

interface MenuItem {
  icon: string;
  name: string;
  hint?: string;
  actionItem?: boolean;
  action?: (event: CustomEvent<ActionDetail>) => void;
  disabled?: () => boolean;
  content?: TemplateResult;
  kind: string;
}

interface Validator {
  validate: (manual?: boolean) => Promise<void>;
}

interface MenuPlugin {
  run: () => Promise<void>;
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
    validated: Promise<void> = Promise.resolve();

    @property({ type: String })
    username: string | undefined;

    private shouldValidate = false;

    @query('#menu') menuUI!: Drawer;

    get menu(): (MenuItem | 'divider')[] {
      const topMenu: (MenuItem | 'divider')[] = [];
      const middleMenu: (MenuItem | 'divider')[] = [];
      const bottomMenu: (MenuItem | 'divider')[] = [];
      const validators: (MenuItem | 'divider')[] = [];

      this.topMenu.forEach(plugin =>
        topMenu.push({
          icon: plugin.icon || pluginIcons['menu'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<MenuPlugin>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].nextElementSibling
                  ))
                )).run()
              )
            );
          },
          disabled: (): boolean => plugin.requireDoc! && this.doc === null,
          content: plugin.content,
          kind: 'top',
        })
      );

      this.middleMenu.forEach(plugin =>
        middleMenu.push({
          icon: plugin.icon || pluginIcons['menu'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<MenuPlugin>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].nextElementSibling
                  ))
                )).run()
              )
            );
          },
          disabled: (): boolean => plugin.requireDoc! && this.doc === null,
          content: plugin.content,
          kind: 'middle',
        })
      );

      this.bottomMenu.forEach(plugin =>
        bottomMenu.push({
          icon: plugin.icon || pluginIcons['menu'],
          name: plugin.name,
          action: ae => {
            this.dispatchEvent(
              newPendingStateEvent(
                (<MenuPlugin>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].nextElementSibling
                  ))
                )).run()
              )
            );
          },
          disabled: (): boolean => plugin.requireDoc! && this.doc === null,
          content: plugin.content,
          kind: 'middle',
        })
      );

      this.validators.forEach(plugin =>
        validators.push({
          icon: plugin.icon || pluginIcons['validator'],
          name: plugin.name,
          action: ae => {
            if (this.diagnoses.get(plugin.src))
              this.diagnoses.get(plugin.src)!.length = 0;

            this.dispatchEvent(
              newPendingStateEvent(
                (<Validator>(
                  (<unknown>(
                    (<List>ae.target).items[ae.detail.index].nextElementSibling
                  ))
                )).validate(true)
              )
            );
          },
          disabled: (): boolean => this.doc === null,
          content: plugin.content,
          kind: 'validator',
        })
      );

      if (middleMenu.length > 0) middleMenu.push('divider');
      if (bottomMenu.length > 0) bottomMenu.push('divider');

      return [
        'divider',
        ...topMenu,
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
          icon: 'history',
          name: 'menu.viewLog',
          actionItem: true,
          action: (): void => this.logUI.show(),
          kind: 'static',
        },
        {
          icon: 'rule',
          name: 'menu.viewDiag',
          actionItem: true,
          action: (): void => this.diagnosticUI.show(),
          kind: 'static',
        },
        'divider',
        ...middleMenu,
        {
          icon: 'settings',
          name: 'settings.title',
          action: (): void => this.settingsUI.show(),
          kind: 'static',
        },
        ...bottomMenu,
        {
          icon: 'extension',
          name: 'plugins.heading',
          action: (): void => this.pluginUI.show(),
          kind: 'static',
        },
      ];
    }

    private onUserInfo(event: UserInfoEvent) {
      this.username = event.detail.name;
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('validate', async () => {
        this.shouldValidate = true;
        await this.validated;

        if (!this.shouldValidate) return;

        this.diagnoses.clear();
        this.shouldValidate = false;

        this.validated = Promise.allSettled(
          this.menuUI
            .querySelector('mwc-list')!
            .items.filter(item => item.className === 'validator')
            .map(item =>
              (<Validator>(<unknown>item.nextElementSibling)).validate(false)
            )
        ).then();
        this.dispatchEvent(newPendingStateEvent(this.validated));
      });
      this.addEventListener('close-drawer', async () => {
        this.menuUI.open = false;
      });

      this.addEventListener('userinfo', this.onUserInfo);
    }

    renderMenuItem(me: MenuItem | 'divider'): TemplateResult {
      if (me === 'divider')
        return html`<li divider padded role="separator"></li>`;
      if (me.actionItem) return html``;
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
        </mwc-list-item>
        ${me.content ?? ''}
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

    renderEditorTab({ name, icon }: Plugin): TemplateResult {
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
          <span slot="title">${translate('menu.title')}</span>
          ${this.docName
            ? html`<span slot="subtitle">${this.docName}</span>`
            : ''}
          <mwc-list
            wrapFocus
            @action=${(ae: CustomEvent<ActionDetail>) => {
              //FIXME: dirty hack to be fixed in open-scd-core
              //       if clause not necessary when oscd... components in open-scd not list
              if (ae.target instanceof List)
                (<MenuItem>(
                  this.menu.filter(
                    item => item !== 'divider' && !item.actionItem
                  )[ae.detail.index]
                ))?.action?.(ae);
            }}
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
            ${this.username != undefined
              ? html`<span
                  id="userField"
                  slot="actionItems"
                  style="font-family:Roboto"
                  >${translate('userinfo.loggedInAs', {
                    name: this.username,
                  })}</span
                >`
              : ``}
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

        ${this.doc && this.editors[this.activeTab]?.content
          ? this.editors[this.activeTab].content
          : html`<div class="landing">
              ${(<MenuItem[]>this.menu.filter(mi => mi !== 'divider')).map(
                (mi: MenuItem, index) =>
                  mi.kind === 'top' && !mi.disabled?.()
                    ? html`
                        <mwc-icon-button
                          class="landing_icon"
                          icon="${mi.icon}"
                          @click="${() => {
                            (<HTMLElement>(
                              this.menuUI.querySelector(
                                'mwc-icon-button[label="Menu"]'
                              )
                            )).click();
                            (<ListItem>(
                              this.menuUI.querySelector('mwc-list')!.items[
                                index
                              ]
                            )).click();
                          }}"
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
