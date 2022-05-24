import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
} from 'lit-element';

import '@material/mwc-icon-button';

import './connectedap-editor.js';
import {
  
  compareNames,
} from '../../foundation.js';

/** [[`104`]] subeditor for a `SubNetwork` element. */
@customElement('subnetwork-104-editor')
export class SubNetworkEditor extends LitElement {
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
                .element=${connectedAP}
              ></connectedap-104-editor>`
          )}
        </action-pane>`
      );
  }

  private subNetworkSpecs(): string {
    const type = this.element.getAttribute('type') ?? null;

    if (!type && !this.bitrate) return '';

    return `(${type}${
      type && this.bitrate ? ` — ${this.bitrate}` : ``
    })`;
  }

  private header(): string {
    const desc = this.element.getAttribute('desc') ?? null;
    const name = this.element.getAttribute('name') ?? undefined;

    return ` ${name} ${desc === null ? '' : `— ${desc}`}
    ${this.subNetworkSpecs()}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header()}">
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
