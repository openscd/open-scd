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
  /** SCL element SubNetwork */
  @property({ attribute: false })
  element!: Element;
  /** SubNetwork attribute name */
  @property()
  get name(): string {
    return this.element.getAttribute('name') ?? 'UNDEFINED';
  }
  /** SubNetwork attribute desc */
  @property()
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }
  /** SubNetwork attribute type */
  @property()
  get type(): string | null {
    return this.element.getAttribute('type') ?? null;
  }
  /** SubNetwork child elements BitRate label */
  @property()
  get bitrate(): string | null {
    const Br = this.element.querySelector('BitRate');
    if (Br === null) return null;
    const br = Br.textContent ?? '';
    const m = Br.getAttribute('multiplier');
    const u = m === null ? 'b/s' : ' ' + m + 'b/s';
    return br ? br + u : null;
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

  private renderIedContainer(): TemplateResult[] {
    return Array.from(this.element.querySelectorAll(':scope > ConnectedAP'))
      .map(connAP => connAP.getAttribute('iedName')!)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(compareNames)
      .map(
        iedName => html` <action-pane id="iedSection" label="${iedName}">
          ${Array.from(
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
          )}
        </action-pane>`
      );
  }

  private renderSubNetworkSpecs(): TemplateResult {
    if (!this.type && !this.bitrate) return html``;

    return html`(${this.type}${this.type && this.bitrate
      ? html`&mdash;`
      : html``}${this.bitrate})`;
  }

  private renderHeader(): TemplateResult {
    return html` ${this.name} ${this.desc === null ? '' : html`&mdash;`}
    ${this.desc} ${this.renderSubNetworkSpecs()}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.renderHeader()}">
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
        ></mwc-icon-button> </abbr
      ><abbr slot="action" title="${translate('add')}">
        <mwc-icon-button
          icon="playlist_add"
          @click="${() => this.openConnectedAPwizard()}"
        ></mwc-icon-button>
      </abbr>
      <div id="iedContainer">${this.renderIedContainer()}</div>
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
