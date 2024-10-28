import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon-button';

import './connectedap-editor.js';

import {
  compareNames,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { get } from 'lit-translate';
import { createConnectedApWizard } from './wizards/connectedap.js';
import { Base104Container } from './base-container.js';
import { getTypeAttribute } from './foundation/foundation.js';

/** [[`104`]] subeditor for a `SubNetwork` element. */
@customElement('subnetwork-104-container')
export class SubNetwork104Container extends Base104Container {
  /** SCL element SubNetwork */
  @property({ attribute: false })
  element!: Element;

  get bitrate(): string | null {
    const bitRate = this.element.querySelector('BitRate');
    if (bitRate === null) return null;
    const bitRateValue = bitRate.textContent ?? '';
    const m = bitRate.getAttribute('multiplier');
    const unit = m === null ? 'b/s' : ' ' + m + 'b/s';
    return bitRateValue ? bitRateValue + unit : null;
  }

  private openConnectedAPwizard(): void {
    this.dispatchEvent(newWizardEvent(createConnectedApWizard(this.element)));
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
              html`<connectedap-104-editor
                class="${connectedAP.parentElement !== this.element
                  ? 'disabled'
                  : ''}"
                .editCount=${this.editCount}
                .doc="${this.doc}"
                .element=${connectedAP}
              ></connectedap-104-editor>`
          )}
        </action-pane>`
      );
  }

  private subNetworkSpecs(): string {
    const type = getTypeAttribute(this.element) ?? null;

    if (!type && !this.bitrate) return '';

    return `(${type}${type && this.bitrate ? ` — ${this.bitrate}` : ``})`;
  }

  private header(): string {
    const desc = this.element.getAttribute('desc') ?? null;
    const name = this.element.getAttribute('name') ?? undefined;

    return ` ${name} ${desc === null ? '' : `— ${desc}`}
    ${this.subNetworkSpecs()}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header()}">
      <abbr slot="action" title="${get('add')}">
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
  `;
}
