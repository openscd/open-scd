import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
  state,
  query,
} from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import type { Dialog } from '@material/mwc-dialog';

import './connectedap-editor.js';
import './gse-editor.js';
import './smv-editor.js';
import {
  newWizardEvent,
  compareNames,
} from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { createConnectedApWizard } from '../../wizards/connectedap.js';
import { wizards } from '../../wizards/wizard-library.js';
import { canMoveCommunicationElementToConnectedAP, getAllConnectedAPsOfSameIED } from './foundation.js';

/** [[`Communication`]] subeditor for a `SubNetwork` element. */
@customElement('subnetwork-editor')
export class SubNetworkEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  /** SCL element SubNetwork */
  @property({ attribute: false })
  element!: Element;

  /** SubNetwork attribute name */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? 'UNDEFINED';
  }

  /** SubNetwork attribute desc */
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }

  /** SubNetwork attribute type */
  @property({ type: String })
  get type(): string | null {
    return this.element.getAttribute('type') ?? null;
  }

  /** SubNetwork child elements BitRate label */
  @property({ type: String })
  get bitrate(): string | null {
    const bitRate = this.element.querySelector('BitRate');
    if (bitRate === null) return null;
    const bitRateValue = bitRate.textContent ?? '';
    const m = bitRate.getAttribute('multiplier');
    const unit = ` ${m ?? ''}b/s`;
    return bitRateValue ? bitRateValue + unit : null;
  }

  @state()
  private moveTargetElement: Element | null = null;

  @state()
  newlySelectedAP: Element | null = null;

  @query('#moveDialog') private moveDialog!: Dialog;

  private openConnectedAPwizard(): void {
    this.dispatchEvent(newWizardEvent(createConnectedApWizard(this.element)));
  }

  private openEditWizard(): void {
    const wizard = wizards['SubNetwork'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
            reference: this.element.nextSibling,
          },
        })
      );
  }

  private async openMoveDialog(e: CustomEvent): Promise<void> {
    this.moveTargetElement = e.detail.element;
    this.newlySelectedAP = null;
    await this.updateComplete;

    this.moveDialog.show();
  }

  private confirmMove(): void {
    if (this.moveTargetElement && this.newlySelectedAP) {
      const moveAction = {
        old: {
          parent: this.moveTargetElement.parentElement!,
          element: this.moveTargetElement,
          reference: null,
        },
        new: {
          parent: this.newlySelectedAP,
        },
      };

      this.dispatchEvent(
        newActionEvent({
          actions: [moveAction],
          title: `Move ${this.moveTargetElement.tagName} to another ConnectedAP`,
        })
      );
    }
    this.moveDialog.close();
    this.moveTargetElement = null;
    this.newlySelectedAP = null;
  }

  private renderSmvEditors(iedName: string): TemplateResult[] {
    return Array.from(
      this.element
        .closest('Communication')
        ?.querySelectorAll(`ConnectedAP[iedName="${iedName}"] > SMV`) ?? []
    ).map(
      smv => html`<smv-editor
        class="${smv.closest('SubNetwork') !== this.element ? 'disabled' : ''}"
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${smv}
        @request-smv-move=${(e: CustomEvent) => this.openMoveDialog(e)}
      ></smv-editor>`
    );
  }

  private renderGseEditors(iedName: string): TemplateResult[] {
    return Array.from(
      this.element
        .closest('Communication')
        ?.querySelectorAll(`ConnectedAP[iedName="${iedName}"] > GSE`) ?? []
    ).map(
      gse => html`<gse-editor
        class="${gse.closest('SubNetwork') !== this.element ? 'disabled' : ''}"
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${gse}
        @request-gse-move=${(e: CustomEvent) => this.openMoveDialog(e)}
      ></gse-editor>`
    );
  }

  private renderConnectedApEditors(iedName: string): TemplateResult[] {
    return Array.from(
      this.element.parentElement?.querySelectorAll(
        `:scope > SubNetwork > ConnectedAP[iedName="${iedName}"]`
      ) ?? []
    ).map(
      connectedAP =>
        html`<connectedap-editor
          class="${connectedAP.parentElement !== this.element
            ? 'disabled'
            : ''}"
          .element=${connectedAP}
        ></connectedap-editor>`
    );
  }

  private renderIEDs(): TemplateResult[] {
    return Array.from(this.element.querySelectorAll(':scope > ConnectedAP'))
      .map(connAP => connAP.getAttribute('iedName')!)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(compareNames)
      .map(
        iedName => html` <action-pane id="iedSection" label="${iedName}">
          ${this.renderConnectedApEditors(iedName)}${this.renderGseEditors(
            iedName
          )}${this.renderSmvEditors(iedName)}
        </action-pane>`
      );
  }

  private renderSmvGseMoveDialog(): TemplateResult {
    if (!this.moveTargetElement) return html``;

    const allConnectedAPs = getAllConnectedAPsOfSameIED(
      this.moveTargetElement,
      this.doc
    );

    const validTargetConnectedAPs = allConnectedAPs.filter(cap => canMoveCommunicationElementToConnectedAP(
      this.moveTargetElement!,
      cap,
      this.doc
    ));

    return html`
      <mwc-dialog
        id="moveDialog"
        heading=${get('wizard.title.selectAp')}
        @closed=${() => {
          this.moveTargetElement = null;
          this.newlySelectedAP = null;
        }}
      >
        <mwc-list>
          ${allConnectedAPs.map(
            connectedAP => html`
              <mwc-list-item
                class=${connectedAP === this.newlySelectedAP ? 'selected' : ''}
                @click=${() => (this.newlySelectedAP = connectedAP)}
                ?selected=${connectedAP === this.newlySelectedAP}
                ?disabled=${!validTargetConnectedAPs.includes(connectedAP)}
              >
                ${connectedAP.getAttribute('iedName')} >
                ${connectedAP.getAttribute('apName')}
              </mwc-list-item>
            `
          )}
        </mwc-list>
        <mwc-button
          slot="primaryAction"
          icon="save"
          @click=${() => this.confirmMove()}
          ?disabled=${!this.newlySelectedAP}
        >
          ${get('save')}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          style="--mdc-theme-primary: var(--mdc-theme-error)"
          >${get('close')}</mwc-button
        >
      </mwc-dialog>
    `;
  }

  private subNetworkSpecs(): string {
    if (!this.type && !this.bitrate) return '';

    return `(${[this.type, this.bitrate].filter(text => !!text).join(' — ')})`;
  }

  private header(): string {
    return `${this.name} ${this.desc === null ? '' : `— ${this.desc}`}
    ${this.subNetworkSpecs()}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header()}">
        <abbr slot="action" title="${get('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('add')}">
          <mwc-icon-button
            icon="playlist_add"
            @click="${() => this.openConnectedAPwizard()}"
          ></mwc-icon-button>
        </abbr>
        <div id="iedContainer">${this.renderIEDs()}</div>
      </action-pane>
      ${this.renderSmvGseMoveDialog()}`;
  }

  static styles = css`
    #iedContainer {
      display: grid;
      box-sizing: border-box;
      gap: 12px;
      padding: 8px 12px 16px;
      grid-template-columns: repeat(auto-fit, minmax(150px, auto));
    }

    #iedSection:not(:focus):not(:focus-within) .disabled {
      display: none;
    }

    #iedSection:not(:focus):not(:focus-within) gse-editor {
      display: none;
    }

    #iedSection:not(:focus):not(:focus-within) smv-editor {
      display: none;
    }

    #iedSection .disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    mwc-list-item[disabled] {
      color: var(--mdc-theme-text-disabled, #9e9e9e); /* Gray text */
      opacity: 0.6;
      pointer-events: none;
    }

    mwc-list-item.selected {
      background-color: var(--mdc-theme-primary);
      color: var(--mdc-theme-on-primary, #ffffff);
      font-weight: bold;
    }
  `;
}
