import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import { newWizardEvent } from '../foundation.js';
import { wizards } from '../wizards/wizard-library.js';

import { getAttachedIeds } from '../zeroline/foundation.js';

import '../zeroline-pane.js';

function isShowieds(): boolean {
  return localStorage.getItem('showieds') === 'on';
}

/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    const wizard = wizards['Substation'].create(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  renderHeader(): TemplateResult {
    return html`
        <h1>
          ${html`<abbr title="${translate('add')}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateSubstationWizard()}
              ></mwc-icon-button>
            </abbr>
            <nav>
              <abbr title="${translate('lnode.tooltip')}">
                <mwc-icon-button-toggle
                  ?on=${isShowieds()}
                  id="showieds"
                  onIcon="developer_board"
                  offIcon="developer_board_off"
                  disabled
                ></mwc-icon-button-toggle>
              </abbr>
            </nav>`}
          </nav>
        </h1>
      `;
  }

  render(): TemplateResult {
    return html` ${this.renderHeader()}
      <zeroline-pane
        .doc=${this.doc}
        .getAttachedIeds=${isShowieds() ? getAttachedIeds(this.doc) : undefined}
      ></zeroline-pane>
      ${!this.doc?.querySelector(':root > Substation')
        ? html`<h1>
            <mwc-fab
              extended
              icon="add"
              label="${get('substation.wizard.title.add')}"
              @click=${() => this.openCreateSubstationWizard()}
            ></mwc-fab>
          </h1>`
        : html``}`;
  }

  static styles = css`
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    h1 > nav,
    h1 > abbr > mwc-icon-button {
      float: right;
    }
  `;
}
