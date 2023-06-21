import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-icon-button';

import './connectedap-editor.js';
import './gse-editor.js';
import './smv-editor.js';
import {
  newWizardEvent,
  newActionEvent,
  compareNames,
} from '../../foundation.js';
import { createConnectedApWizard } from '../../wizards/connectedap.js';
import { wizards } from '../../wizards/wizard-library.js';

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

  private subNetworkSpecs(): string {
    if (!this.type && !this.bitrate) return '';

    return `(${this.type}${
      this.type && this.bitrate ? ` — ${this.bitrate}` : ``
    })`;
  }

  private header(): string {
    return `${this.name} ${this.desc === null ? '' : `— ${this.desc}`}
    ${this.subNetworkSpecs()}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header()}">
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('add')}">
        <mwc-icon-button
          icon="playlist_add"
          @click="${() => this.openConnectedAPwizard()}"
        ></mwc-icon-button>
      </abbr>
      <div id="iedContainer">${this.renderIEDs()}</div>
    </action-pane> `;
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
  `;
}
