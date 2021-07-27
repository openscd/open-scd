import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
  css,
} from 'lit-element';
import { until } from 'lit-html/directives/until';
import { translate } from 'lit-translate';

import { isPublic, newWizardEvent } from './foundation.js';
import { getAttachedIeds, styles } from './zeroline/foundation.js';

import './zeroline/substation-editor.js';
import './zeroline/ied-editor.js';
import { Settings } from './Setting.js';
import { wizards } from './wizards/wizard-library.js';

function shouldShowIEDs(): boolean {
  return localStorage.getItem('showieds') === 'on';
}

function setShowIEDs(value: Settings['showieds']) {
  localStorage.setItem('showieds', value);
}

/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
@customElement('zeroline-pane')
export class ZerolinePane extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Boolean })
  readonly = false;

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Promise<Element[]> = async () => [];

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    const wizard = wizards['Substation'].create(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  toggleShowIEDs(): void {
    console.warn(shouldShowIEDs());
    if (shouldShowIEDs()) setShowIEDs('off');
    else setShowIEDs('on');
    console.log(shouldShowIEDs());
    this.requestUpdate();
  }

  async renderIedContainer(): Promise<TemplateResult> {
    this.getAttachedIeds = shouldShowIEDs()
      ? getAttachedIeds(this.doc)
      : async () => [];
    const ieds = await this.getAttachedIeds?.(this.doc.documentElement);

    await new Promise(requestAnimationFrame);
    return ieds.length
      ? html`<div id="iedcontainer">
          ${ieds.map(ied => html`<ied-editor .element=${ied}></ied-editor>`)}
        </div>`
      : html``;
  }

  render(): TemplateResult {
    return html`
      <h1>
          ${html`<abbr title="${translate('add')}">
            <mwc-icon-button
              icon="playlist_add"
              @click=${() => this.openCreateSubstationWizard()}
            ></mwc-icon-button>
          </abbr> `}
          </nav>
          <nav>
        <abbr title="${translate('zeroline.showieds')}">
          <mwc-icon-button-toggle
            ?on=${shouldShowIEDs()}
            @click=${() => this.toggleShowIEDs()}
            id="showieds"
            onIcon="developer_board"
            offIcon="developer_board_off"
          ></mwc-icon-button-toggle>
        </abbr>
      </nav>
        </h1>
      ${until(this.renderIedContainer(), html`<span>loading ieds...</span>`)}
      ${
        this.doc?.querySelector(':root > Substation')
          ? html`<section tabindex="0">
              ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
                .filter(isPublic)
                .map(
                  substation =>
                    html`<substation-editor
                      .element=${substation}
                      .getAttachedIeds=${this.getAttachedIeds}
                      ?readonly=${this.readonly}
                    ></substation-editor>`
                )}
            </section>`
          : html`<h1>
              <span style="color: var(--base1)"
                >${translate('substation.missing')}</span
              >
            </h1>`
      }`;
  }

  static styles = css`
    ${styles}
  `;
}
