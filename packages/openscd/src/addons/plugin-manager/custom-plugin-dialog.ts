
import {
  customElement,
  html,
  LitElement,
  query,
  TemplateResult,
  css,
} from 'lit-element';
import { get } from 'lit-translate';
import {
  newAddExternalPluginEvent,
  pluginIcons
} from '../../open-scd.js';

import {
  MenuPosition,
  menuPosition,
  PluginKind
} from "../../plugin.js";

import type { Button } from '@material/mwc-button';
import type { Dialog } from '@material/mwc-dialog';
import { List } from '@material/mwc-list';
import type { ListItem } from '@material/mwc-list/mwc-list-item';
import type { Select } from '@material/mwc-select';
import type { Switch } from '@material/mwc-switch';
import type { TextField } from '@material/mwc-textfield';

import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-select';
import '@material/mwc-switch';
import '@material/mwc-textfield';


@customElement('oscd-custom-plugin-dialog')
export class OscdCustomPluginDialog extends LitElement {

  @query('#dialog') dialog!: Dialog
  @query('#pluginSrcInput') pluginSrcInput!: TextField
  @query('#pluginNameInput') pluginNameInput!: TextField
  @query('#pluginKindList') pluginKindList!: List
  @query('#requireDoc') requireDoc!: Switch
  @query('#positionList') positionList!: Select
  @query('#addButton') addButton!: Button

  render(): TemplateResult {
    return html`
      <mwc-dialog id="dialog" heading="${get('plugins.add.heading')}">
        <div style="display: flex; flex-direction: column; row-gap: 8px;">
          <p style="color:var(--mdc-theme-error);">
            ${get('plugins.add.warning')}
          </p>
          <mwc-textfield
            label="${get('plugins.add.name')}"
            helper="${get('plugins.add.nameHelper')}"
            required
            id="pluginNameInput"
          ></mwc-textfield>
          <mwc-list id="pluginKindList">
            <mwc-radio-list-item
              id="editor"
              value="editor"
              hasMeta
              selected
              left
            >
              ${get('plugins.editor')}
              <mwc-icon slot="meta">
                ${pluginIcons['editor']}
              </mwc-icon>
            </mwc-radio-list-item>
            <mwc-radio-list-item value="menu" hasMeta left>
              ${get('plugins.menu')}
            <mwc-icon slot="meta">
              ${pluginIcons['menu']}
            </mwc-icon>
            </mwc-radio-list-item>
            <div id="menudetails">
              <mwc-formfield
                id="enabledefault"
                label="${get('plugins.requireDoc')}"
              >
                <mwc-switch id="requireDoc" checked></mwc-switch>
              </mwc-formfield>
              <mwc-select id="positionList" value="middle" fixedpositionList>
                ${Object.values(menuPosition).map(
                  menutype =>
                    html`<mwc-list-item value="${menutype}"
                      >${get('plugins.' + menutype)}</mwc-list-item
                    >`
                )}
              </mwc-select>
            </div>
            <style>
              #menudetails {
                display: none;
                padding: 20px;
                padding-left: 50px;
              }
              #pluginKindList [value="menu"][selected] ~ #menudetails {
                display: grid;
              }
              #enabledefault {
                padding-bottom: 20px;
              }
              #positionList {
                max-width: 250px;
              }
            </style>
            <mwc-radio-list-item id="validator" value="validator" hasMeta left>
              ${get('plugins.validator')}
              <mwc-icon slot="meta">
                ${pluginIcons['validator']}
              </mwc-icon>
            </mwc-radio-list-item>
          </mwc-list>
          <mwc-textfield
            label="${get('plugins.add.src')}"
            helper="${get('plugins.add.srcHelper')}"
            placeholder="http://example.com/plugin.js"
            type="url"
            required
            id="pluginSrcInput">
          </mwc-textfield>
        </div>
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          label="${get('cancel')}">
        </mwc-button>
        <mwc-button
          id="addButton"
          slot="primaryAction"
          icon="add"
          label="${get('add')}"
          trailingIcon
          @click=${() => this.handleAddPlugin()}>
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`

    mwc-dialog {
      --mdc-dialog-max-width: 98vw;
    }

    mwc-dialog > form {
      display: flex;
      flex-direction: column;
    }

    mwc-dialog > form > * {
      display: block;
      margin-top: 16px;
    }
  `

  public close(){
    this.dialog.close()
  }

  public show(){
    this.dialog.show()
  }

  get open(){
    return this.dialog.open
  }

  private handleAddPlugin() {

    if (
      !(
        this.pluginSrcInput.checkValidity() &&
        this.pluginNameInput.checkValidity() &&
        this.pluginKindList.selected &&
        this.requireDoc &&
        this.positionList.selected
      )
    )
      return;

    this.dispatchEvent(
      newAddExternalPluginEvent({
        src: this.pluginSrcInput.value,
        name: this.pluginNameInput.value,
        kind: <PluginKind>(<ListItem>this.pluginKindList.selected).value,
        requireDoc: this.requireDoc.checked,
        position: <MenuPosition>this.positionList.value,
        active: true,
        // this is an added plugin and will be remove by reset either way
        activeByDefault: false,
      })
    );

    this.requestUpdate();
    this.dialog.close();
  }

}


