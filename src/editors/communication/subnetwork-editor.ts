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
import { styles } from './foundation.js';
import { createConnectedApWizard } from '../../wizards/connectedap.js';
import { subNetworkWizard } from '../../wizards/subnetwork.js';

/** [[`Communication`]] subeditor for a `SubNetwork` element. */
@customElement('subnetwork-editor')
export class SubNetworkEditor extends LitElement {
  @property()
  element!: Element;

  @property()
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property()
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }
  @property()
  get type(): string | null {
    return this.element.getAttribute('type') ?? null;
  }
  @property()
  get bitrate(): string | null {
    const V = this.element.querySelector('BitRate');
    if (V === null) return null;
    const v = V.textContent ?? '';
    const m = V.getAttribute('multiplier');
    const u = m === null ? 'b/s' : ' ' + m + 'b/s';
    return v ? v + u : null;
  }

  openConnectedAPwizard(): void {
    this.dispatchEvent(newWizardEvent(createConnectedApWizard(this.element)));
  }

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(subNetworkWizard({ element: this.element }))
    );
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

  renderSubNetworkSpecs(): TemplateResult {
    if (!this.type && !this.bitrate) return html``;

    return html`(${this.type}${this.type && this.bitrate
      ? html`&mdash;`
      : html``}${this.bitrate})`;
  }

  renderHeader(): TemplateResult {
    return html`<h1>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
      ${this.renderSubNetworkSpecs()}
      <abbr title="${translate('add')}">
        <mwc-icon-button
          icon="playlist_add"
          @click="${() => this.openConnectedAPwizard()}"
        ></mwc-icon-button>
      </abbr>
      <nav>
        <abbr title="${translate('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr title="${translate('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
      </nav>
    </h1>`;
  }

  renderIedContainer(): TemplateResult[] {
    return Array.from(this.element.querySelectorAll('ConnectedAP') ?? [])
      .map(connAP => connAP.getAttribute('iedName')!)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(compareNames)
      .map(
        iedName => html` <section id="iedSection" tabindex="0">
          <h3>${iedName}</h3>
          <div id="connApContainer">
            ${Array.from(
              this.element.ownerDocument.querySelectorAll(
                `ConnectedAP[iedName="${iedName}"]`
              )
            ).map(
              connectedAP =>
                html`<connectedap-editor
                  class="${connectedAP.parentElement !== this.element
                    ? 'disabled'
                    : ''}"
                  .element=${connectedAP}
                ></connectedap-editor>`
            )}
          </div>
        </section>`
      );
  }

  render(): TemplateResult {
    return html`<section tabindex="0">
      ${this.renderHeader()}
      <div id="connAPContainer">${this.renderIedContainer()}</div>
    </section>`;
  }

  static styles = css`
    ${styles}

    #iedSection {
      background-color: var(--mdc-theme-on-primary);
      margin: 0px;
    }

    #iedSection:not(:focus):not(:focus-within) .disabled {
      display: none;
    }

    #iedSection .disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    #connAPContainer {
      display: grid;
      box-sizing: border-box;
      gap: 12px;
      padding: 8px 12px 16px;
      grid-template-columns: repeat(auto-fit, minmax(150px, auto));
    }

    #connApContainer {
      display: grid;
      box-sizing: border-box;
      padding: 8px 12px 8px;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
