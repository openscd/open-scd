import {
  customElement,
  html,
  property,
  PropertyValues,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { translate } from 'lit-translate';

import { serverIcon } from '@openscd/open-scd/src/icons/ied-icons.js';
import { getDescriptionAttribute } from '@openscd/open-scd/src/foundation.js';
import { createElement } from '@openscd/xml';
import { newEditEventV2 } from '@openscd/core';

import {
  Container,
  findLLN0LNodeType,
  createLLN0LNodeType,
} from './foundation.js';
import { AddLDeviceDialog, LDeviceData } from './add-ldevice-dialog.js';

import '@openscd/open-scd/src/action-pane.js';
import './ldevice-container.js';
import './add-ldevice-dialog.js';

/** [[`IED`]] plugin subeditor for editing `Server` element. */
@customElement('server-container')
export class ServerContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  @query('add-ldevice-dialog')
  addAccessPointDialog!: AddLDeviceDialog;

  private header(): TemplateResult {
    const desc = getDescriptionAttribute(this.element);

    return html`Server${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
    if (_changedProperties.has('selectedLNClasses')) {
      this.requestUpdate('lDeviceElements');
    }
  }

  @state()
  private get lDeviceElements(): Element[] {
    return Array.from(this.element.querySelectorAll(':scope > LDevice')).filter(
      element => {
        return (
          Array.from(element.querySelectorAll(':scope > LN,LN0')).filter(
            element => {
              const lnClass = element.getAttribute('lnClass') ?? '';
              return this.selectedLNClasses.includes(lnClass);
            }
          ).length > 0
        );
      }
    );
  }

  private handleAddLDevice(data: LDeviceData) {
    const inserts: any[] = [];
    const lln0Type = findLLN0LNodeType(this.doc);
    const lnTypeId = lln0Type?.getAttribute('id') || 'PlaceholderLLN0';

    if (!lln0Type) {
      const lnodeTypeInserts = createLLN0LNodeType(this.doc, lnTypeId);
      inserts.push(...lnodeTypeInserts);
    }
    const lDevice = createElement(this.doc, 'LDevice', {
      inst: data.inst,
    });

    const ln0 = createElement(this.doc, 'LN0', {
      lnClass: 'LLN0',
      inst: '',
      lnType: lnTypeId,
    });

    lDevice.appendChild(ln0);
    inserts.push({ parent: this.element, node: lDevice, reference: null });
    this.dispatchEvent(newEditEventV2(inserts));
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      <abbr
        slot="action"
        title=${translate('iededitor.addLDeviceDialog.title')}
      >
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.addAccessPointDialog.show()}
        ></mwc-icon-button>
      </abbr>
      ${this.lDeviceElements.map(
        server =>
          html`<ldevice-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></ldevice-container>`
      )}
      <add-ldevice-dialog
        .server=${this.element}
        .onConfirm=${(data: LDeviceData) => this.handleAddLDevice(data)}
      ></add-ldevice-dialog>
    </action-pane>`;
  }
}
