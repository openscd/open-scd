import {
  css,
  customElement,
  html,
  property,
  PropertyValues,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { get, translate } from 'lit-translate';

import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import { newEditEventV2 } from '@openscd/core';
import { createElement } from '@openscd/xml';
import { logicalDeviceIcon } from '@openscd/open-scd/src/icons/ied-icons.js';
import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute,
  getLdNameAttribute,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';

import { wizards } from '../../wizards/wizard-library.js';
import { Container } from './foundation.js';
import { lnInstGenerator } from '@openenergytools/scl-lib/dist/generator/lnInstGenerator.js';
import { AddLnDialog, LNData } from './add-ln-dialog.js';

import '@openscd/open-scd/src/action-pane.js';
import './ln-container.js';
import './add-ln-dialog.js';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  @query('add-ln-dialog')
  addLnDialog!: AddLnDialog;

  private openEditWizard(): void {
    const wizard = wizards['LDevice'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private header(): TemplateResult {
    const nameOrInst =
      getNameAttribute(this.element) ?? getInstanceAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);
    const ldName = getLdNameAttribute(this.element);

    return html`${nameOrInst}${desc ? html` &mdash; ${desc}` : nothing}${ldName
      ? html` &mdash; ${ldName}`
      : nothing}`;
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
    if (_changedProperties.has('selectedLNClasses')) {
      this.requestUpdate('lnElements');
    }
  }

  @state()
  private get lnElements(): Element[] {
    return Array.from(this.element.querySelectorAll(':scope > LN,LN0')).filter(
      element => {
        const lnClass = element.getAttribute('lnClass') ?? '';
        return this.selectedLNClasses.includes(lnClass);
      }
    );
  }

  private handleAddLN(data: LNData) {
    const getInst = lnInstGenerator(this.element, 'LN');
    const inserts = [];

    for (let i = 0; i < data.amount; i++) {
      const inst = getInst(data.lnClass);
      if (!inst) break;
      const lnAttrs = {
        lnClass: data.lnClass,
        lnType: data.lnType,
        inst: inst,
        ...(data.prefix ? { prefix: data.prefix } : {}),
      };
      const ln = createElement(this.doc, 'LN', lnAttrs);
      inserts.push({ parent: this.element, node: ln, reference: null });
    }

    this.dispatchEvent(newEditEventV2(inserts));
  }

  private removeLDevice(): void {
    this.dispatchEvent(
      newActionEvent({
        old: { parent: this.element.parentElement!, element: this.element },
      })
    );
  }

  render(): TemplateResult {
    const lnElements = this.lnElements;

    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${logicalDeviceIcon}</mwc-icon>
      <mwc-icon-button
        slot="action"
        icon="delete"
        title="${translate('remove')}"
        @click=${() => this.removeLDevice()}
      ></mwc-icon-button>
      <abbr slot="action" title="${get('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title=${translate('iededitor.addLnDialog.title')}>
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.addLnDialog.show()}
        ></mwc-icon-button>
      </abbr>
      ${lnElements.length > 0
        ? html`<abbr
            slot="action"
            title="${get('iededitor.toggleChildElements')}"
          >
            <mwc-icon-button-toggle
              on
              id="toggleButton"
              onIcon="keyboard_arrow_up"
              offIcon="keyboard_arrow_down"
              @click=${() => this.requestUpdate()}
            ></mwc-icon-button-toggle>
          </abbr>`
        : nothing}
      <div id="lnContainer">
        ${this.toggleButton?.on
          ? lnElements.map(
              ln => html`<ln-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ln}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></ln-container> `
            )
          : nothing}
      </div>
      <add-ln-dialog
        .doc=${this.doc}
        .onConfirm=${(data: LNData) => this.handleAddLN(data)}
      ></add-ln-dialog>
    </action-pane>`;
  }

  static styles = css`
    #lnContainer {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    abbr {
      text-decoration: none;
    }

    @media (max-width: 387px) {
      #lnContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
