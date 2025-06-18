import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
  css
} from 'lit-element';
import { get } from 'lit-translate';

import type { ActionDetail } from '@material/mwc-list';
import type { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation.js';
import type { Dialog } from '@material/mwc-dialog';
import '@material/mwc-dialog';
import '@material/mwc-list';
import type {List} from '@material/mwc-list';

import {
  newResetPluginsEvent,
  newSetPluginsEvent,
  pluginIcons
} from '../../open-scd.js';

import {
  MenuPosition,
  Plugin,
} from "../../plugin.js";

@customElement('oscd-plugin-manager')
export class OscdPluginManager extends LitElement {

  /** The plugins to render the layout. */
  @property({ type: Array }) plugins: Plugin[] = [];
  @query('#plugin-manager-root') root!: Dialog
  @query('#pluginList') pluginList!: List

  render(): TemplateResult {
      return html`
        <mwc-dialog
          stacked
          id="plugin-manager-root"
          heading="${get('plugins.heading')}"
        >
          <mwc-list
            id="pluginList"
            multi
            @selected=${(e: MultiSelectedEvent) => {
              const selectedPlugins = this.pluginList.items
              .filter((item, index) => e.detail.index.has(index))
              // @ts-expect-error: we add plugin to the list item
              .map(item => item.plugin) as Plugin[]

              this.dispatchEvent(newSetPluginsEvent(selectedPlugins))
            }}
          >
            <mwc-list-item graphic="avatar" noninteractive>
              <strong>${get(`plugins.editor`)}</strong>
              <mwc-icon slot="graphic" class="inverted">
                ${pluginIcons['editor']}
              </mwc-icon>
            </mwc-list-item>

            <li divider role="separator"></li>

            ${this.generateEditorListItems()}

            <mwc-list-item graphic="avatar" noninteractive>
              <strong>${get(`plugins.menu`)}</strong>
              <mwc-icon slot="graphic" class="inverted">
                <strong>${pluginIcons['menu']}</strong></mwc-icon>
              </mwc-list-item>
            <li divider role="separator"></li>

            ${this.generateMenuListItems('top')}

            <li divider role="separator" inset></li>

            ${this.generateValidatorListItems()}

            <li divider role="separator" inset></li>

            ${this.generateMenuListItems('middle')}

            <li divider role="separator" inset></li>

            ${this.generateMenuListItems('bottom')}

          </mwc-list>
          <mwc-button
            slot="secondaryAction"
            icon="refresh"
            label="${get('reset')}"
            @click=${async () => {
              this.dispatchEvent(newResetPluginsEvent());
              this.requestUpdate();
            }}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          >
          </mwc-button>
          <mwc-button
            slot="secondaryAction"
            icon=""
            label="${get('close')}"
            dialogAction="close">
          </mwc-button>
          <mwc-button
            outlined
            trailingIcon
            slot="primaryAction"
            icon="library_add"
            label="${get('plugins.add.heading')}&hellip;"
            @click=${() => this.dispatchOpenCustomPluginDialogEvent()}>
          </mwc-button>
        </mwc-dialog>
      `;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 98vw;
    }
  `

  public show(){
    this.root.show()
  }


  private generateEditorListItems(): TemplateResult[] {
    return this.plugins
      .filter(p => p.kind === 'editor')
      .map(this.renderPluginListItem)
  }

  private generateMenuListItems(position: MenuPosition): TemplateResult[] {
    return this.plugins
      .filter(p => p.kind === 'menu' && p.position === position)
      .map(this.renderPluginListItem)
  }

  private generateValidatorListItems(): TemplateResult[] {
    return this.plugins
      .filter(p => p.kind === 'validator')
      .map(this.renderPluginListItem)
  }

  private dispatchOpenCustomPluginDialogEvent(): void {
    const event = new CustomEvent('open-plugin-download', {
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  private renderPluginListItem(plugin?: Plugin): TemplateResult {
    if(!plugin){ return html`` }

    return html`
      <mwc-check-list-item
          class="${plugin.official ? 'official' : 'external'}"
          value="${plugin.src}"
          .plugin=${plugin}
          ?selected=${plugin.active}
          @request-selected=${(e: CustomEvent<{source: string}>) => {
            if(e.detail.source !== 'interaction'){
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              return false;
            }
          }}
          hasMeta
          left
        >
          <mwc-icon slot="meta">
            ${plugin.icon || pluginIcons[plugin.kind]}
          </mwc-icon>
          ${plugin.name}
        </mwc-check-list-item>

    `;
  }

}
